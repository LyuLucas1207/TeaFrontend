// 引入 React 和 Hooks
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useTheme, useValidRoute } from '../../utils/helpers/myUse';
import { validateUrl } from '../../utils/helpers/validate';

import Components from '../../components/components';
// 引入样式文件
import './style.css';
import '../../../css/import/css/boxicons.min.css';

const navigateTo = (navigate, linkName, categoryKey, subCategoryKey, title) => {
    navigate(linkName, {
        state: {
            categoryKey: categoryKey,
            subCategoryKey: subCategoryKey,
            title: title,
        },
    });
};

const SingleItem = ({ iconClass, linkName, navigatorfunction }) => {
    return (
        <li>
            <button onClick={navigatorfunction}>
                <i className={iconClass}></i>
                <span className="admin-home_link_name">{linkName}</span>
            </button>
            <ul className="admin-home_sub-menu admin-home_blank">
                <li><button onClick={navigatorfunction}>{linkName}</button></li>
            </ul>
        </li>
    );
};

const SingleTea = ({ iconClass, Open, linkNameAndnavigatorfunctionArray }) => {
    const [isOpen, setIsOpen] = useState(Open); // 内部管理展开状态
    const [{ linkName, navigatorfunction }, ...restItems] = linkNameAndnavigatorfunctionArray;

    const handleMainButtonClick = () => {
        // 切换展开状态
        setIsOpen((prev) => !prev);
        if (navigatorfunction) navigatorfunction();
    };

    return (
        <li>
            {/* 主菜单按钮 */}
            <button onClick={handleMainButtonClick}>
                <i className={iconClass}></i>
                <span className="admin-home_link_name">{linkName}</span>
                <i className={`bx bxs-chevron-down admin-home_arrow ${isOpen ? 'admin-home_rotate' : ''}`}></i>
            </button>

            {/* 子菜单 */}
            <ul className="admin-home_sub-menu" style={{ display: isOpen ? 'block' : 'none' }}>
                {restItems.map(({ linkName: subLinkName, navigatorfunction: subNavigator }, index) => (
                    <li key={index}>
                        <button onClick={subNavigator}>{subLinkName}</button>
                    </li>
                ))}
            </ul>
        </li>
    );
};

