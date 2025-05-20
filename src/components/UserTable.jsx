import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Input, Button, Space, Typography, Image } from 'antd';

const { Title } = Typography;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [param1, setParam1] = useState('');
  const [param2, setParam2] = useState([]);

  const fetchUsers = async () => {
    try {
      const params = {
        Results: 10,
        Gender: param1,
        Nat: param2
      };
      const response = await axios.get('https://localhost:7148/api/user', { params });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'Foto',
      dataIndex: 'foto',
      key: 'foto',
      render: (foto) => <Image src={foto} width={50} />
    },
    {
      title: 'Nombre',
      dataIndex: 'nombreCompleto',
      key: 'nombreCompleto'
    },
    {
      title: 'Género',
      dataIndex: 'genero',
      key: 'genero'
    },
    {
      title: 'Ubicación',
      dataIndex: 'ubicacion',
      key: 'ubicacion'
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      key: 'correo'
    },
    {
      title: 'Nacimiento',
      dataIndex: 'fechaNacimiento',
      key: 'fechaNacimiento',
      render: (fecha) => new Date(Date.parse(fecha)).toLocaleDateString()
    }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <Title level={3}>Lista de Usuarios</Title>

      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Género (ej: male o female)"
          value={param1}
          onChange={(e) => setParam1(e.target.value)}
          style={{ width: 200 }}
        />
        <Input
          placeholder="Nacionalidad (ej: US, BR)"
          value={param2}
          onChange={(e) => setParam2(e.target.value)}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={fetchUsers}>
          Obtener Usuarios
        </Button>
      </Space>

      <Table
        dataSource={users}
        columns={columns}
        rowKey={(record, index) => index}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default UserTable;
