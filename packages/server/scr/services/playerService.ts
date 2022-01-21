import { PlayerList } from "../types";
import { fetchJSON } from "../utils/fetchTools";
import * as config from '../utils/config';
import { gameHistoryFormatter, getStats, sortGamesByPlayer } from "../utils/formatTools";
import { storeGames } from "../cache/cache";
import * as cache from '../cache/cache';

const updateCacheFrom = async (cursor: string) => {
  const latestCursor = cache.getLatestCursor();
  if (cursor && cursor !== latestCursor) {
    const body = await fetchJSON(cursor);
    storeGames(gameHistoryFormatter(body.data));
    console.log('cached', cursor);
    await updateCacheFrom(body.cursor);
  }  
  return;
};

const getAllPlayers = async (): Promise<PlayerList> => {
  const { cursor, data } = await fetchJSON(config.API_HISTORY_URI);
  const newGamesFormatted = gameHistoryFormatter(data);
  
  const fetchedPlayers = newGamesFormatted.map(game => game.player.name);
  await updateCacheFrom(cursor);
  cache.setLatestCursor(cursor);

  const cachedPlayers = cache.getPlayers();
  
  const players = [...new Set([...fetchedPlayers, ...cachedPlayers])];
  
  return { players };
};

const getAllPlayerGames = async (name: string) => {
  const { cursor, data } = await fetchJSON(config.API_HISTORY_URI);
  const newGamesFormatted = gameHistoryFormatter(data);
  const fetchedPlayerGames = sortGamesByPlayer(newGamesFormatted)
    .find(playerGamesObj => playerGamesObj.name === name);

  await updateCacheFrom(cursor);
  cache.setLatestCursor(cursor);

  const cachedGames = cache.getPlayerGames(name);

  const gamesArray = [...cachedGames || [], ...fetchedPlayerGames && fetchedPlayerGames.games || []];
  const stats =  getStats(gamesArray);

  return {
    name: name,
    stats: stats,
    games: gamesArray
  };
};

export default {
  getAllPlayers,
  getAllPlayerGames
};