<script lang="ts">
import AutoComplete from './shared/AutoComplete.vue';
import Recipe from './shared/Recipe.vue';
import { loadRecipe } from './helpers';
import { useFirebaseAuth } from 'vuefire';
import {
  GoogleAuthProvider,
  signInWithPopup,
  User,
  onAuthStateChanged
} from 'firebase/auth';
import Page from './shared/Page.vue';
import { fb } from '@/firebase';
import Icon from './shared/Icon.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserComponent',
  components: {
    AutoComplete,
    Recipe,
    Page,
    Icon
},
  data: function() {
    return {
      foundIngredients: [] as IIngredient[],
      ingredients: [] as IIngredient[],
      recipeNameInputValue: "",
      user: null as User | null,
      userRecipes: [] as IRecipe[],
      selectedRecipe: {} as IRecipe,
      ingredientInputValue: ""
    };
  },
  mounted: function() {
    const auth = useFirebaseAuth()!;
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    })
  },
  methods: {
    async loadRecipe(id: string) {
      this.selectedRecipe = await loadRecipe(id)
    },

    // async getUserRecipes() {
    //   const { data } = await axios
    //     .get(`http://localhost:4000/recipes/search/${this.user._id}`)
    //     .catch((err) => ({ data: err }));
    //   this.$emit('userRecipes', data);
    // },

    async registerUserWithGoogle() {
      const auth = useFirebaseAuth();
      const provider = new GoogleAuthProvider();
      if (!auth) return;

      try {
          const result = await signInWithPopup(auth, provider);
          this.user = result.user;
      } catch (error) {
        console.error(error);
      }
    },

    addIngredient(id: string) {
      const ingredientToAdd = this.foundIngredients.find(
        (ingredient) => {
          console.log(ingredient)
          return ingredient.id === id
        }
      );
      if (ingredientToAdd) {
        const newIngredients = [...this.ingredients, ingredientToAdd];
        this.ingredients = newIngredients;
      }
      this.foundIngredients = [];
    },

    async searchIngredient(inputValue: string) {
      try {
        const data = await fb.searchIngredient(inputValue);
        console.log('searchIngredient data', data)
        this.foundIngredients = data;
      } catch (error) {
        this.foundIngredients = [];
      }
    },

    async createIngredient() {
      fb.addIngredient({ id: 'undefined', name: this.ingredientInputValue.toLowerCase() }).then(() => {
        this.ingredientInputValue = "";
        alert('Ingrediens tillagd')
      })
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
  },
});
</script>

<template>
  <Page>
    <div
      v-if="user"
      id="user"
    >
      <h2>{{ user.displayName }} ({{ user.email }})</h2>
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
      <input
        v-model="ingredientInputValue"
        placeholder="Lägg till ingrediens"
      >
      <button @click="createIngredient">
        Spara ingrediens <Icon
          icon="fa-solid fa-plus"
          color="#fff"
        />
      </button>
    </div>
    <div
      v-else
      id="logged-out"
    >
      <div id="logged-out-box">
        <h2>Skapa ett konto eller logga in med..</h2>
        <button
          class="cta-button"
          @click="registerUserWithGoogle"
        >
          Google
        </button>
      </div>
    </div>
  </Page>
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
