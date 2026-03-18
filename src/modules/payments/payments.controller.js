const paymentsService = require("./payments.service");

async function handleWebhook(req, res) { await paymentsService.handleWebhook(); }

module.exports = { handleWebhook};
