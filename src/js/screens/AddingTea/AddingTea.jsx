import React, { useState } from 'react';
import { PATHS } from '../../constants/paths';
import controllers from '../../utils/controllers/controllers';
import './style.css';

const DEFAULT_IMAGE = PATHS.SRC.ASSETS.IMAGES.TEA_1280;

const TEA_CATEGORIES = [
    { label: '红茶', value: 'RedTeas' },
    { label: '白茶', value: 'WhiteTeas' },
    { label: '黑茶', value: 'DarkTeas' },
];

const TEA_SUBCATEGORIES = {
    RedTeas: [{ label: '古树红茶', value: 'gushuhong_tea' }],
    WhiteTeas: [{ label: '古树白茶', value: 'gushubai_tea' }],
    DarkTeas: [
        { label: '普洱茶（生茶）', value: 'shengpuer_tea' },
        { label: '普洱茶（熟茶）', value: 'shupuer_tea' },
    ],
};

const AddingTea = () => {
    const [teaInfo, setTeaInfo] = useState({
        name: '',
        category: TEA_CATEGORIES[0].value,
        subcategory: TEA_SUBCATEGORIES[TEA_CATEGORIES[0].value][0].value,
        description: '',
        price: '',
        quantity: '',
        images: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]); // 图片预览列表

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
            subcategory: subcategories[0]?.value || '',
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // 获取多张图片文件
        const previews = files.map((file) => URL.createObjectURL(file));

        setImagePreviews(previews); // 更新预览图片
        setTeaInfo({ ...teaInfo, images: files }); // 保存图片文件
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await controllers.teaControllers.addTeaWithImages(teaInfo);
            if (response) {
                alert('添加茶叶成功!' + response.message);
            }
        } catch (error) {
            console.error('Error adding tea:', error);
            alert('添加茶叶时出错，请稍后再试！');
        }
    };

    return (
        <div className="admin-addingtea-outer">
            <div className="admin-addingtea-container">
                <h2 className="admin-addingtea-title">添加茶叶</h2>
                <form className="admin-addingtea-form" onSubmit={handleSubmit}>
                    <div className="admin-addingtea-box-outer">
                        <div className="admin-addingtea-box-container">
                            <div className="admin-addingtea-field">
                                <label htmlFor="images">茶叶图片:</label>
                                <div className="admin-addingtea-image-preview-container">
                                    {imagePreviews.length > 0 ? (
                                        imagePreviews.map((src, index) => (
                                            <img
                                                key={index}
                                                src={src}
                                                alt={`预览图片 ${index + 1}`}
                                                className="admin-addingtea-image-preview"
                                            />
                                        ))
                                    ) : (
                                        <img
                                            src={DEFAULT_IMAGE}
                                            alt="默认预览图片"
                                            className="admin-addingtea-image-preview"
                                        />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="images"
                                    name="images"
                                    multiple // 支持多张图片上传
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                                <button
                                    type="button"
                                    className="admin-addingtea-upload-button"
                                    onClick={() => document.getElementById('images').click()}
                                >
                                    选择图片
                                </button>
                            </div>
                        </div>

                        <div className="admin-addingtea-box-container">
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
