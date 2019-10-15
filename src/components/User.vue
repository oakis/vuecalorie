<template>
  <div id="user" v-if="user && user._id">
    <h2>{{ user.username }} ({{ user.email }})</h2>
    <AutoComplete
      placeholder="Hitta ingrediens"
      @on-input="searchIngredient($event)"
      @on-click="addIngredient($event)"
      :items="foundIngredients"
    />
    <div id="create-recipe" v-if="recipe.length">
      <h3>Ingredienser:</h3>
      <ul>
        <li v-for="item in recipe" :key="item._id">{{ item.name }}</li>
      </ul>
      <input
        placeholder="Ge ditt recept ett namn"
        v-model="recipeNameInputValue"
      />
      <button @click="saveRecipe">Spara recept</button>
    </div>
    <div id="user-recipes" v-if="userRecipes.length">
      <h3>Dina recept:</h3>
      <ul>
        <li
          v-for="item in userRecipes"
          :key="item._id"
          @click="loadRecipe(item._id)"
        >
          {{ item.name }}
        </li>
      </ul>
      <Recipe v-if="selectedRecipe !== null" :recipe="selectedRecipe" />
    </div>
  </div>
  <div id="logged-out" v-else>
    <div id="logged-out-box">
      <h2>Skapa ett konto..</h2>
      <input placeholder="Användarnamn" v-model="regUsernameInput" />
      <input placeholder="E-mail" v-model="regEmailInput" />
      <input
        placeholder="Lösenord"
        v-model="regPasswordInput"
        type="password"
      />
      <button class="cta-button" @click="registerUser">Skapa konto</button>
      <h2>..eller logga in</h2>
      <input placeholder="Användarnamn" v-model="usernameInput" />
      <input placeholder="Lösenord" v-model="passwordInput" type="password" />
      <button @click="loginUser">Logga in</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import AutoComplete from "./shared/AutoComplete.vue";
import Recipe from "./shared/Recipe.vue";
import { IIngredient, IUser, IRecipe } from "./types";
import { loadRecipe } from "./helpers";

@Component({
  components: {
    AutoComplete,
    Recipe
  }
})
export default class User extends Vue {
  foundIngredients: Array<IIngredient> = [];
  recipe: Array<IIngredient> = [];
  recipeNameInputValue: string = "";
  user: IUser = null;
  usernameInput: string = "oakis";
  passwordInput: string = "mysupersecretpassword";
  regUsernameInput: string = "";
  regPasswordInput: string = "";
  regEmailInput: string = "";
  userRecipes: Array<IRecipe> = [];
  selectedRecipe: IRecipe = null;

  async loadRecipe(id: string) {
    this.selectedRecipe = await loadRecipe(id);
  }

  async getUserRecipes() {
    const { data } = await axios
      .get(`http://localhost:4000/recipes/search/${this.user._id}`)
      .catch(err => ({ data: err }));
    this.userRecipes = data;
  }

  async loginUser() {
    if (this.usernameInput && this.passwordInput) {
      const { data } = await axios
        .post("http://localhost:4000/user/login", {
          username: this.usernameInput,
          password: this.passwordInput
        })
        .catch(err => ({ data: err }));
      this.user = data;
      this.getUserRecipes();
    }
    return;
  }

  async registerUser() {
    if (this.regUsernameInput && this.regPasswordInput) {
      const { data } = await axios
        .post("http://localhost:4000/user", {
          username: this.regUsernameInput,
          password: this.regPasswordInput,
          email: this.regEmailInput
        })
        .catch(err => ({ data: err }));
      this.user = data;
    }
    return;
  }

  addIngredient(id: string) {
    const ingredientToAdd = this.foundIngredients.find(
      ingredient => ingredient._id === id
    )!;
    this.recipe.push(ingredientToAdd);
    this.foundIngredients = [];
  }

  async searchIngredient(inputValue: string) {
    const { data } = await axios
      .post("http://localhost:4000/ingredients/search", {
        search: inputValue
      })
      .catch(err => ({ data: err }));
    this.foundIngredients = data;
  }

  async saveRecipe() {
    const { data } = await axios
      .post("http://localhost:4000/recipes", {
        name: this.recipeNameInputValue,
        ingredients: this.recipe.map(obj => obj._id),
        createdBy: this.user._id
      })
      .catch(err => ({ data: err }));
  }
}
</script>

<style scoped lang="scss">
#user {
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

#logged-out {
  display: flex;
  justify-content: center;
  #logged-out-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
