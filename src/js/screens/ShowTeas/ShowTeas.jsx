import React, { useState } from 'react';
import Components from '../../components/components';
import { useLocation } from 'react-router-dom';

import './style.css';

const ShowTeas = () => {
    const location = useLocation();
    const { categoryKey, subCategoryKey, title } = location.state || {}; // 获取 state 中的参数

    const [selectedProduct, setSelectedProduct] = useState(null);
    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };
    return (
        <>
            <Components.ProductEdit 
                categoryKey={categoryKey} 
                subCategoryKey={subCategoryKey} 
                title={title} 
                onProductClick={handleProductClick} />
            <Components.ProductModal 
                selectedProduct={selectedProduct} 
                onClose={closeModal} 
            />

        </>

    );
};

export default ShowTeas;
