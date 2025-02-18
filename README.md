[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D%2018.0.0-green.svg)](https://nodejs.org/)
[![Firebase Database](https://img.shields.io/badge/Firebase-Database-yellowgreen.svg)](https://firebase.google.com/docs/database)

# Click Counter API

A simple API built using Node.js and Firebase to track views, downloads, and other custom keys for each `POSTID`. This API can handle operations like getting, incrementing, decrementing, resetting, and setting counters for specific keys in a Firebase Realtime Database. The application also serves a static HTML frontend to interact with the API.

## Features

- **Get counter value**: Retrieve the current value of a counter.
- **Increment counter**: Increment the value of a counter by 1.
- **Decrement counter**: Decrement the value of a counter by 1.
- **Set counter to a specific value**: Set a counter to a specific value.
- **Reset counter**: Reset the counter to 0.
- **Display counter info**: Get detailed information about a counter, including its namespace and key.

## Demo

You can view the live version of the app here: [Click Counter App](https://count.asifkamboh.com/).

## Project Structure

- **`vercel.json`**: Configuration file for Vercel to handle builds and routing.
- **`package.json`**: Project metadata and dependencies configuration.
- **`app.js`**: Main Node.js Express server handling API routes.
- **`public/`**: Static folder containing the `index.html` page for user interaction.

## API Endpoints

### 1. **Get Counter Value**

- **URL**: `/api/get/:postID/:key`
- **Method**: `GET`
- **Description**: Retrieves the current value of a counter for a specific `postID` and `key`.
- **Example**: `GET /api/get/post123/key1`

### 2. **Increment Counter**

- **URL**: `/api/inc/:postID/:key`
- **Method**: `GET`
- **Description**: Increments the counter value for a specific `postID` and `key`.
- **Example**: `GET /api/inc/post123/key1`

### 3. **Decrement Counter**

- **URL**: `/api/dec/:postID/:key`
- **Method**: `GET`
- **Description**: Decrements the counter value for a specific `postID` and `key`.
- **Example**: `GET /api/dec/post123/key1`

### 4. **Set Counter to a Specific Value**

- **URL**: `/api/set/:postID/:key/:value`
- **Method**: `GET`
- **Description**: Sets the counter to a specific value for a given `postID` and `key`.
- **Example**: `GET /api/set/post123/key1/100`

### 5. **Reset Counter**

- **URL**: `/api/reset/:postID/:key`
- **Method**: `GET`
- **Description**: Resets the counter value to 0 for a specific `postID` and `key`.
- **Example**: `GET /api/reset/post123/key1`

### 6. **Get Counter Info**

- **URL**: `/api/info/:postID/:key`
- **Method**: `GET`
- **Description**: Retrieves information about the counter, including its current value, namespace, and key.
- **Example**: `GET /api/info/post123/key1`

## Installation

### Requirements
- Node.js (v18 or higher)
- Firebase project with Firebase Realtime Database

### 1. Clone the repository

```bash
git clone https://github.com/AsifKamboh/click-counter-api.git
cd click-counter-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Firebase
- Create a Firebase project on [Firebase Console](https://console.firebase.google.com/).
- Obtain your Firebase Realtime Database credentials (API Key, Auth Domain, Database URL, etc.).
- Add your Firebase credentials to the `firebaseConfig` object in `app.js`.

### 4. Start the server locally

```bash
npm run dev
```

This will start the server on `http://localhost:3000`.

## Deployment on Vercel

1. Push your code to a GitHub repository.
2. Connect your GitHub repository to Vercel.
3. Vercel will automatically deploy your app. Make sure you have a `vercel.json` file configured properly.

## File Structure

```
/click-counter-api
├── /public
│   └── index.html       # Static HTML frontend to interact with the API
├── app.js               # Main Node.js server file
├── package.json         # Project metadata and dependencies
├── vercel.json           # Vercel deployment configuration
├── LICENSE              # License information
└── README.md            # Documentation file
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Notes

- The **public/index.html** page allows users to interact with the Click Counter API via a user-friendly interface.
- Make sure your Firebase Realtime Database is properly set up to store counters.
- The `vercel.json` file configures the deployment to serve both the API and static HTML.

---

Feel free to contribute or open issues for any bugs or improvements!
