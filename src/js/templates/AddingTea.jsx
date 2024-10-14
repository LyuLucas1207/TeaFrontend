import React, { useState } from 'react';
import '../../css/AddingTea.css';
import { addingTea } from '../utility/sendRequest';
import NotFound from './NotFound';

const DEFAULT_IMAGE = '/glask.png'; // 默认图片路径

const TEA_CATEGORIES = [
    { label: '绿茶', value: 'GreenTea' },
    { label: '红茶', value: 'RedTea' },
    { label: '白茶', value: 'WhiteTea' },
    { label: '青茶', value: 'OolongTea' },
    { label: '黄茶', value: 'YellowTea' },
    { label: '黑茶', value: 'DarkTea' },
];

const TEA_SUBCATEGORIES = {
    GreenTea: [
        { label: '龙井', value: 'Longjing' },
        { label: '碧螺春', value: 'Biluochun' },
        { label: '毛峰', value: 'Maofeng' },
    ],
    RedTea: [
        { label: '祁门红茶', value: 'Keemun' },
        { label: '滇红', value: 'Dianhong' },
        { label: '正山小种', value: 'Lapsang' },
    ],
    WhiteTea: [
        { label: '白毫银针', value: 'SilverNeedle' },
        { label: '白牡丹', value: 'WhitePeony' },
        { label: '寿眉', value: 'Shoumei' },
    ],
    OolongTea: [
        { label: '铁观音', value: 'Tieguanyin' },
        { label: '大红袍', value: 'Dahongpao' },
        { label: '水仙', value: 'Shuixian' },
    ],
    YellowTea: [
        { label: '君山银针', value: 'Junshan' },
        { label: '黄山毛峰', value: 'Huangshan' },
        { label: '莫干黄芽', value: 'Mogan' },
    ],
    DarkTea: [
        { label: '普洱茶', value: 'Puerh' },
        { label: '六堡茶', value: 'Liubao' },
        { label: '安化黑茶', value: 'Anhua' },
    ],
};

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
        <div className="--admin-addingtea-container">
            <h2 className="--admin-addingtea-title">添加茶叶</h2>
            <form className="--admin-addingtea-form" onSubmit={handleSubmit}>
                <div className="--admin-addingtea-field --admin-addingtea-image-field">
                    <label htmlFor="image">茶叶图片:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    <button
                        type="button"
                        className="--admin-addingtea-upload-button"
                        onClick={() => document.getElementById('image').click()}
                    >
                        选择图片
                    </button>
                    <img
                        src={imagePreview}
                        alt="茶叶预览"
                        className="--admin-addingtea-image-preview"
                        onError={handleImageError}
                    />
                </div>

                <div className="--admin-addingtea-field">
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

                <div className="--admin-addingtea-field">
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

                <div className="--admin-addingtea-field">
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

                <div className="--admin-addingtea-field">
                    <label htmlFor="description">茶叶描述:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={teaInfo.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>

                <div className="--admin-addingtea-field">
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

                <div className="--admin-addingtea-field">
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

                <button type="submit" className="--admin-addingtea-button">
                    添加茶叶
                </button>
            </form>
        </div>
    );
};

export default AddingTea;
