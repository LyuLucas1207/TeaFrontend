// 引入 React 和 Hooks
import React, { useEffect, useState } from 'react';

// 引入组件
import NotFound from './NotFound';
import TentLoader from '../components/TentLoader';
import Switch from '../components/Switch';
import Setting from './Setting';

// 引入工具函数和自定义 Hook
import { checkIdentity, getDatas } from '../utility/sendRequest';
import { useTheme, useValidRoute } from '../utility/myUse';

import { getToken, getFirstName, getLastName, getEmail, getRole } from '../utility/tokenTool';

// 引入样式文件
import '../../css/AdminHome.css';
import '../../css/import/css/boxicons.min.css';

function renderSuperAdminPage({ fetchData }) {
    return (
        <>
            <li>
                <button onClick={() => fetchData('/AllStaff')}>
                    <i className='bx bxs-user-account'></i>
                    <span className="admin-home_link_name">公司成员</span>
                </button>
                <ul className="admin-home_sub-menu admin-home_blank">
                    <li><button onClick={() => fetchData('/AllStaff')}>公司成员</button></li>
                </ul>
            </li>
        </>
    );
}
function renderAdminPage({ fetchData }) {
    return (
        <>
            
        </>
    );
}
function renderManagerAdminPage({ toggleGreenTeaMenu, GreenTeaOpen, toggleRedTeaMenu, RedTeaOpen, toggleWhiteTeaMenu, WhiteTeaOpen, toggleOolongMenu, OolongOpen, toggleYellowTeaMenu, YellowTeaOpen, toggleBlackTeaMenu, BlackTeaOpen, fetchData }) {
    return (
        <>
            <li>
                <div className="admin-home_iocn-link">
                    <button onClick={toggleGreenTeaMenu}>
                        <i className='bx bx-spa'></i>
                        <span className="admin-home_link_name">绿茶</span>
                        <i className={`bx bxs-chevron-down admin-home_arrow ${GreenTeaOpen ? 'admin-home_rotate' : ''}`}></i>
                    </button>
                </div>
                <ul className="admin-home_sub-menu" style={{ display: GreenTeaOpen ? 'block' : 'none' }}>
                    <li><button onClick={() => fetchData('/Longjing')}>龙井</button></li>
                    <li><button onClick={() => fetchData('/Biluochun')}>碧螺春</button></li>
                    <li><button onClick={() => fetchData('/Maofeng')}>毛峰</button></li>
                </ul>
            </li>

            <li>
                <div className="admin-home_iocn-link">
                    <button onClick={toggleRedTeaMenu}>
                        <i className='bx bx-coffee'></i>
                        <span className="admin-home_link_name">红茶</span>
                        <i className={`bx bxs-chevron-down admin-home_arrow ${RedTeaOpen ? 'admin-home_rotate' : ''}`}></i>
                    </button>
                </div>
                <ul className="admin-home_sub-menu" style={{ display: RedTeaOpen ? 'block' : 'none' }}>
                    <li><button onClick={() => fetchData('/Keemun')}>祁门红茶</button></li>
                    <li><button onClick={() => fetchData('/Dianhong')}>滇红</button></li>
                    <li><button onClick={() => fetchData('/Lapsang')}>正山小种</button></li>
                </ul>
            </li>

            <li>
                <div className="admin-home_iocn-link">
                    <button onClick={toggleWhiteTeaMenu}>
                        <i className='bx bx-leaf'></i>
                        <span className="admin-home_link_name">白茶</span>
                        <i className={`bx bxs-chevron-down admin-home_arrow ${WhiteTeaOpen ? 'admin-home_rotate' : ''}`}></i>
                    </button>
                </div>
                <ul className="admin-home_sub-menu" style={{ display: WhiteTeaOpen ? 'block' : 'none' }}>
                    <li><button onClick={() => fetchData('/SilverNeedle')}>白毫银针</button></li>
                    <li><button onClick={() => fetchData('/WhitePeony')}>白牡丹</button></li>
                    <li><button onClick={() => fetchData('/Shoumei')}>寿眉</button></li>
                </ul>
            </li>

            <li>
                <div className="admin-home_iocn-link">
                    <button onClick={toggleOolongMenu}>
                        <i className='bx bx-wind'></i>
                        <span className="admin-home_link_name">青茶</span>
                        <i className={`bx bxs-chevron-down admin-home_arrow ${OolongOpen ? 'admin-home_rotate' : ''}`}></i>
                    </button>
                </div>
                <ul className="admin-home_sub-menu" style={{ display: OolongOpen ? 'block' : 'none' }}>
                    <li><button onClick={() => fetchData('/Tieguanyin')}>铁观音</button></li>
                    <li><button onClick={() => fetchData('/Dahongpao')}>大红袍</button></li>
                    <li><button onClick={() => fetchData('/Shuixian')}>水仙</button></li>
                </ul>
            </li>

            <li>
                <div className="admin-home_iocn-link">
                    <button onClick={toggleYellowTeaMenu}>
                        <i className='bx bx-sun'></i>
                        <span className="admin-home_link_name">黄茶</span>
                        <i className={`bx bxs-chevron-down admin-home_arrow ${YellowTeaOpen ? 'admin-home_rotate' : ''}`}></i>
                    </button>
                </div>
                <ul className="admin-home_sub-menu" style={{ display: YellowTeaOpen ? 'block' : 'none' }}>
                    <li><button onClick={() => fetchData('/Junshan')}>君山银针</button></li>
                    <li><button onClick={() => fetchData('/Huoshan')}>霍山黄芽</button></li>
                    <li><button onClick={() => fetchData('/Mogan')}>莫干黄芽</button></li>
                </ul>
            </li>

            <li>
                <div className="admin-home_iocn-link">
                    <button onClick={toggleBlackTeaMenu}>
                        <i className='bx bx-moon'></i>
                        <span className="admin-home_link_name">黑茶</span>
                        <i className={`bx bxs-chevron-down admin-home_arrow ${BlackTeaOpen ? 'admin-home_rotate' : ''}`}></i>
                    </button>
                </div>
                <ul className="admin-home_sub-menu" style={{ display: BlackTeaOpen ? 'block' : 'none' }}>
                    <li><button onClick={() => fetchData('/Puerh')}>普洱茶</button></li>
                    <li><button onClick={() => fetchData('/Liubao')}>六堡茶</button></li>
                    <li><button onClick={() => fetchData('/Anhua')}>安化黑茶</button></li>
                </ul>
            </li>
        </>
    );
}
function renderUserPage(toggleCategoryMenu, categoryOpen, fetchData) {
    return (
        <li>
            <div className="admin-home_iocn-link">
                <button onClick={toggleCategoryMenu}>
                    <i className='bx bx-collection'></i>
                    <span className="admin-home_link_name">茶叶分类</span>
                    <i className={`bx bxs-chevron-down admin-home_arrow ${categoryOpen ? 'admin-home_rotate' : ''}`}></i>
                </button>
            </div>
            <ul className="admin-home_sub-menu" style={{ display: categoryOpen ? 'block' : 'none' }}>
                <li><button onClick={() => fetchData('/GreenTea')}>绿茶</button></li>
                <li><button onClick={() => fetchData('/RedTea')}>红茶</button></li>
                <li><button onClick={() => fetchData('/WhiteTea')}>白茶</button></li>
                <li><button onClick={() => fetchData('/OolongTea')}>青茶</button></li>
                <li><button onClick={() => fetchData('/YellowTea')}> 黄茶</button></li>
                <li><button onClick={() => fetchData('/DarkTea')}>黑茶</button></li>
            </ul>
        </li>
    );
}

