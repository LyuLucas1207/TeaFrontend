import React, { useEffect, useState } from 'react';
import { getDatas } from '../utility/sendRequest';
import '../../css/components/ProductCards.css';
import { Link } from 'react-router-dom';

const defineUrl = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'https://192.168.1.64:10002';
    }
    return 'https://www.lucaslyu.com:10002';
};

const ProductCards = () => {
    const [teaProducts, setTeaProducts] = useState([]);

    useEffect(() => {
        const fetchTeaProducts = async () => {
            try {
                const result = await getDatas('/AllTea', 'tea');
                if (result.status === 200 && result.data) {
                    // 随机选取4个产品
                    const teas = Object.values(result.data);
                    const randomTeas = teas.sort(() => 0.5 - Math.random()).slice(0, 6);
                    setTeaProducts(randomTeas);
                }
            } catch (error) {
                console.error('Error fetching tea products:', error);
            }
        };

        fetchTeaProducts();
    }, []);

    if (!teaProducts || teaProducts.length === 0) {
        return (
            <div className="product_cards-container">
                <p>暂无茶叶产品展示</p>
            </div>
        );
    }

    return (
        <div className="product_cards-container">
            <div className="product_cards-header"><Link to="/index/products" className="product_cards-header">茶叶产品</Link></div>
            <div className="product_cards-containers">
                {teaProducts.map((tea, index) => (
                    <div key={index} className="product_cards-card">
                        <div className='product_cards-image-container'>
                            <img
                                src={defineUrl() + tea.imageUrl}
                                alt={`${tea.name}的照片`}
                                className="product_cards-image"
                            />
                        </div>
                        <div className="product_cards-info">
                            <div className="product_cards-title">{tea.name}</div>
                            <div className="product_cards-description">
                                <span>茶叶描述：</span>
                                <br />
                                <span>{tea.description}</span>
                            </div>
                            <div className="product_cards-price">价格：{tea.price}元</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCards;
