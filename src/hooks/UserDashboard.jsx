import React, { useState } from 'react';
import { useUserDashboardData } from './useUserDashboardData';

const UserDashboard = () => {
  const { users, todos, loading, error } = useUserDashboardData();
  const [selectedUserId, setSelectedUserId] = useState('');

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 style={{ color: 'red' }}>Error: {error}</h2>;

  const filteredTodos = todos.filter(t => t.userId === Number(selectedUserId));

  return (
    <div style={{ padding: '20px' }}>
      <h1>Custom Hook Dashboard</h1>
      
      <select 
        value={selectedUserId} 
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="">Select a User</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>

      <div style={{ marginTop: '20px' }}>
        {selectedUserId ? (
          filteredTodos.map(todo => (
            <div key={todo.id} style={{ padding: '5px', borderBottom: '1px solid #ddd' }}>
              {todo.completed ? '✅' : '⏳'} {todo.title}
            </div>
          ))
        ) : (
          <p>Please select a user to view their todos.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;