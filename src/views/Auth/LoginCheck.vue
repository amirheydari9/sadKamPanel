<template>
  <div>
    <div>
      <input type="text" v-model="code"/>
      <button @click="loginCheck">code</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginCheck",
  data() {
    return {
      code: '1234'
    }
  },
  methods: {
    loginCheck() {
      this.$store.dispatch('auth/loginCheck', this.code)
    }
  }
}
</script>

<style scoped>

</style>
