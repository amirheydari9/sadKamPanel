import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@/scss/vuetify/overrides.scss'
// import Vuetify from 'vuetify/lib/framework';
import fa from 'vuetify/es5/locale/fa'

Vue.use(Vuetify);

const theme = {
    primary: '#1e88e5',
    info: '#1e88e5',
    success: '#21c1d6',
    accent: '#fc4b6c',
    default: '#563dea'
}

export default new Vuetify({
    rtl: true,
    lang: {
        locales: {fa},
        current: 'fa'
    },
    theme: {
        themes: {
            dark: theme,
            light: theme,
        },
    }
});
