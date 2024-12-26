import React from 'react';
import './style.css';

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal">
                <p>{message}</p>
                <div className="confirm-modal-buttons">
                    <button onClick={onConfirm} className="confirm-modal-confirm">确认</button>
                    <button onClick={onCancel} className="confirm-modal-cancel">取消</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
