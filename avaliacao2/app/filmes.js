import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('filmes.db');

export default function Filmes() {
  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('');
  const [anio, setAnio] = useState('');
  const [lista, setLista] = useState([]);
  const [editarId, setEditarId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        await db.execAsync(
          'CREATE TABLE IF NOT EXISTS filmes (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT NOT NULL, genero TEXT, ano INTEGER);'
        );
        await cargarPeliculas();
      } catch (e) {
        console.warn('Erro ao inicializar o banco:', e);
      }
    })();
  }, []);

  async function cargarPeliculas() {
    try {
      const filas = await db.getAllAsync('SELECT * FROM filmes ORDER BY id DESC;');
      setLista(filas);
    } catch (e) {
      console.warn('Erro ao carregar filmes:', e);
    }
  }

  async function guardarPelicula() {
    if (!titulo.trim()) {
      Alert.alert('Validação', 'O campo título é obrigatório.');
      return;
    }
    try {
      if (editarId) {
        await db.runAsync(
          'UPDATE filmes SET titulo = ?, genero = ?, ano = ? WHERE id = ?;',
          [titulo, genero, anio ? parseInt(anio, 10) : null, editarId]
        );
      } else {
        await db.runAsync(
          'INSERT INTO filmes (titulo, genero, ano) VALUES (?, ?, ?);',
          [titulo, genero, anio ? parseInt(anio, 10) : null]
        );
      }
      limpiarFormulario();
      await cargarPeliculas();
    } catch (e) {
      console.warn('Erro ao salvar filme:', e);
    }
  }

  async function eliminarPelicula(id) {
    try {
      await db.runAsync('DELETE FROM filmes WHERE id = ?;', [id]);
      if (editarId === id) limpiarFormulario();
      await cargarPeliculas();
    } catch (e) {
      console.warn('Erro ao excluir filme:', e);
    }
  }

  function seleccionarParaEditar(item) {
    setEditarId(item.id);
    setTitulo(item.titulo);
    setGenero(item.genero || '');
    setAnio(item.ano ? String(item.ano) : '');
  }

  function limpiarFormulario() {
    setEditarId(null);
    setTitulo('');
    setGenero('');
    setAnio('');
  }

  const renderItem = ({ item }) => (
    <View style={estilos.item}>
      <TouchableOpacity onPress={() => seleccionarParaEditar(item)} style={{ flex: 1 }}>
        <Text style={estilos.itemTitulo}>{item.titulo}</Text>
        <Text style={estilos.itemTexto}>Gênero: {item.genero || '—'}</Text>
        <Text style={estilos.itemTexto}>Ano: {item.ano || '—'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={estilos.botonEliminar} onPress={() => eliminarPelicula(item.id)}>
        <Text style={estilos.textoBotonEliminar}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{editarId ? 'Editar Filme' : 'Cadastrar Filme'}</Text>
      <TextInput
        placeholder="Título"
        placeholderTextColor="#999"
        style={estilos.input}
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        placeholder="Gênero"
        placeholderTextColor="#999"
        style={estilos.input}
        value={genero}
        onChangeText={setGenero}
      />
      <TextInput
        placeholder="Ano"
        placeholderTextColor="#999"
        style={estilos.input}
        keyboardType="numeric"
        value={anio}
        onChangeText={setAnio}
      />
      <View style={estilos.filaBotones}>
        <TouchableOpacity style={estilos.botonPrincipal} onPress={guardarPelicula}>
          <Text style={estilos.textoBotonPrincipal}>{editarId ? 'Salvar Alterações' : 'Adicionar'}</Text>
        </TouchableOpacity>
        {editarId && (
          <TouchableOpacity style={estilos.botonSecundario} onPress={limpiarFormulario}>
            <Text style={estilos.textoBotonSecundario}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={estilos.subtitulo}>Meus Filmes</Text>
      <FlatList
        data={lista}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={estilos.vacio}>Nenhum filme cadastrado.</Text>}
        contentContainerStyle={lista.length === 0 && { flexGrow: 1, justifyContent: 'center' }}
        style={{ flex: 1, marginTop: 12 }}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F0F', padding: 16 },
  titulo: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 12 },
  subtitulo: { fontSize: 20, fontWeight: '600', color: '#fff', marginTop: 24, marginBottom: 8 },
  input: { backgroundColor: '#1E1E1E', color: '#fff', padding: 12, borderRadius: 6, marginBottom: 10, borderWidth: 1, borderColor: '#333' },
  filaBotones: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  botonPrincipal: { flex: 1, backgroundColor: '#E50914', padding: 14, borderRadius: 6, alignItems: 'center' },
  textoBotonPrincipal: { color: '#fff', fontWeight: '600' },
  botonSecundario: { backgroundColor: '#444', padding: 14, borderRadius: 6, alignItems: 'center' },
  textoBotonSecundario: { color: '#fff' },
  item: { flexDirection: 'row', backgroundColor: '#1A1A1A', padding: 12, borderRadius: 6, marginBottom: 10, alignItems: 'center', gap: 12 },
  itemTitulo: { fontSize: 16, fontWeight: '600', color: '#fff' },
  itemTexto: { fontSize: 14, color: '#ccc' },
  botonEliminar: { backgroundColor: '#7A0008', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  textoBotonEliminar: { color: '#fff', fontSize: 12 },
  vacio: { color: '#777', textAlign: 'center', marginTop: 32 },
});
