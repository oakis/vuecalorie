<template>
  <header>
    <a href="#/">
      <h1>
        Calorify
        <Icon icon="fa-solid fa-utensils" size="1x" />
      </h1>
    </a>
    <nav>
      <a href="#/user">Min sida</a>
      <a href="#/recipe">Hitta recept</a>
      <a href="#/about">Om</a>
    </nav>
  </header>
</template>

<script lang="ts">
import Icon from "./shared/Icon.vue";

export default {
  name: "HeaderComponent",
  components: {
    Icon,
  },
};
</script>

<style scoped lang="scss">
header {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  background-color: #fff;
  padding: 25px;

  a {
    text-decoration: none;
  }

  h1 {
    color: #6e93d6;
    font-size: 3em;
    margin: 0;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    a {
      font-size: 1.5em;
      margin: 0 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
