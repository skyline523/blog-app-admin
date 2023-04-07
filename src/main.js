import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store';
import DefaultLayout from './layout/default.vue';
import LoginLayout from './layout/login.vue';
import './style.css';

const VueApp = createApp(App);

VueApp.component('default-layout', DefaultLayout);
VueApp.component('login-layout', LoginLayout);

VueApp.use(router);
VueApp.use(store);
VueApp.use(vuetify);
VueApp.mount('#app');
