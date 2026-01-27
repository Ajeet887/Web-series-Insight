import { useState, useEffect } from 'react'
import { seriesAPI } from '../services/api'
import ModernEmotionTimeline from './ModernEmotionTimeline'
import ModernWhyInsights from './ModernWhyInsights'
import ModernRecommendations from './ModernRecommendations'

const ModernSeriesDetail = ({ seriesId, onBack }) => {
  const [seriesData, setSeriesData] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('insights')

  useEffect(() => {
    if (seriesId) {
      fetchSeriesDetails()
      fetchRecommendations()
    }
  }, [seriesId])

  const fetchSeriesDetails = async () => {
    try {
      setLoading(true)
      const response = await seriesAPI.getDetails(seriesId)
      setSeriesData(response.data)
    } catch (err) {
      setError('Failed to fetch series details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchRecommendations = async () => {
    try {
      const response = await seriesAPI.getRecommendations(seriesId)
      setRecommendations(response.data)
    } catch (err) {
      console.error('Failed to fetch recommendations:', err)
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Analyzing series with AI...</p>
      </div>
    )
  }

  if (error) return <div className="error">{error}</div>
  if (!seriesData) return null

  const { details, aiInsights } = seriesData

  return (
    <div className="series-detail">
      <button className="back-button" onClick={onBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Back to Trending
      </button>
      
      <div className="detail-hero">
        {details.backdrop_path && (
          <img 
            className="backdrop-image"
            src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
            alt={details.name}
          />
        )}
        <div className="detail-overlay"></div>
        
        <div className="detail-content">
          <img 
            className="detail-poster"
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={details.name}
          />
          
          <div className="detail-info">
            <h1>{details.name}</h1>
            
            <div className="detail-meta">
              <div className="meta-item">
                ⭐ {details.vote_average.toFixed(1)}/10
              </div>
              <div className="meta-item">
                📅 {new Date(details.first_air_date).getFullYear()}
              </div>
              <div className="meta-item">
                📺 {details.number_of_seasons} Season{details.number_of_seasons > 1 ? 's' : ''}
              </div>
              <div className="meta-item">
                🎬 {details.number_of_episodes} Episodes
              </div>
            </div>
            
            <p className="detail-overview">{details.overview}</p>
            
            <div className="genre-tags">
              {details.genres.map(genre => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="analysis-section">
        <nav className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            🧠 WHY Insights
          </button>
          <button 
            className={`tab-button ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            📈 Emotion Timeline
          </button>
          <button 
            className={`tab-button ${activeTab === 'recommendations' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommendations')}
          >
            💡 Smart Recommendations
          </button>
        </nav>

        <div className="tab-content">
          {activeTab === 'insights' && (
            <ModernWhyInsights insights={aiInsights.whyInsights} />
          )}
          
          {activeTab === 'timeline' && (
            <ModernEmotionTimeline timeline={aiInsights.emotionTimeline} />
          )}
          
          {activeTab === 'recommendations' && (
            <ModernRecommendations 
              recommendations={recommendations}
              onSeriesClick={onBack}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ModernSeriesDetail