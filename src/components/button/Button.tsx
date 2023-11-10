import React from 'react';

import * as styles from './Button.module.css';

interface PropsButton extends React.ComponentPropsWithRef<'button'> {
  color: 'Red' | 'Blue' | 'Green';
}

export const Button = ({ children, color, onClick, ...props }: PropsButton) => {
  const className = `${styles.button} ${styles[`button${color}`]}`;
  return (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
};
