# 🗓️ Family Organiser – FEWD Coursework CW1

This project is part of the **Front-End Web Development (FEWD) 2025/26 Coursework CW1** assessment.  
It is a **React-based Single Page Application (SPA)** connected to a **Node.js / Express backend API**.  
The system functions as a **Family Organiser**, allowing users to register, log in, and manage family events such as appointments, outings, and activities.

---

## 📦 Features

- User registration and login system  
- Add, edit, and delete family events  
- Search and filter events by name or category  
- Responsive interface using React and Bootstrap  
- Data persistence via a Node/Express backend  
- JSON-based REST API communication between frontend and backend  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite), JavaScript, Bootstrap |
| **Backend** | Node.js, Express.js |
| **Data** | JSON (local data or API endpoint) |
| **Tools** | npm, Git, ESLint, Prettier |

---

## 🚀 Setup Instructions

Follow these steps carefully to set up the project on your local machine.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Zayd3030/FrontendCW.git
cd FEWD2526-cwbackend-update

## 🚀 Setup Instructions (Steps 2–5)

Follow these steps to install, run, and upload your Family Organiser project.

### 2️⃣ Install Dependencies
Inside the backend folder, install all required dependencies:

```bash
npm install
```

This installs all necessary Node modules listed in `package.json` (including Express and CORS).

### 3️⃣ Run the Backend Server
Start the backend server locally:

```bash
node index.js
```

You should see:
```
Server started on port 3001. Ctrl^c to quit.
```

Now open your browser and visit:
```
http://localhost:3001/food
```
If JSON data appears, your backend is running correctly ✅

### 4️⃣ Set Up and Run the Frontend
Navigate to your React frontend project (created with Vite):

```bash
cd ../family-organiser-frontend
npm install
npm run dev
```

Vite will start a local development server, usually on:
```
http://localhost:5173/
```

Open that link in your browser to view your React app.  
Ensure both servers are active:

- **Backend:** http://localhost:3001  
- **Frontend:** http://localhost:5173  

If the frontend fetches data from the backend successfully, your setup is complete.

### 5️⃣ Push Your Project to GitHub
Once everything works, commit and push your code:

```bash
git add .
git commit -m "Initial setup for Family Organiser CW1"
git branch -M main
git push -u origin main
```

You can now access your repository on GitHub and share the project link.

---

## 👤 Author

**Zayd Hussain**  
BSc Computer Science  
Glasgow Caledonian University  
2025/26  

---

## ⚠️ Disclaimer

This project was developed as part of the **FEWD2526 – Front-End Web Development Coursework (CW1)**.  
All source code and design decisions were produced solely for **academic purposes** under Glasgow Caledonian University’s coursework requirements.  
Do not reuse, resubmit, or redistribute this work outside its intended educational context.


