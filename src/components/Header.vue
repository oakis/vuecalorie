<template>
  <Page background-color="#fff">
    <header>
      <a href="#/">
        <h1>
          Calorify
          <Icon
            icon="fa-solid fa-utensils"
          />
        </h1>
      </a>
      <nav>
        <a href="#/recipe">Hitta recept</a>
        <a href="#/about">Om</a>
        <a href="#/user">
          <Icon
            icon="fa-solid fa-user"
          /></a>
      </nav>
    </header>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "./shared/Icon.vue";
import Page from "./shared/Page.vue";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    Icon,
    Page
},
});
</script>

<style scoped lang="scss">
header {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  align-items: center;
  background-color: #fff;
  height: 90px;

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
