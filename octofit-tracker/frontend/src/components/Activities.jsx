import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(getApiUrl('activities'));
        if (!response.ok) throw new Error('Failed to load activities');
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadActivities();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error ? <p role="alert">{error}</p> : null}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id || activity.id}>
            {activity.type} — {activity.duration} — {activity.calories} kcal
          </li>
        ))}
      </ul>
    </section>
  );
}
