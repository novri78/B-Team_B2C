import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { BootstrapVueNext } from 'bootstrap-vue-next';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import './assets/css/style.css';
import './assets/scss/_style.scss';

createApp(App)
    .use(store)
    .use(router)
    .use(BootstrapVueNext)
    .mount('#app')
