# Web Series Insight - AI-Driven Audience Intelligence Platform

An AI-powered platform that explains WHY web series work, analyzes audience psychology, and provides explainable recommendations. This system bridges the gap between raw viewing data and human-understandable insights about what makes web series engaging.

## Project Overview

Web Series Insight is engineered to answer fundamental questions about audience engagement with streaming content. Instead of providing black-box recommendations, this platform generates explainable AI insights that help stakeholders understand:

- Why audiences connect with specific series
- What emotional journey viewers experience across episodes
- How different narrative elements influence viewer satisfaction
- Which series match viewer preferences and why

The platform processes audience reviews and series metadata to create a comprehensive intelligence system focused on interpretability and actionable insights.

## Features

### Core AI Capabilities
- **WHY-Based Insights**: AI explains why viewers liked or disliked series based on sentiment analysis
- **Emotion Timeline**: Visualize emotional journey across series episodes and seasons
- **Explainable Recommendations**: Clear reasoning provided for each series suggestion
- **Audience Psychology Analysis**: Understand viewer preferences, behavior patterns, and engagement factors

### Technical Features
- **TMDB Integration**: Real-time trending series data and metadata
- **NLP Processing**: Advanced sentiment analysis and topic extraction
- **Interactive Visualizations**: Charts, timelines, and data visualizations
- **Responsive Design**: Complete compatibility across all devices and screen sizes
- **Fast Review Metrics**: `totalReviews`, `averageRating`, `positiveReviewCount`, `neutralReviewCount`, `negativeReviewCount` are stored directly on series documents for efficient insight scoring
- **Auth Flow Added**: Full registration and login with JWT support plus protected dashboard access

## Tech Stack

### Backend
- **Node.js** + Express
- **MongoDB** for data storage
- **Natural.js** + **Compromise** for NLP
- **TMDB API** for series data
- **JWT** authentication
- **Login/Register endpoints**: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- **Fast series metrics**: `/api/series/stats` for aggregated review statistics

### Frontend  
- **React.js** with hooks
- **Chart.js** for visualizations
- **CSS Grid/Flexbox** for responsive design
- **Axios** for API calls

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB
- TMDB API Key (already included)

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Usage

### Accessing the Application
1. **Start the backend server**
   - The backend server initializes and begins listening for API requests
   - Database connections are established
   - API endpoints become available

2. **Start the frontend application**
   - The React frontend loads with interactive UI components
   - Real-time data connections are established
   - The dashboard becomes ready for user interaction

3. **Explore trending series**
   - View real-time trending web series data fetched from TMDB
   - Browse series by genre, rating, and popularity
   - Click on any series to access detailed AI-powered analysis

4. **Register & Login**
   - Go to `/register` and create a new account
   - Once registered, the app logs you in and redirects you to `/dashboard`
   - Use `/login` to sign in with existing credentials
   - Dashboard is protected; sign-out clears your token and returns you to guest mode

4. **Analyze series insights**
   - **WHY Insights**: Understand what resonates with audiences through sentiment analysis
   - **Emotion Timeline**: Observe the emotional progression across episodes
   - **Smart Recommendations**: Receive series suggestions with clear explanations for why they match your interests
   - **Audience Psychology**: Discover patterns in viewer behavior and preferences

## System Workflow

The Web Series Insight platform follows a comprehensive workflow to deliver explainable AI recommendations:

### 1. Data Collection Phase
- Platform fetches real-time series data from TMDB API
- Collects comprehensive series metadata (cast, genre, ratings, descriptions)
- Aggregates user reviews and ratings from multiple sources
- Stores all data in MongoDB for persistent access

### 2. NLP Processing Pipeline
- Reviews are processed through Natural.js for tokenization
- Compromise library handles linguistic analysis and entity recognition
- Text is cleaned, normalized, and prepared for sentiment analysis
- Stopwords are removed and relevant phrases are extracted

### 3. Sentiment Analysis Phase
- Each review is analyzed for emotional tone (positive, negative, neutral)
- Sentiment scores are calculated with confidence levels
- Topic-specific sentiments are extracted from reviews
- Aggregated sentiment profiles are created for each series

