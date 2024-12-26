import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { validateUrl } from '../../utils/helpers/validate';
import Components from '../../components/components';
import './style.css';

function Products() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const location = useLocation();

    const darkTeaRef = useRef(null);
    const redTeaRef = useRef(null);
    const whiteTeaRef = useRef(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryType = params.get('type');

        if (queryType) {
            if (queryType === 'DarkTea' && darkTeaRef.current) {
                darkTeaRef.current.scrollIntoView({ behavior: 'smooth' });
            } else if (queryType === 'RedTea' && redTeaRef.current) {
                redTeaRef.current.scrollIntoView({ behavior: 'smooth' });
            } else if (queryType === 'WhiteTea' && whiteTeaRef.current) {
                whiteTeaRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="products_page-container">
            <h1 className="products_page-header">我们的产品</h1>

            <Components.ProductCategory
                categoryKey="DarkTeas"
                title="黑茶系列"
                onProductClick={handleProductClick}
                ref={darkTeaRef}
            />
            <Components.ProductCategory
                categoryKey="RedTeas"
                title="红茶系列"
                onProductClick={handleProductClick}
                ref={redTeaRef}
            />
            <Components.ProductCategory
                categoryKey="WhiteTeas"
                title="白茶系列"
                onProductClick={handleProductClick}
                ref={whiteTeaRef}
            />

            {/* 使用独立的 ProductModal 组件 */}
            <Components.ProductModal selectedProduct={selectedProduct} onClose={closeModal} />
        </div>
    );
}

export default validateUrl(Products);
