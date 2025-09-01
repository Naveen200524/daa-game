export interface KnapsackItem {
  id: string;
  name: string;
  value: number;
  weight: number;
}

export interface TSPCity {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface GameStats {
  score: number;
  mistakes: number;
  hintsUsed: number;
  efficiency: number;
  userSolution: any[];
  optimalSolution: any[];
  userValue: number;
  optimalValue: number;
  explanation: {
    title: string;
    algorithm: string;
    steps: string[];
    complexity: string;
    tips: string[];
  };
}

export const knapsackLevels = {
  easy: {
    capacity: 15,
    items: [
      { id: '1', name: 'Ruby Ring', value: 100, weight: 1 },
      { id: '2', name: 'Gold Coin', value: 60, weight: 2 },
      { id: '3', name: 'Silver Chalice', value: 120, weight: 4 },
      { id: '4', name: 'Magic Scroll', value: 80, weight: 3 }
    ]
  },
  medium: {
    capacity: 20,
    items: [
      { id: '1', name: 'Diamond Sword', value: 200, weight: 5 },
      { id: '2', name: 'Golden Crown', value: 180, weight: 4 },
      { id: '3', name: 'Ancient Rune', value: 150, weight: 3 },
      { id: '4', name: 'Mystic Orb', value: 120, weight: 2 },
      { id: '5', name: 'Emerald Necklace', value: 160, weight: 4 },
      { id: '6', name: 'Crystal Wand', value: 90, weight: 2 }
    ]
  },
  hard: {
    capacity: 25,
    items: [
      { id: '1', name: 'Legendary Armor', value: 300, weight: 8 },
      { id: '2', name: 'Phoenix Feather', value: 250, weight: 1 },
      { id: '3', name: 'Dragon Scale', value: 220, weight: 6 },
      { id: '4', name: 'Elven Bow', value: 180, weight: 4 },
      { id: '5', name: 'Mithril Chain', value: 200, weight: 5 },
      { id: '6', name: 'Spell Tome', value: 160, weight: 3 },
      { id: '7', name: 'Holy Grail', value: 280, weight: 7 },
      { id: '8', name: 'Star Fragment', value: 150, weight: 2 }
    ]
  }
};

export const tspLevels = {
  easy: {
    cities: [
      { id: '1', name: 'Startholm', x: 50, y: 50 },
      { id: '2', name: 'Midgarde', x: 80, y: 30 },
      { id: '3', name: 'Nordheim', x: 70, y: 80 },
      { id: '4', name: 'Westport', x: 30, y: 70 }
    ]
  },
  medium: {
    cities: [
      { id: '1', name: 'Capital', x: 60, y: 40 },
      { id: '2', name: 'Eastport', x: 90, y: 60 },
      { id: '3', name: 'Northwatch', x: 50, y: 20 },
      { id: '4', name: 'Southgate', x: 40, y: 90 },
      { id: '5', name: 'Westwind', x: 20, y: 50 }
    ]
  },
  hard: {
    cities: [
      { id: '1', name: 'Dragonspire', x: 50, y: 50 },
      { id: '2', name: 'Ironhold', x: 80, y: 30 },
      { id: '3', name: 'Frostpeak', x: 60, y: 20 },
      { id: '4', name: 'Goldenhaven', x: 90, y: 70 },
      { id: '5', name: 'Shadowmere', x: 30, y: 80 },
      { id: '6', name: 'Stormwind', x: 20, y: 40 }
    ]
  }
};