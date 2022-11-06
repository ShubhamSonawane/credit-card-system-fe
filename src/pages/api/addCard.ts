import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getExistingCards(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method, body } = req;

  switch (method) {
    case 'POST': {
      axios
        .post('http://localhost:4000/creditCards/add-card', body)
        .then((response) => {
          console.log('Next API', response.data);
          res.send(JSON.stringify(response.data));
        })
        .catch((error) => {
          res.json(error);
          res.status(405).send('Method not allowed.');
        });
      break;
    }
    default: {
      res.send('Method not allowed');
      break;
    }
  }
}
