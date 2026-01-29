# Machine Test for MERN Stack Developer

A full-stack application for managing agents and distributing leads from CSV/XLSX files.

## **Features**
- **Admin Login**: JWT-based authentication for admins.
- **Agent Management**: Create and list agents with name, email, and mobile details.
- **Lead Distribution**: Upload CSV/XLSX files and automatically distribute leads equally among agents.
- **Sequential Distribution**: If the number of leads is not divisible by the number of agents, remaining leads are assigned sequentially.

---

## **Tech Stack**
- **Frontend**: React.js (Vite), Axios, React Router, Lucide Icons.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Multer (File Upload), CSV-Parser, XLSX.
- **Styling**: Vanilla CSS.

---

## **Prerequisites**
- Node.js installed.
- MongoDB installed and running locally.

---

## **Setup Instructions**

### **1. Clone and Navigate**
```bash
cd machine_test
```

### **2. Backend Setup**
Navigate to the backend directory, install dependencies, and setup environment variables.
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/machine_test
JWT_SECRET=supersecretkey
```

### **3. Frontend Setup**
Navigate to the frontend directory and install dependencies.
```bash
cd ../frontend
npm install
```

---

## **Execution Instructions**

### **1. Run Backend**
```bash
cd backend
node server.js
```
The server will run on `http://localhost:5000`.

### **2. Run Frontend**
```bash
cd frontend
npm run dev
```
The application will be available at `http://localhost:5173` (or the port shown in your terminal).

---

## **How to Use**

1. **Create Admin**: Since there is no "Signup" page for admins (per requirements), use the `/api/users/register` endpoint via Postman or CURL to create the first admin, or let the app handle it (Implementation includes a register route).
2. **Login**: Login with the admin credentials.
3. **Add Agents**: Go to "Add Agent" and create at least 5 agents (as per tests).
4. **Upload Leads**: 
   - Go to "Upload Leads".
   - Upload a `.csv` or `.xlsx` file.
   - The file should have headers: `FirstName`, `Phone`, `Notes`.
5. **View Leads**: Check the "View Leads" page to see how the leads were distributed among agents.

---

## **Project Structure**
```
machine_test/
├── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Request logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── middlewares/    # Auth protection
│   └── server.js       # Entry point
└── frontend/
    ├── src/
    │   ├── pages/      # Route components
    │   ├── App.jsx     # Routing logic
    │   └── index.css   # Global styles
    └── index.html
```
