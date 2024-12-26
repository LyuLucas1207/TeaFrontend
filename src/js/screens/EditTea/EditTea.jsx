import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import enums from '../../utils/enums/enums';
import controllers from '../../utils/controllers/controllers';
import './style.css';

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

const EditTea = () => {
    const location = useLocation();
    const tea = location.state?.product;

    const [teaInfo, setTeaInfo] = useState({
        original_name: tea?.original_name || '',
        name: tea?.name || '',
        category: tea?.category || TEA_CATEGORIES[0].value,
        subcategory: tea?.subcategory || TEA_SUBCATEGORIES[tea?.category || TEA_CATEGORIES[0].value][0]?.value,
        description: tea?.description || '',
        price: tea?.price || '',
        quantity: tea?.quantity || '',
    });

    console.log(tea);

    // const [images, setImages] = useState(tea?.imageUrl.split(',') || []);
    // const [newImages, setNewImages] = useState([]);
    const images = tea?.imageUrl ? tea.imageUrl.split(',') : [];
    const [showConfirm, setShowConfirm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeaInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setTeaInfo((prev) => ({
            ...prev,
            category,
            subcategory: TEA_SUBCATEGORIES[category][0]?.value || '',
        }));
    };

    // const handleImageChange = (e) => {
    //     const files = Array.from(e.target.files);
    //     setNewImages((prev) => [...prev, ...files]);
    // };

    // const handleRemoveImage = (index) => {
    //     setImages((prev) => prev.filter((_, i) => i !== index));
    // };

    // const handleRemoveNewImage = (index) => {
    //     setNewImages((prev) => prev.filter((_, i) => i !== index));
    // };

    const openConfirmModal = () => setShowConfirm(true);
    const closeConfirmModal = () => setShowConfirm(false);

    const handleSubmit = async () => {
        const teaData = {
            ...teaInfo,
            // images: [...images, ...newImages],
        };

        try {
            const result = await controllers.teaControllers.updateTea(teaData);
            if (result) {
                alert('茶叶信息更新成功');
                setShowConfirm(false);
                window.location.replace('/adminhome');
                window.location.reload();

            } else {
                alert('更新失败');
            }
        } catch (error) {
            console.error('Error updating tea:', error);
        }
    };

    return (
        <div className="edit-tea-container">
            <h2 className="edit-tea-title">编辑茶叶信息 - {teaInfo.original_name}</h2>
            <form className="edit-tea-form">
                <div className="edit-tea-field">
                    <label htmlFor="name">茶叶名称：</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={teaInfo.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="edit-tea-field">
                    <label htmlFor="category">茶叶分类：</label>
                    <select
                        id="category"
                        name="category"
                        value={teaInfo.category}
                        onChange={handleCategoryChange}
                        required
                    >
                        {TEA_CATEGORIES.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="edit-tea-field">
                    <label htmlFor="subcategory">子分类：</label>
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

                <div className="edit-tea-field">
                    <label htmlFor="description">描述：</label>
                    <textarea
                        id="description"
                        name="description"
                        value={teaInfo.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>

                <div className="edit-tea-field">
                    <label htmlFor="price">价格：</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={teaInfo.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="edit-tea-field">
                    <label htmlFor="quantity">数量：</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={teaInfo.quantity}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="edit-tea-images">
                    <h3>当前图片：</h3>
                    <div className="image-preview-container">
                        {images.map((image, index) => (
                            <div key={index} className="image-preview">
                                <img
                                    src={`${enums.urlEnums.defineUrl('image')}${tea.category}/${image}`}
                                    alt={`茶叶图片 ${index + 1}`}
                                />
                                {/* <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="remove-image-button"
                                >
                                    删除
                                </button> */}
                            </div>
                        ))}
                    </div>

                    {/* <h3>新图片：</h3>
                    <div className="image-preview-container">
                        {newImages.map((image, index) => (
                            <div key={index} className="image-preview">
                                <img src={URL.createObjectURL(image)} alt={`新图片 ${index + 1}`} />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveNewImage(index)}
                                    className="remove-image-button"
                                >
                                    删除
                                </button>
                            </div>
                        ))}
                    </div> */}

                    {/* <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="add-image-input"
                    /> */}
                </div>

                <button type="button" onClick={openConfirmModal} className="edit-tea-submit">
                    提交更改
                </button>
            </form>

            <ConfirmModal
                isOpen={showConfirm}
                message="确认要提交这些更改吗？"
                onConfirm={handleSubmit}
                onCancel={closeConfirmModal}
            />
        </div>
    );
};

export default EditTea;
