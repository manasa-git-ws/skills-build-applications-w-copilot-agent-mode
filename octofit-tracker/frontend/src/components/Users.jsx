import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(getApiUrl('users'));
        if (!response.ok) throw new Error('Failed to load users');
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error ? <p role="alert">{error}</p> : null}
      <ul>
        {users.map((user) => (
          <li key={user._id || user.id || user.email}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </section>
  );
}
