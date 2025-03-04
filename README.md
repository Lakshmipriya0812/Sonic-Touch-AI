# Sonic Touch

This is an e-commerce project built using **React (Vite) + Tailwind CSS** for the frontend and **Node.js + Express.js + MongoDB** for the backend. It features **AI-powered accessibility** using **Rasa (Conversational AI)** and **LLM-Phi3** for an advanced voice-controlled shopping experience tailored for visually impaired users.

## 📌 Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (Check with `node -v`)
  - Recommended version: `v20.18.3`
- **NPM** (Check with `npm -v`)
  - Recommended version: `10.8.2`
- **MongoDB** (Check with `mongod --version`)
  - Recommended version: `v7.0.17`
- **Git** (Optional but recommended for version control)

## 🚀 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Integration:** Rasa (Conversational AI), LLM-Phi3
- **Accessibility AI Feature:** Voice-controlled shopping assistant for visually impaired users

## ⚠️ Compatibility Note

This project is **developed on Ubuntu (Linux)** and has not yet been set up or verified for development on other operating systems like Windows or macOS. It may require configuration adjustments when setting up in different environments.

- **Windows Users:**
  - Use `Git Bash` or `WSL (Windows Subsystem for Linux)` for better compatibility.
  - Ensure that `NODE_ENV` variables are correctly set in Windows (`set NODE_ENV=development` in cmd or `export NODE_ENV=development` in PowerShell).
  - Install all dependencies using `npm install` as usual.
  - **Potential Windows Development Issues:**
    - File path differences (`/` vs `\`).
    - Environment variables may need to be set manually.
    - MongoDB may require additional setup if running locally.

## 🔧 Setup Instructions

1. **Clone the Repository**
   ```sh
   git clone <repo_url>
   cd <project_folder>
   ```
2. **Initialize the Project (If Not Already Initialized)**
   ```sh
   npm init -y
   ```
   If something goes wrong, try running:
   ```sh
   rm -rf node_modules package-lock.json && npm install
   ```
3. **Install Dependencies**
   ```sh
   npm install
   ```
4. **Setup Environment Variables**

### Backend Environment Setup
Create a `.env` file in the root directory for backend configurations and add the required variables:
   ```sh
   MONGO_URI=your_mongodb_connection_string 
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
   **Important:**
   - Ensure `.env` is added to `.gitignore` to prevent sensitive data from being pushed to the repository.
   - Create an `.env.example` file to document required environment variables.

### Frontend Environment Setup
For the frontend to connect to the backend, create a `.env` file in the root directory of the frontend and add the API URL:
   ```sh
   VITE_API_URL=http://localhost:5000
   ```
   **Note:**
   - Make sure to create this file locally.
   - If `.env` is not already added to `.gitignore`, add it to avoid committing sensitive information.

5. **Run the Development Server**
   - **Frontend**
     ```sh
     npm run dev
     ```
   - **Backend** (Run separately)
     ```sh
     cd server
     node server.js
     ```
   - If port `5000` is not assigned automatically, manually specify the port in port forwarding.

## 📦 Installed Dependencies

After installing all the packages, verify that you have the following dependencies:

### Dependencies
```
axios
react
react-dom
react-icons
react-router-dom
```

### Dev Dependencies
```
@eslint/js
@types/react
@types/react-dom
@vitejs/plugin-react
autoprefixer
eslint
eslint-plugin-react
eslint-plugin-react-hooks
eslint-plugin-react-refresh
globals
postcss
tailwindcss
vite
```

## 🛠 Additional Commands

- **Run Frontend:** `npm run dev`
- **Run Backend:** `cd server && node server.js`

## 📜 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a pull request

## 💡 Notes

- Modify `.env` as per your database setup.
- Ensure compatibility adjustments if running on Windows.
- Always keep sensitive information out of version control by using `.gitignore`.
