# Webhook Subscription System

## Overview

This project is a Node.js-based application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to subscribe to webhooks and handle incoming webhook custom events. Users can register, log in, manage their webhook subscriptions, and view incoming custom events through a React.js frontend.

## Features

1. User Registration and Authentication
2. Webhook Subscription Management
3. Handling and Viewing Webhook Events
4. JWT-based Authentication
5. Simulation of Webhook Events

## Instalation

cd backend
npm install

Edit the .env file in the backend directory and add the following environment variables:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

node server.js

## Architecture and Design Choices-

Express.js: Chosen for its simplicity and flexibility in handling HTTP requests and building RESTful APIs.
MongoDB: Used as the database for its schema-less nature and scalability, making it ideal for handling dynamic data structures.
JWT: Implemented for secure and stateless user authentication.
CORS Middleware: Configured to handle cross-origin requests between the frontend and backend.

Endpoints
User Endpoints:

POST /api/users/register: Register a new user.
POST /api/users/login: Log in a user and return a JWT.

Webhook Endpoints:

POST /api/webhooks/subscribe: Subscribe to a webhook.
GET /api/webhooks/list: List all subscribed webhooks for a user.
DELETE /api/webhooks/cancel/:id: Cancel a webhook subscription.
POST /api/webhooks/events: Handle incoming webhook events.

## Folder Structure

backend
│
├── controllers
│ ├── userController.js
│ ├── webhookController.js
│
├── middleware
│ ├── authMiddleware.js
│
│
├── models
│ ├── User.js
│ ├── Webhook.js
│
├── routes
│ ├── auth.js
│ ├── webhooks.js
│
│
├── server.js
└── .env
└── simulateAll.js- A simple Node.js script that simulates my webhook events. This script sends requests to application's webhook handling endpoint with sample data.
