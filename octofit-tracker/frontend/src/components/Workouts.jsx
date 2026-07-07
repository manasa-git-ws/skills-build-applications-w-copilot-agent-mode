import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(getApiUrl('workouts'));
        if (!response.ok) throw new Error('Failed to load workouts');
        const data = await response.json();
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error ? <p role="alert">{error}</p> : null}
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id || workout.id}>
            {workout.title} — {workout.difficulty} — {workout.duration}
          </li>
        ))}
      </ul>
    </section>
  );
}
