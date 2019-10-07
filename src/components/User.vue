<template>
  <div id="user">
    <h2>"Username placeholder"</h2>
    <AutoComplete
      placeholder="Hitta ingrediens"
      @on-input="searchIngredient($event)"
      @on-click="addIngredient($event)"
      :items="foundIngredients"
    />
    <div id="recipe" v-if="recipe.length">
      <h3>Ingredienser:</h3>
      <ul>
        <li v-for="item in recipe" :key="item._id">{{ item.name }}</li>
      </ul>
      <input
        placeholder="Ge ditt recept ett namn"
        v-model="recipeNameInputValue"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import AutoComplete from "./shared/AutoComplete.vue";

@Component({
  components: {
    AutoComplete
  }
})
export default class User extends Vue {
  foundIngredients = [];
  recipe = [];
  recipeNameInputValue = "";

  addIngredient(id: String) {
    const ingredientToAdd = this.foundIngredients.find(
      ingredient => ingredient._id === id
    );
    this.recipe.push(ingredientToAdd);
    this.foundIngredients = [];
  }

  async searchIngredient(inputValue: String) {
    const { data } = await axios
      .post("http://localhost:4000/ingredients/search", {
        search: inputValue
      })
      .catch(err => ({ data: err }));
    this.foundIngredients = data;
  }
}
</script>

<style scoped lang="scss">
#user {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  background-color: purple;
  p {
    margin: 0;
  }
  ul {
    margin: 0;
    padding-left: 20px;
  }
}
</style>
