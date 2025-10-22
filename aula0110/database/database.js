import * as SQLite from 'expo-sqlite';

let db;

export const initDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync('treinos.db');
    
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS treinos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        atividade TEXT NOT NULL,
        duracaoMin INTEGER NOT NULL,
        categoria TEXT NOT NULL,
        intensidade TEXT,
        data TEXT NOT NULL,
        observacoes TEXT
      );
    `);
    
    console.log('Banco de dados inicializado com sucesso!');
    return db;
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    throw error;
  }
};

export const getDatabase = () => {
  if (!db) {
    throw new Error('Banco de dados não foi inicializado. Chame initDatabase() primeiro.');
  }
  return db;
};

export const inserirTreino = async (atividade, duracaoMin, categoria, intensidade, observacoes) => {
  try {
    const database = getDatabase();
    const data = new Date().toLocaleDateString('pt-BR');
    
    const result = await database.runAsync(
      'INSERT INTO treinos (atividade, duracaoMin, categoria, intensidade, data, observacoes) VALUES (?, ?, ?, ?, ?, ?)',
      [atividade, duracaoMin, categoria, intensidade || null, data, observacoes || null]
    );
    
    console.log('Treino inserido com sucesso! ID:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Erro ao inserir treino:', error);
    throw error;
  }
};

export const buscarTreinos = async () => {
  try {
    const database = getDatabase();
    const result = await database.getAllAsync('SELECT * FROM treinos ORDER BY id DESC');
    console.log('Treinos encontrados:', result.length);
    return result;
  } catch (error) {
    console.error('Erro ao buscar treinos:', error);
    throw error;
  }
};

export const excluirTreino = async (id) => {
  try {
    const database = getDatabase();
    const result = await database.runAsync('DELETE FROM treinos WHERE id = ?', [id]);
    console.log('Treino excluído com sucesso!');
    return result.changes;
  } catch (error) {
    console.error('Erro ao excluir treino:', error);
    throw error;
  }
};

export const editarTreino = async (id, atividade, duracaoMin, categoria, intensidade, observacoes) => {
  try {
    const database = getDatabase();
    const result = await database.runAsync(
      'UPDATE treinos SET atividade = ?, duracaoMin = ?, categoria = ?, intensidade = ?, observacoes = ? WHERE id = ?',
      [atividade, duracaoMin, categoria, intensidade || null, observacoes || null, id]
    );
    
    console.log('Treino editado com sucesso!');
    return result.changes;
  } catch (error) {
    console.error('Erro ao editar treino:', error);
    throw error;
  }
};
z
export const excluirTodosTreinos = async () => {
  try {
    const database = getDatabase();
    const result = await database.runAsync('DELETE FROM treinos');
    console.log('Todos os treinos foram excluídos!');
    return result.changes;
  } catch (error) {
    console.error('Erro ao excluir todos os treinos:', error);
    throw error;
  }
};
