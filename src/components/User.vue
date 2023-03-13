<script lang="ts">
import { useFirebaseAuth } from "vuefire";
import { GoogleAuthProvider, signInWithPopup, User, onAuthStateChanged } from "firebase/auth";
import Page from "./shared/Page.vue";
import { defineComponent } from "vue";
import TabView from "./shared/TabView.vue";
import { RouteRecordName, useRoute } from "vue-router";

export default defineComponent({
  name: "UserComponent",
  components: {
    Page,
    TabView,
  },
  data: function () {
    return {
      user: null as User | null,
      currentRoute: "" as RouteRecordName | null | undefined,
    };
  },
  mounted: function () {
    const auth = useFirebaseAuth()!;
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },
  updated: function () {
    this.currentRoute = useRoute().name;
  },
  methods: {
    async registerUserWithGoogle() {
      const auth = useFirebaseAuth();
      const provider = new GoogleAuthProvider();
      if (!auth) return;

      try {
        const result = await signInWithPopup(auth, provider);
        this.user = result.user;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>

<template>
  <Page>
    <div v-if="user" id="user">
      <h2>{{ user.displayName }} ({{ user.email }})</h2>
      <TabView :current-route="currentRoute" :user="user" />
    </div>
    <div v-else id="logged-out">
      <div id="logged-out-box">
        <h2>Skapa ett konto eller logga in med..</h2>
        <button class="cta-button" @click="registerUserWithGoogle">Google</button>
      </div>
    </div>
  </Page>
</template>

<style scoped lang="scss">
#user {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;

  p {
    margin: 0;
  }

  ul {
    margin: 0;
    padding-left: 20px;
  }
}

#logged-out {
  display: flex;
  justify-content: center;

  #logged-out-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
