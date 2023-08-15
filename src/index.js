import React from 'react'
import ReactDoom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './components/App/App'

const root = ReactDoom.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
