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
  // Dados dos cartões para cada coluna
  const todoTasks = [
    { id: 1, title: 'Configurar ambiente' },
    { id: 2, title: 'Entregar layout (Importante)', important: true },
    { id: 3, title: 'Revisar textos' }
  ];

  const inProgressTasks = [
    { id: 4, title: 'Tela inicial' },
    { id: 5, title: 'API de login' },
    { id: 6, title: 'Documento' }
  ];

  const doneTasks = [
    { id: 7, title: 'Setup projeto' },
    { id: 8, title: 'Componentes base' },
    { id: 9, title: 'README' }
  ];

  const renderCard = (task) => (
    <View key={task.id} style={[styles.card, task.important && styles.importantCard]}>
      <Text style={[styles.cardText, task.important && styles.importantCardText]}>
        {task.title}
      </Text>
    </View>
  );

  const renderColumn = (title, tasks) => (
    <View style={styles.column}>
      <Text style={styles.columnTitle}>{title}</Text>
      <View style={styles.cardsContainer}>
        {tasks.map(renderCard)}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra Superior */}
      <View style={styles.header}>
        <Text style={styles.title}>Quadro de Tarefas</Text>
        <Text style={styles.subtitle}>Kanban estático</Text>
      </View>

      {/* Quadro */}
      <View style={styles.boardContainer}>
        <Text style={styles.boardTitle}>Quadro</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {renderColumn('A Fazer', todoTasks)}
          {renderColumn('Em Progresso', inProgressTasks)}
          {renderColumn('Concluído', doneTasks)}
        </ScrollView>
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>ADICIONAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>FILTRAR</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  boardContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  boardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingRight: 20,
  },
  column: {
    width: 300,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  importantCard: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  cardText: {
    fontSize: 14,
    color: '#333',
  },
  importantCardText: {
    color: '#1976d2',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#2196f3',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
