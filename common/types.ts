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

interface GameBegin {
  type: 'GAME_BEGIN';
  gameId: string;
  t: number;
  playerA: { name: string };
  playerB: { name: string };
}

interface GameRemove {
  type: 'GAME_REMOVE';
  gameId: string;
}

export interface Stats { 
  totalMatches: number;
  winRate: number;
  mostPlayed: Hand | null;
};

interface GameTableFormat {
  id: string;
  outcome: Outcome;
  playerName: string;
  playerPlayed: Hand;
  opponentName: string;
  opponentPlayed: Hand;
  date: Date;
}

export interface PlayerGamesTableFormat {
  stats: Stats,
  name: string;
  games: GameTableFormat[];
}

export interface PlayerGamesAndStats extends PlayerGames{
  stats: Stats;
}

export type DrawerProps = { open: boolean, toggleDrawer: () => void }

export type GameEvent = GameBegin | GameResult;

export type GameEventAction = GameEvent | GameRemove;


