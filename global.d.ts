interface IIngredient {
  id: string;
  name?: string;
  kcal?: number;
  [key: string | number | symbol]: unknown;
}

interface IRecipe {
  id: string;
  name: string;
  ingredients: string[];
  createdBy: string;
}

type IconType = string[];