function pageSwitch(role, toggleCategoryMenu, categoryOpen, toggleGreenTeaMenu, GreenTeaOpen, toggleRedTeaMenu, RedTeaOpen, toggleWhiteTeaMenu, WhiteTeaOpen, toggleOolongMenu, OolongOpen, toggleYellowTeaMenu, YellowTeaOpen, toggleBlackTeaMenu, BlackTeaOpen, fetchData) {
    switch (role) {
        case 'superadmin':
            return (
                <> 
                    {renderSuperAdminPage({ fetchData })}
                    {renderUserPage(toggleCategoryMenu, categoryOpen, fetchData)}
                    {renderManagerAdminPage({ toggleGreenTeaMenu, GreenTeaOpen, toggleRedTeaMenu, RedTeaOpen, toggleWhiteTeaMenu, WhiteTeaOpen, toggleOolongMenu, OolongOpen, toggleYellowTeaMenu, YellowTeaOpen, toggleBlackTeaMenu, BlackTeaOpen, fetchData })}
                    {renderAdminPage({ fetchData })}
                </>
            )
        case 'admin':
            return (
                <>
                    {renderUserPage(toggleCategoryMenu, categoryOpen, fetchData)}
                    {renderManagerAdminPage({ toggleGreenTeaMenu, GreenTeaOpen, toggleRedTeaMenu, RedTeaOpen, toggleWhiteTeaMenu, WhiteTeaOpen, toggleOolongMenu, OolongOpen, toggleYellowTeaMenu, YellowTeaOpen, toggleBlackTeaMenu, BlackTeaOpen, fetchData })}
                    {renderAdminPage({ fetchData })}
                </>
            )
        case 'manager':
            return (
                <>
                    {renderUserPage(toggleCategoryMenu, categoryOpen, fetchData)}
                    {renderManagerAdminPage({ toggleGreenTeaMenu, GreenTeaOpen, toggleRedTeaMenu, RedTeaOpen, toggleWhiteTeaMenu, WhiteTeaOpen, toggleOolongMenu, OolongOpen, toggleYellowTeaMenu, YellowTeaOpen, toggleBlackTeaMenu, BlackTeaOpen, fetchData })}
                </>
            )
        case 'user':
            return (
                <>
                    {renderUserPage(toggleCategoryMenu, categoryOpen, fetchData)}
                </>
            )
        default:
            return null;
    }
}

