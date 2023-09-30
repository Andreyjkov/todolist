import React, { memo, useState } from 'react';

import styles from './MyForm.module.css';

interface Props {
  submit: (value: string) => void;
}

export const MyForm = memo(({ submit }: Props) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(value);
    setValue('');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="todo"
          value={value}
          placeholder="Ceate a new todo"
          onChange={(e) => setValue(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={!value}>
          Add
        </button>
      </form>
    </div>
  );
});
