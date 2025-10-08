# App de Treinos

Aplicativo React Native/Expo para gerenciar treinos pessoais com banco SQLite.

## Funcionalidades

- Cadastrar treinos (atividade, duração, categoria)
- Listar todos os treinos
- Excluir treinos
- Banco de dados local (SQLite)

## Como Criar o Projeto

### 1. Criar projeto Expo

```bash
npx create-expo-app --template blank app-treinos
cd app-treinos
```

### 2. Instalar dependências

```bash
npm install expo-sqlite expo-router react-native-safe-area-context
```

### 3. Configurar package.json

Alterar o `main`:

```json
{
  "main": "expo-router/entry"
}
```

### 4. Configurar app.json

Adicionar:

```json
{
  "expo": {
    "scheme": "app-treinos"
  }
}
```

### 5. Criar estrutura de pastas

```
app/
├── _layout.js
├── index.js
└── treinos.js
database/
└── database.js
```

## Executar o Projeto

```bash
# Instalar dependências
npm install

# Rodar o projeto
npx expo start
```

## Estrutura do Banco

```sql
CREATE TABLE treinos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  atividade TEXT NOT NULL,
  duracaoMin INTEGER NOT NULL,
  categoria TEXT NOT NULL,
  intensidade TEXT,
  data TEXT NOT NULL,
  observacoes TEXT
);
```

## Validações

- Atividade: obrigatória
- Duração: número > 0
- Categoria: obrigatória

## Comandos Úteis

```bash
# Limpar cache
npx expo start --clear

# Reset
npx expo install --fix
```
