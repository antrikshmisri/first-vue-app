import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

window.addEventListener('error', (event) => {
    import ('./stores/errors.js').then(({useErrorsStore}) => {
        const errorsStore = useErrorsStore();
        const error = {
            id: Math.random(),
            label: event.message,
            type: event.type
        };

        errorsStore.addError(error);
    })
})
