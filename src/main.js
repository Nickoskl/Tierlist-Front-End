import './assets/styles.css';
import 'https://code.jquery.com/jquery-3.7.1.min.js';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
pinia.use(({store}) =>{
    store.router = router;
})
app.use(pinia)

app.mount('#app')