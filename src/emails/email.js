const sgMail = require('@sendgrid/mail');
const config = require('../../config/config.json');

sgMail.setApiKey(config.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: config.FROM_EMAIL,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app ${name}. Let's start managing your tasks.`
    });
};

module.exports = {
    sendWelcomeEmail
}