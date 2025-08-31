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

## Prerequisites

> 🐳 You only need [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/) installed.
> No need for Node.js, MongoDB, or Rasa installed locally.

---

## Setup & Usage

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sonic-touch.git
cd sonic-touch
```

### 2. Configure Environment Variables

Create `.env` files for local development. Do **not** include private credentials in the repository. Use placeholders:

**client/.env**

```env
VITE_API_URL=http://localhost:5000
```

**server/.env**

```env
MONGO_URI=mongodb://<your_mongo_host>:<port>/<database_name>
JWT_SECRET=<your_secret_key>
PORT=5000
```

---

## 3. Deployment Options

### **Option 1: Use your own Docker registry**

## Guides

- [Setup Own Docker Registry and use Docker compose pull & up ](docker-compose-file-own-registry.md)

> This option is ideal for production or machines with limited disk space.

---

### **Option 2: Local build (development / testing)**

- [Local Build & Run using Docker Compose](docker-compose-file-local-build.md)

> Frontend will be available at [http://localhost:8080](http://localhost:8080)

---

## Developer Notes

- Frontend is served via NGINX using production `dist` build
- Backend connects to MongoDB inside the Docker network
- Rasa and Rasa Actions run in separate containers
- Navigation of website pages is managed via React routing
- Common introductory sections are prebuilt; additional pages are loaded dynamically
- All sensitive data (like MongoDB credentials) should be kept in `.env` and not committed

---

## Demo Video

[![Watch the video](https://youtu.be/Lt-gNI9ZyOI?feature=shared)]

## Contributions

We welcome improvements in accessibility, features, and performance. Improve Rasa AI usages.
Feel free to fork, create issues, or open a pull request.

---

## License

MIT License
© 2025 Sonic Touch Contributors