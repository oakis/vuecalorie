<template>
  <header>
    <router-link to="/">
      <h1>Vue Calorie App</h1>
    </router-link>
    <nav>
      <router-link to="/user">Min sida</router-link>
      <router-link to="/recipe">Hitta recept</router-link>
      <router-link to="/about">Om VCA</router-link>
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
  background-color: #fff;
  padding: 25px;
  a {
    text-decoration: none;
  }
  h1 {
    font-size: 3em;
    margin: 0;
    color: #111;
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    a {
      font-size: 1.5em;
      color: #111;
      margin: 0 10px;
    }
  }
}
</style>
