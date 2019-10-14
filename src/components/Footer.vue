<template>
  <footer>
    <p>Made by Anders Ekman</p>
  </footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>

<style scoped lang="scss">
footer {
  position: absolute;
  bottom: 0;
  width: calc(100% - 40%); // 100% - the page padding
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  padding: 10px 25px;
  justify-content: flex-end;
  align-self: flex-end;
  p {
    margin: 0;
  }
}
</style>
