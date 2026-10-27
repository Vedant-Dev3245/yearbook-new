const router = require("express").Router();
const { getNotifications, markNotificationsRead } = require("../views/notifications");

router.get("/", getNotifications);
router.post("/read", markNotificationsRead);

module.exports = router;
