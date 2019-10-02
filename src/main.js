import Vue from 'vue'
import App from './App.vue'

import {
  CdrButton,
  CdrLink,
  CdrCheckbox,
  CdrRadio,
  CdrSelect,
  CdrCta,
  CdrInput,
  CdrList,
} from '@rei/cedar';

import './index.scss';

Vue.config.productionTip = false


Vue.component('cdr-button', CdrButton);
Vue.component('cdr-link', CdrLink);
Vue.component('cdr-cta', CdrCta);
Vue.component('cdr-checkbox', CdrCheckbox);
Vue.component('cdr-radio', CdrRadio);
Vue.component('cdr-select', CdrSelect);
Vue.component('cdr-input', CdrInput);
Vue.component('cdr-list', CdrList);

new Vue({
  render: h => h(App),
}).$mount('#app')
