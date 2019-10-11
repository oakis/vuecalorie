<template>
  <div id="recipe">
    <h2>Hitta recept</h2>
    <AutoComplete
      placeholder="Hitta recept"
      @on-input="searchRecipe($event)"
      @on-click="loadRecipe($event)"
      :items="foundRecipes"
    />
    <Recipe :recipe="recipe" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import AutoComplete from "./shared/AutoComplete.vue";
import Recipe from "./shared/Recipe.vue";
import { IRecipe } from "./types";
import { loadRecipe } from "./helpers";

@Component({
  components: {
    AutoComplete,
    Recipe
  }
})
export default class RecipeView extends Vue {
  foundRecipes: Array<IRecipe> = [];
  recipe: IRecipe = null;

  async loadRecipe(id: string) {
    this.recipe = await loadRecipe(id);
    this.foundRecipes = [];
  }

  async searchRecipe(inputValue: string) {
    const { data } = await axios
      .post("http://localhost:4000/recipes/search", {
        search: inputValue
      })
      .catch(err => ({ data: err }));
    this.foundRecipes = data;
  }
}
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
