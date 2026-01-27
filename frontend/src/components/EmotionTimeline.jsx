import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EmotionTimeline = ({ timeline }) => {
  const getEmotionColor = (emotion) => {
    const colors = {
      curiosity: '#3b82f6',
      anxiety: '#ef4444', 
      excitement: '#f59e0b',
      sadness: '#6366f1',
      shock: '#ec4899',
      satisfaction: '#10b981',
      anger: '#dc2626'
    }
    return colors[emotion] || '#6b7280'
  }

  const getEmotionIcon = (emotion) => {
    const icons = {
      curiosity: '🤔',
      anxiety: '😰',
      excitement: '🤩',
      sadness: '😢',
      shock: '😱',
      satisfaction: '😌',
      anger: '😠'
    }
    return icons[emotion] || '😐'
  }

  if (!timeline || timeline.length === 0) {
    return (
      <div className="emotion-timeline">
        <h3>📈 Emotional Journey Through Episodes</h3>
        <p>No emotion timeline data available.</p>
      </div>
    )
  }

  const data = {
    labels: timeline.map(point => `E${point.episode}`),
    datasets: [
      {
        label: 'Emotional Intensity',
        data: timeline.map(point => point.intensity),
        borderColor: 'rgba(1, 180, 228, 1)',
        backgroundColor: 'rgba(1, 180, 228, 0.2)',
        pointBackgroundColor: timeline.map(point => getEmotionColor(point.primaryEmotion)),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: timeline.map(point => getEmotionColor(point.primaryEmotion)),
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const point = timeline[context.dataIndex];
            return `${point.primaryEmotion}: ${point.description}`;
          }
        }
      }
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
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#a0aec0',
        }
      }
    }
  };

  return (
    <div className="emotion-timeline">
      <h3>📈 Emotional Journey Through Episodes</h3>
      <p className="timeline-description">
        This chart shows how the emotional intensity changes throughout the series, 
        helping you understand the viewing experience.
      </p>
      
      <div className="timeline-container" style={{ height: '400px' }}>
        <Line data={data} options={options} />
      </div>
      
      <div className="episode-details">
        <h4>Episode Breakdown:</h4>
        <div className="episode-grid">
          {timeline.map((point) => (
            <div key={point.episode} className="episode-card">
              <div className="episode-header">
                <span className="episode-number">Episode {point.episode}</span>
                <span className="emotion-icon">{getEmotionIcon(point.primaryEmotion)}</span>
              </div>
              <div className="emotion-info">
                <span 
                  className="emotion-name"
                  style={{ color: getEmotionColor(point.primaryEmotion) }}
                >
                  {point.primaryEmotion}
                </span>
                <div className="intensity-bar">
                  <div 
                    className="intensity-fill"
                    style={{ 
                      width: `${point.intensity * 100}%`,
                      backgroundColor: getEmotionColor(point.primaryEmotion)
                    }}
                  />
                </div>
              </div>
              <p className="episode-description">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="emotion-legend">
        <h4>Emotion Guide:</h4>
        <div className="legend-grid">
          {Object.keys(getEmotionColor()).map(emotion => (
            <div key={emotion} className="legend-item">
              <span 
                className="legend-color"
                style={{ backgroundColor: getEmotionColor(emotion) }}
              />
              <span className="legend-icon">{getEmotionIcon(emotion)}</span>
              <span className="legend-text">{emotion}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmotionTimeline;