# Event Booking System

## Description
This is a full-stack web application for booking event tickets. Users can register, log in, log out, and manage their bookings through a simple and intuitive interface.

## Live Demo
http://3.106.229.181

## Technology Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Token)
- **Version Control:** GitHub
- **CI/CD:** GitHub Actions
- **Deployment:** AWS EC2

## Features
- User registration, login, and logout
- JWT authentication and authorisation
- Booking CRUD (Create, Read, Update, Delete)
- Responsive UI

## Project Structure
```
sampleapp_IFQ636_I-Ching-Chang/
├── frontend/          # React.js frontend
├── backend/           # Node.js + Express backend
└── .github/
    └── workflows/
        └── ci.yml     # GitHub Actions CI/CD pipeline
```

## Getting Started

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Environment Variables
Create a `.env` file in the `backend` folder:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001
```

## Sample Account
- **Email:** user1@test.com
- **Password:** 123456

## CI/CD Pipeline
GitHub Actions is used for automated testing and deployment to AWS EC2.
- Push to `main` branch triggers the pipeline
- Runs backend tests automatically
- Deploys to EC2 via self-hosted runner

## GitHub Repository
https://github.com/alicechang5143/sampleapp_IFQ636_I-Ching-Chang