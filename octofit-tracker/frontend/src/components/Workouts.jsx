import { useState, useEffect } from 'react';

const getWorkoutsApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && codespaceName !== 'undefined') {
    return `https://${codespaceName}-8000.app.github.dev/api/workouts`;
  }
  return 'http://localhost:8000/api/workouts';
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(getWorkoutsApiUrl());
        if (!response.ok) throw new Error('Failed to fetch workouts');
        
        const data = await response.json();
        const workoutsList = Array.isArray(data) ? data : data.data || [];
        setWorkouts(workoutsList);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">{workout.description}</p>
                  <p className="small">
                    <strong>Duration:</strong> {workout.duration} min
                  </p>
                  <p className="small">
                    <strong>Difficulty:</strong>{' '}
                    <span className={`badge bg-${getDifficultyColor(workout.difficulty)}`}>
                      {workout.difficulty}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case 'easy':
      return 'success';
    case 'medium':
      return 'warning';
    case 'hard':
      return 'danger';
    default:
      return 'secondary';
  }
}
