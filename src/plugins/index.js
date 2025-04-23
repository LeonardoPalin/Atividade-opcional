import router from '@/router'
import { createPinia } from 'pinia'
import vuetify from './vuetify'

export function registerPlugins(app) {
  app
    .use(router)          // usa o router com setupLayouts()
    .use(createPinia())   // usa Pinia como store global
    .use(vuetify)         // integra Vuetify
}
