import './assets/styles.css';
import 'https://code.jquery.com/jquery-3.7.1.min.js';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
