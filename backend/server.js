const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/database')
const { seedDatabase } = require('./data/seedData')

dotenv.config()

const app = express()

// Connect to MongoDB
connectDB().then((connected) => {
  if (connected) {
    // Seed database with sample data
    seedDatabase()
  } else {
    console.log('Running without database - TMDB endpoints will still work')
  }
}).catch((error) => {
  console.warn('Database initialization failed:', error.message)
  console.log('Running without database - TMDB endpoints will still work')
})

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/series', require('./routes/series'))
app.use('/api/insights', require('./routes/insights'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Web Series Insight API is running' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})