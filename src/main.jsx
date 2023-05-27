import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/authContext.jsx'
import { PostProvider } from './contexts/postContext.jsx'
import { CommunityProvider } from './contexts/communityContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CommunityProvider>
      <PostProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PostProvider>
    </CommunityProvider>
  </BrowserRouter>
)
