import React, { useState } from 'react';
import controllers from '../../utils/controllers/controllers';
import { PATHS } from '../../constants/paths';
import './style.css';

const DEFAULT_IMAGE = PATHS.SRC.ASSETS.IMAGES.TEA_1280;


const ROLES = ['Admin', 'Manager', 'User']; // 角色选项

const AddingStaff = () => {
    const [staffInfo, setStaffInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        roleName: ROLES[0], // 默认角色
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(DEFAULT_IMAGE);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStaffInfo({ ...staffInfo, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // 更新图片预览
            setStaffInfo({ ...staffInfo, image: file });
        } else {
            setImagePreview(DEFAULT_IMAGE); // 使用默认图片
            setStaffInfo({ ...staffInfo, image: null });
        }
    };

    const handleImageError = () => {
        setImagePreview(DEFAULT_IMAGE); // 图片加载失败时显示默认图片
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await controllers.userControllers.addStaffWithImage(staffInfo);
            if (response) {
                alert('员工添加成功！' + response.message);
            } 
        } catch (error) {
            console.error('Error adding staff:', error);
            alert('添加员工时出错，请稍后再试！');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-addingstaff-container">
            <h2 className="admin-addingstaff-title">添加员工</h2>
            <form className="admin-addingstaff-form" onSubmit={handleSubmit}>
                <div className="admin-addingstaff-field">
                    <label htmlFor="image">员工图片:</label>
                    <img
                        src={imagePreview}
                        alt="员工预览"
                        className="admin-addingstaff-image-preview"
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
                        className="admin-addingstaff-upload-button"
                        onClick={() => document.getElementById('image').click()}
                    >
                        选择图片
                    </button>
                </div>

                <div className="admin-addingstaff-field">
                    <label htmlFor="firstName">员工名:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={staffInfo.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="admin-addingstaff-field">
                    <label htmlFor="lastName">员工姓:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={staffInfo.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="admin-addingstaff-field">
                    <label htmlFor="email">邮箱:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={staffInfo.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="admin-addingstaff-field">
                    <label htmlFor="phoneNumber">电话号码:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={staffInfo.phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="admin-addingstaff-field">
                    <label htmlFor="password">密码:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={staffInfo.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="admin-addingstaff-field">
                    <label htmlFor="roleName">角色:</label>
                    <select
                        id="roleName"
                        name="roleName"
                        value={staffInfo.roleName}
                        onChange={handleInputChange}
                        required
                    >
                        {ROLES.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="admin-addingstaff-button" disabled={loading}>
                    {loading ? '提交中...' : '添加员工'}
                </button>
            </form>
        </div>
    );
};

export default AddingStaff;
