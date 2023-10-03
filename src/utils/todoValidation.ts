interface IProps {
  [key: string]: string;
}

export const todoValidation = (data: IProps) => {
  const errors: {
    [key: string]: string;
  } = {};

  for (const field in data) {
    errors[field] = '';

    switch (field) {
      case 'value':
        if (!data[field].trim()) {
          errors[field] = 'Value field is required.';
          break;
        }

        if (data[field].trim().length < 3) {
          errors[field] = 'Value should be at least 3 characters.';
          break;
        }
        break;

      case 'date': {
        const date = new Date(data[field]);
        if (!data[field]) {
          errors[field] = 'Date field is required';
          break;
        }

        if (date < new Date('1986-01-01T00:00')) {
          errors[field] = 'Date cannot be less than 1986';
          break;
        }

        if (date > new Date('2100-01-01T00:00')) {
          errors[field] = 'Date cannot be greater than 2100';
          break;
        }
        break;
      }
    }
  }

  return errors;
};
