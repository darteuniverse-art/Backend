const paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);

function getPaystackClient() {
  return paystack;
}

async function initializeTransaction() {}
async function verifyTransaction() {}
async function refundTransaction() {}

module.exports = { getPaystackClient, initializeTransaction, verifyTransaction, refundTransaction };