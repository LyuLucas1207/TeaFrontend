import enums from '../enums/enums';
import axios from 'axios'; // 引入 axios

async function getAllTeas(tea_category) {
    const getAllDarkTeasModel = enums.teaEnums.getAllTeas(tea_category);
    try {
        const result = await axios.post(enums.urlEnums.defineUrl(), getAllDarkTeasModel);
        return result.data;
    } catch (error) {
        console.error('Error fetching tea products:', error);
    }
}

async function getAllDarkTeas() {
    return getAllTeas('DarkTeas');
}

async function getAllRedTeas() {
    return getAllTeas('RedTeas');
}

async function getAllWhiteTeas() {
    return getAllTeas('WhiteTeas');
}

async function getLimitTeas(tea_category, tea_subcategory) {
    const getConditionTeasModel = enums.teaEnums.getLimitTeas(tea_category, tea_subcategory);
    try {
        const result = await axios.post(enums.urlEnums.defineUrl(), getConditionTeasModel);
        return result.data;
    } catch (error) {
        console.error('Error fetching tea products:', error);
    }
}

async function getShengPuErTeas() {
    return getLimitTeas('DarkTeas', 'shengpuer_tea');
}

async function getShuPuErTeas() {
    return getLimitTeas('DarkTeas', 'shupuer_tea');
}

async function getGuShuHongTeas() {
    return getLimitTeas('RedTeas', 'gushuhong_tea');
}

async function getGuShuBaiTeas() {
    return getLimitTeas('WhiteTeas', 'gushubai_tea');
}

async function addTeaWithImages(teaData) {
    const formData = new FormData();

    // 添加文本字段
    formData.append('flag', 'tea');
    formData.append('event', 'TEA');
    formData.append('action', 'ADD');
    formData.append('fields[tea_name]', teaData.name);
    formData.append('fields[tea_category]', teaData.category);
    formData.append('fields[tea_subcategory]', teaData.subcategory);
    formData.append('fields[tea_description]', teaData.description);
    formData.append('fields[tea_price]', teaData.price);
    formData.append('fields[tea_quantity]', teaData.quantity);
    formData.append('fields[user_id]', 999);

    // 添加图片文件
    teaData.images.forEach((image, index) => {
        formData.append(`fields[tea_image]`, image);
    });

    try {
        const token = localStorage.getItem('token');
        if (!token) window.location.href = '/admin.html';

        const response = await axios.post(enums.urlEnums.defineUrl(), formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data; charset=utf-8',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding tea:', error);
        throw error;
    }
}

async function updateTea(teaData) {
    const formData = new FormData();
    formData.append('flag', 'tea');
    formData.append('event', 'TEA');
    formData.append('action', 'UPDATE');
    formData.append('fields[tea_original_name]', teaData.original_name);
    formData.append('fields[tea_name]', teaData.name);
    formData.append('fields[tea_category]', teaData.category);
    formData.append('fields[tea_subcategory]', teaData.subcategory);
    formData.append('fields[tea_description]', teaData.description);
    formData.append('fields[tea_price]', teaData.price);
    formData.append('fields[tea_quantity]', teaData.quantity);
    formData.append('fields[user_id]', 999);

    // teaData.images.forEach((image) => {
    //     formData.append('fields[tea_image]', image);
    // });

    try {
        const token = localStorage.getItem('token');
        if (!token) window.location.href = '/admin.html';

        const result = await axios.post(enums.urlEnums.defineUrl(), formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data; charset=utf-8',
            },
        });
        return result.data;
    } catch (error) {
        console.error('Error updating tea:', error);
    }
}


async function deleteTea(tea_name, tea_category) {
    const deleteTeaModel = enums.teaEnums.deleteTea(tea_name, tea_category);
    try {
        const token = localStorage.getItem('token');
        if (!token) window.location.href = '/admin.html';
        const result = await axios.post(enums.urlEnums.defineUrl(), deleteTeaModel,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return result.data;
    } catch (error) {
        console.error('Error deleting tea:', error);
    }
}

async function deleteDarkTea(tea_name) {
    return deleteTea(tea_name, 'DarkTeas');
}

async function deleteRedTea(tea_name) {
    return deleteTea(tea_name, 'RedTeas');
}

async function deleteWhiteTea(tea_name) {
    return deleteTea(tea_name, 'WhiteTeas');
}



const teaControllers = {
    getAllTeas,
    getAllDarkTeas,
    getAllRedTeas,
    getAllWhiteTeas,

    getLimitTeas,
    getShengPuErTeas,
    getShuPuErTeas,
    getGuShuHongTeas,
    getGuShuBaiTeas,

    addTeaWithImages,
    updateTea,

    deleteTea,
    deleteDarkTea,
    deleteRedTea,
    deleteWhiteTea
}

export default teaControllers;