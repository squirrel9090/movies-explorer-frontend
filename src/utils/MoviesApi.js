export const BASE_URL = 'https://api.nomoreparties.co'

const handleResponce = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(res.status)
}

export const getAllMovies = () => {
  return fetch(`${BASE_URL}/beatfilm-movies`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(handleResponce)
}
