export enum Hand {
  Rock = 'ROCK',
  Paper = 'PAPER',
  Scissors = 'SCISSORS'
}

export interface PlayerResult {
  name: string;
  played: Hand;
}

export interface GameResult {
  type: 'GAME_RESULT';
  gameId: string;
  t: number;
  playerA: PlayerResult;
  playerB: PlayerResult;
}

export interface HistoryPage {
  cursor: string;
  data: Array<GameResult>;
}

export interface PlayerGames {
  name: string;
  games: Array<GameResult>;
}

export interface PlayerList {
  players: Array<string>;
}

