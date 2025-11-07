import React, { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'

const SauceModal = ({ product, isOpen, onClose, onAddToCart, isEditing = false }) => {
    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        if (isEditing && product.options) {
            setQuantity(product.options.quantity || 1)
        }
    }, [isEditing, product])

    if (!isOpen) return null

    const handleAddToCart = () => {
        // Создаем объект с информацией о количестве
        const options = {
            quantity: quantity
        }

        if (isEditing && onAddToCart) {
            onAddToCart(product, options)
        } else {
            addToCart(product, options)
            onClose()
            setQuantity(1) // Сбрасываем количество после добавления
            alert(`Соус добавлен в корзину! 🧴 (${quantity} шт.)`)
        }
    }

    const totalPrice = product.price * quantity

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                <h2 className="modal-title">
                    {isEditing ? 'Редактирование: ' : 'Добавить соус: '}{product.name}
                </h2>

                <div className="option-group">
                    <h4>Описание</h4>
                    <p className="product-description" style={{ padding: '0.5rem', background: '#f8f9fa', borderRadius: '8px' }}>
                        {product.description}
                    </p>
                </div>

                <div className="option-group">
                    <h4>Количество</h4>
                    <div className="quantity-selector" style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            className="quantity-btn"
                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                            disabled={quantity <= 1}
                        >−</button>
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                            {quantity}
                        </span>
                        <button
                            className="quantity-btn"
                            onClick={() => setQuantity(prev => prev + 1)}
                        >+</button>
                    </div>
                </div>

                <div className="price-display">
                    <strong>Цена за шт.: {product.price} ₽</strong>
                    <div style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
                        Итого: <strong>{totalPrice} ₽</strong>
                    </div>
                </div>

                <button className="btn-checkout" onClick={handleAddToCart}>
                    {isEditing ? 'Обновить товар' : `Добавить в корзину`} ({quantity} шт.) за {totalPrice} ₽
                </button>
            </div>
        </div>
    )
}

export default SauceModal