import { FormattedGameResult, GameResult, Hand, Outcome } from "../types";

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

export default gameHistoryFormatter;