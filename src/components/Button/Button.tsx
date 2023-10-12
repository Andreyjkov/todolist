import React, { CSSProperties } from 'react';

import * as styles from './Button.module.css';
interface IProps {
  onClick: () => void;
  title: string;
  propsStyles: CSSProperties;
}

export const Button = ({ propsStyles, title, onClick }: IProps) => {
  return (
    <button
      onClick={onClick}
      style={propsStyles}
      className={`${styles.button}`}
    >
      {title}
    </button>
  );
};