const ProjectList = ({ projects, fetchData }) => (
    <div className="admin-home_project-grid">
        {Object.keys(projects).map((key) => (
            <div key={key} className="admin-home_project-card">
                <h2>{projects[key].name}</h2>
                <p>{projects[key].description}</p>
                <p>状态: {projects[key].status}</p>
                <button onClick={() => fetchData(projects[key].url)}>查看详情</button>
            </div>
        ))}
    </div>
);

function Sidebar({
    sidebarOpen,
    toggleCategoryMenu ,
    categoryOpen,
    toggleGreenTeaMenu,
    GreenTeaOpen,
    toggleRedTeaMenu,
    RedTeaOpen,
    toggleWhiteTeaMenu ,
    WhiteTeaOpen,
    toggleOolongMenu,
    OolongOpen,
    toggleYellowTeaMenu,
    YellowTeaOpen,
    toggleBlackTeaMenu,
    BlackTeaOpen,
    fetchData,
    handleBackLink,
    getFirstName,
    getLastName,
    getEmail,
    getRole,
    pageSwitch
}) {

    const [firstName, setFirstName] = useState(" ");
    const [lastName, setLastName] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [role, setRole] = useState(" ");

    useEffect(() => {
        const token = getToken();
        if (token) {
            const fetchedFirstName = getFirstName();
            const fetchedLastName = getLastName();
            const fetchedEmail = getEmail();
            const fetchedRole = getRole();
            setFirstName(fetchedFirstName);
            setLastName(fetchedLastName);
            setEmail(fetchedEmail);
            setRole(fetchedRole);
        } else {
            window.location.href = '/admin.html';
            window.location.replace('/admin.html');
        }
    }, [getFirstName, getLastName, getEmail, getRole]);
    return (
        <div className={`admin-home_sidebar ${sidebarOpen ? 'admin-home_sidebar-close' : ''}`}>
            <div className="admin-home_logo-details">
                <i className='bx bxs-graduation'></i>
                <span className="admin-home_logo_name">{firstName} {lastName}</span>
            </div>
            <ul className="admin-home_nav-links">

                {pageSwitch(role, toggleCategoryMenu, categoryOpen, toggleGreenTeaMenu, GreenTeaOpen, toggleRedTeaMenu, RedTeaOpen, toggleWhiteTeaMenu, WhiteTeaOpen, toggleOolongMenu, OolongOpen, toggleYellowTeaMenu, YellowTeaOpen, toggleBlackTeaMenu, BlackTeaOpen, fetchData)}

                <li>
                    <button onClick={() => fetchData('/setting')}>
                        <i className='bx bx-cog'></i>
                        <span className="admin-home_link_name">设置</span>
                    </button>
                    <ul className="admin-home_sub-menu admin-home_blank">
                        <li><button onClick={() => fetchData('/Setting')}>设置</button></li>
                    </ul>
                </li>

                
                <li>
                    <div className="admin-home_profile-details">
                        <div className="admin-home_profile-content">
                            <img src="/glask.png" alt="profile" />
                        </div>
                        <div className="admin-home_name-job">
                            <div className="admin-home_profile_name">&nbsp;{role}</div>
                            <div className="admin-home_job">{email}</div>
                        </div>
                        <i className='bx bx-log-out' onClick={handleBackLink}></i>
                    </div>
                </li>
            </ul>
        </div>
    );
};


