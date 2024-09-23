const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

// Configurações do MongoDB
const uri = "mongodb+srv://cibelyojorge:SkOo63R1oKpHLkjt@cluster0.pv65m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const app = express();
const port = process.env.PORT || 3000;

// Configurar bodyParser para processar JSON
app.use(bodyParser.json());

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB!");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  }
}

// Endpoint para registrar ações
app.post('/api/action', async (req, res) => {
  const { userId, action } = req.body;

  if (!userId || !action) {
    return res.status(400).json({ error: 'userId e action são necessários.' });
  }

  try {
    const db = client.db('chatbot'); // Nome do banco de dados
    const collection = db.collection('user_history'); // Nome da coleção

    const newHistory = { userId, action, timestamp: new Date() };
    const result = await collection.insertOne(newHistory);

    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar o histórico.' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Conectar ao MongoDB e iniciar o servidor
connectToMongo().then(() => {
  console.log("Servidor Express iniciado.");
}).catch(console.error);


