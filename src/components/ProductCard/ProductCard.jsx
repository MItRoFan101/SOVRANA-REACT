import React from 'react'

const ProductCard = ({ product, onAddToCartClick }) => {
    const handleAddToCart = () => {
        if (onAddToCartClick) {
            onAddToCartClick(product)
        }
    }

    return (
        <div className="product-card">
            <div className="product-image">
                {product.category === 'burgers' && '🍔'}
                {product.category === 'longburgers' && '🥖'}
                {product.category === 'snacks' && '🍟'}
                {product.category === 'sauces' && '🧴'}
                {product.category === 'hot' && '🔥'}
                {product.category === 'soups' && '🍲'}
                {product.category === 'hotDrinks' && '☕'}
                {product.category === 'coldDrinks' && '🥤'}
            </div>
            <h3 className="product-title">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-price">{product.price} ₽</div>
            <div className="product-actions">
                <button
                    className="btn-add-to-cart"
                    onClick={handleAddToCart}
                >
                    В корзину
                </button>
            </div>
        </div>
    )
}

export default ProductCard