import React, { useEffect, useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { PATHS } from '../../constants/paths';

import controllers from '../../utils/controllers/controllers';
import enums from '../../utils/enums/enums';
import Components from '../components';


function ProductCards() {
    const [teaProducts, setTeaProducts] = useState([]);
    const [selectedTea, setSelectedTea] = useState(null);
    const DEFAULT_IMAGE = PATHS.SRC.ASSETS.IMAGES.TEA_1280;
    

    useEffect(() => {
        const fetchTeaProducts = async () => {
            try {
                const dark_tea_result = await controllers.teaControllers.getAllDarkTeas();
                const red_tea_result = await controllers.teaControllers.getAllRedTeas();
                const white_tea_result = await controllers.teaControllers.getAllWhiteTeas();
                const dark_teas = dark_tea_result.data.Data.map(tea => ({
                    ...tea,
                    tea_category: 'DarkTeas'
                }));
                const red_teas = red_tea_result.data.Data.map(tea => ({
                    ...tea,
                    tea_category: 'RedTeas'
                }));
                const white_teas = white_tea_result.data.Data.map(tea => ({
                    ...tea,
                    tea_category: 'WhiteTeas'
                }));

                const tea_result = [...dark_teas, ...red_teas, ...white_teas];
                if (tea_result) {
                    const teas = tea_result.map(tea => ({
                        id: tea.tea_id,
                        name: tea.tea_name,
                        price: tea.tea_price,
                        description: tea.tea_description,
                        // imageUrl: tea.tea_image.split(',')[0],
                        imageUrl: tea.tea_image,
                        category: tea.tea_category,
                    }));

                    const randomTeas = teas.sort(() => 0.5 - Math.random()).slice(0, 6);
                    setTeaProducts(randomTeas);
                } else {
                    console.error('Unexpected data format:', dark_tea_result, red_tea_result, white_tea_result);
                }
            } catch (error) {
                console.error('Error fetching tea products:', error);
            }
        };

        fetchTeaProducts();
    }, []);

    const handleCardClick = (tea) => {
        setSelectedTea(tea);
    };

    const closeModal = () => {
        setSelectedTea(null);
    };

    if (!teaProducts || teaProducts.length === 0) {
        return (
            <div className="product_cards-container">
                <p className="product_cards-not">网络错误，请稍后再试</p>
            </div>
        );
    }

    return (
        <div className="product_cards-container">
            <div className="product_cards-header">
                <Link to="/index/products" className="product_cards-header">茶叶产品</Link>
            </div>
            <div className="product_cards-containers">
                {teaProducts.map((tea, index) => (
                    <div
                        key={index}
                        className="product_cards-card"
                        onClick={() => handleCardClick(tea)}
                    >
                        <div className='product_cards-image-container'>
                        <img
                            src={
                                tea.imageUrl
                                    ? enums.urlEnums.defineUrl('image') + tea.category + '/' + tea.imageUrl.split(',')[0]
                                    : DEFAULT_IMAGE
                            }
                            alt={`${tea.name || '默认'}的照片`}
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

            <Components.ProductModal selectedProduct={selectedTea} onClose={closeModal} />
        </div>
    );
};

export default ProductCards;
