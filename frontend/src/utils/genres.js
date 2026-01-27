// Helper function to map genre IDs to names
export const getGenreName = (id) => {
  const genres = {
    10759: 'Action',
    16: 'Animation', 
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    10762: 'Kids',
    9648: 'Mystery',
    10763: 'News',
    10764: 'Reality',
    10765: 'Sci-Fi',
    10766: 'Soap',
    10767: 'Talk',
    10768: 'War',
    37: 'Western'
  }
  return genres[id] || 'Unknown'
}
