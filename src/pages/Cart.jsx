import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import AddSauceModal from '../components/Modal/AddSauceModal'
import BurgerModal from '../components/Modal/BurgerModal'
import FriesModal from '../components/Modal/FriesModal'
import MeatModal from '../components/Modal/MeatModal'
import SauceModal from '../components/Modal/SauceModal'

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, getTotalPrice, calculateItemPrice, updateCartItem } = useCart()
    const [pickupTime, setPickupTime] = useState('')
    const [selectedCartItem, setSelectedCartItem] = useState(null)
    const [showAddSauceModal, setShowAddSauceModal] = useState(false)
    const [editingItem, setEditingItem] = useState(null)
    const [activeModal, setActiveModal] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!pickupTime) {
            alert('Пожалуйста, выберите время самовывоза')
            return
        }
        alert(`Заказ оформлен! Самовывоз в ${pickupTime}`)
    }

    // Функция для проверки, является ли товар бургером или лонгбургером
    const isBurgerItem = (item) => {
        return item.category === 'burgers' || item.category === 'longburgers'
    }

    // Функция для проверки, есть ли у бургера соусы
    const hasSauces = (item) => {
        return item.options?.sauces && item.options.sauces.length > 0
    }

    // Функция для добавления соусов к бургеру
    const handleAddSauces = (item) => {
        setSelectedCartItem(item)
        setShowAddSauceModal(true)
    }

    // Функция для редактирования товара
    const handleEditItem = (item) => {
        setEditingItem(item)

        if (item.category === 'burgers' || item.category === 'longburgers') {
            setActiveModal('burger')
        } else if (item.name.toLowerCase().includes('картофель') || item.name.toLowerCase().includes('фри')) {
            setActiveModal('fries')
        } else if (item.name.toLowerCase().includes('мясо на углях')) {
            setActiveModal('meat')
        } else if (item.category === 'sauces') {
            setActiveModal('sauce')
        }
    }

    const handleSauceAdded = () => {
        alert('Соусы успешно добавлены к бургеру!')
    }

    const handleCloseSauceModal = () => {
        setSelectedCartItem(null)
        setShowAddSauceModal(false)
    }

    const handleCloseEditModal = () => {
        setEditingItem(null)
        setActiveModal(null)
    }

    // Функция для обработки обновления товара
    const handleItemUpdated = (updatedProduct, options) => {
        if (editingItem) {
            // Создаем новый ключ на основе обновленных опций
            const newKey = updatedProduct.id + JSON.stringify(options)

            // Обновляем товар в корзине
            updateCartItem(editingItem.key, {
                ...updatedProduct,
                key: newKey,
                options: options,
                displayName: getUpdatedDisplayName(updatedProduct.name, options),
                baseName: updatedProduct.name
            })

            alert('Товар обновлен! ✅')
            handleCloseEditModal()
        }
    }

    const getUpdatedDisplayName = (baseName, options) => {
        let name = baseName

        if (options.spicy) name += ' Чили'
        if (options.long) name += ' Лонг'
        if (options.extraPatty) name += ' (двойная котлета)'
        if (options.weight) name += ` ${options.weight}г`
        if (options.quantity && options.quantity > 1) {
            name += ` (${options.quantity} шт.)`
        }

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

    // Функция для форматирования опций товара
    const formatCartOptions = (options) => {
        if (!options) return ''

        const parts = []

        if (options.spicy) parts.push('Острый')
        if (options.long) parts.push('Лонг')
        if (options.extraPatty) parts.push('Двойная котлетa')
        if (options.weight) parts.push(`${options.weight}г`)
        if (options.quantity && options.quantity > 1) {
            parts.push(`${options.quantity} шт.`)
        }

        if (options.toppings && options.toppings.length > 0) {
            parts.push(`Топпинги: ${options.toppings.join(', ')}`)
        }

        if (options.sauces && options.sauces.length > 0) {
            parts.push(`Соусы: ${options.sauces.join(', ')}`)
        }

        return parts.join(' • ')
    }

    // Функция для получения иконки товара
    const getProductIcon = (product) => {
        if (product.category === 'burgers') return '🍔'
        if (product.category === 'longburgers') return '🥖'
        if (product.category === 'snacks') return '🍟'
        if (product.category === 'sauces') return '🧴'
        if (product.category === 'hot') return '🔥'
        if (product.category === 'soups') return '🍲'
        if (product.category === 'hotDrinks') return '☕'
        if (product.category === 'coldDrinks') return '🥤'
        return '🍔'
    }

    // Функция для расчета цены одного товара
    const getItemPrice = (item) => {
        return calculateItemPrice ? calculateItemPrice(item) : item.price
    }

    // Функция для расчета общей суммы товара (цена × количество)
    const getItemTotalPrice = (item) => {
        return getItemPrice(item) * item.quantity
    }

    if (cart.items.length === 0) {
        return (
            <main className="container">
                <div className="page-header">
                    <h1>Корзина</h1>
                    <p>Проверьте заказ и оформите самовывоз</p>
                </div>
                <div className="empty-cart">
                    <div className="empty-cart-icon">🛒</div>
                    <h3>Корзина пуста</h3>
                    <p>Добавьте вкусные блюда из меню</p>
                    <a href="/" className="btn btn-primary">Вернуться в меню</a>
                </div>
            </main>
        )
    }

    return (
        <main className="container">
            <div className="page-header">
                <h1>Ваша корзина</h1>
                <p>Проверьте заказ и оформите самовывоз</p>
            </div>

            <div className="cart-container">
                <div className="cart-items">
                    {cart.items.map(item => (
                        <div key={item.key} className="cart-item">
                            <div className="cart-item-image">
                                {getProductIcon(item)}
                            </div>
                            <div className="cart-item-details">
                                <div className="cart-item-header">
                                    <div className="cart-item-title">{item.displayName || item.name}</div>
                                    <div className="cart-item-actions">
                                        {/* Кнопка добавления соусов для бургеров без соусов */}
                                        {isBurgerItem(item) && !hasSauces(item) && (
                                            <button
                                                className="edit-btn secondary"
                                                onClick={() => handleAddSauces(item)}
                                            >
                                                + Соус
                                            </button>
                                        )}
                                        {/* Кнопка редактирования товара */}
                                        <button
                                            className="edit-btn primary"
                                            onClick={() => handleEditItem(item)}
                                        >
                                            ✏️ Изменить
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-item-price">
                                    {getItemPrice(item)} ₽ × {item.quantity} = {getItemTotalPrice(item)} ₽
                                </div>

                                {/* Отображение опций товара */}
                                {item.options && Object.keys(item.options).length > 0 && (
                                    <div className="cart-item-options">
                                        {formatCartOptions(item.options)}
                                    </div>
                                )}

                                <div className="cart-item-controls">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => updateQuantity(item.key, -1)}
                                    >−</button>
                                    <input
                                        className="quantity-input"
                                        type="text"
                                        value={item.quantity}
                                        readOnly
                                    />
                                    <button
                                        className="quantity-btn"
                                        onClick={() => updateQuantity(item.key, 1)}
                                    >+</button>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.key)}
                                        title="Удалить"
                                    >🗑</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary summary-card">
                    <h3>Итого</h3>
                    <div className="summary-section">
                        <div className="summary-row">
                            <span>Товары ({cart.items.reduce((total, item) => total + item.quantity, 0)} шт.):</span>
                            <span>{getTotalPrice()} ₽</span>
                        </div>
                        <div className="summary-row">
                            <span>Доставка:</span>
                            <span>Бесплатно</span>
                        </div>
                        <div className="summary-row total">
                            <span>К оплате:</span>
                            <span>{getTotalPrice()} ₽</span>
                        </div>
                    </div>

                    <div className="order-info">
                        <div className="order-info-title">Самовывоз</div>
                        <p>Заберите ваш заказ в кафе через 20-30 минут после оформления</p>
                    </div>

                    <h3>Оформление заказа</h3>

                    <form className="checkout-form" onSubmit={handleSubmit}>
                        <div className="form-group with-icon">
                            <div className="form-icon">👤</div>
                            <input type="text" className="form-input" placeholder="Ваше имя" required />
                        </div>

                        <div className="form-group with-icon">
                            <div className="form-icon">📱</div>
                            <input type="tel" className="form-input" placeholder="Телефон" required />
                        </div>

                        <div className="form-group">
                            <textarea className="form-input form-textarea"
                                placeholder="Комментарий к заказу (необязательно)"></textarea>
                        </div>

                        <div className="form-group">
                            <label>Время самовывоза</label>
                            <div className="time-input-wrapper">
                                <input
                                    type="time"
                                    className="form-input form-select"
                                    value={pickupTime}
                                    onChange={(e) => setPickupTime(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-checkout">
                            Оформить заказ за {getTotalPrice()} ₽ 🚀
                        </button>
                    </form>
                </div>
            </div>

            {/* Модальное окно для добавления соусов */}
            {selectedCartItem && (
                <AddSauceModal
                    cartItem={selectedCartItem}
                    isOpen={showAddSauceModal}
                    onClose={handleCloseSauceModal}
                    onSauceAdded={handleSauceAdded}
                />
            )}

            {/* Модальные окна для редактирования товаров */}
            {activeModal === 'burger' && editingItem && (
                <BurgerModal
                    product={editingItem}
                    isOpen={true}
                    onClose={handleCloseEditModal}
                    onAddToCart={(product, options) => handleItemUpdated(product, options)}
                    isEditing={true}
                />
            )}

            {activeModal === 'fries' && editingItem && (
                <FriesModal
                    product={editingItem}
                    isOpen={true}
                    onClose={handleCloseEditModal}
                    onAddToCart={(product, options) => handleItemUpdated(product, options)}
                    isEditing={true}
                />
            )}

            {activeModal === 'meat' && editingItem && (
                <MeatModal
                    product={editingItem}
                    isOpen={true}
                    onClose={handleCloseEditModal}
                    onAddToCart={(product, options) => handleItemUpdated(product, options)}
                    isEditing={true}
                />
            )}

            {activeModal === 'sauce' && editingItem && (
                <SauceModal
                    product={editingItem}
                    isOpen={true}
                    onClose={handleCloseEditModal}
                    onAddToCart={(product, options) => handleItemUpdated(product, options)}
                    isEditing={true}
                />
            )}
        </main>
    )
}

export default Cart