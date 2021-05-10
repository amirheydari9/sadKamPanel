<template>
  <div>
    <input type="text" v-model="phone" />
    <button @click="login">login</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      phone: '09129329989'
    }
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', this.phone)
    }
  }
}
</script>

<style scoped>

</style>
