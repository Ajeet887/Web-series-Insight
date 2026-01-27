const mongoose = require('mongoose')

const seriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  genre: [String],
  year: Number,
  platform: String,
  director: String,
  cast: [String],
  rating: Number,
  episodes: Number,
  reviews: [{
    userId: mongoose.Schema.Types.ObjectId,
    rating: Number,
    text: String,
    sentiment: {
      positive: Number,
      negative: Number,
      neutral: Number
    },
    topics: [String],
    createdAt: Date
  }],
  insights: {
    whyLiked: [String],
    whyDisliked: [String],
    audienceType: String,
    emotionalJourney: [String],
    contentDNA: {
      pacing: String,
      complexity: String,
      emotionalDepth: String,
      narrativeStyle: String
    }
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Series', seriesSchema)