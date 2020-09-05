import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import jQuery from 'jquery/dist/jquery.min.js';
import Popper from 'popper.js/dist/umd/popper.min.js';
import Bootstrap from 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios';
import CloseDiv from "@/components/CloseDiv";
Vue.use(CloseDiv);

import VueCharts from 'vue-chartjs';
Vue.use(VueCharts);

Vue.prototype.$apiUrl = "https://carstore.azurewebsites.net/api/";
//Vue.prototype.$apiUrl = "https://localhost:44365/api/";
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
