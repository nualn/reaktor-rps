import { FormattedGameResult, GameResult, Hand, IntermediateStats, Outcome, PlayerGames } from "../types";

const outcomes: Record<Hand, Record<Hand, Outcome>> = {
  ROCK: {
    ROCK: 'TIE',
    PAPER: 'LOSE',
    SCISSORS: 'WIN'
  },
  PAPER: {
    ROCK: 'WIN',
    PAPER: 'TIE',
    SCISSORS: 'LOSE'
  },
  SCISSORS: {
    ROCK: 'LOSE',
    PAPER: 'WIN',
    SCISSORS: 'TIE'
  }
};

const getOutcome = (playerPlay: Hand, opponentPlay: Hand): Outcome => {
  return outcomes[playerPlay][opponentPlay];
};

const gameResultFormatter = (gameResult: GameResult): Array<FormattedGameResult> => {

  const playerAviewpoint = {
    player: gameResult.playerA,
    opponent: gameResult.playerB,
    outcome: getOutcome(gameResult.playerA.played, gameResult.playerB.played),
    t: gameResult.t,
    gameId: gameResult.gameId
  };
  const playerBviewpoint = {
    player: gameResult.playerB,
    opponent: gameResult.playerA,
    outcome: getOutcome(gameResult.playerB.played, gameResult.playerA.played),
    t: gameResult.t,
    gameId: gameResult.gameId
  };

  return [playerAviewpoint, playerBviewpoint];
};

const gameHistoryFormatter = (gameResults: Array<GameResult>): Array<FormattedGameResult> => {
  return gameResults.flatMap(gameResult => gameResultFormatter(gameResult));
};

const sortGamesByPlayer = (gamesArray: Array<FormattedGameResult>, initialSortedArray: Array<PlayerGames> = []) => {
    gamesArray.forEach(game => {
    const matchingPlayerGamesObject = initialSortedArray.find(playerGamesObj => playerGamesObj.name === game.player.name);
    if (matchingPlayerGamesObject) {
      matchingPlayerGamesObject.games = [...matchingPlayerGamesObject.games, game];
      return;
    }
    initialSortedArray.push({ name: game.player.name, games: [game]});
  });

  return initialSortedArray;
};

const findMostPlayed = (intermediateStats: IntermediateStats) => {
  if (intermediateStats.rockPlayed >= intermediateStats.paperPlayed && intermediateStats.rockPlayed >= intermediateStats.scissorsPlayed) {
    return 'ROCK';
  }
  if (intermediateStats.paperPlayed > intermediateStats.rockPlayed && intermediateStats.paperPlayed >= intermediateStats.scissorsPlayed) {
    return 'PAPER';
  }
  if (intermediateStats.scissorsPlayed > intermediateStats.rockPlayed && intermediateStats.scissorsPlayed > intermediateStats.paperPlayed) {
    return 'SCISSORS';
  }
  return '';
};

const getStats = (formattedGamesList: Array<FormattedGameResult>) => {
  const intermediateStats: IntermediateStats = {
    wins: 0,
    totalMatches: 0,
    rockPlayed: 0,
    paperPlayed: 0,
    scissorsPlayed: 0
  };

  for (const game of formattedGamesList) {
    intermediateStats.totalMatches++;
    if (game.outcome === 'WIN') {
      intermediateStats.wins++;
    }
    switch (game.player.played) {
      case 'ROCK':
        intermediateStats.rockPlayed++;
        break;
      case 'PAPER':
        intermediateStats.paperPlayed++;
        break;
      case 'SCISSORS':
        intermediateStats.scissorsPlayed++;
        break;
    }
  }

  const stats = { 
    totalMatches: intermediateStats.totalMatches,
    winRate: intermediateStats.wins / intermediateStats.totalMatches,
    mostPlayed: findMostPlayed(intermediateStats)
  };

  return stats;
};

export { 
  gameHistoryFormatter,
  sortGamesByPlayer,
  getStats
};