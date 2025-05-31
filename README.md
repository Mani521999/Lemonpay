# Task Management Application

A full-stack task management application with a React frontend and a Node.js + Express backend.

---

## 🚀 Project Structure

```
/project-root
│
├── /Backend         # Node.js + Express backend
├── /Frontend        # React frontend
└── README.md        # This file
```

---

## ⚙️ Prerequisites

- **Node.js v18**
- **npm** (comes with Node.js)

Verify your setup:

```bash
node -v   # should output v18.x.x
npm -v
```

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Mani521999/Lemonpay.git
cd your-repo-name
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

### ▶️ Start the Backend

```bash
npm start
```

The backend will run at:

```
http://localhost:2001
```

Make sure this matches the API URL in your frontend Axios config.

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
```

### ▶️ Start the Frontend

```bash
npm run dev
```

The frontend will usually run at:

```
http://localhost:5173
```

> You can update the port in `vite.config.js` if needed.

---

## 📂 Environment Variables

Make sure to configure any required environment variables.

### Backend `.env` example:

```
PORT=2001
MONGO_URI=mongodb://localhost:27017/taskmanager
```

### Frontend `.env` example:

```
VITE_API_URL=http://localhost:2001/api/v1
```

---

## 🛠 Technologies Used

- **Frontend**: React, Axios, React Bootstrap, SweetAlert2, react-data-table-component
- **Backend**: Node.js, Express, MongoDB
- **Other**: Vite, dotenv

---

## 📬 Contact

For questions or support, feel free to open an issue or contact the maintainer.