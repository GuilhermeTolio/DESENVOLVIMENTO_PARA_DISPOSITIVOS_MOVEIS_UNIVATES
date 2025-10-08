import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { inserirTreino, buscarTreinos, excluirTreino, editarTreino, excluirTodosTreinos } from '../database/database';

export default function Treinos() {
  const router = useRouter();
  const [treinos, setTreinos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [atividade, setAtividade] = useState('');
  const [duracaoMin, setDuracaoMin] = useState('');
  const [categoria, setCategoria] = useState('');
  const [intensidade, setIntensidade] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [editandoTreino, setEditandoTreino] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const categorias = ['Cardio', 'Força', 'Técnica', 'Flexibilidade', 'Resistência'];
  const intensidades = ['Baixa', 'Moderada', 'Alta', 'Máxima'];

  useEffect(() => {
    carregarTreinos();
  }, []);

  const carregarTreinos = async () => {
    try {
      const dados = await buscarTreinos();
      setTreinos(dados);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar treinos');
      console.error(error);
    }
  };

  const validarCampos = () => {
    if (!atividade.trim()) {
      Alert.alert('Erro', 'O campo atividade é obrigatório');
      return false;
    }
    
    const duracao = parseInt(duracaoMin);
    if (!duracaoMin || isNaN(duracao) || duracao <= 0) {
      Alert.alert('Erro', 'A duração deve ser um número maior que 0');
      return false;
    }
    
    if (!categoria.trim()) {
      Alert.alert('Erro', 'O campo categoria é obrigatório');
      return false;
    }
    
    return true;
  };

  const salvarTreino = async () => {
    if (!validarCampos()) return;

    try {
      if (isEditMode && editandoTreino) {
        await editarTreino(
          editandoTreino.id,
          atividade.trim(),
          parseInt(duracaoMin),
          categoria,
          intensidade || null,
          observacoes.trim() || null
        );
        Alert.alert('Sucesso', 'Treino editado com sucesso!');
      } else {
        await inserirTreino(
          atividade.trim(),
          parseInt(duracaoMin),
          categoria,
          intensidade || null,
          observacoes.trim() || null
        );
        Alert.alert('Sucesso', 'Treino cadastrado com sucesso!');
      }
      
      limparCampos();
      setModalVisible(false);
      carregarTreinos();
    } catch (error) {
      Alert.alert('Erro', isEditMode ? 'Falha ao editar treino' : 'Falha ao salvar treino');
      console.error(error);
    }
  };

  const confirmarExclusao = (id, atividade) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir o treino "${atividade}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => excluirTreinoConfirmado(id) }
      ]
    );
  };

  const excluirTreinoConfirmado = async (id) => {
    try {
      await excluirTreino(id);
      Alert.alert('Sucesso', 'Treino excluído com sucesso!');
      carregarTreinos();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao excluir treino');
      console.error(error);
    }
  };

  const limparCampos = () => {
    setAtividade('');
    setDuracaoMin('');
    setCategoria('');
    setIntensidade('');
    setObservacoes('');
    setEditandoTreino(null);
    setIsEditMode(false);
  };

  const abrirModalEdicao = (treino) => {
    setAtividade(treino.atividade);
    setDuracaoMin(treino.duracaoMin.toString());
    setCategoria(treino.categoria);
    setIntensidade(treino.intensidade || '');
    setObservacoes(treino.observacoes || '');
    setEditandoTreino(treino);
    setIsEditMode(true);
    setModalVisible(true);
  };

  const abrirModalCadastro = () => {
    limparCampos();
    setModalVisible(true);
  };

  const confirmarExclusaoTotal = () => {
    Alert.alert(
      'Excluir Todos os Treinos',
      `Tem certeza que deseja excluir todos os ${treinos.length} treinos? Esta ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir Todos', style: 'destructive', onPress: excluirTodosConfirmado }
      ]
    );
  };

  const excluirTodosConfirmado = async () => {
    try {
      await excluirTodosTreinos();
      Alert.alert('Sucesso', 'Todos os treinos foram excluídos!');
      carregarTreinos();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao excluir todos os treinos');
      console.error(error);
    }
  };

  const renderTreino = ({ item }) => (
    <View style={styles.treinoItem}>
      <View style={styles.treinoHeader}>
        <Text style={styles.treinoAtividade}>{item.atividade}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => abrirModalEdicao(item)}
          >
            <Text style={styles.editButtonText}>✎</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => confirmarExclusao(item.id, item.atividade)}
          >
            <Text style={styles.deleteButtonText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.treinoInfo}>
        <Text style={styles.infoText}>{item.duracaoMin} min • {item.categoria} • {item.intensidade}</Text>
        <Text style={styles.dataText}>{item.data}</Text>
      </View>
    </View>
  );

  const renderCategoriaButton = (cat) => (
    <TouchableOpacity
      key={cat}
      style={[
        styles.categoryButton,
        categoria === cat && styles.categoryButtonSelected
      ]}
      onPress={() => setCategoria(cat)}
    >
      <Text style={[
        styles.categoryButtonText,
        categoria === cat && styles.categoryButtonTextSelected
      ]}>
        {cat}
      </Text>
    </TouchableOpacity>
  );

  const renderIntensidadeButton = (int) => (
    <TouchableOpacity
      key={int}
      style={[
        styles.intensityButton,
        intensidade === int && styles.intensityButtonSelected
      ]}
      onPress={() => setIntensidade(int)}
    >
      <Text style={[
        styles.intensityButtonText,
        intensidade === int && styles.intensityButtonTextSelected
      ]}>
        {int}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Meus Treinos</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={abrirModalCadastro}
        >
          <Text style={styles.addButtonText}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {treinos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum treino cadastrado</Text>
            <Text style={styles.emptySubtext}>Toque em "+ Novo" para adicionar seu primeiro treino</Text>
          </View>
        ) : (
          <>
            <View style={styles.statsContainer}>
              <Text style={styles.counterText}>
                {treinos.length} treino{treinos.length !== 1 ? 's' : ''} cadastrado{treinos.length !== 1 ? 's' : ''}
              </Text>
              <TouchableOpacity 
                style={styles.clearAllButton}
                onPress={confirmarExclusaoTotal}
              >
                <Text style={styles.clearAllButtonText}>Apagar Tudo</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={treinos}
              renderItem={renderTreino}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          </>
        )}
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <KeyboardAvoidingView 
            style={styles.modalContent}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{isEditMode ? 'Editar Treino' : 'Novo Treino'}</Text>
              <TouchableOpacity 
                onPress={salvarTreino}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Atividade *</Text>
                <TextInput
                  style={styles.input}
                  value={atividade}
                  onChangeText={setAtividade}
                  placeholder="Ex: Musculação, Corrida, Natação"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Duração (minutos) *</Text>
                <TextInput
                  style={styles.input}
                  value={duracaoMin}
                  onChangeText={setDuracaoMin}
                  placeholder="Ex: 45"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Categoria *</Text>
                <View style={styles.categoryContainer}>
                  {categorias.map(renderCategoriaButton)}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Intensidade (opcional)</Text>
                <View style={styles.intensityContainer}>
                  {intensidades.map(renderIntensidadeButton)}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Observações (opcional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={observacoes}
                  onChangeText={setObservacoes}
                  placeholder="Ex: Foco no peito e ombros"
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={3}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    flex: 1,
  },
  backButtonText: {
    color: '#6c5ce7',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    textAlign: 'center',
    flex: 2,
  },
  addButton: {
    backgroundColor: '#6c5ce7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    flex: 1,
    alignItems: 'flex-end',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  counterText: {
    fontSize: 14,
    color: '#636e72',
    fontWeight: '500',
  },
  clearAllButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  clearAllButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#636e72',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#b2bec3',
    textAlign: 'center',
    lineHeight: 20,
  },
  listContainer: {
    padding: 20,
  },
  treinoItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  treinoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  treinoAtividade: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    padding: 4,
  },
  editButtonText: {
    fontSize: 18,
    color: '#6c5ce7',
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 4,
  },
  deleteButtonText: {
    fontSize: 18,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  treinoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#636e72',
    fontWeight: '500',
  },
  dataText: {
    fontSize: 12,
    color: '#b2bec3',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalContent: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  cancelButton: {
    flex: 1,
  },
  cancelButtonText: {
    color: '#636e72',
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    textAlign: 'center',
    flex: 2,
  },
  saveButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  saveButtonText: {
    color: '#6c5ce7',
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2d3436',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryButtonSelected: {
    backgroundColor: '#6c5ce7',
    borderColor: '#6c5ce7',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#636e72',
  },
  categoryButtonTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  intensityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  intensityButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  intensityButtonSelected: {
    backgroundColor: '#00b894',
    borderColor: '#00b894',
  },
  intensityButtonText: {
    fontSize: 14,
    color: '#636e72',
  },
  intensityButtonTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
});
