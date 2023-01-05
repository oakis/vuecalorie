import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { firebaseApp } from "./firebase";
import { VueFire, VueFireAuth } from "vuefire";
import { createRouter, createWebHashHistory } from "vue-router";
import About from "./components/About.vue";
import Start from "./components/Start.vue";
import User from "./components/User.vue";
import FindRecipe from "./components/FindRecipe.vue";
import ProfileInfo from "./components/User/ProfileInfo.vue";
import ProfileRecipes from "./components/User/ProfileRecipes.vue";
import ProfileAdmin from "./components/User/ProfileAdmin.vue";

const routes = [
  { path: "/", component: Start },
  { path: "/recipe", component: FindRecipe },
  {
    path: "/user",
    component: User,
    children: [
      {
        name: "profile",
        path: "profile",
        component: ProfileInfo,
      },
      {
        name: "recipes",
        path: "recipes",
        component: ProfileRecipes,
      },
      {
        name: "admin",
        path: "admin",
        component: ProfileAdmin,
      },
    ],
  },
  { path: "/about", component: About },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

library.add(fas);

createApp(App)
  .use(router)
  .use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  })
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
