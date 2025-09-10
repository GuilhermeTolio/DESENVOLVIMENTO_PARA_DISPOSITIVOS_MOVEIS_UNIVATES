import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  SafeAreaView, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';

export default function App() {
 

  return (
    <SafeAreaView style={styles.container}>
    
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
 
});
