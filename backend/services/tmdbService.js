const axios = require('axios')

class TMDBService {
  constructor() {
    this.apiKey = process.env.TMDB_API_KEY || 'bbabcf48554b6ea1db535ac251d52e58'
    this.baseURL = 'https://api.themoviedb.org/3'
  }

  // Get trending TV series
  async getTrendingTVSeries() {
    try {
      const response = await axios.get(`${this.baseURL}/trending/tv/week`, {
        params: { api_key: this.apiKey }
      })
      return response.data.results
    } catch (error) {
      console.error('Error fetching trending series:', error)
      throw error
    }
  }

  // Get TV series details
  async getTVSeriesDetails(seriesId) {
    try {
      // Make requests individually to handle failures gracefully
      let details = null
      let credits = null
      let reviews = null

      try {
        const detailsResponse = await axios.get(`${this.baseURL}/tv/${seriesId}`, {
          params: { api_key: this.apiKey }
        })
        details = detailsResponse.data
      } catch (error) {
        console.error('Error fetching series details:', error.message)
        throw new Error(`Failed to fetch series details: ${error.message}`)
      }

      try {
        const creditsResponse = await axios.get(`${this.baseURL}/tv/${seriesId}/credits`, {
          params: { api_key: this.apiKey }
        })
        credits = creditsResponse.data
      } catch (error) {
        console.warn('Error fetching credits, continuing without:', error.message)
        credits = { cast: [], crew: [] }
      }

      try {
        const reviewsResponse = await axios.get(`${this.baseURL}/tv/${seriesId}/reviews`, {
          params: { api_key: this.apiKey }
        })
        reviews = reviewsResponse.data.results
      } catch (error) {
        console.warn('Error fetching reviews, continuing without:', error.message)
        reviews = []
      }

      return {
        details,
        credits,
        reviews
      }
    } catch (error) {
      console.error('Error in getTVSeriesDetails:', error)
      throw error
    }
  }

  // Get similar series
  async getSimilarSeries(seriesId) {
    try {
      const response = await axios.get(`${this.baseURL}/tv/${seriesId}/similar`, {
        params: { api_key: this.apiKey }
      })
      return response.data.results
    } catch (error) {
      console.error('Error fetching similar series:', error)
      throw error
    }
  }

  // Search TV series
  async searchTVSeries(query) {
    try {
      const response = await axios.get(`${this.baseURL}/search/tv`, {
        params: { 
          api_key: this.apiKey,
          query: query
        }
      })
      return response.data.results
    } catch (error) {
      console.error('Error searching series:', error)
      throw error
    }
  }
}

module.exports = new TMDBService()