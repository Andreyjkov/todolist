import dayjs from 'dayjs';
import get from 'lodash-es/get';

import {
  CHECK_VALID,
  DATE_VALIDATED_TYPES,
  ERROR_TEXT,
  MIN_MAX_LENGTH_VALIDATED_TYPES,
  PATTERN_VALIDATED_TYPES,
} from '@/constants/validation';
import { IErrorsObj, IValidation, IValidatorResult } from '@/type/Validation';
import { DATE_DISPLAY_FORMAT } from '@/constants/dateFormat';
import { INPUT_TYPE } from '@/constants/inputType';

export const validateFormData = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any,
  config: IValidation[]
): IErrorsObj => {
  const errorsObj = config.reduce((result, item) => {
    const value = get(formData, item.path);

    const obj: IValidatorResult = myValidator(value, item);

    if (obj.errorsMsg.length > 0) {
      result[obj.name] = obj.errorsMsg;
    }
    return result;
  }, {} as IErrorsObj);

  return errorsObj;
};

const myValidator = (
  value: string | boolean | undefined,
  { validations, name, type }: IValidation
): IValidatorResult => {
  const errorsMsg: string[] = [];

  const isRequired = !!validations?.required?.value;

  if (value === undefined) {
    errorsMsg.push('invalid path to value');
    // eslint-disable-next-line no-console
    console.error('invalid path to value, name:', name);
    return { name: name, errorsMsg: errorsMsg };
  } else if (
    (isRequired && !value.toString().trim()) ||
    (isRequired && value === false)
  ) {
    errorsMsg.push(validations.required.message || ERROR_TEXT.REQUIRED);
    return { name: name, errorsMsg: errorsMsg };
  } else if (!isRequired && value === '') {
    return { name: name, errorsMsg: errorsMsg };
  }

  if (typeof value === 'boolean') {
    return { name: name, errorsMsg: errorsMsg };
  } else if (type === INPUT_TYPE.DATETIME_LOCAL && !dayjs(value).isValid()) {
    errorsMsg.push(ERROR_TEXT.INVALID_DATE);
    return { name: name, errorsMsg: errorsMsg };
  } else if (type === INPUT_TYPE.NUMBER && !CHECK_VALID.number.test(value)) {
    errorsMsg.push(ERROR_TEXT.NUMBER);
    return { name: name, errorsMsg: errorsMsg };
  }

  for (const validation in validations) {
    switch (validation) {
      case 'minLength':
        {
          const rule = validations[validation];
          if (
            MIN_MAX_LENGTH_VALIDATED_TYPES.includes(type) &&
            value.trim().length < rule.value
          ) {
            errorsMsg.push(
              rule.message || `${ERROR_TEXT.MIN_LENGTH} ${rule.value}`
            );
          }
        }
        break;

      case 'maxLength':
        {
          const rule = validations[validation];
          if (
            MIN_MAX_LENGTH_VALIDATED_TYPES.includes(type) &&
            value.trim().length > rule.value
          ) {
            errorsMsg.push(
              rule.message || `${ERROR_TEXT.MAX_LENGTH} ${rule.value}`
            );
          }
        }
        break;

      case 'min':
        {
          const rule = validations[validation];
          if (DATE_VALIDATED_TYPES.includes(type)) {
            const dateRule = dayjs(rule.value);

            if (dayjs(value).isBefore(dateRule)) {
              errorsMsg.push(
                rule.message ||
                  `${ERROR_TEXT.START_DATE} ${dateRule.format(
                    DATE_DISPLAY_FORMAT
                  )}`
              );
            }
          } else if (type === INPUT_TYPE.NUMBER && value < rule.value) {
            errorsMsg.push(
              rule.message || `${ERROR_TEXT.MIN_NUMBER} ${rule.value}`
            );
          }
        }
        break;

      case 'max':
        {
          const rule = validations[validation];
          if (DATE_VALIDATED_TYPES.includes(type)) {
            const dateRule = dayjs(rule.value);
            const newDate = dayjs(value);

            if (newDate.isAfter(dateRule)) {
              errorsMsg.push(
                rule.message ||
                  `${ERROR_TEXT.END_DATE} ${dateRule.format(
                    DATE_DISPLAY_FORMAT
                  )}`
              );
            }
          } else if (type === INPUT_TYPE.NUMBER && value > rule.value) {
            errorsMsg.push(
              rule.message
                ? rule.message
                : `${ERROR_TEXT.MAX_NUMBER} ${rule.value}`
            );
          }
        }
        break;

      case 'pattern':
        if (PATTERN_VALIDATED_TYPES.includes(type)) {
          const pattern = validations[validation];

          if (!pattern.value.test(value)) {
            errorsMsg.push(pattern.message || `${ERROR_TEXT.INVALID_PATTERN}`);
          }
        }
        break;
    }
  }

  return { name: name, errorsMsg: errorsMsg };
};
