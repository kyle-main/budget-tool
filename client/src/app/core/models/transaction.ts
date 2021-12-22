import { Category } from './category';
export interface Transaction {
  name: string;
  amount: number;
  category: Category;
  year: number;
  month: number;
  day: number;
  recurring: boolean;
}
