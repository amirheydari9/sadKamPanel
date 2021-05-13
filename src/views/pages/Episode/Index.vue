<template>
  <v-data-table
      :headers="headers"
      :items="episodes"
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
            persistent
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              افزودن اپیزود جدید
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form ref="episodeForm">
                  <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                      <v-text-field
                          :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                          v-model="editedItem.enTitle"
                          label="نام انگلیسی"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                      <v-text-field
                          :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                          v-model="editedItem.faTitle"
                          label="نام فارسی"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="3"
                    >
                      <v-text-field
                          :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                          v-model="editedItem.duration"
                          label="زمان"
                          type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="3"
                    >
                      <v-text-field
                          :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                          v-model="editedItem.rate"
                          label="امتیاز"
                          type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="3"
                    >
                      <v-text-field
                          :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                          v-model="editedItem.seasonNumber"
                          label="شماره فصل"
                          type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="3"
                    >
                      <v-text-field
                          :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                          v-model="editedItem.episodeNumber"
                          label="شماره قسمت"
                          type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                      <v-text-field
                          :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                          v-model="editedItem.releaseDate"
                          label="زمان انتشار"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                      <v-text-field
                          :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                          v-model="editedItem.parent"
                          label="والد"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        v-if="isSuperAdmin"
                    >
                      <v-autocomplete
                          v-model="editedItem.submittedBy"
                          label="تایید توسط"
                          :items="organizationList"
                          item-text="name"
                          item-value="_id"
                          dense
                      ></v-autocomplete>
                    </v-col>
                    <v-col
                        cols="12"
                    >
                      <v-text-field
                          :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                          v-model="editedItem.description"
                          label="توضیحات"
                      ></v-text-field>
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
    <template v-slot:item.active="{ item }">
      <v-simple-checkbox
          v-model="item.active"
          disabled
      ></v-simple-checkbox>
    </template>
    <template v-slot:item.organizationType="{ item }">
      {{ transformOrganizationType(item) }}
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
import {required, verifyMobilePhone, verifyUserName} from "../../../plugins/rule";
import {organizationService} from "../../../service/organizationService";
import {transformOrganizationType} from "../../../plugins/transformData";
import {permission} from "../../../plugins/permission";

export default {
  name: "Index",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      {text: 'نام سازمان', value: 'name',},
      {text: 'شماره معرف', value: 'agent_phone'},
      {text: 'نوع سازمان', value: 'organizationType'},
      {text: 'آدرس', value: 'address'},
      {text: 'فعال بودن', value: 'active'},
      {text: 'عملیات', value: 'actions', sortable: false},
    ],
    editedIndex: -1,
    editedItem: {
      enTitle: '',
      faTitle: '',
      duration: '',
      releaseDate:'',
      submittedBy: '',
      parent: '',
      seasonNumber: '',
      episodeNumber: '',
      rate: '',
      description: ''
    },
    defaultItem: {
      enTitle: '',
      faTitle: '',
      duration: '',
      releaseDate:'',
      submittedBy: '',
      parent: '',
      seasonNumber: '',
      episodeNumber: '',
      rate: '',
      description: ''
    },
    breadcrumbs: [
      {
        text: 'داشبورد',
        disabled: false,
        to: {name: 'Panel'},
        exact: true
      },
      {
        text: 'مدیریت اپیزودها',
        disabled: true,
        exact: true
      },
    ],
    required,
    verifyMobilePhone,
    verifyUserName,
    transformOrganizationType
  }),
  mounted() {
    this.$store.dispatch('episode/fetchAllEpisodes')
    this.$store.dispatch('fetchOrganizations')
    this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
  },
  computed: {
    isSuperAdmin() {
      return permission().isSuperAdmin()
    },
    episodes() {
      return this.$store.getters['episode/getEpisodes']
    },
    organizationList() {
      return this.$store.getters['getOrganizations']
    },
    formTitle() {
      return this.editedIndex === -1 ? 'افزودن اپیزود' : 'ویرایش اپیزود'
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
      this.editedIndex = this.episodes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.$refs.episodeForm.resetValidation()
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
      if (this.$refs.episodeForm.validate()) {
        if (this.editedIndex > -1) {
          organizationService().updateOrganization(this.editedItem).then(() => {
            Object.assign(this.episodes[this.editedIndex], this.editedItem)
            this.close()
          })
        } else {
          organizationService().createOrganization(this.editedItem).then(() => {
            this.episodes.push(this.editedItem)
            this.close()
          })
        }
      }
    },
  },
}
</script>

<style scoped>

</style>
