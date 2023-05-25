import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueToast from "vue-toast-notification";
import router from "./router";
import store from "./store";
import axios from "axios";
import "vue-toast-notification/dist/theme-bootstrap.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8080/";
Vue.config.productionTip = false;
Vue.use(VueToast);
new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
