import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom'; // 用于获取查询参数
import { validateUrl } from '../utility/validate';
import { TEA_CATEGORIES, TEA_SUBCATEGORIES } from '../utility/teaMap';
import { getDatas } from '../utility/sendRequest';
import '../../css/Product.css';

function defineUrl() {
    if (process.env.NODE_ENV === 'development') {
        return 'https://192.168.1.64:10002';
    }
    return 'https://www.lucaslyu.com:10002';
}

function Products() {
    const [productData, setProductData] = useState({});
    const [loadingSubcategories, setLoadingSubcategories] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null); // 存储当前选中的产品
    const categoryRefs = useRef({});
    const location = useLocation();

    const fetchProductData = async (subcategory) => {
        try {
            setLoadingSubcategories((prev) => ({
                ...prev,
                [subcategory]: true,
            }));

            const result = await getDatas('/GetTea', 'tea', { name: subcategory });
            const products = result.data ? Object.values(result.data) : [];

            setProductData((prevData) => ({
                ...prevData,
                [subcategory]: products,
            }));

            setLoadingSubcategories((prev) => ({
                ...prev,
                [subcategory]: false,
            }));
        } catch (error) {
            console.error(`Error fetching data for ${subcategory}:`, error);
            setLoadingSubcategories((prev) => ({
                ...prev,
                [subcategory]: false,
            }));
        }
    };

    useEffect(() => {
        const getQueryType = () => {
            const params = new URLSearchParams(location.search);
            return params.get('type');
        };
        const queryType = getQueryType();
        if (queryType && categoryRefs.current[queryType]) {
            categoryRefs.current[queryType].scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    useEffect(() => {
        const observers = [];

        for (const category of TEA_CATEGORIES) {
            const subcategories = TEA_SUBCATEGORIES[category.value] || [];
            for (const subcategory of subcategories) {
                if (!categoryRefs.current[subcategory.value]) continue;

                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting && !productData[subcategory.value]) {
                                fetchProductData(subcategory.value);
                                observer.disconnect();
                            }
                        });
                    },
                    { threshold: 0.3 }
                );

                observer.observe(categoryRefs.current[subcategory.value]);
                observers.push(observer);
            }
        }

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, [productData]);

    const handleProductClick = (product) => {
        setSelectedProduct(product); // 设置选中的产品
    };

    const closeModal = () => {
        setSelectedProduct(null); // 关闭模态框
    };

    return (
        <div className="product-container">
            <h1 className="product-title">我们的产品</h1>
            {TEA_CATEGORIES.map((category) => (
                <div key={category.value} className="product-category">
                    <h2
                        className="product-category-title"
                        ref={(el) => (categoryRefs.current[category.value] = el)}
                    >
                        {category.label}
                    </h2>
                    <div className="product-subcategory-container">
                        {(TEA_SUBCATEGORIES[category.value] || []).map((subcategory, subIndex) => (
                            <div
                                key={`${subcategory.value}-${subIndex}`}
                                className="product-subcategory"
                                ref={(el) => (categoryRefs.current[subcategory.value] = el)}
                            >
                                <h3 className="product-subcategory-title">{subcategory.label}</h3>
                                <div className="product-items">
                                    {loadingSubcategories[subcategory.value] ? (
                                        <p>加载中...</p>
                                    ) : Array.isArray(productData[subcategory.value]) ? (
                                        productData[subcategory.value].length > 0 ? (
                                            productData[subcategory.value].map((product, prodIndex) => (
                                                <div
                                                    key={`${product.id}-${prodIndex}`}
                                                    className="product-card"
                                                    onClick={() => handleProductClick(product)} // 添加点击事件
                                                >
                                                    <img
                                                        src={defineUrl() + product.imageUrl}
                                                        alt={product.name}
                                                        className="product-image"
                                                    />
                                                    <div className="product-info">
                                                        <h4 className="product-name">{product.name}</h4>
                                                        <p className="product-description">
                                                            {product.description.substring(0, 150)}...
                                                        </p>
                                                        <p className="product-price">¥{product.price}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>暂无数据</p>
                                        )
                                    ) : (
                                        <p>加载中...</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {selectedProduct && ( // 模态框
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedProduct.name}</h2>
                        <img
                            src={defineUrl() + selectedProduct.imageUrl}
                            alt={selectedProduct.name}
                            className="modal-image"
                        />
                        <p className="modal-description">{selectedProduct.description}</p>
                        <p className="modal-price">价格: ¥{selectedProduct.price}</p>
                        <button onClick={closeModal} className="modal-close-button">
                            关闭
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default validateUrl(Products);
