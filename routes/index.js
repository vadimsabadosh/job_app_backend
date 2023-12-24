const router = require("express").Router();

const authRoute = require("./auth");
const userRoute = require("./user");
const jobRoute = require("./job");
const bookmarkRoute = require("./bookmark");
const chatRoute = require("./chat");
const messagesRoute = require("./messages");

router.use("/", authRoute);
router.use("/user", userRoute);
router.use("/job", jobRoute);
router.use("/bookmark", bookmarkRoute);
router.use("/chat", chatRoute);
router.use("/messages", messagesRoute);

module.exports = router;
