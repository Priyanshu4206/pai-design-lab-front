import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RecaptchaComponent = ({ onVerify, span }) => {
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleChange = (value) => {
        setCaptchaValue(value);
        onVerify(value);
    };

    return (
        <div
            style={{
                gridColumn: `span ${span}`,
                marginBottom: '1.5rem',
                background: 'transparent',
                borderRadius: '6px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}
        >
            <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={handleChange}
                theme="dark"
            />
        </div>
    );
};

export default RecaptchaComponent; 