const express = require('express')
const Series = require('../models/Series')
const auth = require('../middleware/auth')
const tmdbService = require('../services/tmdbService')
const aiInsightService = require('../services/aiInsightService')
const nlpService = require('../services/nlpService')

const router = express.Router()

// Get trending series from TMDB
router.get('/trending', async (req, res) => {
  try {
    const trendingSeries = await tmdbService.getTrendingTVSeries()
    res.json(trendingSeries)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get series details with AI insights
router.get('/:id/details', async (req, res) => {
  try {
    const seriesData = await tmdbService.getTVSeriesDetails(req.params.id)
    
    // Generate AI insights with error handling
    let aiInsights = {
      whyInsights: {
        whyLiked: ['AI analysis in progress...'],
        whyDisliked: ['AI analysis in progress...'],
        overallSentiment: { positive: 0, neutral: 1, negative: 0 },
        keyThemes: [],
        audienceProfile: {
          primaryDemographic: 'General audience',
          engagementLevel: 'Unknown',
          emotionalResponse: 'Mixed',
          recommendedFor: 'General viewers'
        }
      },
      emotionTimeline: []
    }

    try {
      const whyInsights = aiInsightService.generateWhyInsights(
        seriesData.reviews, 
        seriesData.details
      )
      
      const emotionTimeline = aiInsightService.generateEmotionTimeline(
        seriesData.details, 
        seriesData.reviews
      )
      
      aiInsights = {
        whyInsights,
        emotionTimeline
      }
    } catch (aiError) {
      console.warn('AI insight generation failed, using defaults:', aiError.message)
      // aiInsights already has default values
    }
    
    res.json({
      ...seriesData,
      aiInsights
    })
  } catch (error) {
    console.error('Error in series details:', error)
    res.status(500).json({ 
      message: 'Failed to fetch series details',
      error: error.message 
    })
  }
})

// Get recommendations for a series
router.get('/:id/recommendations', async (req, res) => {
  try {
    const seriesData = await tmdbService.getTVSeriesDetails(req.params.id)
    const similarSeries = await tmdbService.getSimilarSeries(req.params.id)
    
    // Generate explainable recommendations
    const userProfile = { /* Mock user profile */ }
    const recommendations = aiInsightService.generateExplainableRecommendations(
      userProfile,
      seriesData.details,
      similarSeries
    )
    
    res.json(recommendations)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Search series
router.get('/search/:query', async (req, res) => {
  try {
    const results = await tmdbService.searchTVSeries(req.params.query)
    res.json(results)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get all series (legacy)
router.get('/', async (req, res) => {
  try {
    const series = await Series.find().select('-reviews')
    res.json(series)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single series with full details (legacy)
router.get('/local/:id', async (req, res) => {
  try {
    const series = await Series.findById(req.params.id)
    if (!series) {
      return res.status(404).json({ message: 'Series not found' })
    }
    res.json(series)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Add review to series (legacy)
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, text } = req.body
    const series = await Series.findById(req.params.id)
    
    if (!series) {
      return res.status(404).json({ message: 'Series not found' })
    }

    // Process review with NLP
    const analysis = nlpService.processReview(text, rating)
    
    const review = {
      userId: req.user._id,
      rating,
      text,
      sentiment: analysis.sentiment,
      topics: analysis.topics,
      createdAt: new Date()
    }

    series.reviews.push(review)
    
    // Regenerate insights with new review
    const insights = nlpService.generateWhyExplanation(series.reviews)
    series.insights.whyLiked = insights.whyLiked
    series.insights.whyDisliked = insights.whyDisliked
    
    await series.save()

    res.status(201).json({ message: 'Review added successfully', analysis })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router