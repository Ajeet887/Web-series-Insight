const ModernWhyInsights = ({ insights }) => {
  if (!insights) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Generating AI insights...</p>
      </div>
    )
  }

  const { whyLiked, whyDisliked, overallSentiment, keyThemes, audienceProfile } = insights

  return (
    <div className="why-insights">
      <div className="insights-header">
        <h3>🧠 AI-Powered WHY Analysis</h3>
        <p className="insights-description">
          Our AI analyzes reviews, metadata, and audience behavior to explain the psychology 
          behind viewer reactions. This isn't just sentiment analysis—it's insight into human nature.
        </p>
      </div>

      <div className="insights-grid">
        <div className="insight-card positive">
          <div className="insight-header">
            <h4>👍 Why Viewers Loved It</h4>
            <div className="sentiment-badge positive">
              {(overallSentiment.positive * 100).toFixed(0)}% Positive
            </div>
          </div>
          <div className="insight-content">
            {whyLiked && whyLiked.length > 0 ? (
              <ul className="reason-list">
                {whyLiked.map((reason, index) => (
                  <li key={index} className="reason-item">
                    <span className="reason-icon">✨</span>
                    <span className="reason-text">{reason}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-data">
                <span className="no-data-icon">📊</span>
                <p>Insufficient positive feedback data for analysis</p>
              </div>
            )}
          </div>
        </div>

        <div className="insight-card negative">
          <div className="insight-header">
            <h4>👎 Areas of Concern</h4>
            <div className="sentiment-badge negative">
              {(overallSentiment.negative * 100).toFixed(0)}% Negative
            </div>
          </div>
          <div className="insight-content">
            {whyDisliked && whyDisliked.length > 0 ? (
              <ul className="reason-list">
                {whyDisliked.map((reason, index) => (
                  <li key={index} className="reason-item">
                    <span className="reason-icon">⚠️</span>
                    <span className="reason-text">{reason}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-data">
                <span className="no-data-icon">📊</span>
                <p>Insufficient negative feedback data for analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sentiment-overview">
        <h4>📊 Audience Sentiment Distribution</h4>
        <div className="sentiment-bar">
          <div 
            className="sentiment-segment positive"
            style={{ width: `${overallSentiment.positive * 100}%` }}
          >
            <span className="sentiment-label">
              Positive {(overallSentiment.positive * 100).toFixed(0)}%
            </span>
          </div>
          <div 
            className="sentiment-segment neutral"
            style={{ width: `${overallSentiment.neutral * 100}%` }}
          >
            <span className="sentiment-label">
              Neutral {(overallSentiment.neutral * 100).toFixed(0)}%
            </span>
          </div>
          <div 
            className="sentiment-segment negative"
            style={{ width: `${overallSentiment.negative * 100}%` }}
          >
            <span className="sentiment-label">
              Negative {(overallSentiment.negative * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      {keyThemes && keyThemes.length > 0 && (
        <div className="key-themes">
          <h4>🔑 Most Discussed Themes</h4>
          <div className="themes-grid">
            {keyThemes.map((theme, index) => (
              <div key={index} className="theme-item">
                <div className="theme-info">
                  <span className="theme-name">{theme.topic}</span>
                  <span className="theme-count">{theme.frequency} mentions</span>
                </div>
                <div className="theme-bar">
                  <div 
                    className="theme-fill"
                    style={{ width: `${(theme.frequency / keyThemes[0].frequency) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {audienceProfile && (
        <div className="audience-profile">
          <h4>👥 Audience Psychology Profile</h4>
          <div className="profile-grid">
            <div className="profile-card">
              <div className="profile-icon">🎯</div>
              <div className="profile-content">
                <h5>Primary Demographic</h5>
                <p>{audienceProfile.primaryDemographic}</p>
              </div>
            </div>
            <div className="profile-card">
              <div className="profile-icon">⚡</div>
              <div className="profile-content">
                <h5>Engagement Level</h5>
                <p>{audienceProfile.engagementLevel}</p>
              </div>
            </div>
            <div className="profile-card">
              <div className="profile-icon">💭</div>
              <div className="profile-content">
                <h5>Emotional Response</h5>
                <p>{audienceProfile.emotionalResponse}</p>
              </div>
            </div>
            <div className="profile-card">
              <div className="profile-icon">🎭</div>
              <div className="profile-content">
                <h5>Recommended For</h5>
                <p>{audienceProfile.recommendedFor}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="insights-footer">
        <div className="ai-disclaimer">
          <div className="disclaimer-icon">🤖</div>
          <div className="disclaimer-content">
            <h5>AI Methodology</h5>
            <p>
              These insights are generated through advanced NLP analysis of review patterns, 
              sentiment clustering, and behavioral psychology models. They provide directional 
              understanding of audience psychology rather than definitive conclusions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModernWhyInsights