# EzRent

EzRent is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that currently only provides 
login and registration functionalities.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Demo

You can check out the live demo of the project [here](#).

## Features

- User Registration
- User Login
- JWT Authentication

## Technologies Used

- **Frontend**
  - React.js
  - Axios
  - Bootstrap (or any other CSS framework/library you use)
  - Vite

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JSON Web Token (JWT)
  - bcryptjs

## Installation

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js and npm should be installed on your machine. You can download them [here](https://nodejs.org/).
- MongoDB should be installed and running. Instructions to install MongoDB can be found [here](https://docs.mongodb.com/manual/installation/).

### Clone the Repository

```bash
git clone https://github.com/your-username/ezrent.git
cd ezrent
```

### Install Dependencies

```bash
```

#### Backend

Navigate to the `LoginRegister/server/` directory and install dependencies:

```bash
cd LoginRegister/server/
npm install cors express mongoose nodemon
```

#### Frontend

Navigate to the `/LoginRegister/client/` directory and install dependencies:

```bash
cd ../client/
npm install axios bootstrap react react-dom react-router-dom
```

### Set up Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Start the Application

#### Backend

```bash
cd /LoginRegister/server/
npm run start
```

#### Frontend

Open another terminal, navigate to the `frontend` directory, and start the React application:

```bash
cd /LoginRegister/client/
npm run dev
```

## Usage

Once both the backend and frontend servers are running

After running frontend commands you should see this,

```
> client@0.0.0 dev
> vite


  VITE v5.2.12  ready in XX ms

  ➜  Local:   http://localhost:XXXX/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

by copying the Local link and entering it into a browser one would be able to access the webapp.


### Register

To register a new user, click on the "Register" link and fill out the form.

### Login

To log in, click on the "Login" link and enter your credentials.

## Project Structure

```
EzRent/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── package.json
├── .gitignore
└── README.md
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - your_email@example.com

Project Link: [https://github.com/your-username/ezrent](https://github.com/your-username/ezrent)

---

This template provides a comprehensive README for your project. Make sure to replace placeholders like `your-username`, `your_mongodb_connection_string`, `your_jwt_secret_key`, and others with actual information specific to your project.

