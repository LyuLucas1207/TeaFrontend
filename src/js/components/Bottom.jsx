import React, { useState } from 'react';
import './../../css/components/Bottom.css';
import companyLogo from './../../sjgz/logo4.png';
import companyLogo2 from './../../sjgz/logo6.png';
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
                    <div className="sub-title">联系我们:</div>
                    <p onClick={() => handleContactClick("电话号码: 123-456-7890")}>电话 &gt;</p>
                    <p onClick={() => handleContactClick("邮箱: example@tea.com")}>邮箱 &gt;</p>
                    <p onClick={() => handleContactClick("微信: tea_wechat_id")}>微信 &gt;</p>
                </div>

                <div className="bottom-tea-container">
                    <div className="sub-title">茶叶产品:</div>
                    <ul>
                        <li>
                            <Link to={{ pathname: "/index/products", search: "?type=green-tea" }}>&nbsp;&nbsp;绿茶 &gt;</Link>
                        </li>
                        <li>
                            <Link to={{ pathname: "/index/products", search: "?type=black-tea" }}>&nbsp;&nbsp;红茶 &gt;</Link>
                        </li>
                        <li>
                            <Link to={{ pathname: "/index/products", search: "?type=oolong-tea" }}>&nbsp;&nbsp;黑茶 &gt;</Link>
                        </li>
                        <li>
                            <Link to={{ pathname: "/index/products", search: "?type=white-tea" }}>&nbsp;&nbsp;白茶 &gt;</Link>
                        </li>
                        <li>
                            <Link to={{ pathname: "/index/products", search: "?type=yellow-tea" }}>&nbsp;&nbsp;黄茶 &gt;</Link>
                        </li>
                        <li>
                            <Link to={{ pathname: "/index/products", search: "?type=dark-tea" }}>&nbsp;&nbsp;青茶 &gt;</Link>
                        </li>
                    </ul>
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
