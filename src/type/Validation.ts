export interface IErrorsObj {
  [key: string]: string[];
}

export interface IValidatorResult {
  name: string;
  errorsMsg: string[];
}

export interface IValidation {
  name: string;
  path: string;
  type:
    | 'textarea'
    | 'datetime-local'
    | 'text'
    | 'number'
    | 'password'
    | 'checkbox';
  validations?: IValidationsRule;
}

interface IValidationsRule {
  required?: {
    value: boolean;
    message?: string;
  };
  minLength?: {
    value: number;
    message?: string;
  };
  maxLength?: {
    value: number;
    message?: string;
  };
  min?: {
    value: string | number;
    message?: string;
  };
  max?: {
    value: string | number;
    message?: string;
  };
  pattern?: {
    value: RegExp;
    message?: string;
  };
}
