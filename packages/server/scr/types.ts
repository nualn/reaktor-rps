export type Hand = 'ROCK' | 'PAPER' | 'SCISSORS';

export type Outcome = 'WIN' | 'LOSE' | 'TIE';

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
  games: Array<FormattedGameResult>;
}

export interface PlayerList {
  players: Array<string>;
}

export interface FormattedGameResult {
  player: PlayerResult;
  opponent: PlayerResult;
  outcome: Outcome;
  t: number;
  gameId: string;
}

export interface IntermediateStats {
  wins: number;
  totalMatches: number;
  rockPlayed: number;
  paperPlayed: number;
  scissorsPlayed: number;
}

