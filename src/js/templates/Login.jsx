// 引入 React 和 Hooks
import { useState } from 'react';

// 引入组件
import Switch from '../components/Switch';
import Tips from '../components/Tips';

// 引入路由和导航相关
import { useNavigate } from 'react-router-dom';

// 引入工具函数、自定义 Hook 和验证函数
import { useTheme, useValidRoute } from '../utility/myUse';
import { validateEmail, validatePassword, validateUrl } from '../utility/validate';
import { sendLoginRequest } from '../utility/sendRequest';
import EarthStar from '../components/EarthStar';

// 引入样式文件
import '../../css/Login.css';

function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!validateEmail(email)) {
        alert("请输入合法的邮箱地址");
        return;
    }

    if (!password) {
        alert("请输入密码");
        return;
    }
    if (!validatePassword(password)) {
        alert("密码至少 6 个字符，且不含空格");
        return;
    }

    sendLoginRequest(email, password);
}

function Login() {
    const validPaths = ['/', '/not-found', '/login', '/signup'];
    useValidRoute(validPaths, 'admin.html#/not-found');
    const [isDarkTheme, toggleTheme] = useTheme(); // 使用自定义 Hook
    const navigate = useNavigate(); // 路由跳转

    const handleSignupClick = () => {
        navigate('/signup'); // 跳转到 /signup
    };

    // 密码可见性切换状态
    const [isChecked, setIsChecked] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsChecked(!isChecked);
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="login-form_container">
            <EarthStar num={30} range={100} />
            <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            <div className="login-form_card">
                <h2 className="login-form_title">Login</h2>
                <form className="login-form_form" onSubmit={handleSubmit}>
                    <div className="login-form_input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="login-form_input-group">
                        <label htmlFor="password">Password</label>
                        <div className="login-form_password-wrapper">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                            />
                            <div className="login-form_tips">
                                <div className="login-form_toggle-switch">
                                    <label className="login-form_switch-label">
                                        <input
                                            type="checkbox"
                                            className="login-form_checkbox"
                                            checked={isChecked}
                                            onChange={togglePasswordVisibility}
                                        />
                                        <span className="login-form_slider"></span>
                                    </label>
                                </div>
                                <Tips message='Show password' />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="login-form_btn">Login</button>
                </form>
                <p className="login-form_signup-text">
                    Don't have an account?
                    <span className="login-form_signup-link" onClick={handleSignupClick}>Sign up</span>
                </p>
            </div>
        </div>
    );
}

export default validateUrl(Login);
