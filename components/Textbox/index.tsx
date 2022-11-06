import type { FC } from 'react';

export type TextboxProps = {
  labelText: string;
  idText: string;
  canonical?: string;
};

export const Textbox: FC<TextboxProps> = ({ labelText, idText }) => {
  return (
    <>
      <label htmlFor={idText}> {labelText}</label>
      <div>
        <input id={idText} type="text" className="credit-card" />
      </div>
    </>
  );
};
