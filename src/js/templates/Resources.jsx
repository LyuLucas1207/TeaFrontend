import React, { useEffect, useState } from 'react';
import '../../css/Resources.css'; // 引入样式文件
import { deleteStaff, getDatas } from '../utility/sendRequest';
import NotFound from './NotFound';

function defineUrl() {
    if (process.env.NODE_ENV === 'development') {
        return 'https://192.168.1.75:10002';
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
            const result = await deleteStaff(id, 'staff');
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
                            <h2>{staff.name}</h2>
                            <p>职位: {staff.position}</p>
                            <p>描述: {staff.description}</p>
                            <p>入职日期: {staff.startDate}</p>
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

export { AllStaff };
