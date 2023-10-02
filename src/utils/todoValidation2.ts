interface IProps {
  [key: string]: string;
}

export const validateForm2 = (element: IProps) => {
  const errors: {
    [key: string]: string;
  } = {};

  for (const field in element) {
    errors[field] = '';
    switch (field) {
      case 'value':
        if (!element[field].trim()) {
          errors[field] = 'Text field is required.';
          break;
        }

        if (element[field].length < 3) {
          errors[field] = 'Value should be at least 3 characters.';
          break;
        }
        break;

      case 'date':
        if (!element[field]) {
          errors[field] = 'Date field is required';
          break;
        }
        if (new Date(element[field]) < new Date('1986-01-01T00:00')) {
          errors[field] = 'date cannot be less than 1986';
          break;
        }
        break;
    }
  }

  return errors;
};
