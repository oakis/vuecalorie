<script lang="ts">
import { defineComponent } from "vue";
import AutoComplete from "@/components/shared/AutoComplete.vue";
import Recipe from "@/components/shared/Recipe.vue";
import { User } from "firebase/auth";
import { capitalize } from "@/helpers/strings";
import MeasureSelect from "@/components/shared/MeasureSelect.vue";
import { doFetch } from "@/helpers/fetch";
import Icon from "../shared/Icon.vue";

const emptyInstruction = { title: "", text: "" };

export default defineComponent({
  name: "ProfileRecipes",
  components: { AutoComplete, Recipe, MeasureSelect, Icon },
  props: {
    user: {
      required: true,
      type: Object as () => User,
    },
  },
  setup() {
    return { capitalize };
  },
  data() {
    return {
      foundIngredients: [] as IIngredient[],
      ingredients: [] as IRecipeIngredient[],
      recipeNameInputValue: "",
      userRecipes: [] as IRecipe[],
      selectedRecipe: {} as IRecipe,
      ingredientInputValue: "",
      instructions: [{ ...emptyInstruction }] as IInstruction[],
    };
  },
  async mounted() {
    this.getUserRecipes();
  },
  methods: {
    async searchIngredient(inputValue: string) {
      if (!inputValue) return;
      try {
        doFetch(`Ingredients/search/${inputValue}`, {
          method: "POST",
        })
          .then((data) => {
            this.foundIngredients = data;
          })
          .catch((err) => {
            this.foundIngredients = [];
            throw err;
          });
      } catch (error) {
        console.error(error);
      }
    },
    addIngredient(id: string) {
      const foundIngredient = this.foundIngredients.find((ingredient) => {
        return ingredient.id === id;
      });
      if (foundIngredient) {
        const newIngredients = [
          ...this.ingredients,
          { ...foundIngredient, measure: "", volume: 0 },
        ];
        this.ingredients = newIngredients;
      }
      this.foundIngredients = [];
    },
    updateIngredientMeasure() {},
    updateIngredientVolume() {},
    async saveRecipe() {
      try {
        doFetch("Recipes", {
          method: "POST",
          body: JSON.stringify({
            name: this.recipeNameInputValue,
            ingredients: this.ingredients.map(({ name, id, measure, volume }) => ({
              name,
              id,
              measure,
              volume,
            })),
            instructions: this.instructions,
            createdBy: this.user?.uid ? this.user.uid : "unknown",
          }),
        })
          .then(() => {
            this.ingredients = [];
            this.recipeNameInputValue = "";
            this.instructions = [{ ...emptyInstruction }];
            alert("Recept tillagt");
          })
          .catch((err) => {
            throw err;
          });
      } catch (error) {
        console.error(error);
      }
    },
    async loadRecipe(id: string) {
      console.log("loadRecipe", id);
    },
    getUserRecipes() {
      try {
        doFetch(`Recipes/user/${this.user.uid}`)
          .then((data) => {
            this.userRecipes = data;
          })
          .catch((err) => {
            this.userRecipes = [];
            throw err;
          });
      } catch (error) {
        console.error(error);
      }
    },
    addInstruction() {
      this.instructions.push({ ...emptyInstruction });
    },
  },
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
        <hr v-if="ingredients.length > 0" class="divider" />
        <div v-if="ingredients.length > 0" id="create-recipe">
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
              <tr v-for="item in ingredients" :key="item.id">
                <td><MeasureSelect /></td>
                <td><input /></td>
                <td>{{ capitalize(item.name) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="steps-wrapper">
        <hr class="divider" />
        <h3>Steg:</h3>
        <ol>
          <li v-for="(instruction, index) in instructions" :key="`extras-${index}`">
            <div class="instruction">
              <input v-model="instruction.title" type="text" />
              <textarea v-model="instruction.text" rows="3" />
            </div>
          </li>
        </ol>
        <div class="spacer" />
        <button @click="addInstruction">
          Lägg till steg <Icon icon="fa-solid fa-plus" color="#fff" />
        </button>
      </div>
    </div>
    <hr class="divider" />
    <div>
      <input v-model="recipeNameInputValue" placeholder="Ge ditt recept ett namn" />
      <button @click="saveRecipe">Spara recept</button>
    </div>
    <div v-if="userRecipes.length" id="user-recipes">
      <h3>Dina recept:</h3>
      <ul>
        <li v-for="item in userRecipes" :key="item.id" @click="loadRecipe(item.id)">
          {{ item.name }}
        </li>
      </ul>
      <Recipe v-if="selectedRecipe !== null" :recipe="selectedRecipe" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.create-new-recipe {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5em;
}

.steps-wrapper {
  ol {
    margin: 0;
    li {
      .instruction {
        display: inline-flex;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        textarea {
          width: 100%;
        }
      }
      margin-bottom: 1em;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}

input {
  margin-left: 0 !important;
}

.divider {
  height: 0px;
  border: 0;
  border-bottom: 1px solid black;
  margin: 1.5em 0;
}
</style>
