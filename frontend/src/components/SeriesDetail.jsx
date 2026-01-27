import { useState, useEffect } from 'react'
import { seriesAPI } from '../services/api'
import EmotionTimeline from './EmotionTimeline'
import WhyInsights from './WhyInsights'
import RecommendationsList from './RecommendationsList'

const SeriesDetail = ({ seriesId, onBack }) => {
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

  if (loading) return <div className="loading">Analyzing series...</div>
  if (error) return <div className="error">{error}</div>
  if (!seriesData) return null

  const { details, aiInsights } = seriesData

  return (
    <div className="series-detail">
      <button className="back-button" onClick={onBack}>
        ← Back to Trending
      </button>
      
      <div className="series-header">
        <div className="series-poster-large">
          {details.poster_path ? (
            <img 
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              alt={details.name}
            />
          ) : (
            <div className="no-poster-large">No Image</div>
          )}
        </div>
        
        <div className="series-info-large">
          <h1>{details.name}</h1>
          <div className="series-meta-large">
            <span className="rating">⭐ {details.vote_average.toFixed(1)}/10</span>
            <span className="year">{new Date(details.first_air_date).getFullYear()}</span>
            <span className="seasons">{details.number_of_seasons} Season{details.number_of_seasons > 1 ? 's' : ''}</span>
            <span className="episodes">{details.number_of_episodes} Episodes</span>
          </div>
          
          <div className="genres-large">
            {details.genres.map(genre => (
              <span key={genre.id} className="genre-tag-large">{genre.name}</span>
            ))}
          </div>
          
          <p className="overview-large">{details.overview}</p>
          
          <div className="networks">
            <strong>Network:</strong> 
            {details.networks.map(network => network.name).join(', ')}
          </div>
        </div>
      </div>

      <div className="analysis-tabs">
        <button 
          className={`tab ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          🧠 WHY Insights
        </button>
        <button 
          className={`tab ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          📈 Emotion Timeline
        </button>
        <button 
          className={`tab ${activeTab === 'recommendations' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommendations')}
        >
          💡 Smart Recommendations
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'insights' && (
          <WhyInsights insights={aiInsights.whyInsights} />
        )}
        
        {activeTab === 'timeline' && (
          <EmotionTimeline timeline={aiInsights.emotionTimeline} />
        )}
        
        {activeTab === 'recommendations' && (
          <RecommendationsList 
            recommendations={recommendations}
            onSeriesClick={(id) => window.location.reload()}
          />
        )}
      </div>
    </div>
  )
}

export default SeriesDetail