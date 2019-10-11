import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import App from "./App.vue";
import About from "./components/About.vue";
import Start from "./components/Start.vue";
import User from "./components/User.vue";
import Recipe from "./components/Recipe.vue";

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
  { path: "/recipe", component: Recipe },
  { path: "/user", component: User },
  { path: "/about", component: About }
];

const router = new VueRouter({ routes });

const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
