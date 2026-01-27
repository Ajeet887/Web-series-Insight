import { useState, useEffect } from 'react'
import { seriesAPI } from '../services/api'

const TrendingSeries = ({ onSeriesClick }) => {
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

  if (loading) return <div className="loading">Loading trending series...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="trending-series">
      <h2>🔥 Trending Web Series</h2>
      <div className="series-grid">
        {series.map((show) => (
          <div 
            key={show.id} 
            className="series-card"
            onClick={() => onSeriesClick(show.id)}
          >
            <div className="series-poster">
              {show.poster_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w300${show.poster_path}`}
                  alt={show.name}
                />
              ) : (
                <div className="no-poster">No Image</div>
              )}
            </div>
            <div className="series-info">
              <h3>{show.name}</h3>
              <div className="series-meta">
                <span className="rating">⭐ {show.vote_average.toFixed(1)}</span>
                <span className="year">{new Date(show.first_air_date).getFullYear()}</span>
              </div>
              <p className="overview">{show.overview.substring(0, 120)}...</p>
              <div className="genres">
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
    </div>
  )
}

// Helper function to map genre IDs to names
const getGenreName = (id) => {
  const genres = {
    10759: 'Action',
    16: 'Animation', 
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    10762: 'Kids',
    9648: 'Mystery',
    10763: 'News',
    10764: 'Reality',
    10765: 'Sci-Fi',
    10766: 'Soap',
    10767: 'Talk',
    10768: 'War',
    37: 'Western'
  }
  return genres[id] || 'Unknown'
}

export default TrendingSeries