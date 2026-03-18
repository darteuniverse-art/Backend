const cartService = require("./cart.service");

async function getCart(req, res) {
    await cartService.getCart();
}
async function addToCart(req, res) {
    await cartService.addToCart();
}
async function removeFromCart(req, res) {
    await cartService.removeFromCart();
}

async function clearCart(req, res) {
    await cartService.clearCart();
}

module.exports = { getCart, addToCart, removeFromCart, clearCart };
