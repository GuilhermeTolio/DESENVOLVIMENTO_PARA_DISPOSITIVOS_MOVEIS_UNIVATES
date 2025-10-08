import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { initDatabase } from '../database/database';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initDatabase();
      } catch (error) {
        Alert.alert('Erro', 'Falha ao inicializar o banco de dados');
        console.error(error);
      }
    };

    setupDatabase();
  }, []);

  const navigateToTreinos = () => {
    router.push('/treinos');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>App de Treinos</Text>
      </View>

      <View style={styles.content}>


        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>+</Text>
            <Text style={styles.featureText}>Cadastrar treinos</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>≡</Text>
            <Text style={styles.featureText}>Visualizar histórico</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>×</Text>
            <Text style={styles.featureText}>Gerenciar registros</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={navigateToTreinos}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Gerenciar Treinos</Text>
          <Text style={styles.buttonIcon}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Desenvolvido por Guilherme Tolio dos Santos</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: '#6c5ce7',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  icon: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#6c5ce7',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 50,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 30,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#6c5ce7',
  },
  featureText: {
    fontSize: 12,
    color: '#636e72',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6c5ce7',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6c5ce7',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  buttonIcon: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#b2bec3',
    textAlign: 'center',
  },
});
