import React, { useState } from 'react'
import ProductGrid from '../components/ProductGrid/ProductGrid'
import ProductSwiper from '../components/Swiper/ProductSwiper'
import BurgerModal from '../components/Modal/BurgerModal'
import FriesModal from '../components/Modal/FriesModal'
import MeatModal from '../components/Modal/MeatModal'
import SauceModal from '../components/Modal/SauceModal'
import { productsData } from '../data/products'
import { useCart } from '../context/CartContext'

const Home = () => {
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [activeModal, setActiveModal] = useState(null)
    const { addToCart } = useCart()

    const getCategoryTitle = (category) => {
        const titles = {
            burgers: 'Бургеры',
            longburgers: 'Лонгбургеры',
            snacks: 'Закуски',
            sauces: 'Соусы',
            hot: 'Горячее',
            soups: 'Супы',
            hotDrinks: 'Горячие напитки',
            coldDrinks: 'Холодные напитки'
        }
        return titles[category] || category
    }

    const handleProductClick = (product) => {
        setSelectedProduct(product)

        if (product.category === 'burgers' || product.category === 'longburgers') {
            setActiveModal('burger')
        } else if (product.name.toLowerCase().includes('картофель') || product.name.toLowerCase().includes('фри')) {
            setActiveModal('fries')
        } else if (product.name.toLowerCase().includes('мясо на углях')) {
            setActiveModal('meat')
        } else if (product.category === 'sauces') {
            setActiveModal('sauce') // Соусы открывают модальное окно
        } else {
            // Простые товары без модификаторов
            addToCart(product)
            alert('Товар добавлен в корзину! 🛒')
        }
    }

    const handleCloseModal = () => {
        setSelectedProduct(null)
        setActiveModal(null)
    }

    return (
        <div className="home-page container">
            <section className="hero-section">
                <h1>Добро пожаловать в SOVRANA!</h1>
                <p>Лучшие бургеры и закуски в городе</p>
            </section>

            <section id="popular" className="category-section">
                <h2 className="category-title">Популярное</h2>
                <ProductSwiper
                    products={productsData.popular}
                    onProductClick={handleProductClick}
                />
            </section>

            {Object.entries(productsData).map(([category, products]) => (
                category !== 'popular' && (
                    <section key={category} id={category} className="category-section">
                        <h2 className="category-title">{getCategoryTitle(category)}</h2>
                        <ProductGrid
                            products={products}
                            onProductClick={handleProductClick}
                        />
                    </section>
                )
            ))}

            {/* Глобальные модальные окна */}

            {activeModal === 'burger' && selectedProduct && (
                <BurgerModal
                    product={selectedProduct}
                    isOpen={true}
                    onClose={handleCloseModal}
                />
            )}

            {activeModal === 'fries' && selectedProduct && (
                <FriesModal
                    product={selectedProduct}
                    isOpen={true}
                    onClose={handleCloseModal}
                />
            )}

            {activeModal === 'meat' && selectedProduct && (
                <MeatModal
                    product={selectedProduct}
                    isOpen={true}
                    onClose={handleCloseModal}
                />
            )}

            {activeModal === 'sauce' && selectedProduct && (
                <SauceModal
                    product={selectedProduct}
                    isOpen={true}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    )
}

export default Home