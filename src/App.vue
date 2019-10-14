<template>
  <div id="app">
    <Header />
    <main>
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

@Component({
  components: {
    Header,
    Footer
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
* {
  font-family: "Roboto", sans-serif;
}
html,
body {
  font-size: 1.1em;
  margin: 0;
  padding: 0;
  color: #111;
  background-color: #f5f5f5;
}
#app {
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  > * {
    padding: 25px 20%;
  }
  input,
  button {
    font-size: 1em;
    margin: 4px;
    padding: 10px;
    border: 0;
    border-radius: 5px;
    box-shadow: 0px 0px 0.1em #111;
    outline: none;
  }
  button {
    font-weight: bold;
    padding: 15px;
    cursor: pointer;
  }
}
</style>
