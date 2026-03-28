# 🚀 Real-Time Chat Application – Backend

## 📌 Overview

This is the **backend** of a real-time chat application built with **Node.js and Express.js**.
It provides REST APIs and real-time communication using **Socket.IO**.

The backend handles authentication, chat management, and real-time message delivery.

---

## ✨ Features

### 🔐 Authentication

* User registration and login
* Protected routes

### 💬 Chat Management

* Create chat rooms
* Access existing chats
* Fetch user conversations
* Support for private and group chats

### ⚡ Real-Time Messaging

* Implemented using **Socket.IO**
* Instant message delivery
* Room-based communication system

---

## 🗄️ Database

* MongoDB used for:

  * Users
  * Chats
  * Messages
* Managed with Mongoose schemas

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* CORS

---

## 🚀 Live API

👉 https://your-render-link

---

## ⚙️ Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-username/realtime-chat-application-backend

# Navigate to project
cd realtime-chat-application-backend

# Install dependencies
npm install

# Run server
npm run start
```

---

## 🔗 Environment Variables

Create a `.env` file and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection
FRONTEND_URL=your_frontend_url
JWT_SECRET=your_secret_key
```

---

## ⚙️ Production Notes

* Configured CORS for frontend communication
* Fixed case-sensitivity issues for deployment
* Uses `node` instead of `nodemon` in production

---

## 📄 Documentation

For detailed implementation:

* [Backend Report](./docs/backend-report.md)

---

## 📊 Result

A scalable backend system that handles authentication, chat logic, and real-time communication reliably.
