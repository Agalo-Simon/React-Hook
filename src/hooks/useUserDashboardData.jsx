import { useState, useEffect } from 'react';

export const useUserDashboardData = () => {
  const [data, setData] = useState({ users: [], todos: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch both simultaneously
        const [usersRes, todosRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/todos')
        ]);

        if (!usersRes.ok || !todosRes.ok) throw new Error("Data fetch failed");

        const users = await usersRes.json();
        const todos = await todosRes.json();

        setData({ users, todos });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // We return the states so the component can use them
  return { ...data, loading, error };
};