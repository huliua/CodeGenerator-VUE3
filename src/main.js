import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/dark/css-vars.css'

const pinia = createPinia();
const app = createApp(App)

app.use(pinia);
app.use(router)

app.mount('#app')
