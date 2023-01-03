<template>
  <font-awesome-icon
    :size="size"
    :icon="icon"
    :style="cssProps"
    class="icon"
  />
</template>

<script lang="ts">
export default {
  name: "CalorieIcon",
  props: {
    icon: {
      required: true,
      type: String
    },
    size: {
      required: false,
      type: String,
      default: "1x"
    },
    color: {
      required: false,
      type: String,
      default: '#555'
    }
  },
  computed: {
    cssProps() {
      return {
        '--icon-color': this.color
      }
    }
  }
};
</script>

<style scoped lang="scss">
  .icon {
    color: var(--icon-color);
  }
</style>
