// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      // Verifica se o erro é uma instância de Error
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Erro desconhecido' });
      }
    }
  } else if (req.method === 'GET') {
    const users = await User.find();
    res.status(200).json(users);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
