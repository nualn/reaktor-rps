import { PlayerList } from "../types";
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

const getPlayerGames = async (name: string) => {
  const { data } = await fetchJSON(config.API_HISTORY_URI);
  const formattedGames = gameHistoryFormatter(data).filter(game => game.player.name === name);
  const stats = {
    wins: 0,
    totalMatches: 0,
    rockPlayed: 0,
    paperPlayed: 0,
    scissorsPlayed: 0
  };
  for (const game of formattedGames) {
    stats.totalMatches++;
    if (game.outcome === 'WIN') {
      stats.wins++;
    }
    switch (game.player.played) {
      case 'ROCK':
        stats.rockPlayed++;
        break;
      case 'PAPER':
        stats.paperPlayed++;
        break;
      case 'SCISSORS':
        stats.scissorsPlayed++;
        break;
    }
  }

  return {
    name: name,
    stats: stats,
    games: formattedGames
  };
};

export default {
  getAllPlayers,
  getPlayerGames
};