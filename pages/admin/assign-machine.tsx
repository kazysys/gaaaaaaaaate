import { useEffect, useState } from 'react';
import axios from 'axios';

const AssignMachine = () => {
  const [users, setUsers] = useState([]);
  const [machines, setMachines] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedMachineId, setSelectedMachineId] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('/api/users');
      setUsers(res.data);
    };

    const fetchMachines = async () => {
      const res = await axios.get('/api/machines');
      setMachines(res.data);
    };

    fetchUsers();
    fetchMachines();
  }, []);

  const handleAssignMachine = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/assign-machine', {
        userId: selectedUserId,
        machineId: selectedMachineId,
      });
      alert('Máquina associada com sucesso!');
    } catch (error) {
      console.error('Erro ao associar máquina', error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Associar Máquina a Usuário</h2>
      <form onSubmit={handleAssignMachine} className="space-y-4">
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Selecione um Usuário</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
        
        <select
          value={selectedMachineId}
          onChange={(e) => setSelectedMachineId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Selecione uma Máquina</option>
          {machines.map((machine) => (
            <option key={machine._id} value={machine._id}>
              {machine.ip}
            </option>
          ))}
        </select>
        
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Associar Máquina
        </button>
      </form>
    </div>
  );
};

export default AssignMachine;
