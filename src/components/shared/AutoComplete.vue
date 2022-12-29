<template>
  <div class="wrapper">
    <div class="input-with-icon">
      <Icon icon="fa-solid fa-search" />
      <input
        :placeholder="this.placeholder"
        @input="this.onInput"
        :value="this.inputValue"
      />
      <div
        class="itemContainer"
        v-if="this.hasSearched === true && this.inputValue.length > 0"
      >
        <ul v-if="this.items.length > 0">
          <li
            v-for="item in this.items"
            v-bind:key="item.name"
            @click="this.onClick(item._id)"
          >
            <Icon class="list-icon" icon="fa-solid fa-image" size="3x" />
            <span>{{ item.name }}</span>
          </li>
        </ul>
        <ul v-else>
          <li><span>Hittade inget.</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Icon from "./Icon.vue";

export default {
  components: {
    Icon,
  },
  props: {
    items: Array,
    placeholder: String,
    inputValue: String,
    hasSearched: Boolean,
  },
  methods: {
    onClick(id: String) {
      this.$emit("hasSearched", false);
      this.$emit("inputValue", "");
      this.$emit("on-click", id);
    },
    onInput() {
      this.$emit("hasSearched", true);
      this.$emit("on-input", this.inputValue);
    },
  },
};
</script>

<style scoped lang="scss">
#app {
  .wrapper {
    display: flex;
    flex-direction: column;

    .input-with-icon {
      flex: 1;
      position: relative;

      input {
        margin: 0px !important;
        width: calc(100% - 2em - 10px);
      }

      svg {
        left: 11px;
        top: 11px;
      }
    }
  }

  .itemContainer {
    position: absolute;
    min-height: 20px;
    background-color: #fff;
    box-shadow: 1px 1px 0.2em #333;
    border-top: 0;
    z-index: 2;
    width: 100%;
    top: 46px;
    border-radius: 5px;

    ul {
      padding-inline-start: 0;
      list-style-type: none;
      margin: 0;

      li {
        cursor: pointer;
        padding: 10px;
        display: flex;
        align-items: center;

        &:hover {
          background-color: rgba(#3d5a8f, 0.1);
        }

        .list-icon {
          position: relative;
          left: 0;
          top: 0;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
