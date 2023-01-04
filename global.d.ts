interface ISearchWords {
  [key: string | number | symbol]: unknown;
}

interface IIngredient {
  id: string;
  name?: string;
  kcal?: number;
  searchWords?: ISearchWords;
}

interface IRecipe {
  id: string;
  name: string;
  ingredients: string[];
  createdBy: string;
  searchWords?: ISearchWords;
}

type IconType = string[];
