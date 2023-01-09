import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDDud8Vhe5VgVzztYYh3qp8MFPiDpK6Kwk",
  authDomain: "calorify-e5581.firebaseapp.com",
  projectId: "calorify-e5581",
  storageBucket: "calorify-e5581.appspot.com",
  messagingSenderId: "528237180044",
  appId: "1:528237180044:web:8b92672d1f129a633eb7a9",
  measurementId: "G-SQ9HVWJY3N",
});

const db = getFirestore(firebaseApp);

const recipeRef = collection(db, "Recipes");
const ingredientsRef = collection(db, "Ingredients");

const GENERATION_OFFSET = new Date("5000-01-01").getTime();
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const generateId = () => {
  let autoId = "";
  for (let i = 0; i < 10; i++) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return (GENERATION_OFFSET - Date.now()).toString(32) + autoId;
};

type ISearchWords = string[];

const generateSearchWords = (txt: string) => {
  const map: ISearchWords = [];
  const s1 = (txt || "").toLowerCase();
  const n = 3;
  for (let k = 0; k <= s1.length - n; k++) map.push(s1.substring(k, k + n));
  return map;
};

const searchIngredient = async (input: string) => {
  try {
    const searchWords = generateSearchWords(input);

    if (!searchWords.length) return [];

    const searchConstraints = where("searchWords", "array-contains-any", searchWords);

    const q = query(ingredientsRef, searchConstraints, limit(10));
    const querySnapshot = await getDocs(q);

    const results: IIngredient[] = [];
    querySnapshot.forEach((doc) =>
      results.push({ id: doc.id, name: doc.data().name, ...doc.data() })
    );
    return results;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

const addIngredient = async (ingredient: IIngredient) => {
  try {
    const id = generateId();
    const payload = {
      ...ingredient,
      name: ingredient.name?.toLowerCase(),
      id,
      searchWords: generateSearchWords([ingredient.name || ""].join(" ").slice(0, 500)),
    };

    const postRef = doc(db, "Ingredients", id);
    return await setDoc(postRef, payload);
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const saveRecipe = async (recipe: IRecipe) => {
  try {
    const id = generateId();
    const payload = {
      ...recipe,
      name: recipe.name?.toLowerCase(),
      id,
      searchWords: generateSearchWords([recipe.name || ""].join(" ").slice(0, 500)),
    };

    const postRef = doc(db, "Recipes", id);
    return await setDoc(postRef, payload);
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const getIngredientById = async (id: string) => {
  try {
    const d = doc(db, "Ingredients", id);
    const querySnapshot = await getDoc(d);
    const ingredient = querySnapshot.data() as IIngredient;
    return { ...ingredient, id: ingredient.id, name: ingredient.name };
  } catch (error) {
    console.log({ error });
    return { id: "error", name: "error" };
  }
};

const searchRecipe = async (input: string) => {
  try {
    const searchWords = generateSearchWords(input);

    if (!searchWords.length) return [];

    const searchConstraints = where("searchWords", "array-contains-any", searchWords);

    const q = query(recipeRef, searchConstraints, limit(10));
    const querySnapshot = await getDocs(q);

    const results: IRecipe[] = [];
    querySnapshot.forEach((doc) =>
      results.push({
        ...doc.data(),
        id: doc.id,
        name: doc.data().name,
        ingredients: doc.data().ingredients,
        createdBy: doc.data().createdBy,
      })
    );
    return results;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

const getUserRecipes = async (uid: string) => {
  try {
    const q = query(recipeRef, where("createdBy", "==", uid));
    const querySnapshot = await getDocs(q);

    const results: IRecipe[] = [];
    querySnapshot.forEach((doc) =>
      results.push({
        ...doc.data(),
        id: doc.id,
        name: doc.data().name,
        ingredients: doc.data().ingredients,
        createdBy: doc.data().createdBy,
      })
    );
    console.log({ results });
    return results;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const fb = {
  /** Ingredients */
  searchIngredient,
  addIngredient,
  getIngredientById,
  /** Recipes */
  saveRecipe,
  searchRecipe,
  getUserRecipes,
};
