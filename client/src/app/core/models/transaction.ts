import { Category } from './category';
export interface Transaction {
  name: String;
  amount: Number;
  category: String;
  year: Number;
  month: Number;
  day: Number;
  recurring: boolean;
}
