import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './assets/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill, MdArrowforwardiosRound, MdAddcircle,MdRemoveRound } from "oh-vue-icons/icons";
addIcons(FaFlag, RiZhihuFill, MdArrowforwardiosRound, MdAddcircle,MdRemoveRound);

const pinia = createPinia()
const app = createApp(App)

app.component("v-icon", OhVueIcon);
app.use(router)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.mount('#app')
