import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>React Native</Text>
        <Text style={styles.subtitle}>Avaliação dia 27/08</Text>
      </View>
      
      <View style={styles.body}>
        <View style={styles.rectangle}>
          <Text style={styles.rectangleText}>Batatas são macias.</Text>
        </View>
        
        <Button title="ENVIAR" color="#007AFF" />
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'flex-start',
    paddingTop: 60,
    paddingBottom: 40,
    paddingLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  rectangle: {
    backgroundColor: '#E8E8E8',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 40,
    minWidth: 250,
    alignItems: 'center',
  },
  rectangleText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
