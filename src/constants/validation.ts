export const MAX_DATE_VALID = '2024-10-22T01:13:01';
export const MIN_DATE_VALID = '2024-10-22T01:13:01';

export enum ERROR_TEXT {
  REQUIRED = 'Value field is required.',

  MIN_LENGTH = 'Length should be longer',
  MAX_LENGTH = 'Length should be less',

  MIN_DATE = 'Date should be higher',
  MAX_DATE = 'Date  must be below',
  INVALID_DATE = 'Incorrect date',

  MIN_NUMBER = 'Nnumber should be higher',
  MAX_NUMBER = 'Number should be less',
}
