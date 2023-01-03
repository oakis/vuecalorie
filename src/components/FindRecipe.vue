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
import axios from "axios";
import AutoComplete from "./shared/AutoComplete.vue";
import Recipe from "./shared/Recipe.vue";
import { loadRecipe } from "./helpers";
import Page from "./shared/Page.vue";
import { defineComponent } from "vue";

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