### 4. WHY Analysis Engine
- Review processing: NLP analyzes user reviews for key themes
- Sentiment aggregation: Positive and negative themes are extracted and grouped
- Topic modeling: Key discussion points and recurring themes are identified
- Explanation generation: Human-readable insights are created from structured data
- Reasoning chains are built to justify analysis conclusions

### 5. Emotion Timeline Generation
- Genre analysis: Series characteristics and expected emotional arcs are evaluated
- Episode progression: Emotional intensity is predicted across episodes
- Intensity mapping: Viewer engagement levels are determined per episode
- Visual representation: Interactive timeline charts are generated for display

### 6. Preference Analysis and Profiling
- User viewing history is analyzed to identify patterns
- Taste profiles are built based on series preferences
- Genre, cast, and theme preferences are extracted
- User engagement metrics are tracked and processed

### 7. Explainable Recommendation Engine
- Preference analysis: User taste profiles are compared against series characteristics
- Content matching: Series are ranked by alignment with user preferences
- Reasoning generation: Clear explanations are created for each recommendation
- Quality filtering: Results are validated and sorted by rating and relevance
- Final rankings provide series suggestions with full transparency

### 8. Visualization and Delivery
- Results are formatted for interactive display
- Charts and timelines are rendered for visual comprehension
- Explanations are presented in user-friendly language
- Real-time updates reflect new data and reviews

## Project Philosophy

This project focuses on explainable AI over black-box algorithms:

- **Reasoning-first approach**: All recommendations include transparent reasoning
- **Human-readable explanations**: Insights are presented in natural language
- **Insight over accuracy**: Interpretability is prioritized over raw metrics
- **Psychology-based analysis**: Decisions are grounded in audience psychology
- **Transparency**: No unexplained algorithmic decisions
- **Actionable insights**: Results should inform content creators and viewers

## AI Methodology

### WHY Analysis Engine
1. **Review Processing**: NLP analysis of user reviews
2. **Sentiment Aggregation**: Positive/negative theme extraction
3. **Topic Modeling**: Key discussion points identification
4. **Explanation Generation**: Human-readable insights

### Emotion Timeline Generation
1. **Genre Analysis**: Series characteristics evaluation
2. **Episode Progression**: Emotional arc prediction
3. **Intensity Mapping**: Viewer engagement levels
4. **Visual Representation**: Interactive timeline charts

### Explainable Recommendations
1. **Preference Analysis**: User taste profiling
2. **Content Matching**: Series characteristic alignment
3. **Reasoning Generation**: Clear explanation for each match
4. **Quality Filtering**: High-rated content prioritization

## Academic Context

**Purpose**: Final-year BTech Computer Science project
**Focus**: AI system design with explainability as a core requirement
**Goal**: Demonstrate a reasoning-first AI approach to recommendation systems
**Tools**: Free and open-source technologies only
**Domain**: Web series and audience psychology analysis

## Project Structure

```
web-series-insight/
├── backend/                 # Node.js Express API Server
│   ├── models/             # MongoDB data models
│   ├── routes/             # API endpoint definitions
│   ├── controllers/        # Business logic and request handlers
│   ├── middleware/         # Authentication and validation middleware
│   ├── nlp/               # NLP processing modules
│   ├── config/            # Configuration and environment setup
│   └── server.js          # Main backend entry point
│
├── frontend/               # React.js Application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page-level components
│   │   ├── services/      # API service layer
│   │   ├── utils/         # Utility functions
│   │   ├── styles/        # CSS and styling
│   │   └── App.jsx        # Main application component
│   └── package.json       # Frontend dependencies
│
├── docs/                   # Documentation and guides
├── package.json           # Root package configuration
└── README.md             # Project documentation
```

## Contributing

This is an academic project, but feedback and suggestions are welcome! Feel free to:
- Report issues or bugs
- Suggest improvements
- Contribute code enhancements
- Share insights about the explainable AI approach

---

**Built for understanding audience psychology through transparent, explainable AI**