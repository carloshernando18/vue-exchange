import '@/assets/css/tailwind.css';
import { dollarFilter, percentFilter } from '@/filter';
import router from '@/router';
import { VueSpinners } from '@saeris/vue-spinners';
import Chart from 'chart.js';
import Vue from 'vue';
import Chartick from 'vue-chartkick';
import App from './App.vue';

Vue.filter('dollar', dollarFilter);
Vue.filter('percent', percentFilter);
Vue.config.productionTip = false;
Vue.use(Chartick.use(Chart));
Vue.use(VueSpinners);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
