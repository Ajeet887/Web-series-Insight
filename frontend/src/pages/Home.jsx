import useScrollAnimation from '../hooks/useScrollAnimation';
import './Home.css';

const Home = () => {
  const addToRefs = useScrollAnimation();

  return (
    <div className="home-page">
      <section className="home-hero">
        <h1>Web Series Insight</h1>
        <p>AI-Driven Audience Intelligence Platform</p>
        <p>
          Discover why web series work, understand audience psychology, 
          and get explainable insights beyond simple ratings and recommendations.
        </p>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card animate-on-scroll" ref={addToRefs}>
            <h3>WHY-Based Insights</h3>
            <p>Understand why audiences love or hate specific series through AI analysis of reviews and emotions.</p>
          </div>
          
          <div className="feature-card animate-on-scroll" ref={addToRefs}>
            <h3>Explainable Recommendations</h3>
            <p>Get recommendations with clear explanations based on your viewing preferences and personality.</p>
          </div>
          
          <div className="feature-card animate-on-scroll" ref={addToRefs}>
            <h3>Emotion Timeline</h3>
            <p>Visualize the emotional journey of series episodes to choose content based on mood.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home