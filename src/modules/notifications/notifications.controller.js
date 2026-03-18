const notificationsService = require("./notifications.service");

async function getNotifications() {
  await notificationsService.getNotifications();
}
async function markAsRead() {
  await notificationsService.markAsRead();
}

module.exports = { getNotifications, markAsRead };
