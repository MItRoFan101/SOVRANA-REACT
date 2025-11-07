import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper'
import ProductCard from '../ProductCard/ProductCard'

// Импортируем стили Swiper
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import './ProductSwiper.css'

const ProductSwiper = ({ products, onProductClick }) => {
    return (
        <div className="popular-swiper-container">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    slideShadows: false,
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination',
                }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                loop={true}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    768: {
                        slidesPerView: 'auto',
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 'auto',
                        spaceBetween: 30
                    }
                }}
                className="popular-swiper"
            >
                {products.map(product => (
                    <SwiperSlide key={product.id}>
                        <div className="swiper-card">
                            <ProductCard 
                                product={product} 
                                onAddToCartClick={onProductClick}
                            />
                        </div>
                    </SwiperSlide>
                ))}

                {/* Навигационные кнопки */}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>

                {/* Пагинация */}
                <div className="swiper-pagination"></div>
            </Swiper>
        </div>
    )
}

export default ProductSwiper