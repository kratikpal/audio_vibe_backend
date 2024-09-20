# AudioVibe Backend

### Overview

**AudioVibe** is a robust music streaming platform that allows users to explore over 1 million+ tracks, manage their music preferences, and enjoy seamless playback. This backend, developed in **Node.js** and **Express.js**, handles all core functionalities, including user authentication, song streaming, and tracking user listening history.

### Features

- **JWT Authentication**: Secured user authentication system using JWT tokens for session management.
- **Password Hashing with Bcrypt**: Safeguarded user credentials with Bcrypt for password hashing.
- **Track Listening History**: Automatically track and store users' listening history.
- **RESTful API Design**: Efficient, scalable RESTful APIs for all backend services.
- **Seamless YouTube Integration**: Fetch and play music using YouTube APIs via **YouTube Explode**.

---

### Installation and Setup

#### Prerequisites

- Node.js (v14+)
- MongoDB (local or remote instance)
- A YouTube API key

#### Step-by-Step Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kratikpal/AudioVibe-backend.git
   cd AudioVibe-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and include the following:

   ```bash
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/audiovibe
   JWT_SECRET=your_jwt_secret
   YOUTUBE_API_KEY=your_youtube_api_key
   ```

4. **Start the server**:

   ```bash
   npm start
   ```

5. **Access the API**:
   The backend will be running on [http://localhost:3000](http://localhost:3000).

---

### API Endpoints

#### Authentication

- **POST /api/auth/signup**  
  Register a new user with email and password.  
  Body: `{ "email": "user@example.com", "password": "yourpassword" }`
- **POST /api/auth/login**  
  Login a user and return a JWT token.  
  Body: `{ "email": "user@example.com", "password": "yourpassword" }`

#### User Profile

- **GET /api/user/profile**  
  Get the logged-in user's profile (JWT required).  
  Header: `Authorization: Bearer <token>`

#### User Listening History

- **GET /api/songHistory**  
  Fetch the user's listening history.

- **POST /api/songHistory**  
  Add a new track to the user's listening history.  
  Body: `{ "trackId": "12345", "playedAt" : "2024-09-19T15:20:00Z" }`

---

### Technologies Used

- **Node.js**: Fast, non-blocking event-driven server.
- **Express.js**: Minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for managing user data and song history.
- **JWT**: JSON Web Tokens for secure user authentication.
- **Bcrypt**: Secure password hashing.
- **YouTube Explode**: API integration for fetching YouTube music content.
- **Just Audio**: For handling seamless audio playback.

---

### Contact

If you have any questions or issues, feel free to reach out:  
**Kratikpal Singh Dodiya**  
Email: kratikpal@gmail.com  
GitHub: [kratikpal](https://github.com/kratikpal)
