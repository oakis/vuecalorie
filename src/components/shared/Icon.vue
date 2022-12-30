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
    icon: String,
    size: String,
  },
};
</script>
