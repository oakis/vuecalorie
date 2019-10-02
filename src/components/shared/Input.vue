<template>
  <input :placeholder="this.placeholder" @input="onInput" v-model="inputValue" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class Input extends Vue {
  @Prop(String) placeholder: string = "";
  inputValue: String = "";

  async onInput() {
    const ingredients = await axios.post(
      "http://localhost:4000/ingredients/search",
      {
        search: this.inputValue
      }
    );
    console.log(ingredients.data);
  }
}
</script>

<style scoped lang="scss">
</style>
