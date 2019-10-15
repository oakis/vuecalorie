<template>
  <div class="wrapper">
    <div class="input-with-icon" :ref="'input'">
      <Icon :icon="['fas', 'search']" />
      <input
        :placeholder="this.placeholder"
        @input="onInput"
        v-model="inputValue"
      />
    </div>
    <div
      class="itemContainer"
      v-if="hasSearched === true && inputValue.length > 0"
      :style="{
        width: this.$refs.input && this.$refs.input.offsetWidth + 'px',
        top:
          this.$refs.input &&
          this.$refs.input.clientHeight + this.$refs.input.offsetTop + 4 + 'px'
      }"
    >
      <ul v-if="items.length > 0">
        <li
          v-for="item in items"
          v-bind:key="item.name"
          @click="onClick(item._id)"
        >
          {{ item.name }}
        </li>
      </ul>
      <p v-else>Hittade inget.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Icon from "./Icon.vue";

@Component({
  components: {
    Icon
  }
})
export default class AutoComplete extends Vue {
  @Prop() items!: Array<Object>;
  @Prop() placeholder!: String;
  inputValue: String = "";
  hasSearched: Boolean = false;

  onClick(id: String) {
    this.hasSearched = false;
    this.inputValue = "";
    this.$emit("on-click", id);
  }

  onInput() {
    this.hasSearched = true;
    this.$emit("on-input", this.inputValue);
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  .input-with-icon {
    flex: 1;
    position: relative;
    input {
      margin: 0px !important;
      width: calc(100% - 2em - 20px);
    }
  }
}
.itemContainer {
  position: absolute;
  min-height: 15px;
  background-color: yellow;
}
</style>
