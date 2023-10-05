import dayjs from 'dayjs';

import { DATE_FORMAT } from '@/constants/dateFormat';
import {
  ERROR_TEXT,
  MIN_MAX_LENGTH_VALIDATED_TYPES,
  MIN_MAX_VALIDATED_TYPES,
  PATTERN_VALIDATED_TYPES,
} from '@/constants/validation';
import {
  IErrorsObj,
  IValidationData,
  IValidatorResult,
} from '@/type/Validation';

export const validateFormData = (data: IValidationData[]): IErrorsObj => {
  const errorsObj = data.reduce((result, item) => {
    const obj: IValidatorResult = myValidator(item);

    if (obj.errorsMsg.length > 0) {
      result[obj.name] = obj.errorsMsg;
    }
    return result;
  }, {} as IErrorsObj);

  return errorsObj;
};

const myValidator = ({
  ref,
  validations,
}: IValidationData): IValidatorResult => {
  const name = ref.current.name;
  const value = ref.current.value.trim();
  const type = ref.current.type;

  const errorsMsg: string[] = [];

  if (validations?.required) {
    if (!value) {
      errorsMsg.push(ERROR_TEXT.REQUIRED);
    }
  }

  if (type === 'datetime-local' && errorsMsg.length === 0) {
    if (!dayjs(value, DATE_FORMAT).isValid()) {
      errorsMsg.push(ERROR_TEXT.INVALID_DATE);
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
            if (MIN_MAX_VALIDATED_TYPES.includes(type)) {
              const newDate = dayjs(value, DATE_FORMAT);
              const validatioDate = dayjs(rule.value, DATE_FORMAT);

              if (newDate.isBefore(validatioDate)) {
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
            if (MIN_MAX_VALIDATED_TYPES.includes(type)) {
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
