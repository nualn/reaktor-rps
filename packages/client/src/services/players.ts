import axios from 'axios';
import { PlayerGamesAndStats, PlayerList } from '../../../../common/types';
const baseUrl = '/players';

const getPlayers = async () => {
  const response = await axios.get<PlayerList>(baseUrl);
  return response.data;
};

const getPlayerGames = async (name : string) => {
  const response = await axios.get<PlayerGamesAndStats>(`${baseUrl}/${name}`);
  return response.data;
};

export default {
  getPlayers,
  getPlayerGames
};