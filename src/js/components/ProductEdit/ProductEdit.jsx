import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import controllers from '../../utils/controllers/controllers';
import enums from '../../utils/enums/enums';
import TentLoader from '../Loader/TentLoader'; // 加载动画
import NotFound from '../../screens/NotFound/NotFound'; // 错误页面
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { PATHS } from '../../constants/paths';

import './style.css';

const ProductEdit = ({ categoryKey = null, subCategoryKey = null, title, onProductClick }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // 加载状态
    const [error, setError] = useState(false); // 错误状态
    const [showConfirm, setShowConfirm] = useState(false); // 控制模态框显示
    const [selectedProduct, setSelectedProduct] = useState(null); // 存储要删除的产品
    const DEFAULT_IMAGE = PATHS.SRC.ASSETS.IMAGES.TEA_1280;

    useEffect(() => {
        const fetchCategoryTeas = async () => {
            try {
                const useremail = JSON.parse(localStorage.getItem('user')).email;
                if (!useremail) {
                    window.location.href = '/admin.html';
                    window.location.replace('/admin.html');
                }
                await controllers.userControllers.userCheck();
                let result;
                if (subCategoryKey) {
                    result = await controllers.teaControllers.getLimitTeas(categoryKey, subCategoryKey);
                } else {
                    if (categoryKey === 'All') {
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
                                quantity: tea.tea_quantity,
                                description: tea.tea_description,
                                // imageUrl: tea.tea_image.split(',')[0],
                                imageUrl: tea.tea_image,
                                category: tea.tea_category,
                            }));
                            setProducts(teas);
                        }
                        setLoading(false);
                        return;
                    }
                    result = await controllers.teaControllers.getAllTeas(categoryKey);
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

                console.log('teas:', teas);

                setProducts(teas);
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching ${categoryKey}:`, error);
                setError(true);
                setLoading(false);
                window.location.href = '/admin.html';
                window.location.replace('/admin.html');
            }
        };

        fetchCategoryTeas();
    }, [categoryKey, subCategoryKey]);

    const openConfirmModal = (product) => {
        setSelectedProduct(product);
        setShowConfirm(true);
    };

    const closeConfirmModal = () => {
        setSelectedProduct(null);
        setShowConfirm(false);
    };

    const confirmDelete = async () => {
        setShowConfirm(false); // 隐藏模态框
        try {
            const result = await controllers.teaControllers.deleteTea(selectedProduct.name, selectedProduct.category);
            if (result) {
                alert('删除成功: ' + result.message);
                window.location.reload();
            } else {
                alert('删除失败');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const navigate = useNavigate();

    const handleEdit = (product) => {
        const modifiedProduct = {
            original_name: product.name,
            ...product,
        }
        navigate('/adminhome/edittea', {
            state: {
                product: modifiedProduct,
            },
        });
    };


    if (loading) {
        return <TentLoader />;
    }

    if (error) {
        return <NotFound />;
    }

    return (
        <div className="Product-Edit-section">
            <h2 className="Product-Edit-category-title">{title}</h2>
            <div className="Product-Edit-containers">
                {products && products.length > 0 ? (
                    products.map((product, index) => (
                        <div
                            key={`product-${index}`}
                            className="Product-Edit-card"
                            onClick={() => onProductClick(product)}
                        >
                            <div className='Product-Edit-image-container'>
                            <img
                                src={ product.imageUrl 
                                    ? enums.urlEnums.defineUrl('image') + product.category + '/' + product.imageUrl.split(',')[0] 
                                    : DEFAULT_IMAGE
                                }
                                alt={product.name || 'Default Name'} // 防止 product.name 为 null
                                className="Product-Edit-image"
                            />
                            </div>
                            <div className="Product-Edit-info">
                                <div className="Product-Edit-title">{product.name}</div>
                                <div className="Product-Edit-description">
                                    <span>茶叶描述：</span>
                                    <br />
                                    <span>{product.description.substring(0, 50)}...</span>
                                </div>
                                <div className="Product-Edit-marks">
                                    <div className="Product-Edit-price">茶叶价格：¥{product.price}</div>
                                    <div className="Product-Edit-category">茶叶类别：{product.category}</div>
                                </div>
                            </div>
                            <div className="Product-Edit-button-container" onClick={(e) => e.stopPropagation()}>
                                <button className="Product-Edit-button" onClick={() => handleEdit(product)}>编辑</button>
                                <button className="Product-Edit-button" onClick={() => openConfirmModal(product)}>删除</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="Product-Edit-not">暂无数据</p>
                )}
            </div>

            <ConfirmModal
                isOpen={showConfirm}
                message={`确认要删除茶叶 "${selectedProduct?.name}" 吗？`}
                onConfirm={confirmDelete}
                onCancel={closeConfirmModal}
            />
        </div>
    );
};

export default ProductEdit;
