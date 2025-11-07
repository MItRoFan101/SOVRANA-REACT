import React, { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { sauces } from '../../data/products'

const FriesModal = ({ product, isOpen, onClose, onAddToCart, isEditing = false }) => {
    const { addToCart } = useCart()
    const [selectedSauce, setSelectedSauce] = useState('')

    useEffect(() => {
        if (isEditing && product.options && product.options.sauces) {
            setSelectedSauce(product.options.sauces[0] || '')
        }
    }, [isEditing, product])

    if (!isOpen) return null

    const handleAddToCart = () => {
        const options = {
            sauces: selectedSauce ? [selectedSauce] : []
        }

        if (isEditing && onAddToCart) {
            onAddToCart(product, options)
        } else {
            addToCart(product, options)
            onClose()
            alert('Картофель фри добавлен в корзину! 🍟')
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                <h2 className="modal-title">
                    {isEditing ? 'Редактирование: ' : 'Выберите соус для: '}{product.name}
                </h2>

                <div className="option-group">
                    <h4>Соусы</h4>
                    <div className="sauces-list">
                        <div
                            className={`sauce-item ${!selectedSauce ? 'selected' : ''}`}
                            onClick={() => setSelectedSauce('')}
                        >
                            Без соуса
                        </div>
                        {sauces.map(sauce => (
                            <div
                                key={sauce}
                                className={`sauce-item ${selectedSauce === sauce ? 'selected' : ''}`}
                                onClick={() => setSelectedSauce(sauce)}
                            >
                                {sauce}
                            </div>
                        ))}
                    </div>
                </div>

                <button className="btn-checkout" onClick={handleAddToCart}>
                    {isEditing ? 'Обновить товар' : 'Добавить в корзину'} за {product.price} ₽
                </button>
            </div>
        </div>
    )
}

export default FriesModal