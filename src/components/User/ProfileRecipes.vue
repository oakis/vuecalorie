<template>
  <div>
    <AutoComplete
      placeholder="Hitta ingrediens"
      :items="foundIngredients"
      @on-input="searchIngredient($event)"
      @on-click="addIngredient($event)"
    />
    <div
      v-if="ingredients"
      id="create-recipe"
    >
      <h3>Ingredienser:</h3>
      <ul>
        <li
          v-for="item in ingredients"
          :key="item.id"
        >
          {{ item.name }}
        </li>
      </ul>
      <input
        v-model="recipeNameInputValue"
        placeholder="Ge ditt recept ett namn"
      >
      <button @click="saveRecipe">
        Spara recept
      </button>
    </div>
    <div
      v-if="userRecipes.length"
      id="user-recipes"
    >
      <h3>Dina recept:</h3>
      <ul>
        <li
          v-for="item in userRecipes"
          :key="item.id"
          @click="loadRecipe(item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
      <Recipe
        v-if="selectedRecipe !== null"
        :recipe="selectedRecipe"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AutoComplete from '../shared/AutoComplete.vue';
import Recipe from '../shared/Recipe.vue';
import { fb } from '@/firebase';
import { User } from "firebase/auth";

export default defineComponent({
    name: "ProfileRecipes",
    components: { AutoComplete, Recipe },
    props: {
      user: {
        required: true,
        type: Object as () => User
      }
    },
    data() {
      return {
        foundIngredients: [] as IIngredient[],
        ingredients: [] as IIngredient[],
        recipeNameInputValue: "",
        userRecipes: [] as IRecipe[],
        selectedRecipe: {} as IRecipe,
        ingredientInputValue: ""
      };
    },
    async mounted() {
      this.userRecipes = await fb.getUserRecipes(this.user.uid);
    },
    methods: {
      async searchIngredient(inputValue: string) {
        try {
          const data = await fb.searchIngredient(inputValue);
          this.foundIngredients = data;
        } catch (error) {
          this.foundIngredients = [];
        }
      },
      addIngredient(id: string) {
        const ingredientToAdd = this.foundIngredients.find(
          (ingredient) => {
            return ingredient.id === id
          }
        );
        if (ingredientToAdd) {
          const newIngredients = [...this.ingredients, ingredientToAdd];
          this.ingredients = newIngredients;
        }
        this.foundIngredients = [];
      },
      async saveRecipe() {
        fb.saveRecipe({
          id: 'undefined',
          name: this.recipeNameInputValue,
          ingredients: this.ingredients.map((obj) => obj.id),
          createdBy: this.user?.uid ? this.user.uid : 'unknown',
        }).then(() => {
          this.ingredients = [];
          this.recipeNameInputValue = '';
          alert('Recept tillagt')
        })
      },
      async loadRecipe(id: string) {
        console.log('loadRecipe', id);
      },
    }
});
</script>

<style scoped lang="scss">
</style>
