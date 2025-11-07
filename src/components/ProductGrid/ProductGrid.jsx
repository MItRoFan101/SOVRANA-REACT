import React from 'react'
import ProductCard from '../ProductCard/ProductCard'

const ProductGrid = ({ products, onProductClick }) => {
    return (
        <div className="products-container">
            {products.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCartClick={onProductClick}
                />
            ))}
        </div>
    )
}

export default ProductGrid