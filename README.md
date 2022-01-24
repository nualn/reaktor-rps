# reaktor-rps

My solution to Reaktor's [2022 summer developer assignment](https://www.reaktor.com/assignment-2022-developers/). Powered by TypeScript, MERN and MaterialUI.

## Running
### Online

The application will be up on Heroku soon.

### Locally

Clone the repository and run `npm install`to get started. To get the mongoDB cache working, add a .env file to the server directory with `MONGODB_URI=<your uri>`. Some useful scripts:

- `npm run postinstall`: build client and server
- `npm run build:server`: build server
- `npm run start:server`: start server build
- `npm run dev:server`: run server in development mode
- `npm run build:client`: build client
- `npm run dev:client`: run client in development mode
- `npm run clean`: delete server and client builds
