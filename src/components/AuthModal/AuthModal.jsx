// components/AuthModal/AuthModal.jsx
import React, { useState } from 'react'
import './AuthModal.css'

const AuthModal = ({ isOpen, onClose, onLogin }) => {
    const [phone, setPhone] = useState('')
    const [code, setCode] = useState('')
    const [step, setStep] = useState('phone') // 'phone' или 'code'
    const [isLoading, setIsLoading] = useState(false)

    if (!isOpen) return null

    const handlePhoneSubmit = async (e) => {
        e.preventDefault()

        if (!phone.trim()) {
            alert('Пожалуйста, введите номер телефона')
            return
        }

        // Валидация номера телефона (простая проверка)
        const phoneRegex = /^[\+]?[7-8]?[0-9\s\-\(\)]{10,15}$/
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            alert('Пожалуйста, введите корректный номер телефона')
            return
        }

        setIsLoading(true)

        // Имитация отправки кода
        setTimeout(() => {
            setIsLoading(false)
            setStep('code')
            // В реальном приложении здесь был бы запрос к API
            console.log('Код отправлен на номер:', phone)
        }, 1500)
    }

    const handleCodeSubmit = async (e) => {
        e.preventDefault()

        if (!code.trim() || code.length !== 4) {
            alert('Пожалуйста, введите 4-значный код')
            return
        }

        setIsLoading(true)

        // Имитация проверки кода
        setTimeout(() => {
            setIsLoading(false)
            onLogin(phone)
            onClose()
            resetForm()
            alert(`Добро пожаловать! Вы успешно вошли с номером ${phone}`)
        }, 1000)
    }

    const resetForm = () => {
        setPhone('')
        setCode('')
        setStep('phone')
        setIsLoading(false)
    }

    const handleClose = () => {
        resetForm()
        onClose()
    }

    const formatPhone = (value) => {
        // Форматирование номера телефона
        const cleaned = value.replace(/\D/g, '')
        let formatted = '+7 '

        if (cleaned.length > 1) {
            formatted += `(${cleaned.slice(1, 4)}`
        }
        if (cleaned.length > 4) {
            formatted += `) ${cleaned.slice(4, 7)}`
        }
        if (cleaned.length > 7) {
            formatted += `-${cleaned.slice(7, 9)}`
        }
        if (cleaned.length > 9) {
            formatted += `-${cleaned.slice(9, 11)}`
        }

        return formatted
    }

    const handlePhoneChange = (e) => {
        const formatted = formatPhone(e.target.value)
        setPhone(formatted)
    }

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={handleClose}>&times;</button>

                <div className="auth-header">
                    <h2 className="modal-title">Вход в SOVRANA</h2>
                    <p className="auth-subtitle">
                        {step === 'phone'
                            ? 'Введите номер телефона для входа'
                            : 'Введите код из SMS'}
                    </p>
                </div>

                {step === 'phone' ? (
                    <form className="auth-form" onSubmit={handlePhoneSubmit}>
                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">Номер телефона</label>
                            <div className="phone-input-wrapper">
                                <input
                                    id="phone"
                                    type="tel"
                                    className="form-input phone-input"
                                    placeholder="+7 (999) 123-45-67"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-auth-submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="loading-spinner"></div>
                                    Отправка кода...
                                </>
                            ) : (
                                'Получить код'
                            )}
                        </button>

                        <div className="auth-info">
                            <p>Нажимая «Получить код», вы соглашаетесь с
                                <a href="/privacy"> политикой конфиденциальности</a>
                            </p>
                        </div>
                    </form>
                ) : (
                    <form className="auth-form" onSubmit={handleCodeSubmit}>
                        <div className="form-group">
                            <label htmlFor="code" className="form-label">
                                Код из SMS
                                <span className="phone-display">на номер {phone}</span>
                            </label>
                            <input
                                id="code"
                                type="text"
                                className="form-input code-input"
                                placeholder="1234"
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                maxLength={4}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="code-actions">
                            <button
                                type="button"
                                className="btn-resend-code"
                                onClick={() => setStep('phone')}
                                disabled={isLoading}
                            >
                                Изменить номер
                            </button>
                            <button
                                type="button"
                                className="btn-resend-code"
                                disabled={isLoading}
                            >
                                Отправить код повторно
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="btn-auth-submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="loading-spinner"></div>
                                    Проверка кода...
                                </>
                            ) : (
                                'Войти'
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default AuthModal