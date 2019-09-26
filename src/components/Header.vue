<template>
  <header>
    <h1>Vue Calorie App</h1>
    <nav>
      <a href>Hitta recept</a>
      <a href>Min sida</a>
      <a href>Om VCA</a>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<style scoped lang="scss">
header {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  background-color: green;
  padding: 25px;
  h1 {
    font-size: 3em;
    margin: 0;
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    a {
      font-size: 1.5em;
      color: #111;
      margin: 0 10px;
      text-decoration: none;
    }
  }
}
</style>
