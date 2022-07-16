import Vue from "vue"
import Vuetify from "vuetify/lib"
import colors from "vuetify/lib/util/colors" //定義済みマテリアルカラー

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        //https://vuetifyjs.com/ja/features/theme/#section-30ab30b930bf30de30a430ba
        primary: colors.purple.darken1,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
      },
      dark: {
        // primary: colors.blue.lighten3,
      },
    },
  },
})
