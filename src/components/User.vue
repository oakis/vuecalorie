<template>
  <div id="user">
    <h2>"Username placeholder"</h2>
    <Input placeholder="Hitta ingrediens" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Input from "./shared/Input.vue";

@Component({
  components: {
    Input
  }
})
export default class User extends Vue {}
</script>

<style scoped lang="scss">
#user {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  background-color: purple;
  p {
    margin: 0;
  }
  ul {
    margin: 0;
    padding-left: 20px;
  }
}
</style>
