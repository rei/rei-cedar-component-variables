import Vue from 'vue'
import App from './App.vue'

import {
  CdrButton,
  CdrLink,
  CdrCheckbox,
  CdrRadio,
  CdrSelect,
  CdrInput,
  CdrList,
  CdrCard,
  CdrBreadcrumb,
  // CdrTable,
  CdrAlert,
  CdrFormGroup,
} from '@rei/cedar';

import './index.scss';

Vue.config.productionTip = false


Vue.component('cdr-button', CdrButton);
Vue.component('cdr-link', CdrLink);
Vue.component('cdr-checkbox', CdrCheckbox);
Vue.component('cdr-radio', CdrRadio);
Vue.component('cdr-select', CdrSelect);
Vue.component('cdr-input', CdrInput);
Vue.component('cdr-list', CdrList);
Vue.component('cdr-card', CdrCard);
Vue.component('cdr-breadcrumb', CdrBreadcrumb);
// Vue.component('cdr-table', CdrTable);
Vue.component('cdr-alert', CdrAlert);
Vue.component('cdr-form-group', CdrFormGroup);

new Vue({
  render: h => h(App),
}).$mount('#app')
