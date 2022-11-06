import create from 'zustand';

import type { ExistingCardDetails } from '@/contentTypes/contentTypes';

export const useCardStore = create((set) => ({
  cards: [] as ExistingCardDetails[],
  setCards: (cards: ExistingCardDetails[]) =>
    set(() => ({
      cards,
    })),
}));
