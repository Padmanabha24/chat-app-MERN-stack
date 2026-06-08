# 💬 Chat App — MERN Stack

A full-stack, real-time chat application built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js) and powered by **Socket.IO** for seamless bi-directional communication.

---

## 🚀 Features

- **Real-Time Messaging** — Instant message delivery using Socket.IO, no page refresh needed
- **User Authentication** — Secure sign-up and login with JWT-based auth
- **One-to-One Conversations** — Private chat between registered users
- **Online Status** — See who's currently active
- **Persistent Message History** — All conversations stored in MongoDB
- **Responsive UI** — Clean, mobile-friendly interface built with React + Vite

---

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js (Vite), CSS                |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB (Mongoose ODM)              |
| Real-Time  | Socket.IO                           |
| Auth       | JSON Web Tokens (JWT), bcrypt       |

---

## 📁 Project Structure

```
chat-app-MERN-stack/
├── Backend/
│   ├── controllers/       # Route logic (auth, messages, users)
│   ├── models/            # Mongoose schemas (User, Message, Conversation)
│   ├── routes/            # Express API routes
│   ├── middleware/        # Auth middleware (JWT verification)
│   ├── index.js           # Server entry point, Socket.IO setup
│   └── package.json
│
├── Frontend/
│   └── vite-project/
│       ├── src/
│       │   ├── components/   # Reusable UI components
│       │   ├── pages/        # Login, Register, Chat pages
│       │   ├── context/      # React Context (auth, socket)
│       │   └── App.jsx
│       ├── index.html
│       └── package.json
│
└── .gitignore
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or [Atlas](https://www.mongodb.com/cloud/atlas))
- npm or yarn

---

### 1. Clone the Repository

```bash
git clone https://github.com/Padmanabha24/chat-app-MERN-stack.git
cd chat-app-MERN-stack
```

---

### 2. Set Up the Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server will run at **http://localhost:5000**

---

### 3. Set Up the Frontend

```bash
cd ../Frontend/vite-project
npm install
```

Create a `.env` file in the `Frontend/vite-project/` directory (if needed):

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| POST   | `/api/auth/register`  | Register a new user |
| POST   | `/api/auth/login`     | Login and get token |

### Users
| Method | Endpoint            | Description               |
|--------|---------------------|---------------------------|
| GET    | `/api/users`        | Get all users             |
| GET    | `/api/users/:id`    | Get a specific user       |

### Messages
| Method | Endpoint                        | Description                       |
|--------|---------------------------------|-----------------------------------|
| GET    | `/api/messages/:conversationId` | Fetch messages for a conversation |
| POST   | `/api/messages`                 | Send a new message                |

### Conversations
| Method | Endpoint                     | Description                    |
|--------|------------------------------|--------------------------------|
| POST   | `/api/conversations`         | Create or fetch a conversation |
| GET    | `/api/conversations/:userId` | Get all conversations for user |

---

## 🔐 Environment Variables

| Variable     | Description                       |
|--------------|-----------------------------------|
| `PORT`       | Port for the Express server       |
| `MONGO_URI`  | MongoDB connection string         |
| `JWT_SECRET` | Secret key for signing JWT tokens |

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## 📦 Scripts

### Backend

| Command       | Description                   |
|---------------|-------------------------------|
| `npm start`   | Start the production server   |
| `npm run dev` | Start with nodemon (dev mode) |

### Frontend

| Command           | Description                   |
|-------------------|-------------------------------|
| `npm run dev`     | Start Vite development server |
| `npm run build`   | Build for production          |
| `npm run preview` | Preview the production build  |

---

## 🧩 Socket.IO Events

| Event           | Direction       | Description                           |
|-----------------|-----------------|---------------------------------------|
| `sendMessage`   | Client → Server | User sends a message                  |
| `receiveMessage`| Server → Client | Deliver message to recipient          |
| `addUser`       | Client → Server | Register user as online on connection |
| `getUsers`      | Server → Client | Broadcast list of online users        |
| `disconnect`    | Client → Server | User goes offline                     |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source. Feel free to use, modify, and distribute it.

---

## 👨‍💻 Author

**Padmanabha24**  
GitHub: [@Padmanabha24](https://github.com/Padmanabha24)
