import Vue from 'vue'
import App from './App.vue'

import { CdrButton, CdrLink, CdrText } from '@rei/cedar';

// Cedar css
import '@rei/cedar/dist/cedar.css';
import '@rei/cedar/dist/cdr-fonts.css';

import './index.scss';

Vue.config.productionTip = false


Vue.component('cdr-button', CdrButton);
Vue.component('cdr-text', CdrText);
Vue.component('cdr-link', CdrLink);

new Vue({
  render: h => h(App),
}).$mount('#app')
