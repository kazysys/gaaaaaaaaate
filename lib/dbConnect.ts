// lib/dbConnect.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const dbConnect = async () => {
  // Verifica se a conexão já está estabelecida
  if (mongoose.connection.readyState === 1) {
    return;
  }

  const uri = process.env.MONGODB_URI; // Acessando a variável de ambiente

  // Verifica se a URI do MongoDB está definida
  if (!uri) {
    throw new Error('A string de conexão do MongoDB não está definida.');
  }

  try {
    // Conecta ao MongoDB
    await mongoose.connect(uri, {
      // As opções useNewUrlParser e useUnifiedTopology foram removidas
    });
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw new Error('Erro ao conectar ao MongoDB');
  }
};

export default dbConnect;
