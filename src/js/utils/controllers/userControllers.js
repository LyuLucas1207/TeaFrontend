import enums from '../enums/enums';
import axios from 'axios'; // 引入 axios

async function userLogin(user) {
    const userLoginModel = enums.userEnums.userLogin(user.email, user.password);
    try {
        const result = await axios.post(enums.urlEnums.defineUrl("user"), userLoginModel);
        const body = result.data;
        if (body.message.toLowerCase() === 'success' || body.message === '登录成功') {
            localStorage.setItem('token', body.data.Data.token);
            localStorage.setItem('user', JSON.stringify(body.data.Data.user));
            window.location.href = '/admin_home.html';
            alert('登录成功！');
        }
        return result.data;
    } catch (error) {
        console.error('Error logging in:', error);
    }
}

function userCheck() {
    const token = localStorage.getItem('token');
    if (!token) window.location.href = '/admin.html';
    try {
        const result = axios.post(
            enums.urlEnums.defineUrl("user"), 
            { flag: 'user', event: 'user', action: 'checklogin' },
            { 
                headers: { 
                    Authorization: `Bearer ${token}` ,
                    'Content-Type': 'application/json'
                } ,
                timeout: 5000
            }
        );
        return result;
    } catch (error) {
        console.error('Error checking login:', error);
        window.location.href = '/admin.html';
        window.location.replace('/admin.html');
    }
};

async function userInfoGetByEmail(user) {
    const userInfoGetModel = enums.userEnums.userInfoGetByEmail(user.email);
    const token = localStorage.getItem('token');
    if (!token) window.location.href = '/admin.html';
    try {
        const result = await axios.post(
            enums.urlEnums.defineUrl("user"), 
            userInfoGetModel,
            { 
                headers: { 
                    Authorization: `Bearer ${token}` ,
                    'Content-Type': 'application/json'
                } ,
                timeout: 5000
            }
        );
        return result.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}

async function userInfoGetByPhone (phone){
    const userInfoGetModel = enums.userEnums.userInfoGetByPhone(phone);
    console.log('userInfoGetModel:', userInfoGetModel);
    const token = localStorage.getItem('token');
    if (!token) window.location.href = '/admin.html';
    try {
        const result = await axios.post(
            enums.urlEnums.defineUrl("user"), 
            userInfoGetModel,
            { 
                headers: { 
                    Authorization: `Bearer ${token}` ,
                    'Content-Type': 'application/json'
                } ,
                timeout: 5000
            }
        );
        return result.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}

async function userAll() {
    const userAllModel =enums.userEnums.userAll();
    const token = localStorage.getItem('token');
    if (!token) window.location.href = '/admin.html';
    try {
        const result = await axios.post(
            enums.urlEnums.defineUrl("user"), 
            userAllModel,
            { 
                headers: { 
                    Authorization: `Bearer ${token}` ,
                    'Content-Type': 'application/json'
                } ,
                timeout: 5000
            }
        );
        return result.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}

async function addStaffWithImage(staffData) {
    const formData = new FormData();

    // 添加文本字段
    formData.append('flag', 'user');
    formData.append('event', 'USER');
    formData.append('action', 'ADD');
    formData.append('fields[first_name]', staffData.firstName);
    formData.append('fields[last_name]', staffData.lastName);
    formData.append('fields[email]', staffData.email);
    formData.append('fields[phone_number]', staffData.phoneNumber);
    formData.append('fields[password]', staffData.password);
    formData.append('fields[role_name]', staffData.roleName);

    // 添加图片
    if (staffData.image) {
        formData.append('fields[image]', staffData.image);
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('未登录，请重新登录！');
        }

        const response = await axios.post(enums.urlEnums.defineUrl("user"), formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data; charset=utf-8',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding staff:', error);
        throw error;
    }
}

const userControllers = {
    userLogin,
    userCheck,
    userInfoGetByEmail,
    userInfoGetByPhone,
    userAll,
    addStaffWithImage
}

export default userControllers;