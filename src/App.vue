<script lang="ts">
import HeaderComponent from "./components/Header.vue";
import FooterComponent from "./components/Footer.vue";
import About from "./components/About.vue";
import Start from "./components/Start.vue";
import User from "./components/User.vue";
import FindRecipe from "./components/FindRecipe.vue";

const routes = {
  "/": Start,
  "/recipe": FindRecipe,
  "/user": User,
  "/about": About,
};

export default {
  components: {
    HeaderComponent,
    FooterComponent,
},
  data() {
    return {
      currentPath: window.location.hash,
    };
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || "/"];
    },
  },
  mounted() {
    window.addEventListener("hashchange", () => {
      this.currentPath = window.location.hash;
    });
  },
};
</script>

<template>
  <div>
    <HeaderComponent />
    <main>
      <component :is="currentView" />
    </main>
    <FooterComponent />
  </div>
</template>

<style lang="scss">
h1,
h2,
h3,
h4,
h5,
h6,
p,
a,
span,
li {
  font-family: "Roboto", sans-serif;
  color: #333;
}

html,
body {
  font-size: 1.1em;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  input,
  button {
    font-size: 1em;
    margin: 4px;
    padding: 10px;
    border: 0;
    border-radius: 5px;
    box-shadow: 1px 1px 0.2em #333;
    outline: none;
  }

  button {
    color: #fff;
    background-color: #6e93d6;
    box-shadow: 2px 2px 0.1em #3d5a8f;
    padding: 10px 20px;
    cursor: pointer;
  }

  // Classes
  .cta-button {
    background-color: #94cc66;
    box-shadow: 2px 2px 0.1em #558033;
  }

  .input-with-icon {
    position: relative;

    svg {
      position: absolute;
      left: 15px;
      top: 15px;
    }

    input {
      padding-inline-start: 2em;
    }
  }
}
</style>