function Sidebar({ sidebarOpen }) {
    const [firstName, setFirstName] = useState(" ");
    const [lastName, setLastName] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [role, setRole] = useState(" ");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userInformation = JSON.parse(localStorage.getItem('user'));
            const fetchedFirstName = userInformation.first_name;
            const fetchedLastName = userInformation.last_name;
            const fetchedEmail = userInformation.email;
            const fetchedRole = userInformation.role_name;
            setFirstName(fetchedFirstName);
            setLastName(fetchedLastName);
            setEmail(fetchedEmail);
            setRole(fetchedRole);
        } else {
            window.location.href = '/admin.html';
            window.location.replace('/admin.html');
        }
    }, []);

    const HandleBack = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/admin.html';
        window.location.replace('/admin.html');
    };

    return (
        <div className={`admin-home_sidebar ${sidebarOpen ? 'admin-home_sidebar-close' : ''}`}>
            <div className="admin-home_logo-details">
                <i className='bx bxs-graduation'></i>
                <span className="admin-home_logo_name">{firstName} {lastName}</span>
            </div>
            <ul className="admin-home_nav-links">
                <SingleTea
                    iconClass="bx bx-collection"
                    Open={false}
                    linkNameAndnavigatorfunctionArray={[
                        { linkName: '茶叶分类', navigatorfunction: () => navigateTo(navigate, '/adminhome/showteas', 'All', null, '茶叶分类') },
                        { linkName: '红茶', navigatorfunction: () => navigateTo(navigate, '/adminhome/showteas', 'RedTeas', null, '红茶') },
                        { linkName: '白茶', navigatorfunction: () => navigateTo(navigate, '/adminhome/showteas', 'WhiteTeas', null, '白茶') },
                        { linkName: '黑茶', navigatorfunction: () => navigateTo(navigate, '/adminhome/showteas', 'DarkTeas', null, '黑茶') },
                    ]}
                />

                <SingleTea
                    iconClass="bx bx-coffee"
                    Open={false}
                    linkNameAndnavigatorfunctionArray={[
                        { linkName: '红茶', navigatorfunction: () => navigateTo(navigate, '/adminhome/showteas', 'RedTeas', null, '红茶') },
                        { linkName: '古树红茶', navigatorfunction: () => navigateTo(navigate, '/adminhome/showteas', 'RedTeas', 'gushuhong_tea', '古树红茶') },
                    ]}
                />

                <SingleTea
                    iconClass="bx bx-leaf"
                    Open={false}
                    linkNameAndnavigatorfunctionArray={[
                        { linkName: '白茶', navigatorfunction: () => navigateTo(navigate, '/adminhome/showteas', 'WhiteTeas', null, '白茶') },
                        { linkName: '古树白茶', navigatorfunction: () => navigateTo(navigate, '/adminhome/showteas', 'WhiteTeas', 'gushubai_tea', '古树白茶') },
                    ]}
                />

                <SingleTea
                    iconClass="bx bx-moon"
                    Open={false}
                    linkNameAndnavigatorfunctionArray={[
                        { linkName: '黑茶', navigatorfunction: () => navigateTo(navigate, '/adminhome/showteas', 'DarkTeas', null, '黑茶') },
                        { linkName: '普洱茶（生茶）', navigatorfunction: () => navigateTo(navigate, '/adminhome/showteas', 'DarkTeas', 'shengpuer_tea', '普洱茶（生茶）') },
                        { linkName: '普洱茶（熟茶）', navigatorfunction: () => navigateTo(navigate, '/adminhome/showteas', 'DarkTeas', 'shupuer_tea', '普洱茶（熟茶）') },
                    ]}
                />
                <SingleItem iconClass="bx bxs-user-account" linkName="公司成员" navigatorfunction={() => navigate('/adminhome/showstaffs')}/>
                <SingleItem iconClass="bx bx-user-plus" linkName="添加成员" navigatorfunction={() => navigate('/adminhome/addingStaff')}/>
                <SingleItem iconClass="bx bx-plus" linkName="添加茶叶" navigatorfunction={() => navigate('/adminhome/addingTea')}/>
                <SingleItem iconClass="bx bx-cog" linkName="设置" navigatorfunction={() => navigate('/adminhome/setting')}/>
                <li>
                    <div className="admin-home_profile-details">
                        <div className="admin-home_profile-content">
                            <img src="/glask.png" alt="profile" />
                        </div>
                        <div className="admin-home_name-job">
                            <div className="admin-home_profile_name">&nbsp;{role}</div>
                            <div className="admin-home_job">{email}</div>
                        </div>
                        <i className='bx bx-log-out' onClick={HandleBack}></i>
                    </div>
                </li>
            </ul>
        </div>
    );
};

const AdminHome = () => {
    const validPaths = ['/', '/adminhome', '/not-found', '/adminhome/setting', '/adminhome/addingTea', '/adminhome/addingStaff', '/adminhome/showteas', '/adminhome/showstaffs', '/adminhome/edittea'];
    useValidRoute(validPaths, 'admin_home.html#/not-found');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDarkTheme, toggleTheme] = useTheme();
    const navigate = useNavigate(); // 添加 `useNavigate`

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // 添加一个 useEffect 在页面加载时触发导航
    useEffect(() => {
        navigateTo(navigate, '/adminhome/showteas', 'All', null, '茶叶分类');
    }, [navigate]);

    return (
        <>
            <Components.Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            <Sidebar sidebarOpen={sidebarOpen}/>
            <section className="admin-home_home-section">
                <button className="admin-home_home-content" onClick={toggleSidebar}>
                    <i className='bx bx-menu'></i>
                    <span>Nagivation SliderBar</span>
                </button>
                <div className="admin-home_infor">
                    <Outlet />
                </div>
            </section>
        </>
    );
};



export default validateUrl(AdminHome);
