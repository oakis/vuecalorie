<template>
  <div class="page-wrapper">
    <slot>Fallback</slot>
  </div>
</template>

<script lang="ts">

export default {
  name: "PageWrapper",
};
</script>

<style scoped lang="scss">
  .page-wrapper {
    margin: auto;
    padding: 0 2rem;
    max-width: 1024px;
  }
</style>
