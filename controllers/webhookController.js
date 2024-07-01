// controllers/webhookController.js
const Webhook = require("../models/Webhook");
const Queue = require("bull");
const webhookQueue = new Queue("webhookQueue");

webhookQueue.process(async (job) => {
  // Process the job (send the event to the callback URL)
  const { callbackUrl, event } = job.data;
  try {
    await axios.post(callbackUrl, event);
  } catch (error) {
    if (job.attemptsMade < 5) {
      throw new Error("Failed to deliver event, will retry");
    } else {
      console.log("Failed to deliver event after 5 attempts");
    }
  }
});

exports.subscribeWebhook = async (req, res) => {
  const { sourceUrl, callbackUrl } = req.body;
  try {
    const newWebhook = new Webhook({
      user: req.user,
      sourceUrl,
      callbackUrl,
    });
    await newWebhook.save();
    res.status(201).json({ message: "Webhook subscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.listWebhooks = async (req, res) => {
  try {
    const webhooks = await Webhook.find({ user: req.user });
    res.json(webhooks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelWebhook = async (req, res) => {
  try {
    await Webhook.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Webhook subscription cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.handleWebhookEvent = async (req, res) => {
  const { sourceUrl, event } = req.body;
  try {
    const webhook = await Webhook.findOne({ sourceUrl });
    if (webhook) {
      webhook.events.push(event);
      await webhook.save();
      webhookQueue.add(
        { callbackUrl: webhook.callbackUrl, event },
        { attempts: 5 }
      );
    }
    res.status(200).json({ message: "Event received" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
