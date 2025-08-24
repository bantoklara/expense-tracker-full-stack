Expense Tracker App

A simple expense tracking web application built with React, NodeJS, and Firebase. This app allows users to create, view, edit and delte expenses.

Note: Auhtentication is not implemented yet. All data is accessible without login.

Features:

- Create, view, edit and delete expenses
- Visual statistics about monthly payments
- Infinite scroll implemented to view expense list
- Real-time database using Firebase

Technologies:

- Frontend: React, Tailwind CSS
- Backend: NodeJS, ExpressJS
- Database: Firestore
- Deployment: Render (backend), Vercel (frontend)

Installation
1. Clone the repository: https://github.com/bantoklara/expense-tracker-full-stack.git
2. cd expense-tracker-full-stack/backend
3. npm install
4. Configure a firebase project: https://console.firebase.google.com
5. Copy your Firebase config into .env
6. Run the backend locally: npm start
7. cd ./frontend
8. npm install
9. Run the frontend locally: npm run dev


Future Improvements:

- Add user auhtentication
- Filter expenses based on date, expense category
- Maintain income