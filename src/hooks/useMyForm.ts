import { useState } from 'react';
import dayjs from 'dayjs';

import { DATE_FORMAT } from '@/constants/dateFormat';
import { IResultValidation, IValidationData } from '@/type/Validation';
import { ERROR_TEXT } from '@/constants/validation';

export const useMyForm = () => {
  const [errors, setErrors] = useState<{
    [key: string]: string[];
  } | null>();

  const validateFormData = (data: IValidationData[]) => {
    const dataArray = data.map((item) => {
      return myValidator(item);
    });

    const hasInvalidObject = dataArray.some((obj) => obj.isValid === false);

    if (hasInvalidObject) {
      setErrors(getInvalidDataObj(dataArray));
    } else {
      setErrors(null);
      return getSuccessDataObj(dataArray);
    }
  };

  const myValidator = ({ ref, validations }: IValidationData) => {
    const name = ref.current.name;
    const value = ref.current.value.trim();
    const type = ref.current.type;

    const errorMsg: string[] = [];

    for (const validation in validations) {
      switch (validation) {
        case 'required':
          if (!value && validations[validation]) {
            errorMsg.push(ERROR_TEXT.REQUIRED);
          }
          break;

        case 'minLength': {
          if (type === 'text' || type === 'textarea') {
            if (value.length < validations[validation]) {
              errorMsg.push(
                `${ERROR_TEXT.MIN_LENGTH} ${validations[validation]}`
              );
            }
          }
          break;
        }

        case 'maxLength': {
          if (type === 'text' || type === 'textarea') {
            if (value.length > validations[validation]) {
              errorMsg.push(
                `${ERROR_TEXT.MAX_LENGTH} ${validations[validation]}`
              );
            }
          }
          break;
        }

        case 'min': {
          if (type === 'datetime-local') {
            const newDate = dayjs(value, DATE_FORMAT);
            const validatioDate = dayjs(validations[validation], DATE_FORMAT);

            if (!newDate.isValid()) {
              errorMsg.push(`${ERROR_TEXT.INVALID_DATE} ${value}`);
            }

            if (newDate.isBefore(validatioDate)) {
              errorMsg.push(
                `${ERROR_TEXT.MIN_DATE} ${validations[validation]}`
              );
            }
          }
          if (type === 'number') {
            if (value < validations[validation]) {
              errorMsg.push(
                `${ERROR_TEXT.MIN_NUMBER} ${validations[validation]}`
              );
            }
          }
          break;
        }

        case 'max': {
          if (type === 'datetime-local') {
            const newDate = dayjs(value);
            const validatioDate = dayjs(validations[validation]);

            if (!newDate.isValid()) {
              errorMsg.push(`${ERROR_TEXT.INVALID_DATE} ${value}`);
            }

            if (newDate.isAfter(validatioDate)) {
              errorMsg.push(
                `${ERROR_TEXT.MAX_DATE}  ${validations[validation]}`
              );
            }
          }
          if (type === 'number') {
            if (value > validations[validation]) {
              errorMsg.push(
                `${ERROR_TEXT.MAX_NUMBER} ${validations[validation]}`
              );
            }
          }
          break;
        }
        case 'pattern': {
          // if (
          //   (type = 'text' ||
          //   type = 'tel' ||
          //   type = 'email' ||
          //   type = 'url' ||
          //   type = 'password' ||
          //   type = 'search'
          // )
          break;
        }
      }
    }

    return errorMsg.length
      ? { isValid: false, name: name, value: value, errorsMsg: errorMsg }
      : { isValid: true, name: name, value: value };
  };

  const getInvalidDataObj = (dataArray: IResultValidation[]) => {
    return dataArray.reduce(
      (result, obj) => {
        if (obj.isValid === false) {
          result[obj.name] = obj.errorsMsg;
        }
        return result;
      },
      {} as {
        [key: string]: string[];
      }
    );
  };

  const getSuccessDataObj = (dataArray: IResultValidation[]) => {
    return dataArray.reduce(
      (obj, item) => {
        obj[item.name] = item.value;
        return obj;
      },
      {} as {
        [key: string]: string;
      }
    );
  };

  return { validateFormData, errors };
};
