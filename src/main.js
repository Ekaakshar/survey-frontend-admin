import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import mitt from 'mitt';
const emitter = mitt();

loadFonts()


const app = createApp(App);
app.use(vuetify);
app.use(router);
app.config.globalProperties.emitter = emitter;
app.mount('#app');
