<template>
  <v-app id="materialpro" :class="`${!$vuetify.breakpoint.smAndDown ? 'full-sidebar' : 'mini-sidebar'}`">
    <vue-confirm-dialog></vue-confirm-dialog>
    <router-view/>
  </v-app>

</template>

<script>

// import {authService} from "./service/authService";

export default {
  name: 'App',
  components: {},
  // created() {
  //   if (authService().existToken()) {
  //     this.$store.dispatch('handleCurrentUser', authService().decodeToken(authService().getToken()))
  //   }
  // }

};
</script>
<style>
@import "assets/css/font.css";
@import "assets/css/app.css";
</style>
