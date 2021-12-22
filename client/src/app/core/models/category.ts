interface Category {
  value: string;
  parent: string;
}

enum PARENT_CATEGORIES {
  HOME = 'Home',
  TRANSPORTATION = 'Transportation',
  DAILYLIVING = 'Daily Living',
  ENTERTAINMENT = 'Entertainment',
  HEALTH = 'Health',
  VACATION = 'Vacation',
  OTHER = 'Other',
  INCOME = 'Income',
  SAVINGS = 'Savings',
}

const CATEGORIES: Category[] = [
  { value: 'Rent', parent: PARENT_CATEGORIES.HOME },
  { value: 'Home Insurance', parent: PARENT_CATEGORIES.HOME },
  { value: 'Electricity', parent: PARENT_CATEGORIES.HOME },
  { value: 'Gas', parent: PARENT_CATEGORIES.HOME },
  { value: 'Water', parent: PARENT_CATEGORIES.HOME },
  { value: 'Phone', parent: PARENT_CATEGORIES.HOME },
  { value: 'Cable', parent: PARENT_CATEGORIES.HOME },
  { value: 'Internet', parent: PARENT_CATEGORIES.HOME },
  { value: 'Furniture', parent: PARENT_CATEGORIES.HOME },
  { value: 'Garden', parent: PARENT_CATEGORIES.HOME },
  { value: 'Mainentance', parent: PARENT_CATEGORIES.HOME },
  { value: 'Car Payment', parent: PARENT_CATEGORIES.TRANSPORTATION },
  { value: 'Auto Insurance', parent: PARENT_CATEGORIES.TRANSPORTATION },
  { value: 'Parking', parent: PARENT_CATEGORIES.TRANSPORTATION },
  { value: 'Maintenance', parent: PARENT_CATEGORIES.TRANSPORTATION },
  { value: 'Uber', parent: PARENT_CATEGORIES.TRANSPORTATION },
  { value: 'Groceries', parent: PARENT_CATEGORIES.DAILYLIVING },
  { value: 'Work Food', parent: PARENT_CATEGORIES.DAILYLIVING },
  { value: 'Eating Out', parent: PARENT_CATEGORIES.DAILYLIVING },
  { value: 'Delivery', parent: PARENT_CATEGORIES.DAILYLIVING },
  { value: 'Alcohol', parent: PARENT_CATEGORIES.DAILYLIVING },
  { value: 'Meds', parent: PARENT_CATEGORIES.DAILYLIVING },
  { value: 'Donations', parent: PARENT_CATEGORIES.DAILYLIVING },
  { value: 'Shopping', parent: PARENT_CATEGORIES.ENTERTAINMENT },
  { value: 'Activities', parent: PARENT_CATEGORIES.ENTERTAINMENT },
  { value: 'Essentials', parent: PARENT_CATEGORIES.ENTERTAINMENT },
  { value: 'Subscriptions', parent: PARENT_CATEGORIES.ENTERTAINMENT },
  { value: 'Doctors', parent: PARENT_CATEGORIES.HEALTH },
  { value: 'Dentists', parent: PARENT_CATEGORIES.HEALTH },
  { value: 'Veterinarian', parent: PARENT_CATEGORIES.HEALTH },
  { value: 'Other', parent: PARENT_CATEGORIES.HEALTH },
  { value: 'Travel', parent: PARENT_CATEGORIES.VACATION },
  { value: 'Other', parent: PARENT_CATEGORIES.OTHER },
  { value: 'Paycheck', parent: PARENT_CATEGORIES.INCOME },
  { value: 'Refunds', parent: PARENT_CATEGORIES.INCOME },
  { value: 'Cashback', parent: PARENT_CATEGORIES.INCOME },
  { value: 'Interest', parent: PARENT_CATEGORIES.INCOME },
  { value: 'Emergency Fund', parent: PARENT_CATEGORIES.SAVINGS },
  { value: 'Savings', parent: PARENT_CATEGORIES.SAVINGS },
  { value: 'IRA', parent: PARENT_CATEGORIES.SAVINGS },
  { value: 'Stundent Loans', parent: PARENT_CATEGORIES.SAVINGS },
];

export { Category, CATEGORIES, PARENT_CATEGORIES };
