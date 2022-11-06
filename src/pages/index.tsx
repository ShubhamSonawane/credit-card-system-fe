import { ExistingCards } from 'components/ExistingCards';

import { Meta } from '@/layouts/Meta';

import { AddCreditCard } from '../../components/AddCreditCard';

const Index = () => {
  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      <div className="mx-auto max-w-screen-md">
        <div className="border-b border-gray-300">
          <Meta
            title="Credit Card Processing System"
            description="This is a small react application to add a credit card and display all credit cards"
          />
          <h1> Credit Card System </h1>
          <AddCreditCard />
          <ExistingCards />
        </div>
      </div>
    </div>
  );
};

export default Index;
