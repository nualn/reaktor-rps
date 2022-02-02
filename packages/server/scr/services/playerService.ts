import { PlayerList } from "../../../../common/types";
import { fetchGamesFromTo, fetchJSON } from "../utils/fetchTools";
import * as config from '../utils/config';
import { gameHistoryFormatter, getStats, sortGamesByPlayer } from "../utils/formatTools";
import { storeGames } from "../cache/cache";
import * as cache from '../cache/cache';

const getUncachedGamesAndUpdateCache = async () => {
  const { cursor, data } = await fetchJSON(config.API_HISTORY_URI);
  const formattedData = gameHistoryFormatter(data);

  const latestCursor = await cache.getLatestCursor();
  const gamesArray = await fetchGamesFromTo(cursor, latestCursor || '');  
  const formattedGamesArray = gameHistoryFormatter(gamesArray);
  const playerGamesArray = sortGamesByPlayer(formattedGamesArray);

  await cache.setLatestCursor(cursor);
  void storeGames(playerGamesArray);

  const allFetchedGames = sortGamesByPlayer(formattedData, playerGamesArray);
  return allFetchedGames;
};

const getAllPlayers = async (): Promise<PlayerList> => {  
  const fetchedPlayerGames = await getUncachedGamesAndUpdateCache();
  const fetchedPlayers = fetchedPlayerGames.map(playerGame => playerGame.name);
  const cachedPlayers = await cache.getPlayers();
  const players = [...new Set([...fetchedPlayers, ...cachedPlayers])];
  
  return { players };
};

const getAllPlayerGames = async (name: string) => {
  
  const fetchedPlayerGames = (await getUncachedGamesAndUpdateCache())
    .find(playerGame => playerGame.name === name);

  const cachedGames = await cache.getPlayerGames(name);

  const gamesArray = [
    ...cachedGames && cachedGames.games || [],
   ...fetchedPlayerGames && fetchedPlayerGames.games || []
  ];

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