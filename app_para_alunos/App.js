import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.profilePicture} />
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Olá, Estudante</Text>
            <Text style={styles.subtitle}>Bem-vindo ao seu painel</Text>
          </View>
        </View>

        <View style={styles.menu}>
          <Text style={styles.menuTitle}>Menu</Text>
          <View style={styles.menuButtons}>
            <TouchableOpacity style={[styles.menuButton, styles.notasButton]}>
              <Text style={styles.menuButtonText}>NOTAS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuButton, styles.aulasButton]}>
              <Text style={styles.menuButtonText}>AULAS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuButton, styles.avisosButton]}>
              <Text style={styles.menuButtonText}>AVISOS</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.activitiesSection}>
          <Text style={styles.sectionTitle}>Próximas atividades</Text>
          <ScrollView 
            horizontal={false} 
            showsVerticalScrollIndicator={false}
            style={styles.activitiesContainer}
          >
            <View style={styles.activityCard}>
              <Text style={styles.activityTitle}>Trabalho de Matemática</Text>
              <Text style={styles.activityDate}>Entrega: 20/08</Text>
            </View>
            
            <View style={[styles.activityCard]}>
              <Text style={styles.activityTitle}>Prova de Física (Importante)</Text>
              <Text style={styles.activityDate}>Data: 22/08</Text>
            </View>
            
            <View style={styles.activityCard}>
              <Text style={styles.activityTitle}>Leitura de História</Text>
              <Text style={styles.activityDate}>Cap. 3 e 4</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.callToAction}>
          <Text style={styles.ctaTitle}>Chamada para ação</Text>
          <Text style={styles.ctaText}>Adquira um novo curso e continue aprendendo!</Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>COMPRAR CURSO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  
  // Cabeçalho
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E3F2FD',
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },

  // Menu
  menu: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  menuButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuButton: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  notasButton: {
    backgroundColor: '#2196F3',
  },
  aulasButton: {
    backgroundColor: '#4CAF50',
  },
  avisosButton: {
    backgroundColor: '#9C27B0',
  },
  menuButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Próximas atividades
  activitiesSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  activitiesContainer: {
    maxHeight: 300,
  },
  activityCard: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  importantCard: {
    backgroundColor: '#E3F2FD',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  activityDate: {
    fontSize: 14,
    color: '#666',
  },

  // Chamada para ação
  callToAction: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 20,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  ctaText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  ctaButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
