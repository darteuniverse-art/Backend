const EmailQueue = require("../shared/models/EmailQueue");
const { sendMail } = require("../shared/lib/mail/mailer");
const { cron } = require("node-cron");

async function processEmailQueue() {
    /* Fetch pending email from the queue(maximum 10 at a time to 
    avoid overwhelming the our server load)
    Then attenmpt to send them via the sendMail helper
    Catch errors and mark as failed inside the EmailQueue Document */
}

// Schedule the email queue processing to run every 5 minutes
async function startEmailQueueWorker() {
    console.log("Starting email queue worker...");
    cron.schedule("*/5 * * * *", () => {
        console.log("Processing email queue...");
        processEmailQueue();
    });
}

module.exports = { startEmailQueueWorker };