# Orbital24

Level of Achievement - Apollo 11

Motivation - Throughout the two semesters we have experienced studying NUS we have bumped into a myriad of people coming from all walks of life and more often than not we would bump into an international student. The question/topic that would often pop up would be “where are you staying?”. While some are fortunate enough to secure a place on campus others face the issue of renting elsewhere in Singapore. We often hear complaints of their landlord being overly fussy and the process being tedious and time-consuming. Additionally, with the increasing number of students and expatriates coming to study or work in Singapore, finding suitable accommodation has become even more challenging.This project aims to address these challenges by creating a user-friendly platform for rental listings tailored specifically for students and young professionals. Our platform will not only simplify the search process but also provide valuable information and resources to help users make informed decisions about their housing arrangements.

Project scope - Webapp that connects people in the accomodation rental market.

Making an intuitive interface for both parties (potential tenants and landlords) to streamline and simplify the search for rentals. Reducing the time spent and ultimately making the entire process of renting hassle and fuss free. Furthermore, we recognize the importance of creating a supportive community for renters, where they can share their experiences, seek advice, and connect with fellow tenants. Through features such as reviews, forums, and community events, we hope to aid users of our webpage in settling down. We also hope to expand this idea across various rentals such as office spaces, studios and even shophouses, If it were to be proven successful.

User Stories
- As a foreigner/person who works in Singapore I want to find a short term solution for my accommodation. I want to be able to find a rental room near my work place and be able to find a room to my liking.

- As an International student who wants to live in a clean and hassle free accommodation that is near public transport and the place my place of studies in Singapore, I want to be able to filter down the location of my property within a certain distance from my education institute as well as the ability to view the public transport facilities within my area.

- As a fresh graduate, I want to be able to find affordable and convenient locations for my accommodations. I also want to be able to do so with minimal hassle and being well informed about the owner and the place I am settling for.

Core Features
Feature 1: Login and Registration page
Feature 2: Filter rental selections based on multiple filters
Feature 3: View conditions of the rooms
Feature 4: Reviews/Ratings for both tenants, owners and apartments


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

You can check out the live demo of the project [here](https://drive.google.com/file/d/10X02XjYHptaxDeKZ0KFgziChCsOYb_-W/view?usp=sharing).

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
git clone https://github.com/screamt-3/Ez-Rent.git
cd Ez-Rent
```

### Install Dependencies

```bash
Nothing yet
```

#### Backend

Navigate to the `Ez-Rent/LoginRegister/server/` directory and install dependencies:

```bash
cd /server/
npm install cors express mongoose nodemon dotenv
```

#### Frontend

Navigate to the `Ez-Rent/LoginRegister/client/` directory and install dependencies:

```bash
cd ../client/
npm install axios bootstrap react react-dom react-router-dom
```

### Set up Environment Variables

Create a `.env` file in the `Ez-Rent/LoginRegister/server/` directory and add the following environment variables:

```env
PORT=3001
mongoConnectionString = "mongodb://localhost:27017/Users"
```

### Start the Application

#### Backend

Setup Backend.

```bash
cd /server/
npm run start
```

If unable to connect due to permission denied issues, navigate to `/Ez-Rent/LoginRegister/server/node_modules/.bin`.

```bash
cd /node_modules/.bin/
chmod +x nodemon
```

Try the Setup Backend again.

#### Frontend

Open another terminal, navigate to the `Ez-Rent/LoginRegister/client/` directory, and start the React application:

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


  VITE v5.2.12  ready in XXX ms

  ➜  Local:   http://localhost:XXXX/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

by copying the Local link and entering it into a browser one would be able to access the webapp.


### Register

To register a new user, click on the "Register" link and fill out the form.

### Login

To log in, enter your credentials and click on "Login".

## Project Structure

```
EzRent/
├── Login_Register
|   ├── .vscode/
│   │   └── settings.json
│   ├── client
│   │   ├── node_modules
│   │   ├── public
│   │   ├── src
│   │   │   ├── assets
│   │   │   ├── App.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── main.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── .eslintrc.cjs
│   │   │   ├── .gitignore
│   │   │   ├── index.html
│   │   │   ├── package-lock.json
│   │   │   ├── package.json
│   │   │   ├── README.md
│   │   │   ├── vite.config.js
│   ├── server
│   │   ├── models
│   │   │   ├── Users.js
│   │   ├── node_modules
│   │   ├── .env
│   │   ├── index.js
│   │   ├── package-lock.json
└────────── package.json
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

Seah Joel - seahjoel9@gmail.com

Marvin Choo - marvinchoo.mh@gmail.com

Project Link: [https://github.com/screamt-3/ezrent](https://github.com/screamt-3/ezrent)

---
