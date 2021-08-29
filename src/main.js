import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Pagination from 'v-pagination-3'

const app = createApp(App)
  .use(store)
  .use(router)

app.component('pagination', Pagination)

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true
})

app.config.globalProperties.axios = instance

app.mount('#app')
