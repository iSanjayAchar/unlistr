# Unlistr: The only todo app you need

**Unlistr** is a simple and efficient todo list application built with Node.js and Express. It helps you manage your tasks and stay organized.

**Features:**
1. User management (Register, Login)
2. Tasks management (Create, List, Edit, Delete)
3. Filter (In UI based on status (`Todo`, `In Progress`, `Done`)

**Stack:**
1. React
2. NodeJS (CommonJS)
3. PouchDB (file-based database)
4. Express

### Installation
```
# Clone the project
https://github.com/iSanjayAchar/unlistr.git

# Install dependencies
npm install

# Install client dependencies
npm --prefix "client" install

# Create .env file in root with below value
PORT=3001 # port of your choice
JWT_SECRET=secretOrPrivateKey # Random combination of ascii characters

# Build react project
npm run build:ui 

# Start the server
npm start
```

### Screenshots

<div style="display: flex; gap: 20px;">
  <figure style="display: flex; flex-direction: column; align-items: center; margin-bottom: 20px;">
    <img src="https://raw.github.com/isanjayachar/unlistr/main/screenshots/screenshot-1.png" alt="Landing" style="width: 100%; height: auto; object-fit: cover;">
    <figcaption style="text-align: center;">Landing</figcaption>
  </figure>
  <figure style="display: flex; flex-direction: column; align-items: center;">
    <img src="https://raw.github.com/isanjayachar/unlistr/main/screenshots/screenshot-2.png" alt="Register" style="width: 100%; height: auto; object-fit: cover;">
    <figcaption style="text-align: center;">Register/Login</figcaption>
  </figure>
  <figure style="display: flex; flex-direction: column; align-items: center;">
    <img src="https://raw.github.com/isanjayachar/unlistr/main/screenshots/screenshot-3.png" alt="Todo Form" style="width: 100%; height: auto; object-fit: cover;">
    <figcaption style="text-align: center;">Todo Form</figcaption>
  </figure>
  <figure style="display: flex; flex-direction: column; align-items: center;">
    <img src="https://raw.github.com/isanjayachar/unlistr/main/screenshots/screenshot-4.png" alt="List of tasks" style="width: 100%; height: auto; object-fit: cover;">
    <figcaption style="text-align: center;">List of tasks</figcaption>
  </figure>
  <figure style="display: flex; flex-direction: column; align-items: center;">
    <img src="https://raw.github.com/isanjayachar/unlistr/main/screenshots/screenshot-5.png" alt="Filtered tasks" style="width: 100%; height: auto; object-fit: cover;">
    <figcaption style="text-align: center;">Filtered tasks</figcaption>
  </figure>
  <figure style="display: flex; flex-direction: column; align-items: center;">
    <img src="https://raw.github.com/isanjayachar/unlistr/main/screenshots/screenshot-6.png" alt="Empty filter" style="width: 100%; height: auto; object-fit: cover;">
    <figcaption style="text-align: center;">Empty filter</figcaption>
  </figure>
</div>
