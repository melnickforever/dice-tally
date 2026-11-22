import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistedState } from './types';
import { migrateLegacyKeys } from './legacy';

const KEY = 'dice-tally-game-state';
const LEGACY_KEY = 'yahtzee-game-state';
const EXPIRY_MS = 86_400_000;

export async function loadGameState(): Promise<PersistedState | null> {
  try {
    let raw = await AsyncStorage.getItem(KEY);
    if (!raw) {
      // One-time migration from the pre-rename storage key.
      raw = await AsyncStorage.getItem(LEGACY_KEY);
      if (!raw) return null;
      await AsyncStorage.setItem(KEY, raw);
      await AsyncStorage.removeItem(LEGACY_KEY);
    }
    const data: PersistedState = migrateLegacyKeys(JSON.parse(raw));
    if (data.expiresAt <= Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export async function saveGameState(state: Omit<PersistedState, 'expiresAt'>): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify({
      ...state,
      expiresAt: Date.now() + EXPIRY_MS,
    }));
  } catch {
    // ignore storage full
  }
}
