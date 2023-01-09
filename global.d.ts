type ISearchWords = string[];

interface IIngredient {
  id: string;
  name: string;
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

interface IFullRecipe extends Omit<IRecipe, 'ingredients'> {
  ingredients: IIngredient[];
}

type IconType = string[];
