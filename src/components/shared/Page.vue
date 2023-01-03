<template>
  <div
    class="page-wrapper"
  >
    <div class="inner-wrapper">
      <slot>Fallback</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  name: "PageWrapper",
  props: {
    backgroundColor: {
      type: String,
      default: '#f5f5f5'
    }
  },
});
</script>

<style lang="scss">
  .page-wrapper {
    padding: 0 2rem;
    background-color: v-bind(backgroundColor);
  }
  .inner-wrapper {
    margin: auto;
    max-width: 1024px;
    width: 100%;
  }
</style>
