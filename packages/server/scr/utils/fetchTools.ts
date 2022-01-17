import axios from 'axios';
import * as config from './config';
import { HistoryPage } from '../types';

const fetchJSON = async (url: string): Promise<HistoryPage> => {
  const { data }: { data: HistoryPage } = await axios.get(`${config.API_BASE_URL}${url}`);
  return data;
};

export default fetchJSON;