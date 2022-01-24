# reaktor-rps

My solution to Reaktor's [2022 summer developer assignment](https://www.reaktor.com/assignment-2022-developers/). Powered by TypeScript, MERN and MaterialUI.

## Running
### Online

The application is up on [Heroku](https://reaktor-rps-2022.herokuapp.com/).

### Locally

Clone the repository and run `npm install`to get started. To get the mongoDB cache working, add a .env file to the server directory with `MONGODB_URI=<your monogdb uri>`. It is also recommended to create an index on the `players` collection. 

Some useful scripts:

- `npm run postinstall`: build client and server
- `npm run build:server`: build server
- `npm run start:server`: start server build
- `npm run dev:server`: run server in development mode
- `npm run build:client`: build client
- `npm run dev:client`: run client in development mode
- `npm run clean`: delete server and client builds
