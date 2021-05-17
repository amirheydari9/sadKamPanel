<template>
  <v-dialog v-model="show" max-width="600px" persistent>

  </v-dialog>
</template>

<script>
import {multiSelectRequired, verifyMobilePhone, verifyUserName, required} from "../../../plugins/rule";
export default {
  name: "OrganizationDetailsDialog",
  props: {
    showDialog: {Boolean, isRequired: true},
    isCreate: {Boolean, isRequired: true}
  },
  data() {
    return {
      required,
      verifyMobilePhone,
      verifyUserName,
      multiSelectRequired,
    }
  },
  computed: {
    show() {
      return this.showDialog
    },
    organization() {
      return this.$store.getters['organization/getOrganization']
    },
    organizationType() {
      return this.$store.getters['organization/getOrganizationTypes']
    },
    formTitle() {
      return this.isCreate ? 'افزودن سازمان' : 'ویرایش سازمان'
    },
  },
  methods: {
    close() {
      // this.$refs.organizationForm.reset()
      this.$refs.organizationForm.resetValidation()
      this.$emit('closeDialog')
    },
    save() {
      if (this.$refs.organizationForm.validate()) {
        this.$emit('handleSave', this.organization)
        this.close()
      }
    }
  }
}
</script>

<style scoped>

</style>
