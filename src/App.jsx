import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './screens/Home'
import AuthCheck from './context/AuthCheck'
import { AuthProvider } from './context/AuthContext'
import { Login } from './screens/Login'
import { Error404 } from './screens/Error404'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <Toaster />
      <Routes>
        <Route path="/" element={<AuthCheck><Home /></AuthCheck>} />
        <Route path="/login" element={<Login />} />
        <Route path="unauthorized" element={<Error404 />} />
        <Route path="/home" element={<AuthCheck><Home /></AuthCheck>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
