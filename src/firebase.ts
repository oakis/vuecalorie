import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
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

interface ITriGramMap {
  [key: string]: boolean;
}

// Generates a trigram
const triGram = (txt: string) => {
  const map: ITriGramMap = {};
  const s1 = (txt || "").toLowerCase();
  const n = 3;
  for (let k = 0; k <= s1.length - n; k++) map[s1.substring(k, k + n)] = true;
  return map;
};

const searchIngredient = async (input: string) => {
  const searchConstraints = Object.keys(triGram(input)).map((name) => where(name, "==", true));

  const q = query(ingredientsRef, ...searchConstraints, limit(10));
  const querySnapshot = await getDocs(q);

  const results: IIngredient[] = [];
  querySnapshot.forEach((doc) => results.push({ id: doc.id, ...doc.data() }));
  return results;
};

const addIngredient = async (ingredient: IIngredient) => {
  const id = generateId();
  const payload = {
    ...document,
    ...triGram([ingredient.name || ""].join(" ").slice(0, 500)),
  };

  const postRef = doc(db, "Ingredients", id);
  await setDoc(postRef, payload);
};

const saveRecipe = async (recipe: IRecipe) => {
  console.log({ recipe });
  const id = generateId();
  const payload = {
    ...recipe,
    ...triGram([recipe.name || ""].join(" ").slice(0, 500)),
  };

  const postRef = doc(db, "Recipes", id);
  await setDoc(postRef, payload);
};

export const fb = {
  searchIngredient,
  addIngredient,
  saveRecipe,
};
