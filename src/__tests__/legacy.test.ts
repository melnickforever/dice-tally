import { migrateLegacyKeys } from '../legacy';
import { validateGameData } from '../fileIO';

const oldScores = {
  ones: null, twos: null, threes: null, fours: null, fives: null, sixes: null,
  threeOfAKind: null, fourOfAKind: null, fullHouse: null, smallStraight: null,
  largeStraight: null, yahtzee: 50, chance: null,
};

describe('migrateLegacyKeys', () => {
  it('maps old score and bonus keys to the new names', () => {
    const out = migrateLegacyKeys({ scores: oldScores, yahtzeeBonus: 200 }) as any;
    expect(out.fiveKindBonus).toBe(200);
    expect(out.scores.fiveOfAKind).toBe(50);
    expect('yahtzeeBonus' in out).toBe(false);
    expect('yahtzee' in out.scores).toBe(false);
  });

  it('leaves new-format data untouched', () => {
    const data = { scores: { ...oldScores, yahtzee: undefined, fiveOfAKind: 0 }, fiveKindBonus: 100 };
    const out = migrateLegacyKeys(data) as any;
    expect(out.fiveKindBonus).toBe(100);
    expect(out.scores.fiveOfAKind).toBe(0);
  });

  it('old save files still validate', () => {
    expect(validateGameData({ scores: oldScores, yahtzeeBonus: 100, name: 'A' })).toBe(true);
  });
});
