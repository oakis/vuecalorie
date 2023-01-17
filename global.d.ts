type ISearchWords = string[];

interface IExtras {
  [key: string]: number;
}

interface IIngredient {
  id: string;
  name: string;
  kcal?: number | null;
  carbs?: number | null;
  fat?: number | null;
  protein?: number | null;
  extras?: IExtras[];
  searchWords?: ISearchWords;
}

interface IRecipe {
  id: string;
  name: string;
  ingredients: string[];
  createdBy: string;
  searchWords?: ISearchWords;
}

interface IFullRecipe extends Omit<IRecipe, 'ingredients'> {
  ingredients: IIngredient[];
}

type IconType = string[];
