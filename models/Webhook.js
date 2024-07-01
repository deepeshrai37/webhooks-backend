// models/Webhook.js
const mongoose = require("mongoose");

const webhookSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sourceUrl: { type: String, required: true },
  callbackUrl: { type: String, required: true },
  events: [{ type: Object }],
});

module.exports = mongoose.model("Webhook", webhookSchema);
