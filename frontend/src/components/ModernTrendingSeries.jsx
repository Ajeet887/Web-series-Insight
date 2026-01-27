import { useState, useEffect } from 'react'
import { seriesAPI } from '../services/api'

const ModernTrendingSeries = ({ onSeriesClick }) => {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTrendingSeries()
  }, [])

  const fetchTrendingSeries = async () => {
    try {
      setLoading(true)
      const response = await seriesAPI.getTrending()
      setSeries(response.data)
    } catch (err) {
      setError('Failed to fetch trending series')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getGenreName = (id) => {
    const genres = {
      10759: 'Action', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
      99: 'Documentary', 18: 'Drama', 10751: 'Family', 10762: 'Kids',
      9648: 'Mystery', 10763: 'News', 10764: 'Reality', 10765: 'Sci-Fi',
      10766: 'Soap', 10767: 'Talk', 10768: 'War', 37: 'Western'
    }
    return genres[id] || 'Unknown'
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Discovering trending series...</p>
      </div>
    )
  }

  if (error) return <div className="error">{error}</div>

  return (
    <section className="trending-section">
      <div className="section-header">
        <h2 className="section-title">🔥 Trending Now</h2>
        <div className="trend-indicator">
          <span className="pulse-dot"></span>
          Live Data
        </div>
      </div>
      
      <div className="trending-grid">
        {series.map((show, index) => (
          <div 
            key={show.id} 
            className="series-card"
            onClick={() => onSeriesClick(show.id)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="poster-container">
              {show.poster_path ? (
                <img 
                  className="series-poster"
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  loading="lazy"
                />
              ) : (
                <div className="no-poster">
                  <span>🎬</span>
                  <p>No Image</p>
                </div>
              )}
              
              <div className="rating-badge">
                ⭐ {show.vote_average.toFixed(1)}
              </div>
              
              <div className="play-overlay">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            
            <div className="series-info">
              <h3 className="series-title">{show.name}</h3>
              
              <div className="series-meta">
                <span className="year">{new Date(show.first_air_date).getFullYear()}</span>
                <span className="popularity">👥 {Math.round(show.popularity)}</span>
              </div>
              
              <p className="series-overview">
                {show.overview.substring(0, 120)}...
              </p>
              
              <div className="genre-tags">
                {show.genre_ids.slice(0, 2).map(genreId => (
                  <span key={genreId} className="genre-tag">
                    {getGenreName(genreId)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ModernTrendingSeries