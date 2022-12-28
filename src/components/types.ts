export interface IIngredient {
  readonly _id: string;
  name: string;
  kcal: number;
  readonly __v: number;
}

export interface IRecipe {
  readonly _id: string;
  name: string;
  ingredients: Array<IIngredient>;
  readonly __v: number;
}

export interface IUser {
  readonly _id: string;
  username: string;
  email: string;
  token: string;
}

export type IconType = Array<String>;
