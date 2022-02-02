import axios from 'axios';
import * as config from './config';
import { GameResult, HistoryPage } from '../../../../common/types';

const fetchJSON = async (url: string): Promise<HistoryPage> => {
  const { data }: { data: HistoryPage } = await axios.get(`${config.API_BASE_URL}${url}`);
  return data;
};

const fetchGamesFromTo = async (fromCursor: string, toCursor: string): Promise<Array<GameResult>> => {
  if (fromCursor && fromCursor !== toCursor) {
    const { cursor, data } = await fetchJSON(fromCursor);
    const cumulativeGames = await fetchGamesFromTo(cursor, toCursor);
    cumulativeGames.push(...data);
    return cumulativeGames;
  }
  return [];
};

export {
  fetchGamesFromTo,
  fetchJSON
};