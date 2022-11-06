import axios from 'axios';
import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import type { AddCardDetails } from '@/contentTypes/contentTypes';

import { useCardStore } from '../../src/store/useCardStore';

export const AddCreditCard: FC = () => {
  const setCards = useCardStore((state) => state.setCards);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AddCardDetails>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'all',
    shouldFocusError: true,
    shouldUnregister: false,
    delayError: undefined,
  });

  const addCard = (data: AddCardDetails) => {
    console.info(data);
    axios
      .post('/api/addCard', data)
      .then((response) => {
        console.log(response);
        alert(response.data.message);
        axios.get('/api/existingCards').then((res) => {
          console.log('got updated cards ', res.data.cards);
          setCards(res.data.cards);
        });
        reset();
      })
      .catch((error) => alert(error));
  };

  const isNumber = (value: string) => {
    const pattern = /^[0-9]+$/;
    return pattern.test(value);
  };

  return (
    <form onSubmit={handleSubmit((data) => addCard(data))}>
      <div>Add Card</div>
      <label>Name</label>
      <Controller
        render={({ field }) => (
          <input value={field.value} onChange={field.onChange} />
        )}
        name="name"
        control={control}
        rules={{ required: 'Please enter a Name' }}
        defaultValue=""
      />
      {errors.name && <p className="error">{errors.name.message}</p>}

      <label>Card Number</label>
      <Controller
        render={({ field }) => (
          <input value={field.value} onChange={field.onChange} />
        )}
        name="cardNumber"
        control={control}
        defaultValue=""
        rules={{
          required: 'Please enter card number',
          validate: {
            isValidCard: (value: string) => {
              // accept only digits, dashes or spaces
              if (isNumber(value)) {
                // setValue("cardNumber", value)
                let nCheck = 0;
                let nDigit = 0;
                let bEven = false;
                const number = value.replace(/\D/g, '');

                for (let n = number.length - 1; n >= 0; --n) {
                  const cDigit = number.charAt(n);
                  nDigit = parseInt(cDigit, 10);

                  if (bEven) {
                    if ((nDigit *= 2) > 9) {
                      nDigit -= 9;
                    }
                  }

                  nCheck += nDigit;
                  bEven = !bEven;
                }
                return nCheck % 10 === 0 || 'Please enter a valid card number';
              }
              return '';
            },
          },
        }}
      />
      {errors.cardNumber && (
        <p className="error">{errors.cardNumber.message}</p>
      )}

      <label>Limit</label>
      <Controller
        render={({ field }) => (
          <input value={field.value} onChange={field.onChange} />
        )}
        name="limit"
        control={control}
        defaultValue=""
        rules={{
          required: 'Please enter credit limit',
          validate: {
            isNumber: (value: string) => {
              const pattern = /^[0-9]+$/;
              return pattern.test(value) || 'Please enter a valid number';
            },
          },
        }}
      />
      {errors.limit && <p className="error">{errors.limit.message}</p>}

      <input type="submit" className="submitButton" value="Add" />
    </form>
  );
};
