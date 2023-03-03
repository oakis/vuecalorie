<template>
  <div class="tabs-wrapper">
    <div class="tabs">
      <router-link to="profile">
        <button class="tab">Profil</button>
      </router-link>
      <router-link to="recipes">
        <button class="tab">Recept</button>
      </router-link>
      <router-link to="admin">
        <button class="tab">Admin</button>
      </router-link>
    </div>
    <div :class="{ 'first-tab-active': currentRoute === 'profile', 'tabs-content': true }">
      <router-view :user="user" />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  user: User;
  currentRoute: RouteRecordName | null | undefined;
}

defineProps<IProps>();
</script>

<script lang="ts">
import { User } from "@firebase/auth";
import { defineComponent } from "vue";
import { RouteRecordName } from "vue-router";

export default defineComponent({
  name: "TabView",
});
</script>

<style lang="scss">
#app {
  .tabs {
    button {
      background-color: var(--secondary-background);
      color: var(--secondary-font-color);
      box-shadow: none;
      border-radius: 0.5em;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .router-link-active {
      button {
        background-color: var(--white);
      }
    }
  }

  .tabs-content {
    box-shadow: 8px 8px 5px var(--primary-shadow);
    background-color: var(--white);

    padding: 1em 2em 2em;
    border-radius: 0.5em;
  }
  .first-tab-active {
    border-top-left-radius: 0;
  }
}
</style>
