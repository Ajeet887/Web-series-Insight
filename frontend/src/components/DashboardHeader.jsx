import { useAuth } from '../hooks/useAuth'

const DashboardHeader = () => {
  const { user } = useAuth()

  return (
    <div className="dashboard-header">
      <h1>🎬 Web Series Insight Dashboard</h1>
      <div className="welcome-card">
        <h2>Welcome back, {user.name}! 👋</h2>
        <p>
          Discover <strong>why</strong> web series work, understand audience psychology, 
          and get explainable AI recommendations.
        </p>
        <div className="feature-highlights">
          <span className="feature">🧠 WHY-Based Analysis</span>
          <span className="feature">📈 Emotion Timelines</span>
          <span className="feature">💡 Explainable Recommendations</span>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader