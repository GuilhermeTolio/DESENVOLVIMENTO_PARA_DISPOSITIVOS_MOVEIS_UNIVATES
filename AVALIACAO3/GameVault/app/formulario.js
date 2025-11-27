import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { crearJuego, actualizarJuego } from '../servicios/api';

export default function FormularioJuego() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [id, setId] = useState(null);
  
  const [titulo, setTitulo] = useState('');
  const [slug, setSlug] = useState('');
  const [precio, setPrecio] = useState('');
  const [genero, setGenero] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (params.id) {
      setId(params.id);
      if (params.juego) {
        const juego = JSON.parse(params.juego);
        setTitulo(juego.title);
        setSlug(juego.slug);
        setPrecio(juego.price.toString());
        setGenero(juego.genre || '');
        setDescripcion(juego.description || '');
      }
    }
  }, [params]);

  const guardar = async () => {
    if (!titulo || !slug || !precio) {
      Alert.alert('Error', 'Título, Slug y Precio son obligatorios');
      return;
    }

    const datos = {
      title: titulo,
      slug: slug,
      price: parseFloat(precio),
      genre: genero,
      description: descripcion
    };

    try {
      if (id) {
        await actualizarJuego(id, datos);
        Alert.alert('Éxito', 'Juego actualizado correctamente');
      } else {
        await crearJuego(datos);
        Alert.alert('Éxito', 'Juego creado correctamente');
      }
      router.back();
    } catch (error) {
      // Error handled in api service
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.label}>Título *</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

      <Text style={styles.label}>Slug *</Text>
      <TextInput style={styles.input} value={slug} onChangeText={setSlug} autoCapitalize="none" />

      <Text style={styles.label}>Precio *</Text>
      <TextInput style={styles.input} value={precio} onChangeText={setPrecio} keyboardType="numeric" />

      <Text style={styles.label}>Género</Text>
      <TextInput style={styles.input} value={genero} onChangeText={setGenero} />

      <Text style={styles.label}>Descripción</Text>
      <TextInput style={[styles.input, styles.textArea]} value={descripcion} onChangeText={setDescripcion} multiline />

      <TouchableOpacity style={styles.botonGuardar} onPress={guardar}>
        <Text style={styles.textoBoton}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { padding: 20, backgroundColor: 'white', flexGrow: 1 },
  label: { fontSize: 16, marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
  botonGuardar: { backgroundColor: '#007bff', padding: 15, borderRadius: 5, alignItems: 'center' },
  textoBoton: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});
