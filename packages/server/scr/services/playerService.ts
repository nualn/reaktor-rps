import { PlayerGames, PlayerList } from "../types";
import fetchJSON from "../utils/fetchTools";
import * as config from '../utils/config';
import gameHistoryFormatter from "../utils/formatTools";

const getAllPlayers = async (): Promise<PlayerList> => {
  const players: Array<string> = [];
  const { data } = await fetchJSON(config.API_HISTORY_URI);

  for (const game of data) {
    if (!players.includes(game.playerA.name)) {
      players.push(game.playerA.name);
    }
    if (!players.includes(game.playerB.name)) {
      players.push(game.playerB.name);
    }
  }
  
  return { players };
};

const getPlayerGames = async (name: string): Promise<PlayerGames> => {
  const { data } = await fetchJSON(config.API_HISTORY_URI);
  const formattedGames = gameHistoryFormatter(data).filter(game => game.player.name === name);
  return {
    name: name,
    games: formattedGames
  };
};

export default {
  getAllPlayers,
  getPlayerGames
};