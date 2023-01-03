interface IIngredient {
  id: string;
  name: string;
  kcal: number;
}

interface IRecipe {
  id?: string;
  name: string;
  ingredients: IIngredient[];
  createdBy: string;
}

type IconType = string[];
