export interface IResultValidation {
  isValid: boolean;
  name: string;
  value: string;
  errorsMsg?: string[];
}

export interface IValidationData {
  ref:
    | React.MutableRefObject<HTMLInputElement>
    | React.MutableRefObject<HTMLTextAreaElement>;
  validations?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: string;
    max?: string;
    pattern?: RegExp;
  };
}
