import { Text, View } from '@/components/Themed';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface TaskProject {
  id: number;
  title: string;
  description: string;
  projectPath: string;
  status: 'not_started' | 'in_progress' | 'completed';
  dueDate: string;
}

export default function TasksScreen() {
  const [taskProjects, setTaskProjects] = useState<TaskProject[]>([
    {
      id: 1,
      title: "Projeto Final",
      description: "Desenvolvimento de aplicativo mobile completo",
      projectPath: "./projects/tasks/projeto-final",
      status: 'in_progress',
      dueDate: "2025-12-15"
    },
    {
      id: 2,
      title: "Portfolio Mobile",
      description: "Criação de portfolio pessoal em React Native",
      projectPath: "./projects/tasks/portfolio-mobile",
      status: 'not_started',
      dueDate: "2025-11-30"
    },
    {
      id: 3,
      title: "App E-commerce",
      description: "Desenvolvimento de aplicativo de vendas online",
      projectPath: "./projects/tasks/app-ecommerce",
      status: 'not_started',
      dueDate: "2025-11-15"
    }
  ]);

  const openTaskProject = (project: TaskProject) => {
    Alert.alert(
      `Abrir ${project.title}`,
      `Deseja abrir o projeto "${project.title}" no VS Code?\n\nDescrição: ${project.description}\nCaminho: ${project.projectPath}`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Abrir Projeto", 
          onPress: () => {
            Alert.alert("Projeto Aberto", `Abrindo ${project.title} no VS Code...`);
            updateProjectStatus(project.id, 'in_progress');
          }
        }
      ]
    );
  };

  const updateProjectStatus = (id: number, status: TaskProject['status']) => {
    setTaskProjects(taskProjects.map(project => 
      project.id === id ? { ...project, status } : project
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.studentName}>{`{Nome do aluno}`}</Text>
        <Text style={styles.course}>2025BT - DESENVOLVIMENTO PARA DISPOSITIVOS MÓVEIS</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {taskProjects.map((project) => (
          <TouchableOpacity 
            key={project.id} 
            style={[
              styles.projectCard,
              project.status === 'completed' && styles.completedProject,
              project.status === 'in_progress' && styles.inProgressProject
            ]}
            onPress={() => openTaskProject(project)}
          >
            <View style={styles.projectContent}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectDescription}>{project.description}</Text>
              <Text style={styles.projectPath}>📁 {project.projectPath}</Text>
              <Text style={styles.dueDate}>
                Prazo: {new Date(project.dueDate).toLocaleDateString('pt-BR')}
              </Text>
              <View style={styles.statusContainer}>
                {project.status === 'not_started' && (
                  <Text style={styles.notStartedStatus}>⏳ Não iniciado</Text>
                )}
                {project.status === 'in_progress' && (
                  <Text style={styles.inProgressStatus}>🔄 Em andamento</Text>
                )}
                {project.status === 'completed' && (
                  <Text style={styles.completedStatus}>✅ Concluído</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  course: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  completedProject: {
    backgroundColor: '#f0f8f0',
    borderColor: '#4caf50',
  },
  inProgressProject: {
    backgroundColor: '#fff8e1',
    borderColor: '#ff9800',
  },
  projectContent: {
    backgroundColor: 'transparent',
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  projectPath: {
    fontSize: 12,
    color: '#2196f3',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  dueDate: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  statusContainer: {
    backgroundColor: 'transparent',
  },
  notStartedStatus: {
    color: '#757575',
    fontWeight: 'bold',
    fontSize: 14,
  },
  inProgressStatus: {
    color: '#ff9800',
    fontWeight: 'bold',
    fontSize: 14,
  },
  completedStatus: {
    color: '#4caf50',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
