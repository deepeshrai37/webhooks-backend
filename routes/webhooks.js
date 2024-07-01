// routes/webhooks.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  subscribeWebhook,
  listWebhooks,
  handleWebhookEvent,
  cancelWebhook,
} = require("../controllers/webhookController");

router.post("/subscribe", authMiddleware, subscribeWebhook);
router.get("/list", authMiddleware, listWebhooks);
router.post("/events", handleWebhookEvent);
router.delete("/cancel/:id", authMiddleware, cancelWebhook);

module.exports = router;
