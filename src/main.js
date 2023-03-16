import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {RecycleScroller} from 'vue-virtual-scroller'
import App from './App.vue'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.component('RecycleScroller', RecycleScroller);

app.mount('#app')
