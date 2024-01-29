import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import { AuthProvider } from './context/AuthContext';
import Adopcion from './components/Adopcion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/Adoptar' element={<Adopcion/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App