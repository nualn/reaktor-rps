import axios from 'axios';
const baseUrl = '/players';

const getPlayers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getPlayerGames = async (name) => {
  const response = await axios.get(`${baseUrl}/${name}`);
  return response.data;
};

export default {
  getPlayers,
  getPlayerGames
};