// 引入 React 和 Hooks
import React, { useEffect, useState } from 'react';

// 引入组件
import NotFound from './NotFound';
import TentLoader from '../components/TentLoader';
import Switch from '../components/Switch';

// 引入工具函数和自定义 Hook
import { checkIdentity, getDatas } from '../utility/sendRequest';
import { useTheme, useValidRoute } from '../utility/myUse';

import { getToken, getFirstName, getLastName, getEmail, getRole } from '../utility/tokenTool';

// 引入样式文件
import '../../css/AdminHome.css';
import '../../css/import/css/boxicons.min.css';

function renderSuperAdminPage({ toggleManagerAdminMenu, ManagerAdminOpen, toggleEngineeringMenu, EngineeringOpen, fetchData }) {
    return (
        <>
            <li>
                <button onClick={() => fetchData('/allAdmin')}>
                    <i className='bx bx-selection'></i>
                    <span className="admin-home_link_name">AllStaff</span>
                </button>
                <ul className="admin-home_sub-menu admin-home_blank">
                    <li><button onClick={() => fetchData('/allAdmin')}>AllStaff</button></li>
                </ul>
            </li>
            {renderAdminPage({ toggleManagerAdminMenu, ManagerAdminOpen, toggleEngineeringMenu, EngineeringOpen, fetchData })}
        </>
    );
}
function renderAdminPage({ toggleManagerAdminMenu, ManagerAdminOpen, toggleEngineeringMenu, EngineeringOpen, fetchData }) {
    return (
        <>
            {renderManagerAdminPage({ toggleManagerAdminMenu, ManagerAdminOpen, fetchData })}
            {renderManagerAdvertisementPage({ fetchData })}
            {renderManagerArtPage({ fetchData })}
            {renderManagerBuildingPage({ fetchData })}
            {renderManagerComputerSciencePage({ fetchData })}
            {renderManagerEngineeringPage({ toggleEngineeringMenu, EngineeringOpen, fetchData })}
            {renderManagerHumanResourcesPage({ fetchData })}
            {renderManagerElectronicsGamePage({ fetchData })}
            {renderManagerFinancePage({ fetchData })}
        </>
    );
}
function renderManagerAdminPage({ toggleManagerAdminMenu, ManagerAdminOpen, fetchData }) {
    return (
        <li>
            <div className="admin-home_iocn-link">
                <button onClick={toggleManagerAdminMenu}>
                    <i className='bx bx-network-chart' ></i>
                    <span className="admin-home_link_name">ManagerAdmin</span>
                    <i className={`bx bxs-chevron-down admin-home_arrow ${ManagerAdminOpen ? 'admin-home_rotate' : ''}`}></i>
                </button>
            </div>
            <ul className="admin-home_sub-menu" style={{ display: ManagerAdminOpen ? 'block' : 'none' }}>
                <li><button onClick={() => fetchData('/managerAdvertisement')}>Advertisement</button></li>
                <li><button onClick={() => fetchData('/managerArt')}>Art</button></li>
                <li><button onClick={() => fetchData('/managerBuilding')}>Building</button></li>
                <li><button onClick={() => fetchData('/managerComputerScience')}>ComputerScience</button></li>
                <li><button onClick={() => fetchData('/managerEngineering')}>Engineering</button></li>
                <li><button onClick={() => fetchData('/managerHumanResources')}>HumanResources</button></li>
                <li><button onClick={() => fetchData('/managerElectronicsGame')}>ElectronicsGame</button></li>
                <li><button onClick={() => fetchData('/managerFinance')}>Finance</button></li>
            </ul>
        </li>
    );
}
function renderUserPage() {
}
function renderManagerAdvertisementPage({ fetchData }) {
    return (
        <li>
            <button onClick={() => fetchData('/advertisement')}>
                <i className='bx bx-spreadsheet' ></i>
                <span className="admin-home_link_name">Advertisement</span>
            </button>
            <ul className="admin-home_sub-menu admin-home_blank">
                <li><button onClick={() => fetchData('/advertisement')}>Advertisement</button></li>
            </ul>
        </li>
    );
}
function renderManagerArtPage({ fetchData }) {
    return (
        <li>
            <button onClick={() => fetchData('/art')}>
                <i className='bx bxl-netlify' ></i>
                <span className="admin-home_link_name">Art</span>
            </button>
            <ul className="admin-home_sub-menu admin-home_blank">
                <li><button onClick={() => fetchData('/art')}>Art</button></li>
            </ul>
        </li>
    );
}
function renderManagerBuildingPage({ fetchData }) {
    return (
        <li>
            <button onClick={() => fetchData('/building')}>
                <i className='bx bx-arch' ></i>
                <span className="admin-home_link_name">Architecture</span>
            </button>
            <ul className="admin-home_sub-menu admin-home_blank">
                <li><button onClick={() => fetchData('/building')}>Architecture</button></li>
            </ul>
        </li>
    );
}
function renderManagerComputerSciencePage({ fetchData }) {
    return (
        <li>
            <button onClick={() => fetchData('/computerScience')}>
                <i className='bx bx-code-block' ></i>
                <span className="admin-home_link_name">ComputerScience</span>
            </button>
            <ul className="admin-home_sub-menu admin-home_blank">
                <li><button onClick={() => fetchData('/computerscience')}>ComputerScience</button></li>
            </ul>
        </li>
    );
}
function renderManagerEngineeringPage({ toggleEngineeringMenu, EngineeringOpen, fetchData }) {
    return (
        <li>
            <div className="admin-home_iocn-link">
                <button onClick={toggleEngineeringMenu}>
                    <i className='bx bx-chip'></i>
                    <span className="admin-home_link_name">Engineer</span>
                    <i className={`bx bxs-chevron-down admin-home_arrow ${EngineeringOpen ? 'admin-home_rotate' : ''}`}></i>
                </button>
            </div>
            <ul className="admin-home_sub-menu" style={{ display: EngineeringOpen ? 'block' : 'none' }}>
                <li><button onClick={() => fetchData('/computerEngineering')}>CPEN</button></li>
                <li><button onClick={() => fetchData('/electricalEngineering')}>ELEN</button></li>
                <li><button onClick={() => fetchData('/architectureEngineering')}>AREN</button></li>
                <li><button onClick={() => fetchData('/mechanicalEngineering')}>MEEN</button></li>
                <li><button onClick={() => fetchData('/manufacturingEngineering')}>MFEN</button></li>
            </ul>
        </li>
    );
}
function renderManagerHumanResourcesPage({ fetchData }) {
    return (
        <li>
            <button onClick={() => fetchData('/humanreSources')}>
                <i className='bx bx-user-check' ></i>
                <span className="admin-home_link_name">HumanResources</span>
            </button>
            <ul className="admin-home_sub-menu admin-home_blank">
                <li><button onClick={() => fetchData('/humanresources')}>HumanResources</button></li>
            </ul>
        </li>
    );
}
function renderManagerElectronicsGamePage({ fetchData }) {
    return (
        <li>
            <button onClick={() => fetchData('/electronicsGame')}>
                <i className='bx bx-joystick' ></i>
                <span className="admin-home_link_name">ElectronicsGame</span>
            </button>
            <ul className="admin-home_sub-menu admin-home_blank">
                <li><button onClick={() => fetchData('/electronicsgame')}>ElectronicsGame</button></li>
            </ul>
        </li>
    );
}
function renderManagerFinancePage({ fetchData }) {
    return (
        <li>
            <button onClick={() => fetchData('/finicial')}>
                <i className='bx bx-candles' ></i>
                <span className="admin-home_link_name">Financier</span>
            </button>
            <ul className="admin-home_sub-menu admin-home_blank">
                <li><button onClick={() => fetchData('/analytics')}>Financier</button></li>
            </ul>
        </li>
    );
}

