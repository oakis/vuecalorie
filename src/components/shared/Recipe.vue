<template>
  <div v-if="recipe && recipe.name">
    <h2>{{ recipe.name }}</h2>
    <ul>
      <li v-for="item in recipe.ingredients" v-bind:key="item._id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IRecipe } from "../types";

@Component
export default class User extends Vue {
  @Prop() recipe: IRecipe;
}
</script>

<style scoped lang="scss"></style>
