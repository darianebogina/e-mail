require('dotenv').config();
const nodemailer = require('nodemailer');
const {build} = require('./build');

async function send() {
    const {html, data} = await build();

    const subject = data.emailSubject || 'Тестовое письмо';

    const transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.YANDEX_USER,
            pass: process.env.YANDEX_APP_PASSWORD,
        },
    });

    await transporter.verify();
    console.log('SMTP-соединение установлено');

    const recipients = process.env.MAIL_TO.split(',').map((s) => s.trim());

    await transporter.sendMail({
        from: `"NFT.RU Digest" <${process.env.YANDEX_USER}>`,
        to: recipients,
        subject,
        text: 'Это письмо содержит HTML. Откройте его в клиенте с поддержкой HTML.',
        html,
    });

    console.log(`Отправлено на: ${recipients.join(', ')}`);
}

send().catch((err) => {
    console.error('Ошибка отправки:', err.message);
    process.exit(1);
});
