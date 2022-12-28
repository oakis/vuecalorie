import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import App from "./App.vue";
import About from "./components/About.vue";
import Start from "./components/Start.vue";
import User from "./components/User.vue";
import FindRecipe from "./components/FindRecipe.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    ingredientSearchInput: ""
  }
});

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  { path: "", component: Start },
  { path: "/recipe", component: FindRecipe },
  { path: "/user", component: User },
  { path: "/about", component: About }
];

const router = new VueRouter({ routes });

const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