function pageSwitch( role, toggleManagerAdminMenu, ManagerAdminOpen, toggleEngineeringMenu, EngineeringOpen, fetchData ) {
    switch (role) {
        case 'superadmin':
            return renderSuperAdminPage({ toggleManagerAdminMenu, ManagerAdminOpen, toggleEngineeringMenu, EngineeringOpen, fetchData });
        case 'admin':
            return renderAdminPage({ toggleManagerAdminMenu, ManagerAdminOpen, toggleEngineeringMenu, EngineeringOpen, fetchData });
        case 'manager':
            return renderManagerAdminPage({ toggleManagerAdminMenu, ManagerAdminOpen, fetchData });
        case 'user':
            return renderUserPage();
        case 'manager_ad':
            return renderManagerAdvertisementPage({ fetchData });
        case 'manager_ar':
            return renderManagerArtPage({ fetchData });
        case 'manager_bu':
            return renderManagerBuildingPage({ fetchData });
        case 'manager_cs':
            return renderManagerComputerSciencePage({ fetchData });
        case 'manager_en':
            return renderManagerEngineeringPage({ toggleEngineeringMenu, EngineeringOpen, fetchData });
        case 'manager_hr':
            return renderManagerHumanResourcesPage({ fetchData });
        case 'manager_eg':
            return renderManagerElectronicsGamePage({ fetchData });
        case 'manager_fi':
            return renderManagerFinancePage({ fetchData });
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

function Sidebar({ sidebarOpen, toggleCategoryMenu, categoryOpen, toggleManagerAdminMenu, ManagerAdminOpen, toggleEngineeringMenu, EngineeringOpen, fetchData, handleBackLink, getFirstName, getLastName, getEmail, getRole, pageSwitch }) {

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
                <li>
                    <button onClick={() => fetchData('/dashboard')}>
                        <i className='bx bx-grid-alt'></i>
                        <span className="admin-home_link_name">Dashboard</span>
                    </button>
                    <ul className="admin-home_sub-menu admin-home_blank">
                        <li><button onClick={() => fetchData('/category')}>Category</button></li>
                    </ul>
                </li>

                <li>
                    <div className="admin-home_iocn-link">
                        <button onClick={toggleCategoryMenu}>
                            <i className='bx bx-collection'></i>
                            <span className="admin-home_link_name">Category</span>
                            <i className={`bx bxs-chevron-down admin-home_arrow ${categoryOpen ? 'admin-home_rotate' : ''}`}></i>
                        </button>
                    </div>
                    <ul className="admin-home_sub-menu" style={{ display: categoryOpen ? 'block' : 'none' }}>
                        <li><button onClick={() => fetchData('/category')}>Category</button></li>
                        <li><button onClick={() => fetchData('/html-css')}>HTML & CSS</button></li>
                        <li><button onClick={() => fetchData('/javascript')}>JavaScript</button></li>
                        <li><button onClick={() => fetchData('/php-mysql')}>PHP & MySQL</button></li>
                    </ul>
                </li>

                {pageSwitch(role, toggleManagerAdminMenu, ManagerAdminOpen, toggleEngineeringMenu, EngineeringOpen, fetchData)}

                <li>
                    <button onClick={() => fetchData('/setting')}>
                        <i className='bx bx-cog'></i>
                        <span className="admin-home_link_name">Setting</span>
                    </button>
                    <ul className="admin-home_sub-menu admin-home_blank">
                        <li><button onClick={() => fetchData('/setting')}>Setting</button></li>
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

    const [categoryOpen, setCategoryOpen] = useState(false);
    const [ManagerAdminOpen, setManagerAdminOpen] = useState(false);
    const [EngineeringOpen, setEngineeringOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDarkTheme, toggleTheme] = useTheme();

    const handleBackLink = () => {
        window.location.href = '/admin.html';
        window.location.replace('/admin.html');
    };

    useEffect(() => {
        const firstLoad = async () => {
            setLoading(true);
            const result = await checkIdentity();
            if (result.status !== 200 && !result.data) {
                setError(`请求失败: ${result.msg}`);
            }
            setLoading(false);
        };
        firstLoad();
    }, []);

    const fetchData = async (projectUrl) => {
        setLoading(true);
        try {
            const result = await getDatas(projectUrl);
            setStatus(result.status);
            if (result.status !== 200 && !result.data) {
                setError(`请求失败: ${result.msg}`);
            }
            setProjects(result.data);
        } catch (error) {
            setError(`请求出错: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const toggleCategoryMenu = () => setCategoryOpen(!categoryOpen);
    const toggleManagerAdminMenu = () => setManagerAdminOpen(!ManagerAdminOpen);
    const toggleEngineeringMenu = () => setEngineeringOpen(!EngineeringOpen);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
                toggleManagerAdminMenu={toggleManagerAdminMenu}
                ManagerAdminOpen={ManagerAdminOpen}
                toggleEngineeringMenu={toggleEngineeringMenu}
                EngineeringOpen={EngineeringOpen}
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
                <div className="admin-home_infor">
                    <h1>项目列表</h1>
                    {loading ? (<TentLoader />) : projects ? (<ProjectList projects={projects} fetchData={fetchData} />) : (<p>没有项目数据。</p>)}
                </div>
            </section>
        </>
    );
};

export default AdminHome;
