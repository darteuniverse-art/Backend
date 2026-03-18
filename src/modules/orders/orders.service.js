const { Order, DiscountCode } = require("./models");
const { User } = require("../auth/models");
const { createPayment } = require("../payments/payments.service");

async function createOrder() {}
async function getOrders() {}
async function getOrderById() {}
async function verifyDiscountCode() {}

module.exports = { createOrder, getOrders, getOrderById, verifyDiscountCode };
