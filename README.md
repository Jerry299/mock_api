# mock_api

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run dev` to start the local server

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [Mocha](https://mochajs.org/) - Testing Suite
- [Chai](https://www.chaijs.com/) - Test Assertion library
- [Chai](https://www.chaijs.com/plugins/chai-http/) - Test Assertion library plugin for Http request

## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `controller/` - This folder contains the logic.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our database models.
- `test/` - This folder contains the test.

##### sample name and pass are provided for testing purposes

##### sample pictures

![t3](https://user-images.githubusercontent.com/37832418/137082296-c573095c-5528-42c7-aa55-5d8f8e1a5e05.png)
![t4](https://user-images.githubusercontent.com/37832418/137082320-fb1f4bc1-11f6-4342-a256-207a251fa6a2.png)
![t1](https://user-images.githubusercontent.com/37832418/137082339-b6649261-447b-49f3-b9b1-3297095dd220.png)
![t2](https://user-images.githubusercontent.com/37832418/137082386-aa1c7a1f-e76e-460b-be02-7c3abf47d5b1.png)
