import React, { useState, useEffect } from 'react';
import './styles.css'; // 引入样式文件
// import { getUserInfo, updateUserInfo, sendEmailVertifyRequest } from '../../utility/sendRequest'; // 引入发送验证码的函数


import { validateEmail, validatePassword, validatePhoneNumber, validateEmailCode } from '../../utils/helpers/validate'; // 引入验证函数
import NotFound from '../NotFound/NotFound';
import controllers from '../../utils/controllers/controllers';

const Setting = () => {
    // 使用useState管理表单输入
    const [userInfo, setUserInfo] = useState({
        originalEmail: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    const [emailcode, setEmailcode] = useState('');
    const [editMode, setEditMode] = useState(false); // 控制是否为编辑模式
    const [showPassword, setShowPassword] = useState(false); // 控制密码可见性
    const [notfound, setNotfound] = useState(false);

    // 切换密码可见性
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // 获取用户信息
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const useremail = JSON.parse(localStorage.getItem('user')).email;
                if (!useremail) {
                    window.location.href = '/admin.html';
                    window.location.replace('/admin.html');
                }
                const result = await controllers.userControllers.userInfoGetByEmail({ email: useremail });
                if (result && result.data) {
                    const [ {email, first_name, last_name, phone_number} ] = result.data.Data;
                    setUserInfo({
                        originalEmail: email,
                        firstName : first_name,
                        lastName : last_name,
                        phoneNumber : phone_number,
                        email : email,
                        password : "cannot show"
                    });
                } else {
                    console.warn('No user info found:', result); // 打印警告信息
                    setNotfound(true);
                }
            } catch (error) {
                console.error('Error fetching user info:', error); // 打印错误信息
                setNotfound(true);
            }
        };

        fetchUserInfo();
    }, []);


    // 表单输入变化时的处理函数
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };

    // 提交表单
    const handleSubmit = async (event) => {
        event.preventDefault();

        const { firstName, lastName, phoneNumber, email, password } = userInfo;

        // 验证各个输入框
        if (!firstName || !lastName) {
            alert('请输入姓和名');
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            alert('请输入合法的中国大陆手机号');
            return;
        }

        if (!validateEmail(email)) {
            alert('请输入合法的邮箱地址');
            return;
        }

        if (!validatePassword(password)) {
            alert('密码至少 6 个字符，且不含空格');
            return;
        }

        if (!validateEmailCode(emailcode)) {
            alert('请输入6位数字的验证码');
            return;
        }

        // 调用更新用户信息的函数
        try {
            // await updateUserInfo(userInfo.originalEmail, firstName, lastName, phoneNumber, email, password, emailcode);
            // const result = await getUserInfo();
            // if (result?.data) {
            //     const { email, firstName, lastName, phoneNumber, password } = result.data;
            //     setUserInfo({
            //         originalEmail: email,
            //         firstName,
            //         lastName,
            //         phoneNumber,
            //         email,
            //         password,
            //     });
            //     setEditMode(false); // 成功后退出编辑模式
            // }
        } catch (error) {
            alert(`更新失败: ${error.message}`);
        }
    };

    // 发送邮箱验证码
    const handleSendEmail = () => {
        if (validateEmail(userInfo.email)) {
            //sendEmailVertifyRequest(userInfo.email); // 调用发送验证码的请求函数
        } else {
            alert('请输入合法的邮箱地址');
        }
    };

    return notfound ? (
        <NotFound message="token过期,请重新登录" link="/admin.html" />
    ) : (
        <div className="setting_container">
            <h1 className="setting_title">Settings</h1>
            {!editMode ? (
                <>
                    {/* Personal Information Section */}
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
                    </div>

                    {/* Account Security Section */}
                    <div className="setting_section">
                        <h2>Account Security</h2>
                        <div className="setting_info-group">
                            <label className="setting_label">Password:</label>
                            <div className="setting_value">{showPassword ? userInfo.password : '••••••••••'}</div>
                        </div>

                        {/* Toggle Password Visibility */}
                        <div className="login-form_toggle-switch">
                            <label className="login-form_switch-label">
                                <input
                                    type="checkbox"
                                    className="login-form_checkbox"
                                    checked={showPassword}
                                    onChange={togglePasswordVisibility}
                                />
                                <span className="login-form_slider"></span>
                            </label>
                        </div>
                    </div>

                    {/* Edit Button */}
                    <button className="setting_button" onClick={() => setEditMode(true)}>
                        更改信息
                    </button>
                </>
            ) : (
                <>
                    {/* Edit Information Form */}
                    <form onSubmit={handleSubmit} className="setting_form">
                        <h2>Edit Information</h2>

                        <div className="setting_info-group">
                            <label className="setting_label">Original Email (用于更新):</label>
                            <div className="setting_value">{userInfo.originalEmail}</div>
                        </div>

                        <div className="setting_info-group">
                            <label className="setting_label">First Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                value={userInfo.firstName}
                                onChange={handleInputChange}
                                className="setting_input"
                            />
                        </div>
                        <div className="setting_info-group">
                            <label className="setting_label">Last Name:</label>
                            <input
                                type="text"
                                name="lastName"
                                value={userInfo.lastName}
                                onChange={handleInputChange}
                                className="setting_input"
                            />
                        </div>
                        <div className="setting_info-group">
                            <label className="setting_label">Phone Number:</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={userInfo.phoneNumber}
                                onChange={handleInputChange}
                                className="setting_input"
                            />
                        </div>
                        <div className="setting_info-group">
                            <label className="setting_label">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleInputChange}
                                className="setting_input"
                            />
                        </div>
                        <div className="setting_info-group setting_email-code-group">
                            <div className="setting_verify-email-code">
                                <label htmlFor="emailcode">Email Code</label>
                                <input
                                    type="text"
                                    id="emailcode"
                                    value={emailcode}
                                    onChange={(e) => setEmailcode(e.target.value)}
                                    placeholder="Enter your email code"
                                />
                            </div>
                            <div className="setting_send-email-code">
                                <button type="button" className="setting_button" onClick={handleSendEmail}>
                                    发送验证码
                                </button>
                            </div>
                        </div>

                        <div className="setting_info-group">
                            <label className="setting_label">Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={userInfo.password}
                                onChange={handleInputChange}
                                className="setting_input"
                            />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="setting_button">
                            保存更改
                        </button>

                        {/* Cancel Button */}
                        <button
                            type="button"
                            className="setting_button"
                            onClick={() => setEditMode(false)}
                        >
                            取消
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};



export default Setting;
