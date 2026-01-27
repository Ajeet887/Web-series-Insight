const express = require('express')
const Series = require('../models/Series')
const auth = require('../middleware/auth')

const router = express.Router()

// Get insights for a series
router.get('/series/:id', async (req, res) => {
  try {
    const series = await Series.findById(req.params.id).select('insights title')
    if (!series) {
      return res.status(404).json({ message: 'Series not found' })
    }

    res.json({
      title: series.title,
      insights: series.insights
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Get personalized recommendations
router.get('/recommendations', auth, async (req, res) => {
  try {
    // Placeholder for recommendation logic
    const recommendations = [
      {
        seriesId: '507f1f77bcf86cd799439011',
        title: 'Sample Series',
        reason: 'Based on your preference for psychological thrillers with complex narratives'
      }
    ]

    res.json(recommendations)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router