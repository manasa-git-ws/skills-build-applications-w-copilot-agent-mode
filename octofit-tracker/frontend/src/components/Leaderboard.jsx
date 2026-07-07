import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiUrl('leaderboard'));
        if (!response.ok) throw new Error('Failed to load leaderboard');
        const data = await response.json();
        setEntries(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error ? <p role="alert">{error}</p> : null}
      <ol>
        {entries.map((entry) => (
          <li key={entry._id || entry.rank}>
            {entry.name} — {entry.score}
          </li>
        ))}
      </ol>
    </section>
  );
}
