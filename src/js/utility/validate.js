import { useEffect } from 'react';

function validateUrl(Component) {
    const HashWrapper = (props) => {
        useEffect(() => {
            if (!window.location.hash) {
                window.location.hash = "/#/";
            }
        }, []);

        // 渲染传递进来的组件，并传递所有 props
        return <Component {...props} />;
    }

    return HashWrapper;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); // 返回 true 表示合法邮箱
}

function validatePassword(password) {
    // 密码为 6 到 20 个字符，且不含空格
    const passwordRegex = /^\S{6,20}$/;
    return passwordRegex.test(password);
}

function validateInviteCode(inviteCode) {
    // 邀请码为 6 位，且只能包含大小写字母和数字
    const inviteCodeRegex = /^[A-Za-z0-9]{6,20}$/;
    return inviteCodeRegex.test(inviteCode);
}

function validateStudentId(studentId) {
    // 学号为 6 到 12 位数字
    const studentIdRegex = /^\d{6,12}$/;
    return studentIdRegex.test(studentId);
}

function validateEmailCode(emailcode) {
    // 验证码为 6 位数字
    const emailcodeRegex = /^\d{6}$/;
    return emailcodeRegex.test(emailcode);
}

export { validateUrl, validateEmail, validatePassword, validateInviteCode, validateStudentId, validateEmailCode };
