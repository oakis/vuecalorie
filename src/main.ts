import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import About from "./components/About.vue";
import Start from "./components/Start.vue";

Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  { path: "", component: Start },
  { path: "/recipe", component: About },
  { path: "/user", component: About },
  { path: "/about", component: About }
];

const router = new VueRouter({ routes });

const app = new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
