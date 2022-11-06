export type AddCardDetails = {
  name: string;
  cardNumber: string;
  limit: string;
};

export type ExistingCardDetails = {
  name: string;
  cardNumber: string;
  balance: string;
  limit: string;
};

export type CardContextType = {
  cards: ExistingCardDetails[];
  setExistingCards: (cards: ExistingCardDetails[]) => void;
};
