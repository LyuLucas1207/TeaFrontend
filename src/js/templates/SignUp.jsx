import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Switch from '../components/Switch';
import Tips from '../components/Tips';
import { useTheme } from '../utility/myUse';
import { validateEmail, validatePassword, validateStudentId, validateInviteCode, validateEmailCode, validateUrl } from '../utility/validate';
import { sendSignupRequest, sendEmailVertifyRequest } from '../utility/sendRequest';
import EarthStar from '../components/EarthStar';
import '../../css/Signup.css';

function handleSubmit(event) {
    event.preventDefault();

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const studentId = event.target.studentId.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const inviteCode = event.target.inviteCode.value;
    const emailcode = event.target.emailcode.value;

    // 验证各个输入框
    if (!firstName || !lastName) {
        alert("请输入姓和名");
        return;
    }

    if (!validateStudentId(studentId)) {
        alert("请输入合法的学生号");
        return;
    }

    if (!validateEmail(email)) {
        alert("请输入合法的邮箱地址");
        return;
    }

    if (!validatePassword(password)) {
        alert("密码至少 6 个字符，且不含空格");
        return;
    }

    if (!validateInviteCode(inviteCode)) {
        alert("邀请码必须为 6 位数字");
        return;
    }

    if (!validateEmailCode(emailcode)) {
        alert("请输入验证码6位数字");
        return;
    }

    sendSignupRequest(firstName, lastName, studentId, email, password, inviteCode, emailcode)
}

function Signup() {
    const [isDarkTheme, toggleTheme] = useTheme();
    const [email, setEmail] = useState(""); // 新增 state 存储邮箱
    const [isChecked, setIsChecked] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const navigator = useNavigate();

    // 切换密码可见性
    const togglePasswordVisibility = () => {
        setIsChecked(!isChecked);
        setPasswordVisible(!isPasswordVisible);
    };

    // 点击发送验证码按钮
    const handleSendEmail = () => {
        if (validateEmail(email)) {
            sendEmailVertifyRequest(email); // 调用发送验证码的请求函数
        } else {
            alert('请输入合法的邮箱地址');
        }
    };

    const handleLoginClick = () => {
        navigator('/login');
    };

    return (
        <div className="signup-form_container">
            <EarthStar num={30} range={100} />
            <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            <div className="signup-form_card">
                <h2 className="signup-form_title">Sign Up</h2>
                <form className="signup-form_form" onSubmit={handleSubmit}>
                    <div className="signup-form_name">
                        <div className="signup-form_name-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" placeholder="Enter your first name" />
                        </div>
                        <div className="signup-form_name-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" placeholder="Enter your last name" />
                        </div>
                    </div>
                    <div className="signup-form_input-group">
                        <label htmlFor="studentId">Student ID</label>
                        <input type="text" id="studentId" placeholder="Enter your student ID" />
                    </div>
                    <div className="signup-form_input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email} // 绑定 state
                            onChange={(e) => setEmail(e.target.value)} // 更新 state
                        />
                        <button type="button" className="signup-form_email-btn" onClick={handleSendEmail}>
                            Send Email
                        </button>
                    </div>
                    <div className="signup-form_input-group">
                        <label htmlFor="password">Password</label>
                        <div className="signup-form_password-wrapper">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                            />
                            <div className='signup-form_tips'>
                                <div className="signup-form_toggle-switch">
                                    <label className="signup-form_switch-label">
                                        <input
                                            type="checkbox"
                                            className="signup-form_checkbox"
                                            checked={isChecked}
                                            onChange={togglePasswordVisibility}
                                        />
                                        <span className="signup-form_slider"></span>
                                    </label>
                                </div>
                                <Tips message='Show password' />
                            </div>
                        </div>
                    </div>
                    <div className="signup-form_input-group">
                        <label htmlFor="inviteCode">Invite Code</label>
                        <input type="text" id="inviteCode" placeholder="Enter your invite code" />
                    </div>
                    <div className="signup-form_input-group">
                        <label htmlFor="emailcode">Email Code</label>
                        <input type="text" id="emailcode" placeholder="Enter your email code" />
                    </div>
                    <button type="submit" className="signup-form_btn">Sign Up</button>
                </form>
                <p className="signup-form_text">
                    Already have an account?
                    <span className="signup-form_link" onClick={handleLoginClick}>Log in</span>
                </p>
            </div>
        </div>
    );
}

export default validateUrl(Signup);
