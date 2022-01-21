import flatCache from 'flat-cache';
import { FormattedGameResult } from '../types';

const playerCache = flatCache.load('cachePlayerGames');
const cursorCache = flatCache.load('cacheMetadata');

const storeGames = (gamesArray: Array<FormattedGameResult>) => {
  gamesArray.forEach(game => {
    const storedGames = getPlayerGames(game.player.name);
    if (storedGames) {
      playerCache.setKey(game.player.name, [...storedGames, game]);
      return;
    }
    playerCache.setKey(game.player.name, [game]);
  });
};

const getPlayerGames = (name: string) => {
  return playerCache.getKey(name) as Array<FormattedGameResult> | undefined;
};

const setLatestCursor = (cursor: string) => {
  cursorCache.setKey('latestCursor', cursor);
};

const getLatestCursor = () => {
  return cursorCache.getKey('latestCursor') as string | undefined;
};

const getPlayers = () => {
  return Object.keys(playerCache.all());
};

const save = () => {
  playerCache.save(true);
  cursorCache.save(true);
};

/*import { MongoClient } from 'mongodb';
import { FormattedGameResult, PlayerGames } from '../types';
import * as config from '../utils/config';

const client: MongoClient = new MongoClient(config.MONGODB_URI);

const setLatestCursor = async (cursor: string) => {
  try {
    await client.connect();

    const metaCollection = client.db('rpsdb').collection('metadata');
    await metaCollection.replaceOne({}, { lastCursor: cursor }, { upsert: true });

  } finally {
    await client.close();
  }
};

const getLatestCursor = async () => {
  try {
    await client.connect();

    const metaCollection = client.db('rpsdb').collection<{ lastCursor: string }>('metadata');
    const result = (await metaCollection.findOne({}));

    return result && result.lastCursor;
  } finally {
    await client.close();
  }
};

const getPlayers = async () => {
  try {
    await client.connect();
    const playerCollection = client.db('rpsdb').collection<PlayerGames>('players');

    const players = await playerCollection.find({})
      .project<PlayerGames>({ player: 1 })
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

const storeGames = async (gamesArray: Array<FormattedGameResult>) => {
  for (const game of gamesArray) {
    const storedPlayerGames = await getPlayerGames(game.player.name);
    if (storedPlayerGames) {
      await setPlayerGames({ 
        name: game.player.name, 
        games: [...storedPlayerGames.games, game]
      });
      return;
    }
    await setPlayerGames({ 
      name: game.player.name, 
      games: [game]
    });
  }
};*/

export {
  storeGames,
  setLatestCursor,
  getLatestCursor,
  getPlayerGames,
  getPlayers,
  save
};