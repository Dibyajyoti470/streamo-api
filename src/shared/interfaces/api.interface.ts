import { Status } from '../enums/api.enum';

export interface ResponseFormatted<T> {
  status: `${Status}`;
  message: string;
  data?: T;
}
