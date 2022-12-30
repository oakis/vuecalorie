<template>
  <font-awesome-icon
    :size="size"
    :icon="icon"
    :style="{ color: '#555' }"
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
  },
};
</script>
