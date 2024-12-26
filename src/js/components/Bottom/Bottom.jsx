import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../../constants/paths';

import './style.css';

function Bottom({ isDarkTheme }) {
    const [modalContent, setModalContent] = useState(null);
    const [isQRCodeVisible, setIsQRCodeVisible] = useState(false);
    const dialogRef = useRef(null);

    const handleContactClick = (content, isQRCode = false) => {
        setModalContent(content);
        setIsQRCodeVisible(isQRCode);
        dialogRef.current.showModal();
    };

    const closeModal = () => {
        dialogRef.current.close();
        setModalContent(null);
        setIsQRCodeVisible(false);
    };

    const copyToClipboardAndOpenWeChat = (wechatID) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(wechatID)
                .then(() => {
                    alert(`微信 ID 已复制: ${wechatID}`);
                    window.location.href = "weixin://"; // Open WeChat
                })
                .catch((err) => {
                    console.error("复制失败:", err);
                    alert("复制微信 ID 失败，请手动复制。");
                });
        } else {
            const textarea = document.createElement("textarea");
            textarea.value = wechatID;
            textarea.style.position = "fixed"; // Prevent scrolling to bottom
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            try {
                const successful = document.execCommand("copy");
                if (successful) {
                    alert(`微信 ID 已复制: ${wechatID}`);
                    window.location.href = "weixin://"; // Open WeChat
                } else {
                    alert("复制微信 ID 失败，请手动复制。");
                }
            } catch (err) {
                console.error("Fallback复制失败:", err);
                alert("复制微信 ID 失败，请手动复制。");
            }
            document.body.removeChild(textarea);
        }
    };

    return (
        <div className="bottom-container">
            <div className="bottom-inner-container">
                <div className="bottom-icon">
                    <Link to="/">
                        <img src={isDarkTheme ? PATHS.SRC.ASSETS.SJGZ.HORIZON_LOGO : PATHS.SRC.ASSETS.SJGZ.HORIZON_LOGO_B} alt="Tea" />
                    </Link>
                </div>
                <div className="bottom-text-container">
                    <div className="sub-title">
                        <Link to="/index/contact" className="sub-title">联系我们:</Link>
                    </div>
                    <p onClick={() => handleContactClick("电话号码: 186-027-28017")}>电话 &gt;</p>
                    <p onClick={() => handleContactClick("邮箱: 1134658220@qq.com")}>邮箱 &gt;</p>
                    <p onClick={() => handleContactClick("微信 ID: lLoveyou_316", true)}>微信 &gt;</p>
                </div>

                <div className="bottom-tea-container">
                    <div className="sub-title">
                        <Link to="/index/products" className="sub-title">茶叶:</Link>
                    </div>
                    <p><Link to="/index/products?type=RedTea">红茶 &gt;</Link></p>
                    <p><Link to="/index/products?type=DarkTea">黑茶 &gt;</Link></p>
                    <p><Link to="/index/products?type=WhiteTea">白茶 &gt;</Link></p>
                </div>
            </div>

            <dialog ref={dialogRef} className="modal-overlay">
                <div className="modal-content">
                    <p>{modalContent}</p>
                    {isQRCodeVisible && (
                        <div className="qrcode-container">
                            <img src={PATHS.SRC.ASSETS.SJGZ.WECHAT_QRCODE} alt="WeChat QR Code" className="qrcode" />
                            <button onClick={() => copyToClipboardAndOpenWeChat("lLoveyou_316")} style={{ marginBottom: '10px' }}>
                                复制微信 ID 并打开微信
                            </button>
                        </div>
                    )}
                    <button onClick={closeModal}>关闭</button>
                </div>
            </dialog>
        </div>
    );
}

export default Bottom;
