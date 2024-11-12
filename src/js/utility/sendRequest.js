import axios from 'axios'; // 引入 axios
import { classifyCode } from './classifyInformation';
// const url = 'https://www.lucaslyu.com:9999'; // 正确使用 HTTPS 和自定义端口
// const url = 'https://192.168.1.75:9999'; // 正确使用 HTTP 和自定义端口

function defineUrl() {
    if (process.env.NODE_ENV === 'development') {
        return 'https://192.168.1.64:10002';
        // return 'https://localhost:10002';
    }
    return 'https://www.lucaslyu.com:10002';
}


async function checkIdentity() {
    try {
        console.log("checkIdentity 被调用了");
        const url = defineUrl();
        const token = localStorage.getItem('token');
        if (!token) {
            return classifyCode(401, 1, { msg: '未登录，请先登录！' });
        }

        const response = await axios.post(url, { action: 'checkIdentity' }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
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


async function getUserInfo() {

    try {
        const url = defineUrl();
        const token = localStorage.getItem('token');
        if (!token) {
            return { status: 401, code: 1, data: null, msg: '未登录，请先登录！' };
        }
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


let isSendingRequest = false; // 锁变量
async function sendLoginRequest(email, password) {
    if (isSendingRequest) return; // 如果已有请求在进行，直接返回
    isSendingRequest = true; // 设置锁变量为 true
    try {
        const url = defineUrl();
        const response = await axios.post(url, { // 发送 POST 请求
            action: 'login', // 定义 action 为 login
            email,
            password
        });

        return classifyCode(response.status, response.data.code, response.data);
    } catch (error) {
        if (error.response) {
            return classifyCode(error.response.status, error.response.data.code, error.response.data);
        }
        return classifyCode(500, 1, { msg: error.message });
    } finally {
        isSendingRequest = false; // 请求完成后释放锁
    }

}

let isSendingSignupRequest = false; // 锁变量
async function sendSignupRequest(firstName, lastName, phoneNumber, email, password, inviteCode, emailcode) {
    if (isSendingSignupRequest) return; // 如果已有请求在进行，直接返回
    isSendingSignupRequest = true; // 设置锁变量为 true
    try {
        const url = defineUrl();
        const response = await axios.post(url, { // 发送 POST 请求
            action: 'signup', // 定义 action 为 signup
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            inviteCode,
            emailcode
        });

        return classifyCode(response.status, response.data.code, response.data);
    } catch (error) {
        if (error.response) {
            return classifyCode(error.response.status, error.response.data.code, error.response.data);
        }
        return classifyCode(500, 1, { msg: error.message });
    } finally {
        isSendingSignupRequest = false; // 请求完成后释放锁
    }
}

let isSendingEmailVertifyRequest = false; // 锁变量
async function sendEmailVertifyRequest(email) {
    if (isSendingEmailVertifyRequest) return; // 如果已有请求在进行，直接返回
    isSendingEmailVertifyRequest = true; // 设置锁变量为 true
    try {
        const url = defineUrl();
        const response = await axios.post(url, { // 发送 POST 请求
            action: 'emailVertify', // 定义 action 为 emailVertify
            email
        });

        return classifyCode(response.status, response.data.code, response.data);
    } catch (error) {
        if (error.response) {
            return classifyCode(error.response.status, error.response.data.code, error.response.data);
        }
        return classifyCode(500, 1, { msg: error.message });
    } finally {
        isSendingEmailVertifyRequest = false; // 请求完成后释放锁
    }

    // const url = defineUrl();
    // return await axios.post(url, { // 发送 POST 请求
    //     action: 'emailVertify', // 定义 action 为 emailVertify
    //     email
    // })
    //     .then((response) => {
    //         if (response.status === 200) {
    //             classifyCode(response.status, response.data.code, response.data);
    //         }
    //     })
    //     .catch((error) => {
    //         if (error.response) {
    //             classifyCode(error.response.status, error.response.data.code, error.response.data);
    //         }
    //         classifyCode(500, 1, { msg: error.message });
    //     });
}

let isUpdatingUserInfo = false; // 锁变量
async function updateUserInfo(originalEmail, firstName, lastName, phoneNumber, email, password, emailcode) {
    if (isUpdatingUserInfo) return; // 如果已有请求在进行，直接返回
    isUpdatingUserInfo = true; // 设置锁变量为 true

    try {
        const url = defineUrl();
        const token = localStorage.getItem('token');
        if (!token) {
            return { status: 401, code: 1, data: null, msg: '未登录，请先登录！' };
        }
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
    } finally {
        isUpdatingUserInfo = false; // 请求完成后释放锁
    }
}

async function getDatas(action, flag, obj = null) {
    try {
        const url = defineUrl();
        // const token = localStorage.getItem('token');
        // if (!token) {
        //     return { status: 401, code: 1, data: null, msg: '未登录，请先登录！' };
        // }

        let token = null;
        if (action === '/AllStaff') {
            token = localStorage.getItem('token');
            if (!token) {
                return { status: 401, code: 1, data: null, msg: '未登录，请先登录！' };
            }
        }


        const formData = new FormData();
        formData.append('action', action);
        formData.append('flag', flag);
        if (obj !== null) {
            console.log(obj);
            formData.append('name', obj.name);
        }
        const response = await axios.post(url,formData , {
            headers: {
                'Authorization': `Bearer ${token}`, // 不需要 token
                'Content-Type': 'multipart/form-data; charset=utf-8',
            },
            timeout: 5000
        });
        return classifyCode(response.status, response.data.code, response.data);
    } catch (error) {
        if (error.response) {
            return classifyCode(error.response.status, error.response.data.code, error.response.data);
        }
    }
};

let isAddingStaff = false; // 锁变量
async function addingStaff(staffInfo, flag = 'staff') {
    if (isAddingStaff) return; // 如果已有请求在进行，直接返回
    isAddingStaff = true; // 设置锁变量为 true
    try {
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
    } finally {
        isAddingStaff = false; // 请求完成后释放锁
    }
}

let isDeletingStaff = false; // 锁变量
async function deleteStaff(id) {
    if (isDeletingStaff) return; // 如果已有请求在进行，直接返回
    isDeletingStaff = true; // 设置锁变量为 true
    try {
        const url = defineUrl();
        const token = localStorage.getItem('token');

        if (!token) {
            return { status: 401, code: 1, data: null, msg: '未登录，请先登录！' };
        }

        const formData = new FormData();
        formData.append('action', 'deleteStaff');
        formData.append('flag', 'staff');
        formData.append('id', id);
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
    } finally {
        isDeletingStaff = false; // 请求完成后释放锁
    }
}


let isAddingTea = false; // 锁变量
async function addingTea(teaInfo, flag = 'tea') {
    if (isAddingTea) return; // 如果已有请求在进行，直接返回
    isAddingTea = true; // 设置锁变量为 true
    
    try {
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
    } finally {
        isAddingTea = false; // 请求完成后释放锁
    }
}

let isDeletingTea = false; // 锁变量
async function deleteTea(id, category, subcategory) {
    if (isDeletingTea) return; // 如果已有请求在进行，直接返回
    isDeletingTea = true; // 设置锁变量为 true
    try {
        const url = defineUrl();
        const token = localStorage.getItem('token');

        if (!token) {
            return { status: 401, code: 1, data: null, msg: '未登录，请先登录！' };
        }

        const formData = new FormData();
        formData.append('action', 'deleteTea');
        formData.append('flag', 'tea');
        formData.append('category', category);
        formData.append('subcategory', subcategory);
        formData.append('id', id);
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
    } finally {
        isDeletingTea = false; // 请求完成后释放锁
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
    deleteStaff,
    addingTea,
    deleteTea
}; // 导出函数

