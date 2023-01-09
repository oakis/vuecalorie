<template>
  <div v-if="recipe && recipe.name">
    <h2>{{ capitalize(recipe.name) }}</h2>
    <div class="recipe-wrapper">
      <div class="recipe-ingredients">
        <h4>Ingredienser</h4>
        <ul>
          <li
            v-for="item in recipe.ingredients"
            :key="item.id"
          >
            {{ capitalize(item.name) }}
          </li>
        </ul>
      </div>
      <div class="recipe-instructions">
        <h4>Instruktioner</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {capitalize} from '../../helpers'

export default defineComponent({
  name: "RecipeView",
  props: {
    recipe: {
      type: Object,
      default: () => ({
        name: "",
        ingredients: [],
      }),
    },
  },
  setup() {
    return { capitalize }
  }
});
</script>

<style scoped lang="scss">
.recipe-wrapper {
  display: flex;

  .recipe-ingredients,
  .recipe-instructions {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 1px 1px 0.2em #333;
    padding: 0 10px 10px;

    h4 {
      margin: 10px 0;
    }
  }

  .recipe-ingredients {
    min-width: 200px;
    margin-right: 10px;

    ul {
      list-style: none;
      padding-inline-start: 20px;

      li {
        &::before {
          content: "\2022";
          color: #6e93d6;
          font-size: 1.1em;
          font-weight: bold;
          display: inline-block;
          width: 0.7em;
          margin-left: -1em;
        }
      }
    }
  }

  .recipe-instructions {
    flex: 1;
  }
}
</style>
