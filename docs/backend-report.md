# 📌 Backend Report – Real-Time Chat Application

## Overview

The backend is built using **Node.js and Express.js**, providing REST APIs and real-time communication using **Socket.IO**. It manages authentication, chat logic, and message delivery.


## Key Features

### 🔐 Authentication

* User registration and login
* Protected routes and session handling

### 💬 Chat Management

* Create and access chat rooms
* Fetch user conversations
* Support for private and group chats

### ⚡ Real-Time Messaging

* Implemented using **Socket.IO**
* Instant message delivery
* Room-based communication


## Database

* MongoDB used for:

  * Users
  * Chats
  * Messages
* Structured schemas with Mongoose


## Production Preparation

* Fixed Linux case-sensitivity issues
* Replaced nodemon with production scripts
* Configured environment variables (CORS, DB, frontend URL)


## Deployment

* Deployed on **Render**
* Verified API routes and WebSocket functionality


## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO


## Result

A scalable backend system handling authentication, chat logic, and real-time communication reliably.
