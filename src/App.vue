<template>
  <v-app id="materialpro" :class="`${!$vuetify.breakpoint.smAndDown ? 'full-sidebar' : 'mini-sidebar'}`">
    <router-view/>
  </v-app>

</template>

<script>

import {authService} from "./service/authService";
export default {
  name: 'App',
  components: {},
  created() {
    console.log(authService().existToken(),'ass')
  }

};
</script>
<style>
@import "assets/css/font.css";
@import "assets/css/app.css";
</style>
