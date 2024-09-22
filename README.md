
# cineMatch

A web-app that recommends the user with top ten suggestions of films similar to what they have searched for. Additionally, if the user wants, they can get a random suggestion too!

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## Project Description

This is a [MERN stack](https://www.mongodb.com/mern-stack) project that combines MongoDB, Express.js, React, and Node.js to create a full-stack web application. The project gives suggestions of films similar to what the user has searched for.

## Features

- Search a movie and get suggestions- User can search for a movie by typing the title. Then they can click on it to get the suggestions
- Get Random Suggestion: Users can get a random movie as suggestion by going to the designated page

## Tech Stack

- **Frontend**: React, CSS (Bootstrap)
- **Backend**: Node.js, Express.js, Flask (for hosting the ML API)
- **Database**: MongoDB, Mongoose (to minimise API calls to TMDB)
- **Other Tools**: (e.g., Axios for API requests, pyMongo - to connect Flask with the database, MUI for Icons)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (vXX or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (locally or via cloud e.g., MongoDB Atlas)
- Flask
### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/subramanian29/cineMatch.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Movie-Recommendation-System
   ```

3. Install dependencies for both the frontend and backend:

   ```bash
   # Install server dependencies
   cd backend
   npm install

   # Install client dependencies
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```
2. Start the flask server:
   ```bash
   cd backend
   python3 app.py
   ```
3. Start the frontend client:

   ```bash
   cd frontend
   npm start
   ```

4. Visit `http://localhost:5173` to view the React app, and `http://localhost:5000` for the backend API.


## Environment Variables

To run this project, you will need to add the following environment variables in a `.env` file in the backend directory:

```bash

TMDB_ACCESS_TOKEN
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a pull request

