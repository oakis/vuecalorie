import axios from "axios";

export const loadRecipe = async (id: string) => {
  const { data } = await axios
    .get(`http://localhost:4000/recipes/${id}`)
    .catch((err) => ({ data: err }));
  return data;
};
