const RecommendationsList = ({ recommendations, onSeriesClick }) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="recommendations-empty">
        <h3>💡 Smart Recommendations</h3>
        <p>No recommendations available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="recommendations-list">
      <h3>💡 Explainable Recommendations</h3>
      <p className="recommendations-description">
        These recommendations are based on your viewing preferences and explain 
        <strong> why</strong> each series matches your taste.
      </p>

      <div className="recommendations-grid">
        {recommendations.map((rec, index) => (
          <div 
            key={rec.series.id} 
            className="recommendation-card"
            onClick={() => onSeriesClick(rec.series.id)}
          >
            <div className="rec-rank">#{index + 1}</div>
            
            <div className="rec-poster">
              {rec.series.poster_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w200${rec.series.poster_path}`}
                  alt={rec.series.name || rec.series.title}
                />
              ) : (
                <div className="no-poster-rec">No Image</div>
              )}
            </div>
            
            <div className="rec-content">
              <h4 className="rec-title">{rec.series.name || rec.series.title}</h4>
              
              <div className="rec-meta">
                <span className="rec-rating">⭐ {rec.series.vote_average?.toFixed(1)}</span>
                <span className="match-score">
                  {(rec.matchScore * 100).toFixed(0)}% Match
                </span>
              </div>
              
              <div className="match-bar">
                <div 
                  className="match-fill"
                  style={{ width: `${rec.matchScore * 100}%` }}
                />
              </div>
              
              <div className="rec-explanation">
                <h5>🎯 Why This Matches You:</h5>
                <p>{rec.explanation}</p>
              </div>
              
              <div className="rec-overview">
                <p>{(rec.series.overview || '').substring(0, 150)}...</p>
              </div>
              
              <div className="rec-genres">
                {rec.series.genres?.slice(0, 2).map(genre => (
                  <span key={genre.id} className="rec-genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="recommendation-methodology">
        <h4>🔬 How We Generate Recommendations</h4>
        <div className="methodology-grid">
          <div className="method-item">
            <span className="method-icon">🎭</span>
            <div className="method-content">
              <h5>Genre Preference Analysis</h5>
              <p>We analyze your viewing history to understand your preferred genres and themes.</p>
            </div>
          </div>
          
          <div className="method-item">
            <span className="method-icon">💭</span>
            <div className="method-content">
              <h5>Emotional Profile Matching</h5>
              <p>We match content based on the emotional journey you prefer in storytelling.</p>
            </div>
          </div>
          
          <div className="method-item">
            <span className="method-icon">📊</span>
            <div className="method-content">
              <h5>Quality & Rating Consideration</h5>
              <p>We factor in critical acclaim and audience ratings to ensure quality recommendations.</p>
            </div>
          </div>
          
          <div className="method-item">
            <span className="method-icon">🎯</span>
            <div className="method-content">
              <h5>Explainable AI</h5>
              <p>Every recommendation comes with clear reasoning, not just "because you watched X".</p>
            </div>
          </div>
        </div>
      </div>

      <div className="recommendation-footer">
        <p className="rec-disclaimer">
          🤖 <strong>AI-Powered:</strong> Our recommendation engine focuses on explainability 
          over black-box algorithms. Each suggestion includes reasoning to help you make 
          informed viewing decisions.
        </p>
      </div>
    </div>
  )
}

export default RecommendationsList