# Sonic Touch

**Sonic Touch** is a voice-enabled, AI-powered e-commerce platform designed with accessibility at its core — especially for visually impaired users. The system runs entirely on Docker for consistent, portable development and deployment.

---

## Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **AI Assistant:** Rasa (Conversational AI & Voice Support)
- **Reverse Proxy:** NGINX
- **Containerization:** Docker & Docker Compose

---

## Project Structure

```

sonic-touch/
├── client/        # React frontend
├── server/        # Node.js backend
├── rasa/          # Rasa assistant
├── nginx/         # NGINX reverse proxy config
├── docker-compose.yml

```

---

## Prerequisites

> 🐳 You only need [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/) installed. No local Node.js or MongoDB setup required.

---

## Setup & Usage

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sonic-touch.git
cd sonic-touch
```

### 2. Configure Environment Variables

Create the following `.env` files:

#### `client/.env`

```env
VITE_API_URL=http://localhost:5000
```

#### `server/.env`

```env
MONGO_URI=mongodb://mongodb:27017/sonic-touch
JWT_SECRET=your_secret_key
PORT=5000
```

---

### 3. Start the Application

```bash
docker-compose down
docker-compose up --build
```

This will start all services:

- Frontend → [http://localhost:8080](http://localhost:8080)
- Backend API → [http://localhost:5000](http://localhost:5000)
- Rasa Assistant → [http://localhost:5005](http://localhost:5005)
- NGINX (optional if configured) → Handles routing

---

##  AI & Voice Features

- Voice-enabled conversational shopping via Rasa
- NLP support for intent recognition and guided interactions
- Accessibility-first design for inclusive UX

---

## Developer Notes

- Frontend is served via NGINX using the production `dist` build
- Backend connects to MongoDB inside the Docker network
- Rasa and Rasa Actions are run in separate containers and exposed via API
- All routing can be handled through `nginx/default.conf`

---

## Docker Volumes Used

- `mongodb_data` — Persistent MongoDB storage
- `rasa/models` — Mounted model directory for Rasa

---

## Contributions

We welcome improvements in accessibility, features, and performance.
Feel free to fork, create issues, or open a pull request.

---
