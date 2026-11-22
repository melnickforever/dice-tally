// Backward compatibility: older saves used the keys `yahtzee` (score) and `yahtzeeBonus`.
export function migrateLegacyKeys<T>(data: T): T {
  if (typeof data !== 'object' || data === null) return data;
  const obj = { ...(data as Record<string, unknown>) };
  if ('yahtzeeBonus' in obj && !('fiveKindBonus' in obj)) {
    obj.fiveKindBonus = obj.yahtzeeBonus;
  }
  delete obj.yahtzeeBonus;
  if (typeof obj.scores === 'object' && obj.scores !== null) {
    const scores = { ...(obj.scores as Record<string, unknown>) };
    if ('yahtzee' in scores && !('fiveOfAKind' in scores)) {
      scores.fiveOfAKind = scores.yahtzee;
    }
    delete scores.yahtzee;
    obj.scores = scores;
  }
  return obj as T;
}
