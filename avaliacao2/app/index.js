import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Inicial() {
  const router = useRouter();
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Catálogo Pessoal de Filmes</Text>
      <TouchableOpacity style={estilos.botao} onPress={() => router.push('/filmes')}>
        <Text style={estilos.botaoTexto}>Ir para Meus Filmes</Text>
      </TouchableOpacity>
      <Text style={estilos.rodape}>Cadastre, edite e exclua seus filmes.</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#10141A' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 32, textAlign: 'center' },
  botao: { backgroundColor: '#E50914', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 8 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
  rodape: { color: '#8aa', marginTop: 16 }
});
