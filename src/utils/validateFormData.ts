import dayjs from 'dayjs';

import {
  CHECK_VALID,
  DATE_VALIDATED_TYPES,
  ERROR_TEXT,
  MIN_MAX_LENGTH_VALIDATED_TYPES,
  PATTERN_VALIDATED_TYPES,
} from '@/constants/validation';
import {
  IErrorsObj,
  IFormData,
  IValidation,
  IValidatorResult,
} from '@/type/Validation';

export const validateFormData = (
  formData: IFormData,
  config: IValidation[]
): IErrorsObj => {
  const errorsObj = config.reduce((result, item) => {
    const value = formData[item.name].trim();
    const obj: IValidatorResult = myValidator(value, item);

    if (obj.errorsMsg.length > 0) {
      result[obj.name] = obj.errorsMsg;
    }
    return result;
  }, {} as IErrorsObj);

  return errorsObj;
};

const myValidator = (
  value: string,
  { validations, name, type }: IValidation
): IValidatorResult => {
  const errorsMsg: string[] = [];

  if (validations?.required && !value) {
    errorsMsg.push(ERROR_TEXT.REQUIRED);
  }

  if (type === 'datetime-local' && errorsMsg.length === 0) {
    if (!dayjs(value).isValid()) {
      errorsMsg.push(ERROR_TEXT.INVALID_DATE);
    }
  } else if (
    type === 'date' &&
    validations?.required &&
    errorsMsg.length === 0
  ) {
    if (!CHECK_VALID.date.test(value)) {
      errorsMsg.push(ERROR_TEXT.INVALID_DATE);
    }
  } else if (type === 'number' && errorsMsg.length === 0) {
    if (!CHECK_VALID.number.test(value)) {
      errorsMsg.push(ERROR_TEXT.NUMBER);
    }
  }

  if (errorsMsg.length === 0) {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          {
            const rule = validations[validation];
            if (MIN_MAX_LENGTH_VALIDATED_TYPES.includes(type)) {
              if (value.length < rule.value) {
                errorsMsg.push(
                  rule.message
                    ? rule.message
                    : `${ERROR_TEXT.MIN_LENGTH} ${rule.value}`
                );
              }
            }
          }

          break;

        case 'maxLength':
          {
            const rule = validations[validation];
            if (MIN_MAX_LENGTH_VALIDATED_TYPES.includes(type)) {
              if (value.length > rule.value) {
                errorsMsg.push(
                  rule.message
                    ? rule.message
                    : `${ERROR_TEXT.MAX_LENGTH} ${rule.value}`
                );
              }
            }
          }

          break;

        case 'min':
          {
            const rule = validations[validation];
            if (DATE_VALIDATED_TYPES.includes(type)) {
              if (dayjs(value).isBefore(dayjs(rule.value))) {
                errorsMsg.push(
                  rule.message
                    ? rule.message
                    : `${ERROR_TEXT.START_DATE} ${rule.value}`
                );
              }
            } else if (type === 'number') {
              if (value < rule.value) {
                errorsMsg.push(
                  rule.message
                    ? rule.message
                    : `${ERROR_TEXT.MIN_NUMBER} ${rule.value}`
                );
              }
            }
          }

          break;

        case 'max':
          {
            const rule = validations[validation];
            if (DATE_VALIDATED_TYPES.includes(type)) {
              const newDate = dayjs(value);
              const validatioDate = dayjs(rule.value);

              if (newDate.isAfter(validatioDate)) {
                errorsMsg.push(
                  rule.message
                    ? rule.message
                    : `${ERROR_TEXT.END_DATE}  ${rule.value}`
                );
              }
            } else if (type === 'number') {
              if (value > rule.value) {
                errorsMsg.push(
                  rule.message
                    ? rule.message
                    : `${ERROR_TEXT.MAX_NUMBER} ${rule.value}`
                );
              }
            }
          }

          break;

        case 'pattern':
          if (PATTERN_VALIDATED_TYPES.includes(type)) {
            const pattern = validations[validation];
            if (!pattern.value.test(value)) {
              errorsMsg.push(
                pattern.message
                  ? `${pattern.message}`
                  : `${ERROR_TEXT.INVALID_PATTERN}`
              );
            }
          }

          break;
      }
    }
  }

  return { name: name, errorsMsg: errorsMsg };
};
