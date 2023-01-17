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

interface IRecipeIngredient extends IIngredient {
  measure: string;
  volume: number;
}

interface IRecipe {
  id: string;
  name: string;
  ingredients: IRecipeIngredient[];
  createdBy: string;
  searchWords?: ISearchWords;
}

type IconType = string[];
