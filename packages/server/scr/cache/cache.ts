import { MongoClient } from 'mongodb';
import { PlayerGames } from '../../../../common/types';
import * as config from '../utils/config';

const client: MongoClient = new MongoClient(config.MONGODB_URI);

const setLatestCursor = async (cursor: string) => {
  try {
    await client.connect();

    const metaCollection = client.db('rpsdb').collection('metadata');
    await metaCollection.replaceOne({}, { latestCursor: cursor }, { upsert: true });

  } finally {
    await client.close();
  }
};

const getLatestCursor = async () => {
  try {
    await client.connect();

    const metaCollection = client.db('rpsdb').collection<{ latestCursor: string }>('metadata');
    const result = (await metaCollection.findOne({}));

    return result && result.latestCursor;
  } finally {
    await client.close();
  }
};

const getPlayers = async () => {
  try {
    await client.connect();
    const playerCollection = client.db('rpsdb').collection<PlayerGames>('players');

    const players = await playerCollection.find({})
      .project<PlayerGames>({ name: 1 })
      .map<string>(x => x.name)
      .toArray();
    
    return players;

  } finally {
    await client.close();
  }
};

const getPlayerGames = async (name: string) => {
  try {
    await client.connect();

    const playerCollection = client.db('rpsdb').collection<PlayerGames>('players');
    const playerGames = await playerCollection.findOne({ name: name });

    return playerGames;
  } finally {
    await client.close();
  }
};

const setPlayerGames = async (playerGamesObj: PlayerGames) => {
  try {
    await client.connect();

    const playerCollection = client.db('rpsdb').collection('players');
    await playerCollection.replaceOne({ name: playerGamesObj.name }, playerGamesObj, { upsert: true }); 

  } finally {
    await client.close();
  }
};

const storeGames = async (playerGamesArray: Array<PlayerGames>) => {
  for (const playerGamesObj of playerGamesArray) {
    const cachedPlayerGamesObj = await getPlayerGames(playerGamesObj.name);
    if (cachedPlayerGamesObj) {
      await setPlayerGames({ 
        name: playerGamesObj.name, 
        games: [...cachedPlayerGamesObj.games, ...playerGamesObj.games]
      });
    } else {
      await setPlayerGames(playerGamesObj);
    }
  }
};

export {
  storeGames,
  setLatestCursor,
  getLatestCursor,
  getPlayerGames,
  getPlayers,
};