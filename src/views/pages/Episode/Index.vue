<template>
  <div class="w-100 d-flex flex-column justify-start">
    <v-col cols="12" sm="4">
      <v-autocomplete
          :items="filteredProducts"
          :loading="isLoading"
          :search-input.sync="productSearch"
          @change="findEpisodes"
          item-text="enTitle"
          item-value="_id"
          label="جستجو در محصولات"
          return-object
          outlined
      ></v-autocomplete>
    </v-col>
    <v-data-table
        v-show="productIsAvailable"
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
                  v-show="entryTypeIsMultiple"
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
                          :sm="entryTypeIsMultiple ? 3 :6"
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
                          :sm="entryTypeIsMultiple ? 3 :6"
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
                          v-if="entryTypeIsMultiple"
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
                          v-if="entryTypeIsMultiple"
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
                        <v-autocomplete
                            :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                            :loading="isDialogLoading"
                            :items="dialogFilteredProducts"
                            :search-input.sync="dialogProductSearch"
                            item-text="enTitle"
                            :item-value="editedItem.parent"
                            label="نام محصول"
                            return-object
                            @change="handleDialogProductName"
                        ></v-autocomplete>
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
      <template v-slot:item.submittedBy="{ item }">
        {{ transformOrganization(item.submittedBy) }}
      </template>
      <template v-slot:item.releaseDate="{ item }">
        {{ transformDateToJalali(item.releaseDate) }}
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
  </div>
</template>

<script>
import {required, verifyMobilePhone, verifyUserName} from "../../../plugins/rule";
import {transformOrganization, transformDateToJalali} from "../../../plugins/transformData";
import {permission} from "../../../plugins/permission";
import axios from 'axios'
import {episodeService} from "../../../service/episodeService";

export default {
  name: "Index",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    entryTypeIsMultiple: true,
    isLoading: false,
    isDialogLoading: false,
    productSearch: null,
    dialogProductSearch: null,
    filteredProducts: [],
    dialogFilteredProducts: [],
    productIsAvailable: false,
    search: '',
    headers: [
      {text: 'نام انگلسیی', value: 'enTitle',},
      {text: 'نام فارسی', value: 'faTitle'},
      {text: 'نام محصول', value: 'parent'},
      {text: 'شماره فصل', value: 'seasonNumber'},
      {text: 'شماره قسمت', value: 'episodeNumber'},
      {text: 'زمان', value: 'duration'},
      {text: 'امتیاز', value: 'rate'},
      {text: 'تاریخ انتشار', value: 'releaseDate'},
      {text: 'تایید توسط', value: 'submittedBy'},
      {text: 'عملیات', value: 'actions', sortable: false},
    ],
    editedIndex: -1,
    editedItem: {
      enTitle: '',
      faTitle: '',
      duration: '',
      releaseDate: '',
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
      releaseDate: '',
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
    transformOrganization,
    transformDateToJalali
  }),
  mounted() {
    this.$store.dispatch('product/fetchAllProducts')
    this.$store.dispatch('fetchOrganizations')
    this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
  },
  beforeDestroy() {
    this.$store.commit('episode/SET_EPISODES', [])
  },
  computed: {
    isSuperAdmin() {
      return permission().isSuperAdmin()
    },
    episodes: {
      // return this.$store.getters['episode/getEpisodes']
      get() {
        return this.$store.getters['episode/getEpisodes']
      },
      set(value) {
        return this.$store.commit('episode/SET_EPISODES', value)
      }
    },
    products() {
      return this.$store.getters['product/getProducts']
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
    productSearch(value) {
      if (this.episodes.length) {
        this.productIsAvailable = false
        this.$store.commit('episode/SET_EPISODES', [])
      }
      if (value && value.length <= 0) return;
      if (this.isLoading) return;
      this.isLoading = true;
      axios.get(`http://sadkam.lincast.ir/api/products/search/${value}`)
          .then(({data}) => {
            if (data.data && data.data.length) {
              const filteredData = data.data.filter(item => item.entryType === 'multiple')
              this.filteredProducts = filteredData
            }
          })
          .finally(() => this.isLoading = false)
    },
    dialogProductSearch(value) {
      if (value && value.length <= 0) return;
      if (this.isDialogLoading) return;
      this.isDialogLoading = true;
      axios.get(`http://sadkam.lincast.ir/api/products/search/${value}`)
          .then(({data}) => {
            if (data.data && data.data.length) {
              const filteredData = data.data.filter(item => item.entryType === 'multiple')
              this.dialogFilteredProducts = filteredData
            }
          })
          .finally(() => this.isDialogLoading = false)
    }
  },

  methods: {
    findEpisodes(event) {
      console.log(event, 'event', event.entryType)
      if (event.entryType === 'single') {
        this.entryTypeIsMultiple = false
      } else {
        this.entryTypeIsMultiple = true
      }
      this.productIsAvailable = true
      this.$store.dispatch('episode/fetchAllEpisodes', event._id)
    },
    editItem(item) {
      console.log(this.episodes, 'edit')
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
          episodeService().updateEpisode(this.editedItem).then(() => {
            Object.assign(this.episodes[this.editedIndex], this.editedItem)
            this.close()
          })
        } else {
          episodeService().createEpisode(this.editedItem).then(() => {
            this.$store.dispatch('episode/fetchAllEpisodes', this.editedItem.parent)
            this.close()
          })
        }
      }
    },
    handleDialogProductName(event) {
      console.log(event, 'event');
      this.editedItem.parent = event._id
    }
  },
}
</script>

<style scoped>

</style>
