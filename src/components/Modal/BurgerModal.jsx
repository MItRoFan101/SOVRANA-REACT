import React, { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { toppings, sauces } from '../../data/products'

const BurgerModal = ({ product, isOpen, onClose, onAddToCart, isEditing = false }) => {
    const { addToCart } = useCart()
    const [options, setOptions] = useState({
        spicy: false,
        long: false,
        extraPatty: false,
        toppings: [],
        sauces: []
    })

    useEffect(() => {
        if (isEditing && product.options) {
            setOptions(product.options)
        }
    }, [isEditing, product])

    if (!isOpen) return null

    const handleToppingToggle = (topping) => {
        setOptions(prev => {
            const newToppings = prev.toppings.includes(topping)
                ? prev.toppings.filter(t => t !== topping)
                : prev.toppings.length < 2
                    ? [...prev.toppings, topping]
                    : prev.toppings

            return { ...prev, toppings: newToppings }
        })
    }

    const handleSauceToggle = (sauce) => {
        setOptions(prev => ({
            ...prev,
            sauces: prev.sauces.includes(sauce)
                ? prev.sauces.filter(s => s !== sauce)
                : [...prev.sauces, sauce]
        }))
    }

    const handleAddToCart = () => {
        if (options.toppings.length > 2) {
            alert('Можно выбрать не более 2 топпингов')
            return
        }

        if (isEditing && onAddToCart) {
            onAddToCart(product, options)
        } else {
            addToCart(product, options)
            onClose()
            alert('Бургер добавлен в корзину! 🍔')
        }
    }

    const shouldShowLongOption = !['чизбургер мини', 'наггетс', 'стрипс'].some(term =>
        product.name.toLowerCase().includes(term)
    )

    // Расчет итоговой цены
    let finalPrice = product.price
    if (options.extraPatty) finalPrice += 100
    if (options.long) finalPrice += 50
    if (options.spicy) finalPrice += 30

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                <h2 className="modal-title">
                    {isEditing ? 'Редактирование: ' : 'Настройка: '}{product.name}
                </h2>

                <div className="option-group">
                    <h4>Основные опции</h4>
                    <label className={`option-checkbox ${!shouldShowLongOption ? 'disabled' : ''}`}>
                        <input
                            type="checkbox"
                            checked={options.long}
                            onChange={(e) => setOptions(prev => ({ ...prev, long: e.target.checked }))}
                            disabled={!shouldShowLongOption}
                        />
                        <span>Сделать лонгом 📏 {shouldShowLongOption && '+50₽'}</span>
                    </label>

                    <label className="option-checkbox">
                        <input
                            type="checkbox"
                            checked={options.spicy}
                            onChange={(e) => setOptions(prev => ({ ...prev, spicy: e.target.checked }))}
                        />
                        <span>Сделать острым 🌶 +30₽</span>
                    </label>

                    <label className="option-checkbox">
                        <input
                            type="checkbox"
                            checked={options.extraPatty}
                            onChange={(e) => setOptions(prev => ({ ...prev, extraPatty: e.target.checked }))}
                        />
                        <span>Дополнительная котлета 🍖 +100₽</span>
                    </label>
                </div>

                <div className="option-group">
                    <h4>Топпинги (до 2)</h4>
                    <div className="toppings-list">
                        {toppings.map(topping => (
                            <div
                                key={topping}
                                className={`topping-item ${options.toppings.includes(topping) ? 'selected' : ''} ${options.toppings.length >= 2 && !options.toppings.includes(topping) ? 'disabled' : ''}`}
                                onClick={() => handleToppingToggle(topping)}
                            >
                                {topping}
                            </div>
                        ))}
                    </div>
                    <div className="toppings-counter">
                        Выбрано: {options.toppings.length}/2
                    </div>
                </div>

                <div className="option-group">
                    <h4>Соусы</h4>
                    <div className="sauces-list">
                        {sauces.map(sauce => (
                            <div
                                key={sauce}
                                className={`sauce-item ${options.sauces.includes(sauce) ? 'selected' : ''}`}
                                onClick={() => handleSauceToggle(sauce)}
                            >
                                {sauce}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="price-display">
                    <strong>Итоговая цена: {finalPrice} ₽</strong>
                </div>

                <button className="btn-checkout" onClick={handleAddToCart}>
                    {isEditing ? 'Обновить товар' : 'Добавить в корзину'} за {finalPrice} ₽
                </button>
            </div>
        </div>
    )
}

export default BurgerModal