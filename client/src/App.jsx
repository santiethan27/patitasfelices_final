import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import Navbar from './components/Navbar/Navbar';
import Adopcion from './pages/AdoptionPage/Adopcion';
import AdminPage from './pages/DashBoard/AdminPage/AdminPage';
import ListUser from './pages/DashBoard/User/ListUser';
import { AnimalProvider } from './contexts/AnimalContext';
import ProtectedRoute from './utils/hooks/ProtectedRoute';
import AuthPage from './pages/AuthPage/AuthPage';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import BlogPage from './pages/BlogPage/BlogPage';
import { CitasAdopcion } from './pages/CitasPage/CitasAdopcion';
import ProductsPage from './pages/ProductPage/ProductsPage';
import DetailAdoption from './pages/PetPage/DetailAdoption';
import DetailProduct from './pages/DetailProductPage/DetailProduct';
import Footer from './components/Footer/Footer';
import SetProductPage from './pages/DashBoard/AddProductPage/SetProductPage';
import SetAnimalPage from './pages//DashBoard/AddAnimalPage/SetAnimalPage';

function App() {
    return (
        <AuthProvider>
            <AnimalProvider>
                <ProductProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/auth' element={<AuthPage />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path='/*' element={<MainApp />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </ProductProvider>
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
                <Route path='/citas' element={<CitasAdopcion />}></Route>
                <Route path='/administracion' element={<AdminPage />}></Route>
                <Route path='/pet' element={<SetAnimalPage />}></Route>
                <Route path='/product' element={<SetProductPage />}></Route>
                <Route path='/products' element={<ProductsPage />}></Route>
                <Route path='/adoption/:id' element={<DetailAdoption />}></Route>
                <Route path='/product/:id' element={<DetailProduct />}></Route>
                <Route path='/users' element={<ListUser />}></Route>
            </Routes>
            <Footer />
        </>
    );
}
export default App