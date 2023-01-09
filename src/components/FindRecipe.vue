<template>
  <Page id="recipe">
    <h2>Hitta recept</h2>
    <AutoComplete
      placeholder="Hitta recept"
      :items="foundRecipes"
      @on-input="searchRecipe($event)"
      @on-click="loadRecipe($event)"
    />
    <Recipe :recipe="recipe" />
  </Page>
</template>

<script lang="ts">
import AutoComplete from "./shared/AutoComplete.vue";
import Recipe from "./shared/Recipe.vue";
import Page from "./shared/Page.vue";
import { defineComponent } from "vue";
import { fb } from "@/firebase";

export default defineComponent({
  components: {
    AutoComplete,
    Recipe,
    Page
  },
  data: function() {
    return {
      foundRecipes: [] as IRecipe[],
      recipe: {} as IFullRecipe
    }
  },
  methods: {
    async loadRecipe(id: string) {
      const found = this.foundRecipes.find(recipe => recipe.id === id);
      if (found) {
        const ingredients: IIngredient[] = await Promise.all(found.ingredients.map(async (id: string) => await fb.getIngredientById(id)))
        this.recipe = { ...found, ingredients };
      }
      this.foundRecipes = [];
    },

    async searchRecipe(inputValue: string) {
      this.foundRecipes = await fb.searchRecipe(inputValue);
    },
  },
});
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
