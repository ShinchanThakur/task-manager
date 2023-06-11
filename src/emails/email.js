const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: process.env.FROM_EMAIL,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app ${name}. Let's start managing your tasks.`
    });
};

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: process.env.FROM_EMAIL,
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name}. I hope to see you back soon.`
    })
};

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
};