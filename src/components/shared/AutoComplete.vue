<template>
  <div class="wrapper">
    <div class="input-with-icon">
      <Icon icon="fa-solid fa-search" />
      <input
        :placeholder="placeholder"
        :value="inputValue"
        @input="onInput"
      >
      <div
        v-if="hasSearched === true && inputValue.length > 0"
        class="itemContainer"
      >
        <ul v-if="items && items.length > 0">
          <li
            v-for="item in items"
            :key="item.name"
            @click="onClick(item.id)"
          >
            <Icon
              class="list-icon"
              icon="fa-solid fa-image"
              size="3x"
            />
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

<script lang="ts" setup>
  interface IProps {
    items: IListItem[];
    placeholder?: string;
  }

  interface IListItem {
    id: string;
    name?: string;
    [key: string | number | symbol]: unknown;
  }

  defineProps<IProps>();
</script>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "./Icon.vue";



export default defineComponent({
  components: {
    Icon,
  },
  data: function() {
    return {
      hasSearched: false,
      inputValue: ''
    }
  },
  methods: {
    onClick(id: string) {
      this.hasSearched = false;
      this.inputValue = '';
      this.$emit("on-click", id);
    },
    onInput(event: Event) {
      this.inputValue = (event.target as HTMLInputElement).value;
      this.hasSearched = true;
      this.$emit("on-input", this.inputValue);
    },
  },
});
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
