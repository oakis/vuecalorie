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
}

interface IRecipeIngredient extends IIngredient {
  measure: string;
  volume: number;
}

interface IRecipe {
  id: string;
  name: string;
  ingredients: IRecipeIngredient[];
  instructions?: unknown[];
  createdBy: string;
}

type IconType = string[];
