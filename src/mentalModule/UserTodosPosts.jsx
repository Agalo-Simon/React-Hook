import React, { useState, useEffect } from 'react';

const UserDashboard = () => {
  // State for our data
  const [users, setUsers] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  
  // State for UI and filtering
  const [selectedUserId, setSelectedUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fire both requests simultaneously
        const [usersResponse, todosResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/todos')
        ]);

        // 2. Check if both responses are okay
        if (!usersResponse.ok || !todosResponse.ok) {
          throw new Error('Failed to fetch data from one or both APIs');
        }

        // 3. Parse both results
        const usersData = await usersResponse.json();
        const todosData = await todosResponse.json();

        // 4. Update state
        setUsers(usersData);
        setAllTodos(todosData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 5. Logic: Filter todos based on the selected user
  const userTasks = allTodos.filter(todo => todo.userId === parseInt(selectedUserId));

  if (loading) return <h2>Loading data...</h2>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>User Task Manager</h1>

      <label>Select a User: </label>
      <select 
        value={selectedUserId} 
        onChange={(e) => setSelectedUserId(e.target.value)}
        style={{ padding: '8px', marginBottom: '20px' }}
      >
        <option value="">-- Choose a User --</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <hr />

      {selectedUserId ? (
        <div>
          <h3>Tasks for User #{selectedUserId}</h3>
          <ul>
            {userTasks.map(todo => (
              <li key={todo.id} style={{ marginBottom: '10px' }}>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.title}
                </span>
                {todo.completed ? ' ✅' : ' ⏳'}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Please select a user to see their specific tasks.</p>
      )}
    </div>
  );
};

export default UserDashboard;