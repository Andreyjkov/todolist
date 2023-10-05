const email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const url = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
const number = /^-?\d+(\.\d+)?$/;
const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const date = /^\d{4}-\d{2}-\d{2}$/; //YYYY-MM-DD
const dateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/; //'YYYY-MM-DDTHH:mm:ss'

export const patterns = {
  email,
  url,
  number,
  password,
  date,
  dateTimePattern,
};
