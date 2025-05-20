import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState('');

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('/api/users', {
//         params: {
//           param1,
//           param2
//         }
//       });
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

    useEffect(() => {
    const fetchUsers = async () => {
      try {
        const params = {  Results: 10 };
        const response = await axios.get('https://localhost:7148/api/users', { params });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Lista de Usuarios</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Parámetro 1"
          value={param1}
          onChange={(e) => setParam1(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Parámetro 2"
          value={param2}
          onChange={(e) => setParam2(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={fetchUsers}>Obtener Usuarios</button>
      </div>

      {users.length > 0 && (
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Género</th>
              <th>Ubicación</th>
              <th>Correo</th>
              <th>Nacimiento</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                  <img src={user.foto} alt="foto" width="50" />
                </td>
                <td>{user.nombre}</td>
                <td>{user.genero}</td>
                <td>{user.ubicacion}</td>
                <td>{user.correo}</td>
                <td>{new Date(user.nacimiento).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {users.length === 0 && <p>No hay usuarios para mostrar.</p>}
    </div>
  );
};

export default UserTable;
