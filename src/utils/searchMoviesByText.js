export function searchMoviesByText(movies, text) {
  const result = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim()
    const movieEn = String(movie.nameEN).toLowerCase().trim()
    const userQuery = text.toLowerCase().trim()
    return movieRu.includes(userQuery) || movieEn.includes(userQuery)
  })
  return result
}
