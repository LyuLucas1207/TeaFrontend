import React from 'react';
import '../../css/Resources.css'; // 引入样式文件
import { deleteStaff } from '../utility/sendRequest';

function defineUrl() {
    if (process.env.NODE_ENV === 'development') {
        return 'https://192.168.1.75:10002';
    }
    return 'https://www.lucaslyu.com:10002';
}

const AllStaff = ({ staffList, setStaffList }) => {
    if (!staffList || Object.keys(staffList).length === 0) {
        return <p>没有员工数据。</p>;
    }

    // 删除员工的处理函数
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('确定要删除该员工吗？');
        if (!confirmDelete) return;

        try {
            const result = await deleteStaff(id, 'staff');
            if (result.status === 200) {
                const updatedList = { ...staffList };
                delete updatedList[id];
                setStaffList(updatedList); // 更新前端显示的员工列表
            } else {
                alert(`删除失败: ${result.msg}`);
            }
        } catch (error) {
            alert(`请求出错: ${error.message}`);
        }
    };

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

