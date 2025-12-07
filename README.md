# 🗓️ Family Organiser – Coursework CW1

This project is the **Frontend Web Development CW1**. It is a **React Single Page Application (SPA)** with a **Node.js / Express backend API** and a simple **NeDB database**. The system acts as a **Family Organiser** which allows users to register, log in and manage family events.

---

## 📦 Features

### 👤 User System
- User registration with password validation  
- Login system with localStorage session saving  
- Each user belongs to a specific family group  
- Users can only view events belonging to their family  
- Only event creators can edit or delete their own events  
- Administrators have permission to create events

### 📅 Event Management
- Add new events with:
  - Event name  
  - Date  
  - Start + end time  
  - Location  
  - Required items  
- Edit existing events  
- Delete events  

### 🔎 Searching & Filtering
- Search events by:
  - Name  
  - Location  
  - Organiser  
  - Date  

### ⚙️ Backend Functionality
- REST API built using Express  
- NeDB storage (`users.db`, `events.db`)  
- Secure password hashing with salts  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React (Vite), JavaScript, Bootstrap |
| **Backend** | Node.js, Express.js |
| **Database** | NeDB (.db file storage) |
| **Tools** | npm, Git, Vite |

---

# 🚀 Setup Instructions

Follow these steps to install and run the project.

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Zayd3030/FrontendCW.git
cd FEWD2526-cwbackend-update
```

## 2️⃣ Install Dependencies
Inside the backend folder, install all required dependencies:

```bash
npm install
```

This installs all necessary Node modules listed in `package.json` (including Express and CORS).

## 3️⃣ Run the Backend Server
Start the backend server locally:

```bash
node index.js
```

## 4️⃣ Set Up and Run the Frontend
Navigate to your React frontend folder:

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

- **Backend:** http://localhost:3002  
- **Frontend:** http://localhost:5173  

If the frontend fetches data from the backend successfully then the setup is complete.

## 5️⃣ Push Your Project to GitHub
Once everything works, commit and push your code:

```bash
git add .
git commit -m "Initial setup for Family Organiser CW1"
git branch -M main
git push -u origin main
```

---

## 👤 Author

**Zayd Hussain**  
**Student ID: S2212398**

---

## ✨ Added Features

This project includes extra features not explicitly required in the coursework brief:


### 🔐 Improved Authentication
- Password validation (min 6 characters + at least one number)
- Styled feedback messages for success / error states
- LocalStorage session persistence for logged in users

---

### 👨‍👩‍👦 Family Group Enforcement
- Users are linked to a unique **familyId**
- Users can only view or manage events from their own family

---

### 🛠️ Event Ownership
- All events are automatically tagged with:
  - **Organiser username**
  - **Organiser family ID**
- Event Page shows event counter
- Add Event Redirects to Login when not logged in
---

### 🎨 UI/UX Enhancements
- Global styling and layout improvements using a `.page` wrapper
- Use of Icons
- Bootstrap intergration

---

### 🗺 Google Maps Integration
- Each event now includes a “View on Map” button
- The event’s location is automatically passed to Google Maps using a search query.
