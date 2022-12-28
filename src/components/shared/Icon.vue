<template>
  <font-awesome-icon
    :size="this.size"
    :icon="this.icon"
    :style="{ color: '#555' }"
  />
</template>

<script lang="ts">
export default {
  name: "CalorieIcon",
  props: {
    icon: {
      type: Array,
      default: () => [],
    },
    size: String,
  },
};
</script>
