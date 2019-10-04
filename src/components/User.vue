<template>
  <div id="user">
    <h2>"Username placeholder"</h2>
    <Input
      placeholder="Hitta ingrediens"
      @on-input="searchIngredient($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import Input from "./shared/Input.vue";

@Component({
  components: {
    Input
  }
})
export default class User extends Vue {
  async searchIngredient(inputValue: String) {
    console.log(inputValue);
    const { data } = await axios
      .post("http://localhost:4000/ingredients/search", {
        search: inputValue
      })
      .catch(err => ({ data: err }));
    console.log(data);
  }
}
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
