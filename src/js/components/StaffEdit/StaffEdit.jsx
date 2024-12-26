import React, { useEffect, useState } from 'react';
import controllers from '../../utils/controllers/controllers';
import enums from '../../utils/enums/enums';
import TentLoader from '../Loader/TentLoader'; // 加载动画
import NotFound from '../../screens/NotFound/NotFound'; // 错误页面

import './style.css';

const StaffEdit = ({ title }) => {
    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(true); // 加载状态
    const [error, setError] = useState(false); // 错误状态

    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const response = await controllers.userControllers.userAll();
                const staffData = response.data.Data.map(staff => ({
                    id: staff.user_id,
                    firstName: staff.first_name,
                    lastName: staff.last_name,
                    role: staff.role_name,
                    phoneNumber: staff.phone_number,
                    email: staff.email,
                    imageUrl: staff.image || 'default.jpg',
                }));
                setStaffs(staffData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching staff data:', error);
                setError(true);
                setLoading(false);
            }
        };

        fetchStaffs();
    }, []);

    if (loading) {
        return <TentLoader />;
    }

    if (error) {
        return <NotFound />;
    }

    return (
        <div className="Staff-Edit-section">
            <h2 className="Staff-Edit-title">{title}</h2>
            <div className="Staff-Edit-containers">
                {staffs && staffs.length > 0 ? (
                    staffs.map((staff, index) => (
                        <div key={`staff-${index}`} className="Staff-Edit-card">
                            <div className='Staff-Edit-image-container'>
                                <img
                                    src={enums.urlEnums.defineUrl('staff') + staff.imageUrl}
                                    alt={`${staff.firstName} ${staff.lastName}`}
                                    className="Staff-Edit-image"
                                />
                            </div>
                            <div className="Staff-Edit-info">
                                <div className="Staff-Edit-name">{staff.firstName} {staff.lastName}</div>
                                <div className="Staff-Edit-role">{staff.role}</div>
                                <div className="Staff-Edit-contact">电话：{staff.phoneNumber}</div>
                                <div className="Staff-Edit-email">邮箱：{staff.email}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="Staff-Edit-not">暂无数据</p>
                )}
            </div>
        </div>
    );
};

export default StaffEdit;
