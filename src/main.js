import { createApp } from 'vue'
import './assets/main.css'
import './assets/colors.css'
import './style.css'

import axios from 'axios';
import router from "./router"
import App from './App.vue'

createApp(App).use(router).mount('#app')

axios.defaults.baseURL = '/api'