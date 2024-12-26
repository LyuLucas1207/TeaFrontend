import React from 'react';
import './style.css';
import { PATHS } from '../../constants/paths';

function Contact() {
    const handleCopy = (text) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => alert(`已复制: ${text}`))
                .catch(() => alert("复制失败，请手动复制。"));
        } else {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            try {
                const successful = document.execCommand("copy");
                if (successful) alert(`已复制: ${text}`);
                else alert("复制失败，请手动复制。");
            } catch (err) {
                console.error("Fallback复制失败:", err);
                alert("复制失败，请手动复制。");
            }
            document.body.removeChild(textarea);
        }
    };

    return (
        <div className="contact-page-container">
            <h1 className="contact-page-title">联系我们</h1>
            <div className="contact-layout">
                {/* Left Section */}
                <div className="contact-left">
                    <div className="contact-item">
                        <h2>电话</h2>
                        <p>186-027-28017</p>
                        <div className="contact-actions">
                            <a href="tel:18602728017" className="contact-action">拨打电话</a>
                            <button onClick={() => handleCopy("186-027-28017")} className="contact-button">复制</button>
                        </div>
                    </div>
                    <div className="contact-item">
                        <h2>邮箱</h2>
                        <p>1134658220@qq.com</p>
                        <div className="contact-actions">
                            <a href="mailto:1134658220@qq.com" className="contact-action">发送邮件</a>
                            <button onClick={() => handleCopy("1134658220@qq.com")} className="contact-button">复制</button>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="contact-right">
                    <div className="contact-item">
                        <h2>微信</h2>
                        <p>lLoveyou_316</p>
                        <div className="contact-actions">
                            <button onClick={() => handleCopy("lLoveyou_316")} className="contact-button">复制微信 ID</button>
                            <button onClick={() => window.location.href = "weixin://"} className="contact-button">打开微信</button>
                        </div>
                        <div className="contact-qrcode-container">
                            <img
                                src={PATHS.SRC.ASSETS.SJGZ.WECHAT_QRCODE}
                                alt="微信二维码"
                                className="contact-qrcode"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
