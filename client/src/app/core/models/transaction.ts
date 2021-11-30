import { Category } from './category';
export interface Transaction {
  name: string;
  amount: number;
  category: Category;
  date: Date;
  recurring: boolean;
}
