// components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-custom">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <div className="logo-icon me-2">
                                <div className="diamond-symbol">S</div>
                            </div>
                            <span className="logo-text">SOVRANA</span>
                        </div>
                        <p className="footer-tagline">Лучшие бургеры и закуски в городе</p>
                    </div>

                    <div className="footer-social">
                        <a
                            href="https://vk.com/your-group"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link vk-link"
                            aria-label="Наша группа ВКонтакте"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93V15.07C2 20.67 3.33 22 8.93 22H15.07C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2M18.15 16.27H16.69C16.14 16.27 15.97 15.82 15 14.83C14.12 14 13.74 13.88 13.53 13.88C13.24 13.88 13.15 13.96 13.15 14.38V15.69C13.15 16.04 13.04 16.26 12.11 16.26C10.57 16.26 8.86 15.56 7.66 13.77C5.85 11.22 5.26 9.1 5.26 8.42C5.26 8.19 5.31 8 5.66 8H7.12C7.5 8 7.63 8.14 7.74 8.5C8.29 10.31 9.53 12.27 10.15 12.27C10.38 12.27 10.5 12.15 10.5 11.71V8.94C10.5 8.4 10.39 8.3 10.14 8.3C9.31 8.3 8.24 7.72 7.37 6.04C7.2 5.74 7.07 5.5 6.58 5.5H5.12C4.73 5.5 4.59 5.67 4.59 5.96C4.59 6.65 5.58 9.06 7.91 11.59C10.38 14.24 12.91 15.08 13.4 15.08C13.76 15.08 13.88 14.96 13.88 14.53V12.86C13.88 12.36 14 12.3 14.34 12.3C14.68 12.3 15.25 12.5 16.1 13.36C17.17 14.5 17.47 15.08 18.12 15.08H19.58C19.97 15.08 20.15 14.86 20.02 14.46C19.82 13.93 19.08 13.2 18.32 12.47C17.87 12.03 17.32 11.5 17.15 11.24C16.94 10.93 17 10.82 17.15 10.56C17.31 10.31 18.44 8.93 18.65 8.2C18.71 8 18.59 7.8 18.19 7.8H16.73C16.41 7.8 16.27 7.88 16.14 8.14C16.01 8.4 15.45 9.31 15.3 9.54C15.15 9.77 15.01 9.82 14.78 9.82C14.54 9.82 14.55 9.71 14.55 9.29V8.94C14.55 8.27 14.69 8 15.32 8H17.28C17.67 8 17.85 8.26 17.85 8.64V11.36C17.85 11.69 17.97 11.8 18.2 11.8C18.41 11.8 18.63 11.69 18.87 11.45C19.57 10.77 20.41 9.7 20.71 9.27C20.86 9.05 20.98 8.96 21.19 8.96H22.65C23.03 8.96 23.2 9.18 23.09 9.57C22.76 10.68 20.76 13.16 18.15 15.28Z" />
                            </svg>
                            <span>Мы ВКонтакте</span>
                        </a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-info">
                        <p>&copy; 2024 SOVRANA. Все права защищены.</p>
                        <p>Вкус, который объединяет!</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;