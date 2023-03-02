<template>
  <Page>Använd navigeringen ovan för att hitta eller skapa recept.</Page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Page from "./shared/Page.vue";

export default defineComponent({
  name: "StartView",
  components: { Page },
});
</script>

<style scoped lang="scss"></style>
