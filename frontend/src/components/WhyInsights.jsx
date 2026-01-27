import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const WhyInsights = ({ insights }) => {
  if (!insights) {
    return <div className="loading">Generating insights...</div>
  }

  const { whyLiked, whyDisliked, overallSentiment, keyThemes, audienceProfile } = insights

  const sentimentData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [overallSentiment.positive, overallSentiment.neutral, overallSentiment.negative],
        backgroundColor: ['#22c55e', '#64748b', '#ef4444'],
        borderColor: ['#1c3d5c', '#1c3d5c', '#1c3d5c'],
        borderWidth: 1,
      },
    ],
  };

  const sentimentOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#a0aec0'
        }
      },
    },
  };

  const themesData = {
    labels: keyThemes.map(theme => theme.topic),
    datasets: [
      {
        label: 'Mentions',
        data: keyThemes.map(theme => theme.frequency),
        backgroundColor: 'rgba(1, 180, 228, 0.6)',
        borderColor: 'rgba(1, 180, 228, 1)',
        borderWidth: 1,
      },
    ],
  };

  const themesOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#a0aec0',
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#a0aec0',
        }
      }
    }
  };

  return (
    <div className="why-insights">
      <h3>🧠 AI-Powered WHY Analysis</h3>
      <p className="insights-description">
        Our AI analyzes reviews and metadata to explain the psychology behind audience reactions.
      </p>

      <div className="insights-grid">
        {/* Why Liked Section */}
        <div className="insight-card positive">
          <div className="insight-header">
            <h4>👍 Why Viewers Loved It</h4>
            <div className="sentiment-score positive">
              {(overallSentiment.positive * 100).toFixed(0)}% Positive
            </div>
          </div>
          <div className="insight-content">
            {whyLiked && whyLiked.length > 0 ? (
              <ul className="reason-list">
                {whyLiked.map((reason, index) => (
                  <li key={index} className="reason-item">
                    <span className="reason-icon">✨</span>
                    {reason}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">Not enough positive reviews to analyze</p>
            )}
          </div>
        </div>

        {/* Why Disliked Section */}
        <div className="insight-card negative">
          <div className="insight-header">
            <h4>👎 Areas of Concern</h4>
            <div className="sentiment-score negative">
              {(overallSentiment.negative * 100).toFixed(0)}% Negative
            </div>
          </div>
          <div className="insight-content">
            {whyDisliked && whyDisliked.length > 0 ? (
              <ul className="reason-list">
                {whyDisliked.map((reason, index) => (
                  <li key={index} className="reason-item">
                    <span className="reason-icon">⚠️</span>
                    {reason}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-data">Not enough negative reviews to analyze</p>
            )}
          </div>
        </div>
      </div>

      {/* Overall Sentiment Visualization */}
      <div className="sentiment-overview">
        <h4>📊 Overall Audience Sentiment</h4>
        <div style={{ height: '300px' }}>
          <Doughnut data={sentimentData} options={sentimentOptions} />
        </div>
      </div>

      {/* Key Themes */}
      {keyThemes && keyThemes.length > 0 && (
        <div className="key-themes">
          <h4>🔑 Most Discussed Themes</h4>
          <div style={{ height: '400px' }}>
            <Bar data={themesData} options={themesOptions} />
          </div>
        </div>
      )}

      {/* Audience Profile */}
      {audienceProfile && (
        <div className="audience-profile">
          <h4>👥 Audience Profile</h4>
          <div className="profile-grid">
            <div className="profile-item">
              <span className="profile-label">Primary Demographic:</span>
              <span className="profile-value">{audienceProfile.primaryDemographic}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Engagement Level:</span>
              <span className="profile-value">{audienceProfile.engagementLevel}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Emotional Response:</span>
              <span className="profile-value">{audienceProfile.emotionalResponse}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Recommended For:</span>
              <span className="profile-value">{audienceProfile.recommendedFor}</span>
            </div>
          </div>
        </div>
      )}

      <div className="insights-footer">
        <p className="disclaimer">
          💡 <strong>AI Insight:</strong> These explanations are generated by analyzing 
          review patterns, sentiment, and content metadata. They provide directional 
          insights into audience psychology rather than definitive conclusions.
        </p>
      </div>
    </div>
  )
}

export default WhyInsights