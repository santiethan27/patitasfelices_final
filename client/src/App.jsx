import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import { AuthProvider } from './context/AuthContext';
import Adopcion from './components/Adopcion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import BlogPage from './pages/BlogPage';
import { AnimalProvider } from './context/AnimalContext';
import SetAnimalPage from './pages/SetAnimalPage';

function App() {
  return (
    <AuthProvider>
      <AnimalProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/auth' element={<AuthPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/*' element={<MainApp />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AnimalProvider>
    </AuthProvider>
  )
}
function MainApp() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/adoptar' element={<Adopcion />} />
        <Route path='/perfil' element={<ProfilePage />} />
        <Route path='/blog' element={<BlogPage />}> </Route>
        <Route path='/test' element={<SetAnimalPage />}></Route>
      </Routes>
      <Footer />
    </>
  );
}
export default App