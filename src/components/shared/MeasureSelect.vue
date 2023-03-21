<template>
  <select @change="onClick">
    <option v-for="measure in measures" :key="measure.key" :value="measure.key">
      {{ measure.key }}
    </option>
  </select>
</template>

<!-- <script lang="ts" setup>
interface IMeasure {
  key: string;
  value: number;
}

interface IProps {
  measures: IMeasure[];
}

defineProps<IProps>();
</script> -->

<script lang="ts">
import { defineComponent } from "vue";
import { measures } from "@/../metrics";

export default defineComponent({
  name: "MeasureSelect",
  data() {
    return {
      measures,
    };
  },
  methods: {
    onClick(event: Event) {
      this.$emit("onUpdateMeasure", (event.target as HTMLSelectElement).value);
    },
  },
});
</script>

<style scoped lang="scss"></style>
