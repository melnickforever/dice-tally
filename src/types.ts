import { Language } from './i18n';

export type { Language };

export type CategoryKey =
  | 'ones'
  | 'twos'
  | 'threes'
  | 'fours'
  | 'fives'
  | 'sixes'
  | 'threeOfAKind'
  | 'fourOfAKind'
  | 'fullHouse'
  | 'smallStraight'
  | 'largeStraight'
  | 'fiveOfAKind'
  | 'chance';

export type ScoresData = Record<CategoryKey, number | null>;

export interface SavedGame {
  version: number;
  name: string;
  language: Language;
  scores: ScoresData;
  fiveKindBonus: number;
  savedAt: string;
}

export interface PersistedState {
  scores: ScoresData;
  fiveKindBonus: number;
  playerName: string;
  language: Language;
  soundEnabled: boolean;
  expiresAt: number;
}
