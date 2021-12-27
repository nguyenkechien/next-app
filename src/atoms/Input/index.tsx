import React from 'react';
import classNames from 'classnames';
import './index.scss';
import StyleInput from './input.module.scss';

export const Input = () => {
  return (
    <div className={classNames('input-warper', StyleInput.inputWarper)}>
      <input className="active-blue" />
    </div>
  );
};
