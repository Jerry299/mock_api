# mock_api

# Getting started

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

![mw1a](https://user-images.githubusercontent.com/37832418/144564510-e56258b2-3fd5-4608-b413-ecf64bf32b7d.png)
![mwbf](https://user-images.githubusercontent.com/37832418/144564738-fb6fd902-d860-461f-a1c4-a332a2f465bb.png)
![mwbf1](https://user-images.githubusercontent.com/37832418/144564784-83d67d0d-5d05-49d0-8720-a53f840b581c.png)
![mww1](https://user-images.githubusercontent.com/37832418/144564825-271632b9-1969-44cd-8915-93dda969d351.png)
![mwaf](https://user-images.githubusercontent.com/37832418/144564955-39d9d94d-7b1c-43f7-ad30-70d7a0cf54d3.png)
![mw4](https://user-images.githubusercontent.com/37832418/144564893-52b5d70c-26c6-47e9-ae2f-e06597940ba7.png)
