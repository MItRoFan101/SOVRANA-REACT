import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import AuthModal from '../AuthModal/AuthModal'
import './Header.css'

const Header = () => {
    const { getTotalCount } = useCart()
    const location = useLocation()
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userPhone, setUserPhone] = useState('')

    const isActive = (path) => {
        return location.pathname === path ? 'active' : ''
    }

    const handleLogin = (phone) => {
        setIsLoggedIn(true)
        setUserPhone(phone)
        setIsAuthModalOpen(false)
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
        setUserPhone('')
    }

    return (
        <>
            <header className="header-custom">
                <div className="container">
                    <div className="header-top d-flex justify-content-between align-items-center">
                        <Link to="/" className="logo-wrapper d-flex align-items-center">
                            <div className="logo-icon me-2">
                                <div className="diamond-symbol">S</div>
                            </div>
                            <span className="logo-text">SOVRANA</span>
                        </Link>

                        <div className="header-center-buttons">
                            <Link
                                to="/about"
                                className={`header-btn about-btn ${isActive('/about')}`}
                            >
                                О нас
                            </Link>
                            <Link
                                to="/contacts"
                                className={`header-btn contacts-btn ${isActive('/contacts')}`}
                            >
                                Контакты
                            </Link>
                            <Link
                                to="/cart"
                                className={`header-btn cart-btn ${isActive('/cart')}`}
                            >
                                Корзина
                                <span className="cart-count">{getTotalCount()}</span>
                            </Link>
                        </div>

                        <div className="btn-group">
                            {isLoggedIn ? (
                                <div className="user-info">
                                    <span className="user-phone">👤 {userPhone}</span>
                                    <button
                                        type="button"
                                        className="btn btn-outline logout-btn"
                                        onClick={handleLogout}
                                    >
                                        Выйти
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-primary login-btn"
                                    onClick={() => setIsAuthModalOpen(true)}
                                >
                                    Войти
                                </button>
                            )}
                        </div>
                    </div>

                    {location.pathname === '/' && (
                        <nav className="navbar">
                            <ul className="nav-category">
                                <li className="nav-item"><a href="#popular" className="nav-link">Популярное</a></li>
                                <li className="nav-item"><a href="#burgers" className="nav-link">Бургеры</a></li>
                                <li className="nav-item"><a href="#longburgers" className="nav-link">Лонгбургеры</a></li>
                                <li className="nav-item"><a href="#snacks" className="nav-link">Закуски</a></li>
                                <li className="nav-item"><a href="#sauces" className="nav-link">Соусы</a></li>
                                <li className="nav-item"><a href="#hot" className="nav-link">Горячее</a></li>
                                <li className="nav-item"><a href="#soups" className="nav-link">Супы</a></li>
                                <li className="nav-item"><a href="#hotDrinks" className="nav-link">Горячие напитки</a></li>
                                <li className="nav-item"><a href="#coldDrinks" className="nav-link">Холодные напитки</a></li>
                            </ul>
                        </nav>
                    )}
                </div>
            </header>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onLogin={handleLogin}
            />
        </>
    )
}

export default Header