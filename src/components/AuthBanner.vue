<template>
    <v-col cols="12" :md="md" class="gra-bg d-flex flex-column align-center justify-center">
      <v-img
          src="/big-satra.jpg"
          width="100%"
          height="100%"
          :max-width="$vuetify.breakpoint.mdAndUp ? '100%' : '300px'"
      ></v-img>
      <!--    <span class="white&#45;&#45;text font-weight-bold"-->
      <!--          :class="$vuetify.breakpoint.mdAndUp ? 'mt-10 display-1' : 'title'">-->
      <!--به سامانه خوش آمدید-->
      <!--        </span>-->
      <!--    <span class="mt-3 font-weight-bold hidden-sm-and-down text-center">-->
      <!--همین حالا حساب کاربری خودت را بساز و دوران جدید وبلاگ نویسی را شروع کن.-->
      <!--        </span>-->
    </v-col>
</template>

<script>
export default {
  name: "AuthBanner",
  props: {
    md: {
      type: String,
      default: '8'
    }
  }
}
</script>

<style scoped>
.gra-bg {
  background-image: linear-gradient(to bottom right, #054592, #1897d4);
}
</style>
