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
import { Toaster } from 'sonner';
import Donations from './pages/Donations/Donations';
import Animal from './pages/DashBoard/Animal/Animal';
import Product from './pages/DashBoard/Product/Product';
import { AdoptionProvider } from './contexts/AdoptionContext';
import Adoption from './pages/DashBoard/Adoption/Adoption';
import { InterviewProvider } from './contexts/InterviewContext';
import InterviewsUser from './pages/ProfilePage/InterviewsUser/InterviewsUser';
import ReportsUser from './pages/ProfilePage/ReportsUser/ReportsUser';
import ReportPage from './pages/DashBoard/ReportPage/ReportPage';
import { ReportProvider } from './contexts/ReportContext';
import { PaymentProvider } from './contexts/PaymentContext';
import AcountUser from './pages/ProfilePage/AcountUser/AcountUser';
import { OrderProvider } from './contexts/OrderContext';
import OrderPage from './pages/DashBoard/OrderPage/OrderPage';
import OrderUser from './pages/ProfilePage/OrdersUser/OrdersUser';

function App() {
    return (
        <AuthProvider>
            <OrderProvider>
                <ReportProvider>
                    <AdoptionProvider>
                        <AnimalProvider>
                            <PaymentProvider>
                                <InterviewProvider>
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
                                </InterviewProvider>
                            </PaymentProvider>
                        </AnimalProvider>
                    </AdoptionProvider>
                </ReportProvider>
            </OrderProvider>
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
                <Route path='/administracion/inicio' element={<AdminPage />}></Route>
                <Route path='/administracion/mascotas' element={<Animal />}></Route>
                <Route path='/administracion/productos' element={<Product />}></Route>
                <Route path='/administracion/usuarios' element={<ListUser />}></Route>
                <Route path='/administracion/reportes' element={<ReportPage />}></Route>
                <Route path='/administracion/adopciones' element={<Adoption />}></Route>
                <Route path='/usuario/entrevistas' element={<InterviewsUser />}></Route>
                <Route path='/usuario/reportes' element={<ReportsUser />}></Route>
                <Route path='/usuario/cuenta' element={<AcountUser />}></Route>
                <Route path='/usuario/pedidos' element={<OrderUser />}></Route>
                <Route path='/products' element={<ProductsPage />}></Route>
                <Route path='/adoption/:id' element={<DetailAdoption />}></Route>
                <Route path='/product/:id' element={<DetailProduct />}></Route>
                <Route path='/donations' element={<Donations />}></Route>
                <Route path='/administracion/pedidos' element={<OrderPage />}></Route>
            </Routes>
            <Footer />
            <Toaster richColors theme='dark' />
        </>
    );
}
export default App