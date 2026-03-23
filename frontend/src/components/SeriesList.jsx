import { useState, useEffect } from 'react'
import api from '../services/api'

const SeriesList = () => {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchSeries()
  }, [])

  const fetchSeries = async () => {
    try {
      const response = await api.get('/series')
      setSeries(response.data)
    } catch (err) {
      setError('Failed to load series')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading series...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>

  return (
    <div>
      <h2>Available Series</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {series.map(s => (
          <div key={s._id} className="card">
            <h3>{s.title}</h3>
            <p><strong>Genre:</strong> {s.genre.join(', ')}</p>
            <p><strong>Year:</strong> {s.releaseYear}</p>
            <p><strong>IMDB:</strong> {s.rating?.imdb || 'N/A'}</p>
            <p><strong>Total Reviews:</strong> {s.totalReviews || 0}</p>
            <p><strong>Avg Rating:</strong> {s.averageRating ? s.averageRating.toFixed(1) : 'N/A'}</p>
            <p><strong>Positive:</strong> {s.positiveReviewCount || 0}, Neutral: {s.neutralReviewCount||0}, Negative: {s.negativeReviewCount||0}</p>
            <p>{s.description}</p>
            
            {s.insights && (
              <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>
                <strong>Why People Like It:</strong>
                <ul>
                  {s.insights.whyLiked?.map((reason, i) => (
                    <li key={i}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SeriesList