import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(getApiUrl('teams'));
        if (!response.ok) throw new Error('Failed to load teams');
        const data = await response.json();
        setTeams(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error ? <p role="alert">{error}</p> : null}
      <ul>
        {teams.map((team) => (
          <li key={team._id || team.id}>
            {team.name} — {team.members} members
          </li>
        ))}
      </ul>
    </section>
  );
}
