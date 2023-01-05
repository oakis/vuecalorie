<script lang="ts">
import { useFirebaseAuth } from 'vuefire';
import {
  GoogleAuthProvider,
  signInWithPopup,
  User,
  onAuthStateChanged
} from 'firebase/auth';
import Page from './shared/Page.vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'UserComponent',
  components: {
    Page
  },
  data: function() {
    const route = useRoute();
    return {
      user: null as User | null,
      tabColor: '#6e93d6',
      currentTab: route.name
    };
  },
  mounted: function() {
    const auth = useFirebaseAuth()!;
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    })
  },
  updated() {
    const route = useRoute();
    this.currentTab = route.name;
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
  }
});
</script>

<template>
  <Page>
    <div
      v-if="user"
      id="user"
    >
      <h2>{{ user.displayName }} ({{ user.email }})</h2>
      <div class="tabs">
        <router-link to="profile">
          <button :class="{ active: currentTab === 'profile', tab: true }">
            Profil
          </button>
        </router-link>
        <router-link to="recipes">
          <button :class="{ active: currentTab === 'recipes', tab: true }">
            Recept
          </button>
        </router-link>
        <router-link to="admin">
          <button :class="{ active: currentTab === 'admin', tab: true }">
            Admin
          </button>
        </router-link>
      </div>
      <router-view :user="user" />
    </div>
    <div
      v-else
      id="logged-out"
    >
      <div id="logged-out-box">
        <h2>Skapa ett konto eller logga in med..</h2>
        <button
          class="cta-button"
          @click="registerUserWithGoogle"
        >
          Google
        </button>
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

  .tabs {
    margin-bottom: 1.5em;
    .tab {
      background-color: var(--secondary-background);
      color: var(--secondary-font-color);
    }
    .active {
      background-color: #6e93d6;
      color: var(--white);
    }
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
