export interface IErrorsObj {
  [key: string]: string[];
}

export interface IValidatorResult {
  name: string;
  errorsMsg: string[];
}

export interface IValidationData {
  ref:
    | React.MutableRefObject<HTMLInputElement>
    | React.MutableRefObject<HTMLTextAreaElement>;
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
