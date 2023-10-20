export const START_DATE_VALID = '2022-10-01T00:00:00';
export const END_DATE_VALID = '2024-10-01T00:00:00';

export const CHECK_VALID = {
  date: /^\d{4}-\d{2}-\d{2}$/,
  week: /^(?:\d{1,4}|0{4})-W(0[1-9]|[1-4]\d|5[0-2])$/,
  number: /^-?\d+(\.\d+)?$/,
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
  'number',
];

export enum ERROR_TEXT {
  REQUIRED = 'Value field is required.',

  NUMBER = 'Value must be a number',

  MIN_LENGTH = 'The length must be at least',
  MAX_LENGTH = 'The length should be no more than',

  START_DATE = 'The date must be at least',
  END_DATE = 'The date must be no more than',
  INVALID_DATE = 'Invalid date is entered',

  MIN_NUMBER = 'The number must be at least',
  MAX_NUMBER = 'The number must be no more than',

  INVALID_PATTERN = 'did not pass validation by pattern',
}
