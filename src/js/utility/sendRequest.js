import axios from 'axios'; // 引入 axios
import { classifyCode } from './classifyInformation';
// const url = 'https://www.lucaslyu.com:9999'; // 正确使用 HTTPS 和自定义端口
// const url = 'https://192.168.1.75:9999'; // 正确使用 HTTP 和自定义端口

function defineUrl() {
    if (process.env.NODE_ENV === 'development') {
        return 'https://192.168.1.75:10002';
        // return 'https://localhost:10002';
    }
    return 'https://www.lucaslyu.com:10002';
}


async function checkIdentity() {
    const url = defineUrl();
    const token = localStorage.getItem('token');
    if (!token) {
        return classifyCode(401, 1, { msg: '未登录，请先登录！' });
    }

    return await axios.post(url, {
        action: 'checkIdentity' // 发送的数据
    }, {
        headers: {
            'Authorization': `Bearer ${token}`, // 设置请求头
            'Content-Type': 'application/json'
        },
        timeout: 5000
    })
        .then((response) => {
            // 成功请求时处理
            return classifyCode(response.status, response.data.code, response.data);
        })
        .catch((error) => {
            // 捕获错误时处理
            if (error.response) {
                return classifyCode(error.response.status, error.response.data.code, error.response.data);
            }
            return classifyCode(500, 1, { msg: error.message });
        });
}

async function getUserInfo() {
    const url = defineUrl();
    const token = localStorage.getItem('token');
    if (!token) {
        return { status: 401, code: 1, data: null, msg: '未登录，请先登录！' };
    }

    try {
        const response = await axios.post(url, {
            action: 'getUserInfo'
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            timeout: 5000
        });

        console.log(response.data);
        return classifyCode(response.status, response.data.code, response.data);
    } catch (error) {
        if (error.response) {
            return classifyCode(error.response.status, error.response.data.code, error.response.data);
        }
    }
}

async function sendLoginRequest(email, password) {
    const url = defineUrl();
    return await axios.post(url, { // 发送 POST 请求
        action: 'login', // 定义 action 为 login
        email,
        password
    })
        .then((response) => {
            if (response.status === 200) {
                classifyCode(response.status, response.data.code, response.data);
            }
        })
        .catch((error) => {
            if (error.response) {
                classifyCode(error.response.status, error.response.data.code, error.response.data);
            }
            classifyCode(500, 1, { msg: error.message });
        });
}

async function sendSignupRequest(firstName, lastName, phoneNumber, email, password, inviteCode, emailcode) {
    const url = defineUrl();
    return await axios.post(url, { // 发送 POST 请求
        action: 'signup', // 定义 action 为 signup
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        inviteCode,
        emailcode
    })
        .then((response) => {
            if (response.status === 201) {
                classifyCode(response.status, response.data.code, response.data);
            }
        })
        .catch((error) => {
            if (error.response) {
                classifyCode(error.response.status, error.response.data.code, error.response.data);
            }
            classifyCode(500, 1, { msg: error.message });
        });
}

async function sendEmailVertifyRequest(email) {
    const url = defineUrl();
    return await axios.post(url, { // 发送 POST 请求
        action: 'emailVertify', // 定义 action 为 emailVertify
        email
    })
        .then((response) => {
            if (response.status === 200) {
                classifyCode(response.status, response.data.code, response.data);
            }
        })
        .catch((error) => {
            if (error.response) {
                classifyCode(error.response.status, error.response.data.code, error.response.data);
            }
            classifyCode(500, 1, { msg: error.message });
        });
}

async function updateUserInfo(originalEmail, firstName, lastName, phoneNumber, email, password, emailcode) {
    const url = defineUrl();
    const token = localStorage.getItem('token');
    if (!token) {
        return { status: 401, code: 1, data: null, msg: '未登录，请先登录！' };
    }

    try {
        const response = await axios.post(url, {
            action: 'update',
            originalEmail,
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            emailcode
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            timeout: 5000
        });

        return classifyCode(response.status, response.data.code, response.data);
    } catch (error) {
        if (error.response) {
            return classifyCode(error.response.status, error.response.data.code, error.response.data);
        }
    }
}

async function getDatas(action, flag) {
    const url = defineUrl();
    const token = localStorage.getItem('token');
    if (!token) {
        return { status: 401, code: 1, data: null, msg: '未登录，请先登录！' };
    }

    try {
        const response = await axios.post(url, {
            action: action, // 发送的数据 'getProjects'
            flag: flag
        }, {
            headers: {
                'Authorization': `Bearer ${token}`, // 设置请求头
                'Content-Type': 'application/json'
            },
            timeout: 5000
        }); // 设置超时时间为 5 秒
        return classifyCode(response.status, response.data.code, response.data);
    } catch (error) {
        if (error.response) {
            return classifyCode(error.response.status, error.response.data.code, error.response.data);
        }
    }
};

async function addingStaff(staffInfo, flag = 'staff') {
    const url = defineUrl();
    const token = localStorage.getItem('token');

    if (!token) {
        return { status: 401, code: 1, data: null, msg: '未登录，请先登录！' };
    }

    if (staffInfo.image && staffInfo.image.size > 10 * 1024 * 1024) {
        return { status: 400, code: 1, msg: '图片大小不能超过 10MB!' };
    }

    const formData = new FormData();
    formData.append('action', 'addStaff');
    formData.append('flag', flag);
    formData.append('name', staffInfo.name);
    formData.append('position', staffInfo.position);
    formData.append('description', staffInfo.description);
    formData.append('startDate', staffInfo.startDate);
    formData.append('image', staffInfo.image);

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data; charset=utf-8',
            },
            timeout: 5000,
        });

        return classifyCode(response.status, response.data.code, response.data);
    } catch (error) {
        if (error.response) {
            return classifyCode(error.response.status, error.response.data.code, error.response.data);
        }
        return classifyCode(500, 1, { msg: error.message });
    }
}


async function addingTea(teaInfo, flag = 'tea') {
    const url = defineUrl();
    const token = localStorage.getItem('token');

    if (!token) {
        return { status: 401, code: 1, data: null, msg: '未登录，请先登录！' };
    }

    // 检查图片大小是否超过 10MB
    if (teaInfo.image && teaInfo.image.size > 10 * 1024 * 1024) {
        return { status: 400, code: 1, msg: '图片大小不能超过 10MB!' };
    }

    // 使用 FormData 构建请求数据
    const formData = new FormData();
    formData.append('action', 'addTea');
    formData.append('flag', flag);
    formData.append('name', teaInfo.name);
    formData.append('category', teaInfo.category);
    formData.append('subcategory', teaInfo.subcategory);
    formData.append('description', teaInfo.description);
    formData.append('price', teaInfo.price);
    formData.append('quantity', teaInfo.quantity);
    if (teaInfo.image) {
        formData.append('image', teaInfo.image);
    }

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data; charset=utf-8',
            },
            timeout: 5000,
        });

        return classifyCode(response.status, response.data.code, response.data);
    } catch (error) {
        if (error.response) {
            return classifyCode(error.response.status, error.response.data.code, error.response.data);
        }
        return classifyCode(500, 1, { msg: error.message });
    }
}



export {
    checkIdentity,
    getDatas,
    sendLoginRequest,
    sendSignupRequest,
    sendEmailVertifyRequest,
    getUserInfo,
    updateUserInfo,
    addingStaff,
    addingTea
}; // 导出函数

