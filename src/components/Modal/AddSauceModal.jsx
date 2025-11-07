import React, { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { sauces } from '../../data/products'

const AddSauceModal = ({ cartItem, isOpen, onClose, onSauceAdded }) => {
    const { updateCartItem } = useCart()
    const [selectedSauces, setSelectedSauces] = useState([])

    useEffect(() => {
        if (cartItem.options?.sauces) {
            setSelectedSauces(cartItem.options.sauces)
        }
    }, [cartItem])

    if (!isOpen) return null

    const handleSauceToggle = (sauce) => {
        setSelectedSauces(prev =>
            prev.includes(sauce)
                ? prev.filter(s => s !== sauce)
                : [...prev, sauce]
        )
    }

    const handleAddSauces = () => {
        // Обновляем опции товара в корзине
        const updatedOptions = {
            ...cartItem.options,
            sauces: selectedSauces
        }

        // Создаем обновленный ключ для товара
        const newKey = cartItem.id + JSON.stringify(updatedOptions)

        // Обновляем товар в корзине
        updateCartItem(cartItem.key, {
            ...cartItem,
            key: newKey,
            options: updatedOptions,
            displayName: getUpdatedDisplayName(cartItem.baseName || cartItem.name, updatedOptions)
        })

        onSauceAdded()
        onClose()
    }

    const getUpdatedDisplayName = (baseName, options) => {
        let name = baseName

        if (options.spicy) name += ' Чили'
        if (options.long) name += ' Лонг'
        if (options.extraPatty) name += ' (двойная котлета)'
        if (options.weight) name += ` ${options.weight}г`

        const parts = []
        if (options.toppings && options.toppings.length > 0) {
            parts.push(`+ ${options.toppings.join(', ')}`)
        }
        if (options.sauces && options.sauces.length > 0) {
            parts.push(`соус: ${options.sauces.join(', ')}`)
        }

        if (parts.length > 0) {
            name += ` (${parts.join('; ')})`
        }

        return name
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                <h2 className="modal-title">Добавить соусы к: {cartItem.baseName || cartItem.name}</h2>

                <div className="option-group">
                    <h4>Выберите соусы</h4>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        Можно выбрать несколько соусов
                    </p>
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
                    <div className="toppings-counter">
                        Выбрано: {selectedSauces.length}
                    </div>
                </div>

                <div className="price-display">
                    <strong>Соусы добавляются бесплатно</strong>
                </div>

                <button className="btn-checkout" onClick={handleAddSauces}>
                    Добавить соусы к бургеру
                </button>
            </div>
        </div>
    )
}

export default AddSauceModal