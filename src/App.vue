<script lang="ts">
import HeaderComponent from "./components/Header.vue";
import FooterComponent from "./components/Footer.vue";
import { defineComponent } from "vue";


export default defineComponent({
  components: {
    HeaderComponent,
    FooterComponent,
  },
});
</script>

<template>
  <div>
    <HeaderComponent />
    <main>
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>

<style lang="scss">
:root {
  --primary-color: #6e93d6;
  --primary-shadow: #3d5a8f;
  --primary-background: #f5f5f5;
  --primary-font-color: #333;

  --secondary-color: #f5f5f5;
  --secondary-shadow: #f5f5f5;
  --secondary-background: #f5f5f5;
  --secondary-font-color: #333;

  --white: #fff;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
a,
span,
label,
li {
  font-family: "Roboto", sans-serif;
  color: var(--primary-font-color);
}

html,
body {
  font-size: 1.1em;
  margin: 0;
  padding: 0;
  background-color: var(--primary-background);
}

#app {
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  input,
  button,
  select {
    font-size: 1em;
    margin: 0 0.5em 0 0;
    padding: 10px;
    border: 0;
    border-radius: 5px;
    box-shadow: 1px 1px 0.2em var(--primary-shadow);
    outline: none;
  }

  button {
    color: var(--white);
    background-color: var(--primary-color);
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
