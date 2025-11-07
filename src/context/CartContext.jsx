import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_CART':
            return action.payload

        case 'ADD_TO_CART':
            const existingItem = state.items.find(
                item => item.key === action.payload.key
            )

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.key === action.payload.key
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                }
            }

            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }]
            }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.key !== action.payload)
            }

        case 'UPDATE_CART_ITEM':
            return {
                ...state,
                items: state.items.map(item =>
                    item.key === action.payload.oldKey
                        ? { ...action.payload.newItem, quantity: item.quantity }
                        : item
                )
            }

        case 'UPDATE_QUANTITY':
            return {
                ...state,
                items: state.items.map(item =>
                    item.key === action.payload.key
                        ? { ...item, quantity: Math.max(0, item.quantity + action.payload.delta) }
                        : item
                ).filter(item => item.quantity > 0)
            }

        case 'CLEAR_CART':
            return { items: [] }

        default:
            return state
    }
}

const getCartKey = (product, options = {}) => {
    return product.id + JSON.stringify(options)
}

const getProductDisplayName = (baseName, options) => {
    let name = baseName

    if (options.spicy) name += ' Чили'
    if (options.long) name += ' Лонг'
    if (options.extraPatty) name += ' (двойная котлета)'
    if (options.weight) name += ` ${options.weight}г`
    
    // Добавляем отображение количества для соусов
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

// Функция для расчета цены товара с учетом опций
const calculateItemPrice = (item) => {
    let price = item.price;
    
    if (item.options) {
        // Для бургеров
        if (item.options.extraPatty) price += 100;
        if (item.options.long) price += 50;
        if (item.options.spicy) price += 30;
        
        // Для мяса на углях
        if (item.options.weight) {
            price = Math.round((299 * item.options.weight) / 100);
        }
        
        // Умножаем на количество для соусов
        if (item.options.quantity) {
            price = price * item.options.quantity;
        }
    }
    
    return price;
}

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, { items: [] })

    useEffect(() => {
        const savedCart = localStorage.getItem('sovranaCart')
        if (savedCart) {
            dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) })
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('sovranaCart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (product, options = {}) => {
        const key = getCartKey(product, options)
        const displayName = getProductDisplayName(product.name, options)

        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                ...product,
                key,
                displayName,
                options,
                baseName: product.name
            }
        })
    }

    const removeFromCart = (key) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: key })
    }

    const updateQuantity = (key, delta) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { key, delta } })
    }

    const updateCartItem = (oldKey, newItem) => {
        dispatch({
            type: 'UPDATE_CART_ITEM',
            payload: { oldKey, newItem }
        })
    }

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' })
    }

    const getTotalCount = () => {
        return cart.items.reduce((total, item) => total + item.quantity, 0)
    }

    const getTotalPrice = () => {
        return cart.items.reduce((total, item) => {
            const itemPrice = calculateItemPrice(item);
            return total + (itemPrice * item.quantity);
        }, 0)
    }

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateCartItem, // Добавлена эта функция
        clearCart,
        getTotalCount,
        getTotalPrice,
        calculateItemPrice
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}