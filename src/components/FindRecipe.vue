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
import { doFetch } from "@/helpers/fetch";

export default defineComponent({
  components: {
    AutoComplete,
    Recipe,
    Page
  },
  data: function() {
    return {
      foundRecipes: [] as IRecipe[],
      recipe: {} as IRecipe
    }
  },
  methods: {
    async loadRecipe(id: string) {
      try {
        doFetch(`Recipes/${id}`)
        .then((recipe) => {
          this.recipe = recipe;
        }).catch((err) => {
          throw err;
        });
      } catch (error) {
        console.error(error);
      }
    },

    async searchRecipe(inputValue: string) {
      try {
        doFetch(`Recipes/${inputValue}`, {method:'POST'})
        .then((recipes) => {
          this.foundRecipes = recipes;
        }).catch((err) => {
          throw err;
        });
      } catch (error) {
        console.error(error);
      }
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
