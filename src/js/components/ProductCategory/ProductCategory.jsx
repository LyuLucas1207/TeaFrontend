// import React, { useEffect, useState, forwardRef } from 'react';
// import controllers from '../../utils/controllers/controllers';
// import enums from '../../utils/enums/enums';

// import './style.css';

// const CategoryProducts = forwardRef(({ categoryKey, title, onProductClick }, ref) => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchCategoryTeas = async () => {
//             try {
//                 let result;
//                 if (categoryKey === 'DarkTeas') {
//                     result = await controllers.teaControllers.getAllDarkTeas();
//                 } else if (categoryKey === 'RedTeas') {
//                     result = await controllers.teaControllers.getAllRedTeas();
//                 } else if (categoryKey === 'WhiteTeas') {
//                     result = await controllers.teaControllers.getAllWhiteTeas();
//                 }

//                 const teas = result.data.Data.map(tea => ({
//                     id: tea.tea_id,
//                     name: tea.tea_name,
//                     price: tea.tea_price,
//                     description: tea.tea_description,
//                     imageUrl: tea.tea_image.split(',')[0],
//                     category: categoryKey
//                 }));

//                 setProducts(teas);
//             } catch (error) {
//                 console.error(`Error fetching ${categoryKey}:`, error);
//             }
//         };

//         fetchCategoryTeas();
//     }, [categoryKey]);

//     return (
//         <div className="product_category-section" ref={ref}>
//             <h2 className="product_category-title">{title}</h2>
//             <div className="product_cards-containers">
//                 {products && products.length > 0 ? (
//                     products.map((product, index) => (
//                         <div
//                             key={product.id || index}
//                             className="product_cards-card"
//                             onClick={() => onProductClick(product)}
//                         >
//                             <div className='product_cards-image-container'>
//                                 <img
//                                     src={enums.urlEnums.defineUrl('image') + product.category + '/' + product.imageUrl}
//                                     alt={product.name}
//                                     className="product_cards-image"
//                                 />
//                             </div>
//                             <div className="product_cards-info">
//                                 <div className="product_cards-title">{product.name}</div>
//                                 <div className="product_cards-description">
//                                     <span>茶叶描述：</span>
//                                     <br />
//                                     <span>{product.description.substring(0, 50)}...</span>
//                                 </div>
//                                 <div className="product_cards-price">价格：¥{product.price}</div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="product_cards-not">暂无数据</p>
//                 )}
//             </div>
//         </div>
//     );
// });

// export default CategoryProducts;
import React, { useEffect, useState, forwardRef } from 'react';
import controllers from '../../utils/controllers/controllers';
import enums from '../../utils/enums/enums';

import './style.css';

const ProductCategory = forwardRef(({ categoryKey, title, onProductClick }, ref) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchCategoryTeas = async () => {
            try {
                let result;
                if (categoryKey === 'DarkTeas') {
                    result = await controllers.teaControllers.getAllDarkTeas();
                } else if (categoryKey === 'RedTeas') {
                    result = await controllers.teaControllers.getAllRedTeas();
                } else if (categoryKey === 'WhiteTeas') {
                    result = await controllers.teaControllers.getAllWhiteTeas();
                } else {
                    setProducts([]);
                    return;
                }

                const teas = result.data.Data.map(tea => ({
                    id: tea.tea_id,
                    name: tea.tea_name,
                    price: tea.tea_price,
                    description: tea.tea_description,
                    // imageUrl: tea.tea_image.split(',')[0],
                    imageUrl: tea.tea_image,
                    category: categoryKey
                }));

                setProducts(teas);
            } catch (error) {
                console.error(`Error fetching ${categoryKey}:`, error);
            }
        };

        fetchCategoryTeas();
    }, [categoryKey]);

    return (
        <div className="product_Category-section" ref={ref}>
            <h2 className="product_Category-title">{title}</h2>
            <div className="product_Category-containers">
                {products && products.length > 0 ? (
                    products.map((product, index) => (
                        <div
                            key={product.id || index}
                            className="product_Category-card"
                            onClick={() => onProductClick(product)}
                        >
                            <div className='product_Category-image-container'>
                                <img
                                    src={enums.urlEnums.defineUrl('image') + product.category + '/' + product.imageUrl.split(',')[0]}
                                    alt={product.name}
                                    className="product_Category-image"
                                />
                            </div>
                            <div className="product_Category-info">
                                <div className="product_Category-title">{product.name}</div>
                                <div className="product_Category-description">
                                    <span>茶叶描述：</span>
                                    <br />
                                    <span>{product.description.substring(0, 50)}...</span>
                                </div>
                                <div className="product_Category-price">价格：¥{product.price}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="product_Category-not">暂无数据</p>
                )}
            </div>
        </div>
    );
});

export default ProductCategory;
