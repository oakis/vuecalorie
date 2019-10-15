<template>
  <font-awesome-icon :icon="icon" :style="{ color: '#555' }" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IconType } from "../types";

@Component
export default class User extends Vue {
  @Prop() icon: IconType;
}
</script>
