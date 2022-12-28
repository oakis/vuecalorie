<template>
  <div id="recipe">
    <h2>Hitta recept</h2>
    <AutoComplete
      placeholder="Hitta recept"
      @on-input="this.searchRecipe($event)"
      @on-click="this.loadRecipe($event)"
      :items="this.foundRecipes"
    />
    <Recipe :recipe="this.recipe" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import AutoComplete from "./shared/AutoComplete.vue";
import Recipe from "./shared/Recipe.vue";
import { loadRecipe } from "./helpers";

export default {
  components: {
    AutoComplete,
    Recipe,
  },
  props: {
    foundRecipes: {
      type: Array,
      default: () => [],
    },
    recipe: {
      type: Object,
      default: () => ({
        name: "",
        ingredients: [],
      }),
    },
  },
  methods: {
    async loadRecipe(id: string) {
      this.$emit("recipe", await loadRecipe(id));
      this.$emit("foundRecipes", []);
    },

    async searchRecipe(inputValue: string) {
      const { data } = await axios
        .post("http://localhost:4000/recipes/search", {
          search: inputValue,
        })
        .catch((err) => err);
      this.$emit("foundRecipes", data);
    },
  },
};
</script>

<style scoped lang="scss">
#recipe {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;

  p {
    margin: 0;
  }

  ul {
    margin: 0;
    padding-left: 20px;
  }
}
</style>
