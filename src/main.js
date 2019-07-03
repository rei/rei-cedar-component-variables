import Vue from 'vue'
import App from './App.vue'

// Cedar css
import '@rei/cedar/dist/reset.css';
import '@rei/cedar/dist/cdr-fonts.css';

import './index.scss';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
