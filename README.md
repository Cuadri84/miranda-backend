# Miranda Backend

**Miranda Backend** is the backend API for Hotel Miranda, a robust hotel management system that offers a wide range of functionalities to efficiently manage hotel operations. The API is built using Node.js with Express.js framework and MongoDB Atlas for data storage and retrieval.

## Features

- User-friendly API to manage hotel-related data, including rooms, reservations, guests, and other hotel resources.
- Secure and efficient handling of requests from the frontend application to the data storage.
- Utilizes TypeScript for improved code maintainability and type safety.

## Technologies Used

The following technologies were used in building Miranda Backend:

- Node.js
- Express.js
- MongoDB Atlas
- TypeScript
- SQL

## Installation

To get started with Miranda Backend, follow these steps:

1. Clone the repository using Git:
```git clone <repository_url>```


2. Install the required dependencies:
```npm install```



3. Create a `.env` file in the root directory with the following environment variables:
```TOKEN_SECRET='09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611' ```
```DB_PASS="1984"```
```MONGO_PASS="cuadri84"```
```SALT="fhdashjdghjadgnjgsgsdmngnajtadgtaebthedbgfd"```

4. Start the server:
```npm start```


## Usage

To interact with the API and access its functionalities, you can use tools like Postman. To make a POST request for the Login, include the following JSON object in the request body:

```json
{
"name": "david",
"mail": "mail",
"pass": "d"
}

Contact: davidcuadrillerosaura@gmail.com
