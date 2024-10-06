import React, { useState, useEffect } from 'react';
import '../../css/Setting.css'; // 引入样式文件
import { getUserInfo } from '../utility/sendRequest'; // 假设有一个获取用户信息的函数

const Setting = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        role: ''
    });

    useEffect(() => {
        // 假设你有一个获取用户数据的 API
        const fetchUserInfo = async () => {
            const data = await getUserInfo();
            setUserInfo(data);
        };
        fetchUserInfo();
    }, []);

    return (
        <div className="setting_container">
            <h1 className="setting_title">Settings</h1>

            {/* 个人信息区域 */}
            <div className="setting_section">
                <h2>Personal Information</h2>
                <div className="setting_info-group">
                    <label className="setting_label">First Name:</label>
                    <div className="setting_value">{userInfo.firstName}</div>
                </div>
                <div className="setting_info-group">
                    <label className="setting_label">Last Name:</label>
                    <div className="setting_value">{userInfo.lastName}</div>
                </div>
                <div className="setting_info-group">
                    <label className="setting_label">Phone Number:</label>
                    <div className="setting_value">{userInfo.phoneNumber}</div>
                </div>
                <div className="setting_info-group">
                    <label className="setting_label">Email:</label>
                    <div className="setting_value">{userInfo.email}</div>
                </div>
                <div className="setting_info-group">
                    <label className="setting_label">Role:</label>
                    <div className="setting_value">{userInfo.role}</div>
                </div>
            </div>

            {/* 账户安全区域 */}
            <div className="setting_section">
                <h2>Account Security</h2>
                <div className="setting_info-group">
                    <label className="setting_label">Password:</label>
                    <div className="setting_value">••••••••••</div>
                </div>
                <button className="setting_button">Change Password</button>
            </div>

            {/* 偏好设置区域 */}
            <div className="setting_section">
                <h2>Preferences</h2>
                <div className="setting_info-group">
                    <label className="setting_label">Language:</label>
                    <div className="setting_value">English</div>
                </div>
                <div className="setting_info-group">
                    <label className="setting_label">Theme:</label>
                    <div className="setting_value">Light</div>
                </div>
                <button className="setting_button">Edit Preferences</button>
            </div>
        </div>
    );
};

export default Setting;
