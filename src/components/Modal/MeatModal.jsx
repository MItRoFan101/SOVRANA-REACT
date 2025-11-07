import React, { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { meatToppings, sauces } from '../../data/products'

const MeatModal = ({ product, isOpen, onClose, onAddToCart, isEditing = false }) => {
    const { addToCart } = useCart()
    const [weight, setWeight] = useState(100)
    const [selectedToppings, setSelectedToppings] = useState([])
    const [selectedSauces, setSelectedSauces] = useState([])

    useEffect(() => {
        if (isEditing && product.options) {
            setWeight(product.options.weight || 100)
            setSelectedToppings(product.options.toppings || [])
            setSelectedSauces(product.options.sauces || [])
        }
    }, [isEditing, product])

    if (!isOpen) return null

    const meatBasePrice = 299
    const price = Math.round((meatBasePrice * weight) / 100)

    const handleToppingToggle = (topping) => {
        setSelectedToppings(prev =>
            prev.includes(topping)
                ? prev.filter(t => t !== topping)
                : [...prev, topping]
        )
    }

    const handleSauceToggle = (sauce) => {
        setSelectedSauces(prev =>
            prev.includes(sauce)
                ? prev.filter(s => s !== sauce)
                : [...prev, sauce]
        )
    }

    const handleAddToCart = () => {
        const options = {
            weight,
            toppings: selectedToppings,
            sauces: selectedSauces
        }

        if (isEditing && onAddToCart) {
            onAddToCart(product, options)
        } else {
            addToCart(product, options)
            onClose()
            alert('Мясо добавлено в корзину! 🥩')
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                <h2 className="modal-title">
                    {isEditing ? 'Редактирование: ' : 'Настройка: '}{product.name}
                </h2>

                <div className="option-group">
                    <h4>Выберите вес</h4>
                    <div className="weight-options">
                        {[100, 200, 300, 400, 500].map(w => (
                            <button
                                key={w}
                                className={`weight-option ${weight === w ? 'active' : ''}`}
                                onClick={() => setWeight(w)}
                            >
                                {w}г
                            </button>
                        ))}
                    </div>
                </div>

                <div className="option-group">
                    <h4>Топпинги</h4>
                    <div className="toppings-list">
                        {meatToppings.map(topping => (
                            <div
                                key={topping}
                                className={`topping-item ${selectedToppings.includes(topping) ? 'selected' : ''}`}
                                onClick={() => handleToppingToggle(topping)}
                            >
                                {topping}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="option-group">
                    <h4>Соусы</h4>
                    <div className="sauces-list">
                        {sauces.map(sauce => (
                            <div
                                key={sauce}
                                className={`sauce-item ${selectedSauces.includes(sauce) ? 'selected' : ''}`}
                                onClick={() => handleSauceToggle(sauce)}
                            >
                                {sauce}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="price-display">
                    <strong>Итоговая цена: {price} ₽</strong>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>
                        {weight}г × {meatBasePrice}₽/100г
                    </div>
                </div>

                <button className="btn-checkout" onClick={handleAddToCart}>
                    {isEditing ? 'Обновить товар' : 'Добавить в корзину'} за {price} ₽
                </button>
            </div>
        </div>
    )
}

export default MeatModal