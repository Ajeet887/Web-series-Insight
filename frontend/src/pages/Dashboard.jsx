import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import ModernTrendingSeries from '../components/ModernTrendingSeries'
import SeriesDetail from '../components/SeriesDetail'
import DashboardHeader from '../components/DashboardHeader'
import './Dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()
  const [selectedSeriesId, setSelectedSeriesId] = useState(null)

  if (!user) {
    return (
      <div className="auth-required">
        <h2>Authentication Required</h2>
        <p>Please login to access the AI-powered insights dashboard.</p>
      </div>
    )
  }

  const handleSeriesClick = (seriesId) => {
    setSelectedSeriesId(seriesId)
  }

  const handleBackToTrending = () => {
    setSelectedSeriesId(null)
  }

  return (
    <div className="dashboard">
      {!selectedSeriesId ? (
        <>
          <DashboardHeader />
          <ModernTrendingSeries onSeriesClick={handleSeriesClick} />
        </>
      ) : (
        <SeriesDetail 
          seriesId={selectedSeriesId} 
          onBack={handleBackToTrending}
        />
      )}
    </div>
  )
}

export default Dashboard