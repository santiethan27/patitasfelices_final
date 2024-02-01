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
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/auth' element={<AuthPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/*' element={<MainApp />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
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
      </Routes>
      <Footer />
    </>
  );
}
export default App