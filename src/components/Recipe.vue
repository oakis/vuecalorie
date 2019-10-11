<template>
  <div id="recipe">
    <h2>Hitta recept</h2>
    <AutoComplete
      placeholder="Hitta recept"
      @on-input="searchRecipe($event)"
      @on-click="loadRecipe($event)"
      :items="foundRecipes"
    />
    <div v-if="recipe && recipe.hasOwnProperty('name')">
      <h2>{{ recipe.name }}</h2>
      <ul>
        <li v-for="item in recipe.ingredients" v-bind:key="item._id">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import AutoComplete from "./shared/AutoComplete.vue";
import { IRecipe } from "./types";

@Component({
  components: {
    AutoComplete
  }
})
export default class User extends Vue {
  foundRecipes: Array<IRecipe> = [];
  recipe: IRecipe = null;

  async loadRecipe(id: string) {
    const { data } = await axios
      .get(`http://localhost:4000/recipes/${id}`)
      .catch(err => ({ data: err }));
    this.recipe = data;
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
