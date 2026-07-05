# 🤖 AI Workspace

An AI-powered document analysis platform built using **React, FastAPI, PostgreSQL, and Google Gemini AI**. The application allows users to create workspaces, upload PDF documents, and interact with an AI assistant to ask questions based on the uploaded content.

---

## 🚀 Features

- 🔐 User Authentication (JWT)
- 👤 User Registration & Login
- 📁 Create and Delete Workspaces
- 📄 Upload PDF Documents
- 🗑 Delete Uploaded Documents
- 🤖 AI-Powered Document Question Answering using Google Gemini
- 🔒 Protected API Routes
- 💾 PostgreSQL Database Integration
- ⚡ FastAPI REST APIs
- 🎨 Responsive React Frontend

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Axios

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Pydantic

### AI
- Google Gemini API
- PyMuPDF (PDF Text Extraction)

---

## 📂 Project Structure

```
AI-Workspace/
│
├── backend/
│   ├── app/
│   ├── uploads/
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-Workspace.git
cd AI-Workspace
```

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 📸 Screenshots

(Add screenshots here after deployment.)

---

## 🔮 Future Enhancements

- AI Resume Analysis
- Chat History
- Multiple Document Upload
- Dashboard Analytics
- Workspace Search
- Responsive UI Improvements

---

## 👩‍💻 Author

**Harshitha B**

GitHub: https://github.com/YOUR_USERNAME
