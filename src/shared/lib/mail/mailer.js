const sgMail = require("@sendgrid/mail");
const EmailQueue = require("../../models/EmailQueue");

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

if (SENDGRID_API_KEY) {
    sgMail.setApiKey(SENDGRID_API_KEY);
} else {
    console.warn("Warning: SENDGRID_API_KEY is not set. Emails will not be sent.");
}

async function sendMail(to, subject, html, text) {
    // This function sends an email immediately using SendGrid's API.
    const msg = {
        to,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject,
        text,
        html,
    };
    // await sgMail.send(msg); and error handling logic
}

async function queueMail(to, subject, html, text) {
    // Emails are queued here to be sent by the scheduled email worker.
    // The records are store in an EmailQueue document
    // Emails are queued to prevent blocking the main event loop and to allow for retries.
    const email = new EmailQueue({
        to,
        subject,
        body: html,
        text,
    });
    await email.save();
}

module.exports = { sendMail, queueMail };
