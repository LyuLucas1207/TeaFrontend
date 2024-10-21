import React, { useState } from 'react';
import '../../css/AddingTea.css';
import { addingTea } from '../utility/sendRequest';
import { TEA_CATEGORIES, TEA_SUBCATEGORIES } from '../utility/teaMap';
import NotFound from './NotFound';

const DEFAULT_IMAGE = '/glask.png'; // 默认图片路径



const AddingTea = () => {
    const [teaInfo, setTeaInfo] = useState({
        name: '',
        category: TEA_CATEGORIES[0].value, // 默认类别
        subcategory: TEA_SUBCATEGORIES[TEA_CATEGORIES[0].value][0].value, // 默认子分类
        description: '',
        price: '',
        quantity: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(DEFAULT_IMAGE); // 图片预览状态
    const [notfound, setNotfound] = useState(false); // 控制是否找到用户

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeaInfo({ ...teaInfo, [name]: value });
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        const subcategories = TEA_SUBCATEGORIES[category];
        setTeaInfo({
            ...teaInfo,
            category,
            subcategory: subcategories[0]?.value || '', // 设置对应的第一个子分类
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // 设置预览图片
            setTeaInfo({ ...teaInfo, image: file });
        } else {
            setImagePreview(DEFAULT_IMAGE); // 使用默认图片
            setTeaInfo({ ...teaInfo, image: null });
        }
    };

    const handleImageError = () => {
        setImagePreview(DEFAULT_IMAGE); // 图片加载失败时显示默认图片
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let teaData = { ...teaInfo };

        // 如果没有上传图片，使用默认图片
        if (!teaInfo.image) {
            teaData.image = new File(
                [await fetch(DEFAULT_IMAGE).then((res) => res.blob())],
                'default.png',
                { type: 'image/png' }
            );
        }

        const response = await addingTea(teaData);
        if (response.status === 200) {
            alert('茶叶添加成功！');
        } else if (response.status === 403) {
            setNotfound(true);
        } else {
            alert(`错误: ${response.msg}`);
        }
    };

    return notfound ? (
        <NotFound message="token过期,请重新登录" link="/admin.html" />
    ) : (
        <div className='admin-addingtea-outer'>
            <div className="admin-addingtea-container">
                <h2 className="admin-addingtea-title">添加茶叶</h2>
                <form className="admin-addingtea-form" onSubmit={handleSubmit}>
                    <div className='admin-addingtea-box-outer'>

                        <div className='admin-addingtea-box-container'>
                            <div className="admin-addingtea-field">
                                <label htmlFor="image">茶叶图片:</label>
                                <img
                                    src={imagePreview}
                                    alt="茶叶预览"
                                    className="admin-addingtea-image-preview"
                                    onError={handleImageError}
                                />
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                                <button
                                    type="button"
                                    className="admin-addingtea-upload-button"
                                    onClick={() => document.getElementById('image').click()}
                                >
                                    选择图片
                                </button>

                            </div>
                        </div>

                        <div className='admin-addingtea-box-container'>
                            <div className="admin-addingtea-field">
                                <label htmlFor="name">茶叶名字:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={teaInfo.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="admin-addingtea-field">
                                <label htmlFor="category">茶叶分类:</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={teaInfo.category}
                                    onChange={handleCategoryChange}
                                    required
                                >
                                    {TEA_CATEGORIES.map((tea) => (
                                        <option key={tea.value} value={tea.value}>
                                            {tea.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="admin-addingtea-field">
                                <label htmlFor="subcategory">子分类:</label>
                                <select
                                    id="subcategory"
                                    name="subcategory"
                                    value={teaInfo.subcategory}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {TEA_SUBCATEGORIES[teaInfo.category].map((sub) => (
                                        <option key={sub.value} value={sub.value}>
                                            {sub.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="admin-addingtea-field">
                                <label htmlFor="price">茶叶价格 (¥):</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={teaInfo.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="admin-addingtea-field">
                                <label htmlFor="quantity">茶叶数量:</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    value={teaInfo.quantity}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="admin-addingtea-field">
                        <label htmlFor="description">茶叶描述:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={teaInfo.description}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="admin-addingtea-button">
                        添加茶叶
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddingTea;
