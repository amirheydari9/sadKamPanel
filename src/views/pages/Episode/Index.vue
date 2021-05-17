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
      <episode-table  v-if="productIsAvailable"/>
    </v-col>
  </div>
</template>

<script>
import {required, verifyMobilePhone, verifyUserName} from "../../../plugins/rule";
import {
  transformOrganization,
  transformDateToJalali,
  transformJalaliDateToGeorgian
} from "../../../plugins/transformData";
import {permission} from "../../../plugins/permission";
import axios from 'axios'
import {episodeService} from "../../../service/episodeService";
// import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import EpisodeTable from "./EpisodeTable";

export default {
  name: "Index",
  components: {
    EpisodeTable,
    // datePicker: VuePersianDatetimePicker
  },
  data: () => ({
    showDialog: false,
    isCreate: true,
    entryTypeIsMultiple: true,
    isLoading: false,
    isDialogLoading: false,
    productSearch: null,
    dialogProductSearch: null,
    filteredProducts: [],
    dialogFilteredProducts: [],
    productIsAvailable: false,
    // search: '',
    // headers: [
    //   {text: 'نام انگلسیی', value: 'enTitle',},
    //   {text: 'نام فارسی', value: 'faTitle'},
    //   {text: 'نام محصول', value: 'parent'},
    //   {text: 'شماره فصل', value: 'seasonNumber'},
    //   {text: 'شماره قسمت', value: 'episodeNumber'},
    //   {text: 'زمان', value: 'duration'},
    //   {text: 'امتیاز', value: 'rate'},
    //   {text: 'تاریخ انتشار', value: 'releaseDate'},
    //   {text: 'تایید توسط', value: 'submittedBy'},
    //   {text: 'عملیات', value: 'actions', sortable: false},
    // ],
    editedIndex: -1,
    // editedItem: {
    //   enTitle: '',
    //   faTitle: '',
    //   duration: '',
    //   releaseDate: '',
    //   submittedBy: '',
    //   parent: '',
    //   seasonNumber: '',
    //   episodeNumber: '',
    //   rate: '',
    //   description: ''
    // },
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
    this.$store.dispatch('organization/fetchOrganizations')
    this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
  },
  beforeDestroy() {
    this.$store.commit('episode/SET_EPISODES', [])
  },
  computed: {
    isSuperAdmin() {
      return permission().isSuperAdmin()
    },
    // episodes: {
    //   get() {
    //     return this.$store.getters['episode/getEpisodes']
    //   },
    //   set(value) {
    //     return this.$store.commit('episode/SET_EPISODES', value)
    //   }
    // },
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
      this.editedIndex = this.episodes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem = {...this.editedItem, releaseDate: transformDateToJalali(item.releaseDate)}
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
        this.editedItem = {
          ...this.editedItem,
          releaseDate: new Date(transformJalaliDateToGeorgian(this.editedItem.releaseDate)).getTime()
        }
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

<style>
.vpd-main {
  margin-top: 20px !important;
}
</style>
