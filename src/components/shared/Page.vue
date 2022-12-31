<template>
  <div
    class="page-wrapper"
    :style="cssProps"
  >
    <div class="inner-wrapper">
      <slot>Fallback</slot>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: "PageWrapper",
  props: {
    backgroundColor: {
      type: String,
      default: '#f5f5f5'
    }
  },
  computed: {
    cssProps() {
      return {
        '--background-color': this.backgroundColor
      }
    }
  }
};
</script>

<style lang="scss">
  .page-wrapper {
    padding: 0 2rem;
    background-color: var(--background-color);
  }
  .inner-wrapper {
    margin: auto;
    max-width: 1024px;
    width: 100%;
  }
</style>
