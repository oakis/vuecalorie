<script lang="ts">
import { defineComponent } from 'vue';
import AutoComplete from '@/components/shared/AutoComplete.vue';
import Recipe from '@/components/shared/Recipe.vue';
import { User } from "firebase/auth";
import { capitalize } from '@/helpers/strings';
import MeasureSelect from '@/components/shared/MeasureSelect.vue';
import { doFetch } from '@/helpers/fetch';

export default defineComponent({
    name: "ProfileRecipes",
    components: { AutoComplete, Recipe, MeasureSelect },
    props: {
      user: {
        required: true,
        type: Object as () => User
      }
    },
    setup() {
      return { capitalize }
    },
    data() {
      return {
        foundIngredients: [] as IIngredient[],
        ingredients: [] as IRecipeIngredient[],
        recipeNameInputValue: "",
        userRecipes: [] as IRecipe[],
        selectedRecipe: {} as IRecipe,
        ingredientInputValue: ""
      };
    },
    async mounted() {
      // this.userRecipes = await fb.getUserRecipes(this.user.uid);
    },
    methods: {
      async searchIngredient(inputValue: string) {
        try {
          doFetch(`Ingredients/${inputValue}`, {
            method: 'POST',
          })
          .then((data) => {
            this.foundIngredients = data;
          }).catch((err) => {
            this.foundIngredients = [];
            throw err;
          });
        } catch (error) {
          console.error(error);
        }
      },
      addIngredient(id: string) {
        const foundIngredient = this.foundIngredients.find(
          (ingredient) => {
            return ingredient.id === id
          }
        );
        if (foundIngredient) {
          const newIngredients = [...this.ingredients, { ...foundIngredient, measure: '', volume: 0 }];
          this.ingredients = newIngredients;
        }
        this.foundIngredients = [];
      },
      updateIngredientMeasure() {},
      updateIngredientVolume() {},
      async saveRecipe() {
        try {
        doFetch('Recipes', {method: 'POST', body: JSON.stringify({
          name: this.recipeNameInputValue,
          ingredients: this.ingredients.map(({ name, id, measure, volume }) => ({ name, id, measure, volume })),
          createdBy: this.user?.uid ? this.user.uid : 'unknown',
        })})
        .then(() => {
          this.ingredients = [];
          this.recipeNameInputValue = '';
          alert('Recept tillagt')
        }).catch((err) => {
          throw err;
        });
      } catch (error) {
        console.error(error);
      }

      },
      async loadRecipe(id: string) {
        console.log('loadRecipe', id);
      },
    }
});
</script>

<template>
  <div>
    <h3>Skapa nytt recept</h3>
    <div class="create-new-recipe">
      <div class="ingredients-wrapper">
        <AutoComplete
          placeholder="Lägg till ingrediens"
          :items="foundIngredients"
          item-icon="plus"
          @on-input="searchIngredient($event)"
          @on-click="addIngredient($event)"
        />
        <div
          v-if="ingredients.length > 0"
          id="create-recipe"
        >
          <h3>Ingredienser:</h3>
          <table>
            <thead>
              <tr>
                <th>Mått</th>
                <th>Volym</th>
                <th>Råvara</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in ingredients"
                :key="item.id"
              >
                <td><MeasureSelect /></td>
                <td><input></td>
                <td>{{ capitalize(item.name) }}</td>
              </tr>
            </tbody>
          </table>
          <!-- <ul>
            <li
              v-for="item in ingredients"
              :key="item.id"
            >
              <input> <span>{{ capitalize(item.name) }}</span>
            </li>
          </ul> -->
        </div>
      </div>
      <div class="steps-wrapper">
        <p>steg...</p>
      </div>
    </div>
    <hr class="divider">
    <div>
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

<style scoped lang="scss">
.create-new-recipe {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5em;
}

input {
  margin-left: 0!important;
}

.ingredients-wrapper{}

.steps-wrapper{}

.divider{
  height: 0px;
  border: 0;
  border-bottom: 1px solid black;
  margin: 1.5em 0;
}
</style>
