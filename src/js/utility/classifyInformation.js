import React from 'react';
import { Link } from 'react-router-dom';
import { setToken } from './tokenTool';

function classifyCode(status = 999, code = 999, data = null) {
    switch (status) {
        case 200:
            return status_200(code, data);
        case 201:
            return status_201(code, data);
        case 500:
            return status_500(code, data);
        case 400:
            return status_400(code, data);
        case 401:
            return status_401(code, data);
        case 403:
            return status_403(code, data);
        case 409:
            return status_409(code, data);
        default:
            return status_default();
    }
}

function status_200(code, data) {
    switch (code) {
        case 0:
            alert("登录成功！" + data.msg);
            setToken(data.data.token);
            window.location.href = '/admin_home.html';
            break;
        case 1:
            alert("信息请求成功！" + data.msg);
            break;
        case 2:
            alert("密码错误，请重试！" + data.msg);
            break;
        case 3:
            alert("邮箱不存在，请检查输入！" + data.msg);
            break;
        case 4:
            alert("你在瞎搞什么？" + data.msg);
            break;
        case 5:
            console.log("身份验证成功！" + data.msg);
            break;
        case 6:
            alert("验证码发送成功！请查收！" + data.msg);
            break;
        default:
            alert("未知错误，请重试！" + data.msg);
            break;
    }
    return { status: 200, code: code, data: data.data, msg: data.msg };
}

function status_201(code, data) {
    switch (code) {
        case 0:
            alert("注册成功！" + data.msg);
            setToken(data.data.token);
            window.location.href = '/admin_home.html';
            break;
        default:
            alert("未知错误，请重试！" + data.msg);
            break;
    }
    return { status: 201, code: code, data: data.data, msg: data.msg };
}

function status_500(code, data) {
    switch (code) {
        case 1:
            alert("服务器错误，请稍后重试！" + data.msg);
            break;
        case 2:
            alert("无法读取用户数据，服务器文件可能损坏或者格式失败！" + data.msg);
            break;
        default:
            alert("未知错误，请重试！" + data.msg);
            break;
    }
    return { status: 500, code: code, data: data.data, msg: data.msg };
}

function status_400(code, data) {
    switch (code) {
        case 1:
            alert("请求错误，请检查参数！" + data.msg);
            break;
        case 2:
            alert("请求错误，请检查参数！" + data.msg);
            break;
        default:
            alert("未知错误，请重试！" + data.msg);
            break;
    }
    return { status: 400, code: code, data: data.data, msg: data.msg };
}

function status_401(code, data) {
    switch (code) {
        case 1:
            alert("未登录，请先登录！" + data.msg);
            break;
        default:
            alert("未知错误，请重试！" + data.msg);
            break;
    }
    return { status: 401, code: code, data: data.data, msg: data.msg };
}

function status_403(code, data) {
    switch (code) {
        case 1:
            alert("需要重新登录！" + data.msg);
            break;
        case 2:
            alert("验证码错误" + (data && data.msg ? data.msg : ''));
            break;
        case 3:
            alert("错误的邀请码，请检查输入！" + data.msg);
            break;
        case 4:
            alert("无验证码，请先获取验证码！" + data.msg);
            break;
        case 5:
            alert("验证码已过期" + data.msg);
            break
        default:
            alert("未知错误，请重试！" + data.msg);
            break;
    }
    return { status: 403, code: code, data: data.data, msg: data.msg };
}

function status_409(code, data) {
    switch (code) {
        case 1:
            alert("用户已存在，请直接登录！" + data.msg);
            break;
        case 2:
            alert("错误的邀请码，请检查输入！" + data.msg);
            break;
        default:
            alert("未知错误，请重试！" + data.msg);
            break;
    }
    return { status: 409, code: code, data: data.data, msg: data.msg };
}

function status_default() {
    alert("未知错误，请重试！");
    return { status: 999, code: 999, data: null, msg: '未知错误，请重试！' };
}

function classifyLink(link) {
    const linkStyle = {
        top: '50px',
        fontSize: '1.2rem',
        color: 'var(--link-text-color)',
        backgroundColor: 'var(--link-bg-color)',
        textDecoration: 'none',
        padding: '12px 24px',
        borderRadius: '5px',
        boxShadow: '0 4px 10px rgba(0, 123, 255, 0.2)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    };

    const linkHoverStyle = {
        backgroundColor: 'var(--link-hover-bg-color)',
        boxShadow: '0 6px 14px rgba(0, 86, 179, 0.3)',
    };

    const handleHover = (e, isHover) => {
        e.target.style.backgroundColor = isHover ? linkHoverStyle.backgroundColor : linkStyle.backgroundColor;
        e.target.style.boxShadow = isHover ? linkHoverStyle.boxShadow : linkStyle.boxShadow;
    };

    switch (link) {
        case '/login':
            return (
                <Link to={link} className="link_element" style={linkStyle} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)}>Go to Login</Link>
            );
        case '/admin.html':
            return (
                <a href="admin.html" className="link_element" style={linkStyle} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)}>Go to Admin Page</a>
            );
        case '/admin_home.html':
            return (
                <a href="admin.html" className="link_element" style={linkStyle} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)}>Go to Admin Page</a>
            );
        default:
            // 默认返回首页链接
            return (
                <Link to="/" className="link_element" style={linkStyle} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)}>Go Back to Home</Link>
            );
    }
}

export { classifyCode, classifyLink };