<script lang="ts">
import axios from "axios";
import AutoComplete from "./shared/AutoComplete.vue";
import Recipe from "./shared/Recipe.vue";
import Icon from "./shared/Icon.vue";
import { loadRecipe } from "./helpers";

export default {
  name: "UserComponent",
  components: {
    AutoComplete,
    Recipe,
    Icon,
  },
  props: {
    foundIngredients: {
      type: Array,
      default: () => [],
    },
    recipe: {
      type: Array,
      default: () => [],
    },
    recipeNameInputValue: String,
    user: {
      type: Object,
      default: () => ({
        username: "",
        email: "",
        token: "",
      }),
    },
    usernameInput: {
      type: String,
      default: "oakis",
    },
    passwordInput: {
      type: String,
      default: "mysupersecretpassword",
    },
    regUsernameInput: String,
    regPasswordInput: String,
    regEmailInput: String,
    userRecipes: {
      type: Array,
      default: () => [
        {
          name: "",
          ingredients: [],
        },
      ],
    },
    selectedRecipe: {
      type: Object,
      default: () => ({
        name: "",
        ingredients: [],
      }),
    },
  },
  methods: {
    async loadRecipe(id: string) {
      this.$emit("selectedRecipe", await loadRecipe(id));
    },

    async getUserRecipes() {
      const { data } = await axios
        .get(`http://localhost:4000/recipes/search/${this.user._id}`)
        .catch((err) => ({ data: err }));
      this.$emit("userRecipes", data);
    },

    async loginUser() {
      if (this.usernameInput && this.passwordInput) {
        const { data } = await axios
          .post("http://localhost:4000/user/login", {
            username: this.usernameInput,
            password: this.passwordInput,
          })
          .catch((err) => ({ data: err }));
        this.$emit("user", data);
        this.getUserRecipes();
      }
      return;
    },

    async registerUser() {
      if (this.regUsernameInput && this.regPasswordInput) {
        const { data } = await axios
          .post("http://localhost:4000/user", {
            username: this.regUsernameInput,
            password: this.regPasswordInput,
            email: this.regEmailInput,
          })
          .catch((err) => ({ data: err }));
        this.$emit("user", data);
      }
      return;
    },

    addIngredient(id: string) {
      const ingredientToAdd = this.foundIngredients.find(
        (ingredient) => ingredient._id === id
      )!;
      const newIngredients = [...this.recipe, ingredientToAdd];
      this.$emit("recipe", newIngredients);
      this.$emit("foundIngredients", []);
    },

    async searchIngredient(inputValue: string) {
      const { data } = await axios
        .post("http://localhost:4000/ingredients/search", {
          search: inputValue,
        })
        .catch((err) => ({ data: err }));
      this.$emit("foundIngredients", data);
    },

    async saveRecipe() {
      await axios
        .post("http://localhost:4000/recipes", {
          name: this.recipeNameInputValue,
          ingredients: this.recipe.map((obj) => obj._id),
          createdBy: this.user._id,
        })
        .catch((err) => ({ data: err }));
    },
  },
};
</script>

<template>
  <div id="user" v-if="this.user && this.user._id">
    <h2>{{ this.user.username }} ({{ this.user.email }})</h2>
    <AutoComplete
      placeholder="Hitta ingrediens"
      @on-input="this.searchIngredient($event)"
      @on-click="this.addIngredient($event)"
      :items="this.foundIngredients"
    />
    <div id="create-recipe" v-if="this.recipe.length">
      <h3>Ingredienser:</h3>
      <ul>
        <li v-for="item in this.recipe" :key="item._id">{{ item.name }}</li>
      </ul>
      <input
        placeholder="Ge ditt recept ett namn"
        :value="this.recipeNameInputValue"
      />
      <button @click="this.saveRecipe">Spara recept</button>
    </div>
    <div id="user-recipes" v-if="this.userRecipes.length">
      <h3>Dina recept:</h3>
      <ul>
        <li
          v-for="item in this.userRecipes"
          :key="item._id"
          @click="this.loadRecipe(item._id)"
        >
          {{ item.name }}
        </li>
      </ul>
      <Recipe
        v-if="this.selectedRecipe !== null"
        :recipe="this.selectedRecipe"
      />
    </div>
  </div>
  <div id="logged-out" v-else>
    <div id="logged-out-box">
      <h2>Skapa ett konto..</h2>
      <div class="input-with-icon">
        <Icon :icon="['fas', 'user']" />
        <input placeholder="Användarnamn" :value="this.regUsernameInput" />
      </div>
      <div class="input-with-icon">
        <Icon :icon="['fas', 'envelope']" />
        <input placeholder="E-mail" :value="this.regEmailInput" />
      </div>
      <div class="input-with-icon">
        <Icon :icon="['fas', 'lock']" />
        <input
          placeholder="Lösenord"
          :value="this.regPasswordInput"
          type="password"
        />
      </div>
      <button class="cta-button" @click="this.registerUser">Skapa konto</button>
      <h2>..eller logga in</h2>
      <div class="input-with-icon">
        <Icon :icon="['fas', 'user']" />
        <input placeholder="Användarnamn" :value="this.usernameInput" />
      </div>
      <div class="input-with-icon">
        <Icon :icon="['fas', 'lock']" />
        <input
          placeholder="Lösenord"
          :value="this.passwordInput"
          type="password"
        />
      </div>
      <button @click="loginUser">Logga in</button>
    </div>
  </div>
</template>

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
