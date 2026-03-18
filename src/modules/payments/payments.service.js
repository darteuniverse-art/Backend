const { Payment } = require("./models");

async function createPayment() {
  /*
    To be called by order service when an order is created. 
    It will create a payment record with status "pending" and return the payment link
    (generated here from paystack api) to the order service.
    The order service will then use this information to redirect
     the user to the payment gateway.
    */
}

async function handleWebhook() {}

module.exports = { handleWebhook, createPayment };
