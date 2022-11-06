import axios from 'axios';
import type { FC } from 'react';
import React, { useEffect } from 'react';

import { useCardStore } from '../../src/store/useCardStore';
import { Table } from '../Table';

export const ExistingCards: FC = () => {
  const cards = useCardStore((state) => state.cards);
  const setCards = useCardStore((state) => state.setCards);

  const getExistingCards = async () => {
    axios
      .get('/api/existingCards')
      .then((response) => setCards(response.data.cards))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getExistingCards();
  }, []);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Card Number',
        accessor: 'cardNumber',
      },
      {
        Header: 'Balance',
        accessor: 'balance',
        Cell: (props: { value: string }) => {
          const balance = `£${props.value}`;
          return <span>{balance}</span>;
        },
      },
      {
        Header: 'Limit',
        accessor: 'limit',
        Cell: (props: { value: string }) => {
          const limit = `£${props.value}`;
          return <span>{limit}</span>;
        },
      },
    ],
    []
  );

  const renderTable = () => {
    if (cards) {
      cards.length > 0 ? (
        <Table columns={columns} data={cards} />
      ) : (
        <p>No Existing cards</p>
      );
    }
  };

  return (
    <>
      <div>Existing Cards</div>
      <div>{renderTable()}</div>
    </>
  );
};
