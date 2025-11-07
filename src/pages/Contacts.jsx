import React from 'react'

const Contacts = () => {
    return (
        <main className="container">
            <section className="page-header">
                <h1>Контакты</h1>
                <p>Свяжитесь с нами</p>
            </section>

            <div className="contacts-content">
                <h2>Наши контакты</h2>
                <p>📞 Телефон: +7 (999) 123-45-67</p>
                <p>📍 Адрес: ул. Пушкинская, 42</p>
                <p>🕒 Время работы: 10:00 - 23:00</p>
            </div>
        </main>
    )
}

export default Contacts