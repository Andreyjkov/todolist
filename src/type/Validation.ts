export interface IErrorsObj {
  [key: string]: string[];
}

export interface IValidatorResult {
  name: string;
  errorsMsg: string[];
}

export interface IFormData {
  todoValue: string;
  todoDate: string;
}

export interface IValidation {
  name: keyof IFormData;
  type:
    | 'textarea'
    | 'datetime-local'
    | 'text'
    | 'number'
    | 'password'
    | 'date'
    | 'month';
  validations?: IValidationsRule;
}

interface IValidationsRule {
  required?: boolean;
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
