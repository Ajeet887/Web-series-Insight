# 🎬 Web Series Insight - AI-Driven Audience Intelligence Platform

An AI-powered platform that explains **WHY** web series work, analyzes audience psychology, and provides explainable recommendations.

## 🚀 Features

### Core AI Capabilities
- **🧠 WHY-Based Insights**: AI explains why viewers liked/disliked series
- **📈 Emotion Timeline**: Visualize emotional journey across episodes  
- **💡 Explainable Recommendations**: Clear reasoning for each suggestion
- **🎭 Audience Psychology Analysis**: Understand viewer preferences and behavior

### Technical Features
- **TMDB Integration**: Real-time trending series data
- **NLP Processing**: Sentiment analysis and topic extraction
- **Interactive Visualizations**: Charts and emotion timelines
- **Responsive Design**: Works on all devices

## 🛠️ Tech Stack

### Backend
- **Node.js** + Express
- **MongoDB** for data storage
- **Natural.js** + **Compromise** for NLP
- **TMDB API** for series data
- **JWT** authentication

### Frontend  
- **React.js** with hooks
- **Chart.js** for visualizations
- **CSS Grid/Flexbox** for responsive design
- **Axios** for API calls

## 📦 Installation

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

## 🎯 Usage

1. **Start the application**
   - Backend runs on `http://localhost:5000`
   - Frontend runs on `http://localhost:5173`

2. **Explore trending series**
   - View real-time trending web series from TMDB
   - Click any series for detailed AI analysis

3. **Analyze series insights**
   - **WHY Insights**: Understand audience reactions
   - **Emotion Timeline**: See emotional journey across episodes
   - **Smart Recommendations**: Get explainable suggestions

## 🔧 Configuration

### Environment Variables (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/web-series-insight
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
TMDB_API_KEY=bbabcf48554b6ea1db535ac251d52e58
```

## 🎨 Project Philosophy

This project focuses on **explainable AI** over black-box algorithms:

- ✅ **Reasoning-first approach**
- ✅ **Human-readable explanations** 
- ✅ **Insight over accuracy**
- ✅ **Psychology-based analysis**
- ❌ **No "because you watched X" recommendations**
- ❌ **No unexplained algorithmic suggestions**

## 📊 AI Methodology

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

## 🎓 Academic Context

**Purpose**: Final-year BTech Computer Science project
**Focus**: AI system design with explainability
**Goal**: Demonstrate reasoning-first AI approach
**Constraint**: Free and open-source tools only

## 🚀 Deployment

### GitHub Repository Setup
1. Create a new repository on GitHub.
2. Initialize git if not already done: `git init`.
3. Add files: `git add .`.
4. Commit: `git commit -m "Initial commit"`.
5. Add remote: `git remote add origin <your-repo-url>`.
6. Push: `git push -u origin main`.

### Environment Variables
Ensure you set the following environment variables on your deployment platform (e.g., Render, Railway, Vercel):

**Backend:**
- `MONGODB_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A secure secret for tokens.
- `TMDB_API_KEY`: Your TMDB API key.
- `PORT`: Usually 10000 or 5000 (provided by the platform).

**Frontend:**
- `VITE_API_URL`: The full URL of your deployed backend (e.g., `https://your-api.onrender.com/api`).

### CI/CD
A GitHub Actions workflow is included in `.github/workflows/ci.yml` that automatically builds the frontend and checks the backend on every push.

## 📝 License

This project is for educational purposes as part of academic evaluation.

## 🤝 Contributing

This is an academic project, but feedback and suggestions are welcome!

---

**Built with ❤️ for understanding audience psychology through AI**