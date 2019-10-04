<template>
  <input
    :placeholder="this.placeholder"
    @input="onInput"
    v-model="inputValue"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Input extends Vue {
  @Prop()
  placeholder!: String;
  inputValue: String = "";

  onInput() {
    this.$emit("on-input", this.inputValue);
  }
}
</script>

<style scoped lang="scss"></style>
