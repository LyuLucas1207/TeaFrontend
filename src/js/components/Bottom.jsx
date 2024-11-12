import React, { useState } from 'react';
import './../../css/components/Bottom.css';
import companyLogo from './../../sjgz/HorizonLogo.png';
import companyLogo2 from './../../sjgz/HorizonLogoB.png';
import { Link } from 'react-router-dom';

function Bottom({ isDarkTheme }) {
    const [modalContent, setModalContent] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleContactClick = (content) => {
        setModalContent(content);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setModalContent(null);
    };

    return (
        <div className="bottom-container">
            <div className="bottom-inner-container">
                <div className="bottom-icon">
                    <Link to="/"><img src={isDarkTheme ? companyLogo2 : companyLogo} alt="Tea" /></Link>
                </div>
                <div className="bottom-text-container">
                    <div className="sub-title"><Link to="/index/contact" className="sub-title">联系我们:</Link> </div>                               
                    <p onClick={() => handleContactClick("电话号码: 123-456-7890")}>电话 &gt;</p>
                    <p onClick={() => handleContactClick("邮箱: example@tea.com")}>邮箱 &gt;</p>
                    <p onClick={() => handleContactClick("微信: tea_wechat_id")}>微信 &gt;</p>
                </div>

                <div className="bottom-tea-container">
                    <div className="sub-title"><Link to="/index/products" className="sub-title">茶叶:</Link></div>
                    <p><Link to="/index/products?type=RedTea">红茶 &gt;</Link></p>
                    <p><Link to="/index/products?type=DarkTea">黑茶 &gt;</Link></p>
                    <p><Link to="/index/products?type=WhiteTea">白茶 &gt;</Link></p>
                </div>
            </div>

            {isModalVisible && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <p>{modalContent}</p>
                        <button onClick={closeModal}>关闭</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Bottom;
