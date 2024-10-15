// lib/dbConnect.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Adicione esta linha para carregar as variáveis de ambiente

const dbConnect = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  const uri = process.env.MONGODB_URI; // Acessando a variável de ambiente

  if (!uri) {
    throw new Error('A string de conexão do MongoDB não está definida.');
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw new Error('Erro ao conectar ao MongoDB');
  }
};

export default dbConnect;
