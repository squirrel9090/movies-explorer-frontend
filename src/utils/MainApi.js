//const BASE_URL = 'https://api.bem.nomoredomains.xyz'
export const BASE_URL = 'http://localhost:3000'
const MOVIES_API_URL = 'https://api.nomoreparties.co'

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: '',
}

const getJson = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(res.status)
}

export const setToken = (token) => {
  headers.Authorization = `Bearer ${token}`
}

export const register = (data) => {
  return fetch(`${BASE_URL}${'/signup'}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => getResponse(res))
}

export const login = (data) => {
  const token = localStorage.getItem('token')
  console.log(token)
  return fetch(`${BASE_URL}${'/signin'}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => getResponse(res))
}

export const getUserData = (token) => {
  return fetch(`${BASE_URL}${'/users/me'}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => getResponse(res))
}

export const updateUserInfo = ({ name, email }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ email, name }),
  }).then(getJson)
}

export const getAllFilms = () => {
  return fetch(`${BASE_URL}/movies`, {
    headers: {
      Authorization: '',
      'Content-Type': 'application/json',
    },
  }).then(getJson)
}

export const deleteMovie = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    headers,
  }).then(getJson)
}

export const savedMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      Authorization: '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  }).then(getJson)
}