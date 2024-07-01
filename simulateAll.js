const axios = require("axios");

const baseURL = "http://localhost:5000/api";
let token = "";
let webhookId = "";

const userCredentials = {
  username: "YOUR_USERNAME",
  password: "YOUR_PASSWORD",
};

const webhookData = {
  sourceUrl: "http://example.com/source",
  callbackUrl: "http://example.com/callback",
};

const simulateAll = async () => {
  try {
    // Register a new user
    console.log("Registering a new user...");
    await axios.post(`${baseURL}/users/register`, userCredentials);
    console.log("User registered successfully");

    // Log in to get the JWT token
    console.log("Logging in...");
    const loginResponse = await axios.post(`${baseURL}/users/login`, {
      username: userCredentials.username,
      password: userCredentials.password,
    });
    token = loginResponse.data.token;
    console.log("Logged in successfully");

    // Subscribe to a webhook
    console.log("Subscribing to a webhook...");
    const subscribeResponse = await axios.post(
      `${baseURL}/webhooks/subscribe`,
      webhookData,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    console.log(`Subscribed to webhook successfully...`);

    // Simulate a webhook event
    console.log("Simulating a webhook event...");
    const sampleEventData = {
      sourceUrl: webhookData.sourceUrl,
      event: [
        {
          type: "event_type_1",
          data: "event_data_1",
        },
        {
          type: "event_type_2",
          data: "event_data_2",
        },
      ],
    };
    await axios.post(`${baseURL}/webhooks/events`, sampleEventData, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Webhook event simulated successfully");

    // List all webhooks
    console.log("Listing all webhooks...");
    const listResponse = await axios.get(`${baseURL}/webhooks/list`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    console.log("Webhooks:", listResponse.data);
    webhookId = listResponse.data[0]._id;

    // Cancel a webhook subscription
    console.log("Canceling the webhook subscription...");
    await axios.delete(`${baseURL}/webhooks/cancel/${webhookId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    console.log("Webhook subscription canceled successfully");
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

simulateAll();
