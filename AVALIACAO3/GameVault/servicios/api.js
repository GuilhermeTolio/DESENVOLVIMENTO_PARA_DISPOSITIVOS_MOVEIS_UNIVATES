import { Alert } from 'react-native';

const API_URL = 'http://177.44.248.50:8080';

export const obtenerJuegos = async () => {
  try {
    const response = await fetch(`${API_URL}/games`);
    if (!response.ok) throw new Error('Error al obtener juegos');
    return await response.json();
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo cargar los juegos');
    return [];
  }
};

export const buscarJuegos = async (texto) => {
  try {
    const response = await fetch(`${API_URL}/games/search?q=${texto}`);
    if (!response.ok) throw new Error('Error al buscar juegos');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const crearJuego = async (juego) => {
  try {
    const response = await fetch(`${API_URL}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(juego),
    });
    if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error('Error al crear juego');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo crear el juego');
    throw error;
  }
};

export const actualizarJuego = async (id, juego) => {
  try {
    const response = await fetch(`${API_URL}/games/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(juego),
    });
    if (!response.ok) throw new Error('Error al actualizar juego');
    return await response.json();
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo actualizar el juego');
    throw error;
  }
};

export const eliminarJuego = async (id) => {
  try {
    const response = await fetch(`${API_URL}/games/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar juego');
    return true;
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo eliminar el juego');
    return false;
  }
};
