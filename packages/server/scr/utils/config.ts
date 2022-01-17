import * as dotenv from "dotenv";
dotenv.config();

const API_HISTORY_URI = '/rps/history';
const API_BASE_URL = 'https://bad-api-assignment.reaktor.com';
const PORT = process.env.PORT || 3000;

export {
  API_BASE_URL,
  PORT,
  API_HISTORY_URI
};