import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { firebaseApp } from "./firebase";
import { VueFire, VueFireAuth } from "vuefire";

library.add(fas);

createApp(App)
  .use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  })
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
