import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer' // Добавлен импорт Footer
import Home from './pages/Home'
import About from './pages/About'
import Contacts from './pages/Contacts'
import Cart from './pages/Cart'
import './styles/globals.css'

const AdminDashboard = React.lazy(() => import('./admin/AdminDashboard'))

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route 
                      path="/admin/*" 
                      element={
                        <Suspense fallback={<div>Loading admin...</div>}>
                          <AdminDashboard />
                        </Suspense>
                      } 
                    />
                </Routes>
            </main>
            <Footer /> {/* Добавлен Footer */}
        </div>
    )
}

export default App