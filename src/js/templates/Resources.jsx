import React, { useEffect, useState } from 'react';
import '../../css/Resources.css'; // 引入样式文件
import { deleteStaff, getDatas, deleteTea } from '../utility/sendRequest';
import { TEA_CATEGORIES, TEA_SUBCATEGORIES } from '../utility/teaMap'; // 引入茶叶分类信息
import NotFound from './NotFound';

function defineUrl() {
    if (process.env.NODE_ENV === 'development') {
        return 'https://192.168.1.64:10002';
    }
    return 'https://www.lucaslyu.com:10002';
}

const AllStaff = () => {
    const [staffList, setStaffList] = useState(null);
    const [notfound, setNotfound] = useState(false);
    const token = localStorage.getItem('token'); // 获取 token

    useEffect(() => {
        if (!token) {
            setNotfound(true); // 如果没有 token，显示 NotFound
            return;
        }

        const fetchStaff = async () => {
            const result = await getDatas('/AllStaff', 'staff');
            console.log(result);

            if (result.status === 403) {
                console.log('token过期');
                setNotfound(true); // token 过期时显示 NotFound
            } else if (!result.data || Object.keys(result.data).length === 0) {
                setStaffList([]); // 没有数据时设置空数组
            } else {
                setStaffList(result.data);
            }
        };

        fetchStaff();
    }, [token]); // token 作为依赖项

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('确定要删除该员工吗？');
        if (!confirmDelete) return;

        try {
            const result = await deleteStaff(id);
            if (result.status === 200) {
                const updatedList = { ...staffList };
                delete updatedList[id];
                setStaffList(updatedList); // 更新员工列表
            } else if (result.status === 403) {
                setNotfound(true); // token 过期时显示 NotFound
            } else {
                alert(`删除失败: ${result.msg}`);
            }
        } catch (error) {
            alert(`请求出错: ${error.message}`);
        }
    };

    if (notfound) {
        return <NotFound message="token过期,请重新登录" link="/admin.html" />;
    }

    if (!staffList || staffList.length === 0) {
        return (
            <div className="resources_all-staff-container">
                <h1>公司成员</h1>
                <p>暂无员工信息</p>
            </div>
        );
    }

    return (
        <div className="resources_all-staff-container">
            <h1>公司成员</h1>
            <div className="resources_all-staff-grid">
                {Object.entries(staffList).map(([id, staff]) => (
                    <div key={id} className="resources_all-staff-card">
                        <img
                            src={defineUrl() + staff.imageUrl}
                            alt={`${staff.name}的照片`}
                            className="resources_all-staff-image"
                        />
                        <div className="resources_all-staff-info">
                            <div className="resources_all-staff-info-header">
                                <h2>{staff.name}</h2>
                                <div className='resources_all-staff-info-p'>职位: {staff.position}</div>
                                <div className='resources_all-staff-info-p'>描述: {staff.description}</div>
                                <div className='resources_all-staff-info-p'>入职日期: {staff.startDate}</div>
                            </div>
                            <button
                                className="resources_all-staff-delete-button"
                                onClick={() => handleDelete(id)}
                            >
                                删除
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 获取 category 的 label
const getCategoryLabel = (categoryValue) => {
    const category = TEA_CATEGORIES.find(item => item.value === categoryValue);
    return category ? category.label : categoryValue;
};

// 获取 subcategory 的 label
const getSubcategoryLabel = (categoryValue, subcategoryValue) => {
    const subcategories = TEA_SUBCATEGORIES[categoryValue] || [];
    const subcategory = subcategories.find(item => item.value === subcategoryValue);
    return subcategory ? subcategory.label : subcategoryValue;
};

const AllTea = () => {
    const [teaList, setTeaList] = useState(null);
    const [notfound, setNotfound] = useState(false);
    const token = localStorage.getItem('token'); // 获取 token

    useEffect(() => {
        if (!token) {
            setNotfound(true); // 如果没有 token，显示 NotFound
            return;
        }

        const fetchTea = async () => {
            const result = await getDatas('/AllTea', 'tea');
            console.log(result);

            if (result.status === 403) {
                console.log('token过期');
                setNotfound(true); // token 过期时显示 NotFound
            } else if (!result.data || Object.keys(result.data).length === 0) {
                setTeaList([]); // 没有数据时设置空数组
            } else {
                setTeaList(result.data);
            }
        };

        fetchTea();
    }, [token]); // token 作为依赖项

    const handleDelete = async (id, category, subcategory) => {
        const confirmDelete = window.confirm('确定要删除该茶叶吗？');
        if (!confirmDelete) return;

        try {
            const result = await deleteTea(id, category, subcategory);
            if (result.status === 200) {
                const updatedList = { ...teaList };
                delete updatedList[id];
                setTeaList(updatedList); // 更新茶叶列表
            } else if (result.status === 403) {
                setNotfound(true); // token 过期时显示 NotFound
            } else {
                alert(`删除失败: ${result.msg}`);
            }
        } catch (error) {
            alert(`请求出错: ${error.message}`);
        }
    };

    if (notfound) {
        return <NotFound message="token过期,请重新登录" link="/admin.html" />;
    }

    if (!teaList || teaList.length === 0) {
        return (
            <div className="resources_all-tea-container">
                <h1>茶叶信息</h1>
                <p>暂无茶叶信息</p>
            </div>
        );
    }

    return (
        <div className="resources_all-tea-container">
            <h1>茶叶信息</h1>
            <div className="resources_all-tea-grid">
                {Object.entries(teaList).map(([id, tea]) => (
                    <div key={id} className="resources_all-tea-card">
                        <img
                            src={defineUrl() + tea.imageUrl}
                            alt={`${tea.name}的照片`}
                            className="resources_all-tea-image"
                        />
                        <div className="resources_all-tea-info">
                            <h2>{tea.name}</h2>
                            <p>分类: {getCategoryLabel(tea.category)}</p>
                            <p>子分类: {getSubcategoryLabel(tea.category, tea.subcategory)}</p>
                            <p>描述: {tea.description}</p>
                            <p>价格: ¥{tea.price}</p>
                            <p>库存: {tea.quantity}</p>
                            <button
                                className="resources_all-tea-delete-button"
                                onClick={() => handleDelete(id, tea.category, tea.subcategory)}
                            >
                                删除
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

function GetTea(name) {
    const [teaList, setTeaList] = useState(null);
    const [notfound, setNotfound] = useState(false);
    const token = localStorage.getItem('token'); // 获取 token

    useEffect(() => {
        if (!token) {
            setNotfound(true); // 如果没有 token，显示 NotFound
            return;
        }
        const fetchTea = async () => {
            const result = await getDatas('/GetTea', 'tea',  name);
            console.log(result);

            if (result.status === 403) {
                console.log('token过期');
                setNotfound(true); // token 过期时显示 NotFound
            } else if (!result.data || Object.keys(result.data).length === 0) {
                setTeaList([]); // 没有数据时设置空数组
            } else {
                setTeaList(result.data);
            }
        };

        fetchTea();
    }, [token, name]); // token 和 name 作为依赖项

    const handleDelete = async (id, category, subcategory) => {
        const confirmDelete = window.confirm('确定要删除该茶叶吗？');
        if (!confirmDelete) return;

        try {
            const result = await deleteTea(id, category, subcategory);
            if (result.status === 200) {
                const updatedList = { ...teaList };
                delete updatedList[id];
                setTeaList(updatedList); // 更新茶叶列表
            } else if (result.status === 403) {
                setNotfound(true); // token 过期时显示 NotFound
            } else {
                alert(`删除失败: ${result.msg}`);
            }
        } catch (error) {
            alert(`请求出错: ${error.message}`);
        }
    };

    if (notfound) {
        return <NotFound message="token过期,请重新登录" link="/admin.html" />;
    }

    if (!teaList || teaList.length === 0) {
        return (
            <div className="resources_all-tea-container">
                <h1>茶叶信息</h1>
                <p>暂无茶叶信息</p>
            </div>
        );
    }

    return (
        <div className="resources_all-tea-container">
            <h1>茶叶信息</h1>
            <div className="resources_all-tea-grid">
                {Object.entries(teaList).map(([id, tea]) => (
                    <div key={id} className="resources_all-tea-card">
                        <img
                            src={defineUrl() + tea.imageUrl}
                            alt={`${tea.name}的照片`}
                            className="resources_all-tea-image"
                        />
                        <div className="resources_all-tea-info">
                            <h2>{tea.name}</h2>
                            <p>分类: {getCategoryLabel(tea.category)}</p>
                            <p>子分类: {getSubcategoryLabel(tea.category, tea.subcategory)}</p>
                            <p>描述: {tea.description}</p>
                            <p>价格: ¥{tea.price}</p>
                            <p>库存: {tea.quantity}</p>
                            <button
                                className="resources_all-tea-delete-button"
                                onClick={() => handleDelete(id, tea.category, tea.subcategory)}
                            >
                                删除
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export { AllStaff, AllTea, GetTea };
