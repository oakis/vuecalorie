<template>
  <font-awesome-icon
    :size="size"
    :icon="icon"
    class="icon"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
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
});
</script>

<style scoped lang="scss">
  .icon {
    color: v-bind(color);
  }
</style>
