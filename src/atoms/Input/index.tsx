import React from 'react';
import './index.scss';
import StyleInput from './Input.module.scss';

export const Input = () => {
  return (
    <div className={StyleInput.inputWarper}>
      <input className={StyleInput.activeBlue} />
    </div>
  );
};
