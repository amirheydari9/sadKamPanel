<template>
  <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      no-results-text="اطلاعاتی یافت نشد"
      class="elevation-1 w-100"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-text-field
            v-model="search"
            label="جست جو"
            single-line
            hide-details
            autofocus
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              افزودن کاربر جدید
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form ref="userForm">
                  <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                      <v-text-field
                          :rules="[
                            required('این فیلد الزامی است'),
                            verifyUserName()
                            ]"
                          v-model="editedItem.nickname"
                          label="نام کاربر"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                      <v-text-field
                          :rules="[
                            required('این فیلد الزامی است'),
                            verifyMobilePhone()
                            ]"
                          v-model="editedItem.phone"
                          label="شماره تماس"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                      <v-autocomplete
                          v-model="editedItem.organization"
                          :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                          label="نام سازمان"
                          :items="organizationList"
                          item-text="name"
                          item-value="_id"
                          dense
                      ></v-autocomplete>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                      <v-autocomplete
                          v-model="editedItem.organizationType"
                          :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                          label="نوع سازمان"
                          :items="organizationType"
                          item-text="fa"
                          item-value="type"
                          dense
                      ></v-autocomplete>
                    </v-col>
                    <v-col
                        cols="12"
                    >
                      <v-select
                          :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                          v-model="editedItem.organizationRoles"
                          :items="roles"
                          item-text="fa"
                          item-value="role"
                          chips
                          label="سطح دسترسی"
                          multiple
                          deletable-chips
                      ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                      <v-switch
                          v-model="editedItem.active"
                          label="فعال است"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                ذخیره
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                انصراف
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import {required, verifyMobilePhone, verifyUserName , multiSelectRequired} from "../../../plugins/rule";
// import {userService} from "../../../service/userService";

export default {
  name: "Index",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      {text: 'نام کاربری', value: 'nickname',},
      {text: 'شماره تماس', value: 'phone'},
      {text: 'سطح دسترسی', value: 'organizationRoles'},
      {text: 'نوع سازمان', value: 'organizationType'},
      {text: 'فعال بودن', value: 'active'},
      {text: 'عملیات', value: 'actions', sortable: false},
    ],
    editedIndex: -1,
    editedItem: {
      nickname: '',
      phone: '',
      organizationType: '',
      organizationRoles: [],
      organization: '',
      active: false,
    },
    defaultItem: {
      nickname: '',
      phone: '',
      organizationType: '',
      organizationRoles: [],
      organization: '',
      active: false,
    },
    breadcrumbs: [
      {
        text: 'داشبورد',
        disabled: false,
        to: {name: 'Panel'},
        exact: true
      },
      {
        text: 'مدیریت کاربران',
        disabled: true,
        exact: true
      },
    ],
    required,
    verifyMobilePhone,
    verifyUserName,
    multiSelectRequired
  }),
  mounted() {
    this.$store.dispatch('fetchUsers')
    this.$store.dispatch('fetchOrganizations')
    this.$store.dispatch('fetchOrganizationTypes')
    this.$store.dispatch('fetchRoles')
    this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
  },
  computed: {
    users() {
      return this.$store.getters['getUsers']
    },
    organizationList() {
      return this.$store.getters['getOrganizations']
    },
    organizationType() {
      return this.$store.getters['getOrganizationTypes']
    },
    roles() {
      return this.$store.getters['getAllRoles']
    },
    formTitle() {
      return this.editedIndex === -1 ? 'افزودن کاربر' : 'ویرایش کاربر'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  methods: {

    editItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.$refs.userForm.resetValidation()
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      // if (this.$refs.userForm.validate()) {
      if (this.editedIndex > -1) {
        console.log(this.editedItem, 'editedItem')
        // userService().updateUser(this.editedItem).then(() => {
        //   Object.assign(this.users[this.editedIndex], this.editedItem)
        //   this.close()
        // })
      } else {
        console.log(this.editedItem, 'editedItem')
        this.close()
        // userService().createUser(this.editedItem).then(() => {
        //   this.users.push(this.editedItem)
        //   this.close()
        // })
      }
    }
  },
  // },
}
</script>

<style scoped>

</style>
