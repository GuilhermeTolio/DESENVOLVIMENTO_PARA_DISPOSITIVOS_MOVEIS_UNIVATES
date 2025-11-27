import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { obtenerJuegos, eliminarJuego, buscarJuegos } from '../servicios/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ListaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const router = useRouter();

  const cargarJuegos = async () => {
    setCargando(true);
    const datos = await obtenerJuegos();
    setJuegos(datos);
    setCargando(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (busqueda === '') {
        cargarJuegos();
      }
    }, [busqueda])
  );

  const handleBuscar = async (texto) => {
    setBusqueda(texto);
    if (texto.length > 0) {
      const resultados = await buscarJuegos(texto);
      setJuegos(resultados);
    } else {
      cargarJuegos();
    }
  };

  const handleEliminar = async (id) => {
    const exito = await eliminarJuego(id);
    if (exito) {
      if (busqueda.length > 0) {
          handleBuscar(busqueda);
      } else {
          cargarJuegos();
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.titulo}>{item.title}</Text>
        <Text style={styles.subtitulo}>{item.genre || 'Sin género'} - ${item.price}</Text>
      </View>
      <View style={styles.acciones}>
        <TouchableOpacity 
          style={[styles.boton, styles.botonEditar]} 
          onPress={() => router.push({ pathname: '/formulario', params: { id: item.id, juego: JSON.stringify(item) } })}
        >
          <Text style={styles.textoBoton}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.boton, styles.botonEliminar]} 
          onPress={() => handleEliminar(item.id)}
        >
          <Text style={styles.textoBoton}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.header}>
        <TextInput
          style={styles.inputBusqueda}
          placeholder="Buscar juegos..."
          value={busqueda}
          onChangeText={handleBuscar}
        />
        <TouchableOpacity style={styles.botonAgregar} onPress={() => router.push('/formulario')}>
          <Text style={styles.textoBoton}>+ Nuevo</Text>
        </TouchableOpacity>
      </View>
      
      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={juegos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={<Text style={styles.vacio}>No hay juegos registrados.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  header: { flexDirection: 'row', marginBottom: 10, gap: 10 },
  inputBusqueda: { flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ddd' },
  botonAgregar: { backgroundColor: '#28a745', padding: 10, borderRadius: 5, justifyContent: 'center' },
  lista: { paddingBottom: 20 },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  info: { flex: 1 },
  titulo: { fontSize: 18, fontWeight: 'bold' },
  subtitulo: { color: '#666' },
  acciones: { flexDirection: 'row', gap: 5 },
  boton: { padding: 8, borderRadius: 5 },
  botonEditar: { backgroundColor: '#007bff' },
  botonEliminar: { backgroundColor: '#dc3545' },
  textoBoton: { color: 'white', fontWeight: 'bold' },
  vacio: { textAlign: 'center', marginTop: 20, color: '#888' }
});
