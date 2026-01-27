const Series = require('../models/Series')
const User = require('../models/User')
const nlpService = require('../services/nlpService')

const sampleSeries = [
  {
    title: "Stranger Things",
    description: "A group of kids in a small town uncover supernatural mysteries",
    genre: ["Sci-Fi", "Horror", "Drama"],
    year: 2016,
    platform: "Netflix",
    director: "The Duffer Brothers",
    cast: ["Winona Ryder", "David Harbour", "Millie Bobby Brown"],
    rating: 8.7,
    episodes: 34,
    reviews: [
      {
        rating: 5,
        text: "Amazing character development and nostalgic atmosphere. The kids' acting is phenomenal and the mystery keeps you hooked.",
        createdAt: new Date()
      },
      {
        rating: 4,
        text: "Great plot with supernatural elements. Some pacing issues in middle episodes but overall engaging story.",
        createdAt: new Date()
      }
    ]
  },
  {
    title: "The Crown",
    description: "Chronicles the reign of Queen Elizabeth II from the 1940s to modern times",
    genre: ["Drama", "Biography", "History"],
    year: 2016,
    platform: "Netflix",
    director: "Peter Morgan",
    cast: ["Claire Foy", "Matt Smith", "Vanessa Kirby"],
    rating: 8.6,
    episodes: 60,
    reviews: [
      {
        rating: 5,
        text: "Exceptional historical drama with brilliant acting and stunning cinematography.",
        createdAt: new Date()
      }
    ]
  }
]

const seedDatabase = async () => {
  try {
    // Check if test user exists
    const existingUser = await User.findOne({ email: 'test@test.com' })
    if (!existingUser) {
      const testUser = new User({
        name: 'Test User',
        email: 'test@test.com',
        password: '123456'
      })
      await testUser.save()
      console.log('Test user created: test@test.com / 123456')
    } else {
      console.log('Test user already exists')
    }
    
    // Only seed series if none exist
    const seriesCount = await Series.countDocuments()
    if (seriesCount === 0) {
      console.log('Seeding sample series...')
      for (const seriesData of sampleSeries) {
        const processedReviews = seriesData.reviews.map(review => {
          const analysis = nlpService.processReview(review.text, review.rating)
          return {
            ...review,
            sentiment: analysis.sentiment,
            topics: analysis.topics
          }
        })
        
        const insights = nlpService.generateWhyExplanation(processedReviews)
        
        const series = new Series({
          ...seriesData,
          reviews: processedReviews,
          insights: {
            whyLiked: insights.whyLiked,
            whyDisliked: insights.whyDisliked,
            audienceType: "General audience",
            emotionalJourney: ["Curiosity", "Engagement"],
            contentDNA: {
              pacing: "Moderate",
              complexity: "Medium",
              emotionalDepth: "High",
              narrativeStyle: "Character-driven"
            }
          }
        })
        
        await series.save()
      }
      console.log('Database seeded successfully')
    } else {
      console.log('Database already has series data, skipping seeding')
    }
  } catch (error) {
    console.error('Seeding error:', error)
  }
}

module.exports = { seedDatabase }