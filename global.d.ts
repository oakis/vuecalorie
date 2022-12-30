interface IIngredient {
  id: string;
  name: string;
  kcal: number;
}

interface IRecipe {
  id: string;
  name: string;
  ingredients: IIngredient[];
}

type IconType = string[];
