# Sonic Touch

Sonic Touch is an AI-powered, voice-controlled e-commerce platform designed for accessibility, especially for visually impaired users. It combines modern full-stack technologies and conversational AI to deliver an inclusive online shopping experience.

---

## Project Structure

```
sonic-touch/
├── client/        # Frontend (React + Vite + Tailwind CSS)
├── server/        # Backend (Node.js + Express + MongoDB)
├── rasa/          # Conversational AI (Rasa)
├── docker-compose.yml
├── .env           # Environment config (not committed)
└── README.md
```

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Integration:** Rasa (Conversational AI)
- **Accessibility Feature:** Voice-controlled shopping assistant

---

## Prerequisites

Ensure the following are installed on your system:

| Tool                    | Recommended Version |
| ----------------------- | ------------------- |
| Node.js                 | v20.18.3            |
| NPM                     | v10.8.2             |
| MongoDB                 | v7.0.17             |
| Docker & Docker Compose | Latest              |

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repo_url>
cd sonic-touch
```

---

### 2. Configure Environment Variables

#### Backend (`server/.env`)

Create a `.env` file in the `server/` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

#### Frontend (`client/.env`)

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000
```

> **Note:** Always ensure `.env` files are **not committed** to version control. Add them to `.gitignore`.
> Create `.env.example` files in both `client/` and `server/` to document required variables.

---

### 3. Start the Application with Docker

Run the full stack using Docker Compose:

```bash
docker-compose up --build
```

This will:

- Build and run the React frontend
- Launch the Express backend with MongoDB
- Start the Rasa AI server for conversational interaction

---

## AI Features

- **Conversational AI with Rasa:** Understands user queries via natural language.
- **Voice Assistance :** Enables shopping using voice commands for enhanced accessibility.

---

## Installed Frontend Dependencies

### Dependencies:

- `axios`
- `react`
- `react-dom`
- `react-icons`
- `react-router-dom`

### Dev Dependencies:

- `@vitejs/plugin-react`
- `@types/react`, `@types/react-dom`
- `eslint`, `eslint-plugin-react`, etc.
- `tailwindcss`, `postcss`, `autoprefixer`
- `vite`

---
