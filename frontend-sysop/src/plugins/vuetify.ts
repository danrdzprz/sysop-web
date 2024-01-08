import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VDataTable } from "vuetify/labs/VDataTable";
import { MAIN_THEME, mainDarkTheme, mainTheme } from "../utils/vuetify-theme";
import { defaults } from "../utils/vuetify-defaults";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
        VDataTable,
    },
    defaults: defaults,
    theme: {
        defaultTheme: MAIN_THEME,
        themes: {
            mainTheme,
            mainDarkTheme,
        },
        variations: {
            colors: ["primary", "secondary"],
            lighten: 4,
            darken: 4,
        },
    },
    // ... your configuration
  })
  app.vueApp.use(vuetify)
})