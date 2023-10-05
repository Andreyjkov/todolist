export const START_DATE_VALID = '2022-01-01T12:00:00';
export const END_DATE_VALID = '2024-10-22T12:00:00';

export const MIN_MAX_VALIDATED_TYPES = [
  'date',
  'month',
  'week',
  'time',
  'datetime-local',
  'number',
  'range',
];

export const MIN_MAX_LENGTH_VALIDATED_TYPES = [
  'text',
  'search',
  'url',
  'tel',
  'email',
  'password',
  'textarea',
];

export const PATTERN_VALIDATED_TYPES = [
  'text',
  'search',
  'url',
  'tel',
  'email',
  'password',
  'datetime-local',
  'date',
  'month',
  'week',
  'time',
  'number',
  'range',
];

export enum ERROR_TEXT {
  REQUIRED = 'Value field is required.',

  MIN_LENGTH = 'Length must be greater than or equal to',
  MAX_LENGTH = 'Length must be less than or equal to',

  START_DATE = 'The date should be higher or equal to',
  END_DATE = 'The date should be below or equal to',
  INVALID_DATE = 'Invalid date is entered',

  MIN_NUMBER = 'The number must be greater than or equal to',
  MAX_NUMBER = 'The number must be less than or equal to',

  INVALID_PATTERN = 'did not pass validation by pattern',
}
