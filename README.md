# mock_api

# Getting started, MAKE SURE YOU HAVE MONGO DB INSTALLED 

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run dev` to start the local server

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [Mongoose](https://mongoosejs.com/) - Elegant mongodb object modeling for node.js
- [bcrypt](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords.
- [Mocha](https://mochajs.org/) - Testing Suite
- [Chai](https://www.chaijs.com/) - Test Assertion library
- [Chai](https://www.chaijs.com/plugins/chai-http/) - Test Assertion library plugin for Http request

## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it the database using any driver. It also requires the routes and models we'll be using in the application.
- `controller/` - This folder contains the logic.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our database models.
- `test/` - This folder contains the test.

##### sample pictures
