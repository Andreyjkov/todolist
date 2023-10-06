export const START_DATE_VALID = '2022-01-01T12:00:00';
export const END_DATE_VALID = '2024-10-22T12:00:00';

export const CHECK_VALID = {
  date: /^\d{4}-\d{2}-\d{2}$/,
  week: /^(?:\d{1,4}|0{4})-W(0[1-9]|[1-4]\d|5[0-2])$/,
  number: /^[0-9]+(\.[0-9]+)?$/,
};

export const MIN_MAX_LENGTH_VALIDATED_TYPES = [
  'textarea',
  'text',
  'password',
  'search',
  'url',
  'tel',
  'email',
];

export const DATE_VALIDATED_TYPES = ['datetime-local', 'date', 'month'];

export const PATTERN_VALIDATED_TYPES = [
  'textarea',
  'text',
  'password',
  'search',
  'url',
  'tel',
  'email',
  'datetime-local',
  'date',
  'month',
];

export enum ERROR_TEXT {
  REQUIRED = 'Value field is required.',

  NUMBER = 'Value must be a number',

  MIN_LENGTH = 'Length must be greater than or equal to',
  MAX_LENGTH = 'Length must be less than or equal to',

  START_DATE = 'The date should be higher or equal to',
  END_DATE = 'The date should be below or equal to',
  INVALID_DATE = 'Invalid date is entered',

  MIN_NUMBER = 'The number must be greater than or equal to',
  MAX_NUMBER = 'The number must be less than or equal to',

  INVALID_PATTERN = 'did not pass validation by pattern',
}
