// AddingStaff.js
import React, { useState } from 'react';
import '../../css/AddingStaff.css';
import { addingStaff } from '../utility/sendRequest';
import NotFound from './NotFound';
const DEFAULT_IMAGE = '/glask.png'; // 默认图片路径


const AddingStaff = () => {
    const [staffInfo, setStaffInfo] = useState({
        name: '',
        position: '',
        description: '',
        startDate: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(DEFAULT_IMAGE);
    const [notfound, setNotfound] = useState(false); // 控制是否找到用户

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStaffInfo({ ...staffInfo, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // 设置预览图片
            setStaffInfo({ ...staffInfo, image: file });
        } else {
            setImagePreview(DEFAULT_IMAGE); // 使用默认图片
            setStaffInfo({ ...staffInfo, image: null });
        }
    };

    const handleImageError = () => {
        setImagePreview(DEFAULT_IMAGE); // 图片加载失败时使用默认图片
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        let staffData = { ...staffInfo };

        // 如果用户未选择图片，使用默认图片路径
        if (!staffInfo.image) {
            staffData.image = new File(
                [await fetch(DEFAULT_IMAGE).then((res) => res.blob())],
                'default.png',
                { type: 'image/png' }
            );
        }

        const response = await addingStaff(staffData);

        if (response.status === 200) {
            alert('员工添加成功！');
        } else if (response.status === 403) {
            setNotfound(true);
        } else {
            alert(`错误: ${response.msg}`);
        }
    };


    return notfound ? (
        <NotFound message="token过期,请重新登录" link="/admin.html" />
    ) : (
        <div className="--admin-addingstaff-container">
            <h2 className="--admin-addingstaff-title">添加成员</h2>
            <form className="--admin-addingstaff-form" onSubmit={handleSubmit}>
                <div className="--admin-addingstaff-field --admin-addingstaff-image-field">
                    <label htmlFor="image">员工图片:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        style={{ display: 'none' }} // 隐藏原生 input
                    />
                    <button
                        type="button"
                        className="--admin-addingstaff-upload-button"
                        onClick={() => document.getElementById('image').click()} // 触发文件选择
                    >
                        选择图片
                    </button>
                    <img
                        src={imagePreview}
                        alt="员工预览"
                        className="--admin-addingstaff-image-preview"
                        onError={handleImageError}
                    />
                </div>
                <div className="--admin-addingstaff-field">
                    <label htmlFor="name">员工姓名:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={staffInfo.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="--admin-addingstaff-field">
                    <label htmlFor="position">员工职位:</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={staffInfo.position}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="--admin-addingstaff-field">
                    <label htmlFor="description">员工描述:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={staffInfo.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div className="--admin-addingstaff-field">
                    <label htmlFor="startDate">入职日期:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={staffInfo.startDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="--admin-addingstaff-button">
                    添加员工
                </button>
            </form>
        </div>
    );
};

export default AddingStaff;
