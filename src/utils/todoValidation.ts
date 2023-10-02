interface FormData {
  value: string;
  date: string;
}

export const validateForm = (formData: FormData) => {
  const errors: Partial<FormData> = {};

  for (const field in formData) {
    switch (field) {
      case 'value':
        if (!formData[field].trim()) {
          errors[field] = 'Text field is required.';
          break;
        }

        if (formData[field].length < 3) {
          errors[field] = 'Value should be at least 3 characters.';
          break;
        }
        break;

      case 'date':
        if (!formData[field]) {
          errors[field] = 'Date field is required';
        }
        break;
    }
  }

  return errors;
};
