import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { defineRule, configure } from "vee-validate";

// Add configuration for update validation triggered on input event
configure({
  validateOnInput: true
});

createApp(App).use(store).use(router).mount('#app')