const AdminHome = () => {
    const validPaths = ['/', '/adminhome', '/not-found'];
    useValidRoute(validPaths, 'admin_home.html#/not-found');
    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [currentPage, setCurrentPage] = useState('home');

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [GreenTeaOpen, setEngineeringOpen] = useState(false);
    const [RedTeaOpen, setRedTeaOpen] = useState(false);
    const [WhiteTeaOpen, setWhiteTeaOpen] = useState(false);
    const [OolongOpen, setOolongOpen] = useState(false);
    const [YellowTeaOpen, setYellowTeaOpen] = useState(false);
    const [BlackTeaOpen, setBlackTeaOpen] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDarkTheme, toggleTheme] = useTheme();
    const [firstLoad, setFirstLoad] = useState(true);
    

    const handleBackLink = () => {
        window.location.href = '/admin.html';
        window.location.replace('/admin.html');
    };

    const fetchData = async (projectUrl) => {
        setLoading(true);
        try {
            if (projectUrl === '/setting') {
                setCurrentPage('setting'); // 切换到Setting页面
            } else {
                const result = await getDatas(projectUrl);
                setStatus(result.status);
                if (result.status !== 200 && !result.data) {
                    setError(`请求失败: ${result.msg}`);
                }
                setProjects(result.data);
            }
        } catch (error) {
            setError(`请求出错: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const toggleCategoryMenu = () => setCategoryOpen(!categoryOpen);
    const toggleGreenTeaMenu = () => setEngineeringOpen(!GreenTeaOpen);
    const toggleRedTeaMenu = () => setRedTeaOpen(!RedTeaOpen);
    const toggleWhiteTeaMenu = () => setWhiteTeaOpen(!WhiteTeaOpen);
    const toggleOolongMenu = () => setOolongOpen(!OolongOpen);
    const toggleYellowTeaMenu = () => setYellowTeaOpen(!YellowTeaOpen);
    const toggleBlackTeaMenu = () => setBlackTeaOpen(!BlackTeaOpen);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const toggleFirstLoad = () => setFirstLoad(false);

    useEffect(() => {
        const firstLoadFunction = async () => {
            if (firstLoad) {
                setLoading(true);
                const result = await checkIdentity();
                if (result.status !== 200 && !result.data) {
                    setError(`请求失败: ${result.msg}`);
                }
                setLoading(false);
                toggleFirstLoad(); 
            }
        };
        firstLoadFunction();
    }, [firstLoad]); 


    if (error) {
        if (status === 400) {
            return <NotFound message={error} link="/" status={status} />;
        }
        return <NotFound message={error} link="/admin.html" />;
    }

    return (
        <>
            <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            <Sidebar
                sidebarOpen={sidebarOpen}
                toggleCategoryMenu={toggleCategoryMenu}
                categoryOpen={categoryOpen}
                toggleGreenTeaMenu={toggleGreenTeaMenu}
                GreenTeaOpen={GreenTeaOpen}
                toggleRedTeaMenu={toggleRedTeaMenu}
                RedTeaOpen={RedTeaOpen}
                toggleWhiteTeaMenu={toggleWhiteTeaMenu}
                WhiteTeaOpen={WhiteTeaOpen}
                toggleOolongMenu={toggleOolongMenu}
                OolongOpen={OolongOpen}
                toggleYellowTeaMenu={toggleYellowTeaMenu}
                YellowTeaOpen={YellowTeaOpen}
                toggleBlackTeaMenu={toggleBlackTeaMenu}
                BlackTeaOpen={BlackTeaOpen}
                fetchData={fetchData}
                handleBackLink={handleBackLink}
                getFirstName={getFirstName}
                getLastName={getLastName}
                getEmail={getEmail}
                getRole={getRole}
                pageSwitch={pageSwitch}
            />
            <section className="admin-home_home-section">
                <button className="admin-home_home-content" onClick={toggleSidebar}>
                    <i className='bx bx-menu'></i>
                    <span>Nagivation SliderBar</span>
                </button>
                {currentPage === 'setting' ? (
                    <Setting />  // 如果当前页面是Setting，显示Setting内容
                ) : (
                    <>
                        <div className="admin-home_infor">
                            <h1>项目列表</h1>
                            {loading ? (<TentLoader />) : projects ? (<ProjectList projects={projects} fetchData={fetchData} />) : (<p>没有项目数据。</p>)}
                        </div>
                    </>
                )}
            </section>
        </>
    );
};

export default AdminHome;
