<template>
  <Page id="about">
    <h2>Om webbsidan</h2>
    <p>Det startade med att jag ville utöka min kunskap inom programmering.</p>
    <h2>Länkar</h2>
    <ul>
      <li>
        <a href="https://www.linkedin.com/in/andersboekman/">Mig på LinkedIn</a>
      </li>
      <li>
        <a href="https://github.com/oakis/vuecalorie">UI på GitHub</a>
      </li>
      <li>
        <a href="https://github.com/oakis/vuecalorie-express">Server på GitHub</a>
      </li>
    </ul>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Page from './shared/Page.vue';

export default defineComponent({
    name: "AboutView",
    components: { Page }
});
</script>

<style scoped lang="scss">
#about {
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
</style>
