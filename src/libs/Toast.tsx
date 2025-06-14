import React from 'react'

type ToastProps = {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
};

const Toast: React.FC<ToastProps> = ({ message, type = 'info' }) => {
    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return '#4caf50';
            case 'error':
                return '#f44336';
            case 'warning':
                return '#ff9800';
            default:
                return '#2196f3';
        }
    };

    return (
        <div
            style={{
                padding: '12px 24px',
                borderRadius: '4px',
                color: '#fff',
                background: getBackgroundColor(),
                minWidth: '200px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                fontSize: '16px',
            }}
            role="alert"
        >
            {message}
        </div>
    );
};

export default Toast
