// Import necessary libraries and components
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Import BootstrapVueNext and its styles
import { createBootstrap } from 'bootstrap-vue-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import './assets/css/style.css';
import './assets/scss/main.scss';

// Create the Vue app, attach router, store, and BootstrapVueNext, then mount it to the DOM
createApp(App)
.use(router)
.use(store)
.use(createBootstrap({ components: true, directives: true }))
.mount('#app')
