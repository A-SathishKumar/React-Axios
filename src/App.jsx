import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from './api';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await addUser(newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      const response = await updateUser(id, editingUser);
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {editingUser?.id === user.id ? (
              <>
                <input
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                />
                <input
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                />
                <button onClick={() => handleUpdateUser(user.id)}>Update</button>
              </>
            ) : (
              <>
                {user.name} ({user.email})
                <button onClick={() => setEditingUser(user)}>Edit</button>
              </>
            )}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add New User</h2>
      <input
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}

export default App;
