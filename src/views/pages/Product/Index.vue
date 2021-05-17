<template>
  <div class="w-100">
    <v-data-table
        :headers="headers"
        :items="products"
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
          <v-btn
              color="primary"
              dark
              @click="createItem"
          >
            افزودن محصول جدید
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.entryType="{ item }">
        {{ transformEntryType(item.entryType) }}
      </template>
      <template v-slot:item.titleType="{ item }">
        {{ transformTitleType(item.titleType) }}
      </template>
      <template v-slot:item.lastUpdate="{ item }">
        {{ transformDateToJalali(item.lastUpdate) }}
      </template>
      <template v-slot:item.active="{ item }">
        <v-simple-checkbox
            v-model="item.active"
            disabled
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            class="mr-2"
            @click="getEpisodesList(item)"
        >
          mdi-tooltip-plus
        </v-icon>

        <!--            لیست اپیزود ها-->
        <v-dialog
            v-model="episodesListDialog"
            persistent
        >
          <v-card>
            <v-card-text>
              <v-card>
                <v-card-text>
                  <v-data-table
                      :headers="episodeHeaders"
                      :items="episodes"
                      :search="episodeSearch"
                      no-results-text="اطلاعاتی یافت نشد"
                      class="w-100"
                  >
                    <template v-slot:top>
                      <v-toolbar
                          flat
                      >
                        <v-text-field
                            v-model="episodeSearch"
                            label="جست جو"
                            single-line
                            hide-details
                            autofocus
                        ></v-text-field>
                        <v-spacer></v-spacer>
                        <template>
                          <v-btn
                              color="primary"
                              dark
                              class="mb-2"
                              @click="handleOpenEpisodeDialog"
                          >
                            افزودن اپیزود جدید
                          </v-btn>
                        </template>
                      </v-toolbar>
                    </template>
                    <template v-slot:item.releaseDate="{ item }">
                      {{ transformDateToJalali(item.releaseDate) }}
                    </template>
                    <template v-slot:item.actions="{item}">
                      <v-icon
                          small
                          class="mr-2"
                          @click="editIEpisode(item)"
                      >
                        mdi-pencil
                      </v-icon>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  small
                  @click="closeEpisodeListDialog"
              >
                انصراف
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--            لیست اپیزود ها-->
      </template>
    </v-data-table>
    <product-details-dialog
        v-if="showDialog"
        :showDialog="showDialog"
        :isCreate="isCreate"
        @closeDialog="closeDialog"
        @handleSave="handleSave"
    />
    <!--    ایجاد اپیزود-->
    <v-dialog
        v-model="episodeDialog"
        max-width="800px"
        persistent
    >
      <v-card>
        <v-card-title>
          <span class="headline">ایجاد اپیزود</span>
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
                      v-model="episodeEditedItem.enTitle"
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
                      v-model="episodeEditedItem.faTitle"
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
                      v-model="episodeEditedItem.duration"
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
                      v-model="episodeEditedItem.rate"
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
                      v-model="episodeEditedItem.seasonNumber"
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
                      v-model="episodeEditedItem.episodeNumber"
                      label="شماره قسمت"
                      type="number"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                  <v-text-field
                      id="my-custom-input"
                      persistent-hint
                      readonly
                      v-model="episodeEditedItem.releaseDate"
                      label="زمان انتشار"
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                  ></v-text-field>
                  <v-date-picker
                      auto-submit
                      v-model="episodeEditedItem.releaseDate"
                      element="my-custom-input"
                  >
                  </v-date-picker>
                  <!--                  <date-picker-->
                  <!--                      :autoSubmit="true"-->
                  <!--                      placeholder='زمان انتشار'-->
                  <!--                      v-model="episodeEditedItem.releaseDate" style="margin-top: 20px !important;"></date-picker>-->
                </v-col>
                <v-col
                    cols="12"
                >
                  <v-text-field
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                      v-model="episodeEditedItem.description"
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
              @click="saveEpisode"
          >
            ذخیره
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="closeEpisode"
          >
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    ایجاد اپیزود-->
  </div>
</template>

<script>
import {entryType} from '../../../plugins/constant'
import {
  transformEntryType,
  transformTitleType,
  transformDateToJalali,
  transformJalaliDateToGeorgian
} from '../../../plugins/transformData'
import {episodeService} from "../../../service/episodeService";
// import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import ProductDetailsDialog from "./ProductDetailsDialog";

export default {
  components: {
    ProductDetailsDialog,
    // vDatePicker: VuePersianDatetimePicker,

  },
  name: "Index",
  data: () => ({
    showDialog: false,
    isCreate: true,
    search: '',
    headers: [
      {text: 'نام انگلسیی', value: 'enTitle',},
      {text: 'نام فارسی', value: 'faTitle'},
      {text: 'زمان شروع', value: 'startYear'},
      {text: 'زمان پایان', value: 'endYear'},
      {text: 'آی دی imdb', value: 'imdbId'},
      {text: 'نوع ورودی', value: 'entryType'},
      {text: 'عنوان ورودی', value: 'titleType'},
      {text: 'آخرین ویرایش', value: 'lastUpdate'},
      {text: 'عملیات', value: 'actions', sortable: false},
    ],
    editedIndex: -1,
    defaultItem: {
      enTitle: '',
      faTitle: '',
      directors: [],
      language: [],
      duration: '',
      genres: [],
      startYear: [],
      endYear: [],
      writers: [],
      actors: [],
      submittedBy: '',
      imdbId: '',
      entryType: '',
      titleType: '',
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
        text: 'مدیریت محصولات',
        disabled: true,
        exact: true
      },
    ],
    entryType,
    transformEntryType,
    transformTitleType,
    transformDateToJalali,
    currentProduct: null,
    episodes: [],
    episodesListDialog: false,
    episodeDialog: false,
    episodeEditedIndex: -1,
    episodeEditedItem: {
      parent: '',
      enTitle: '',
      faTitle: '',
      duration: '',
      releaseDate: '',
      seasonNumber: '',
      episodeNumber: '',
      rate: '',
      description: ''
    },
    episodeDefaultItem: {
      parent: '',
      enTitle: '',
      faTitle: '',
      duration: '',
      releaseDate: '',
      seasonNumber: '',
      episodeNumber: '',
      rate: '',
      description: ''
    },
    episodeHeaders: [
      {text: 'نام انگلسیی', value: 'enTitle'},
      {text: 'نام فارسی', value: 'faTitle'},
      {text: 'شماره فصل', value: 'seasonNumber'},
      {text: 'شماره قسمت', value: 'episodeNumber'},
      {text: 'زمان', value: 'duration'},
      {text: 'امتیاز', value: 'rate'},
      {text: 'تاریخ انتشار', value: 'releaseDate'},
      {text: 'عملیات', value: 'actions', sortable: false},
    ],
    episodeSearch: '',
  }),
  mounted() {
    this.$store.dispatch('organization/fetchOrganizations')
    this.$store.dispatch('product/fetchAllProducts')
    this.$store.dispatch('product/fetchAllGeneres')
    this.$store.dispatch('product/fetchAllTitleTypes')
    this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
  },
  computed: {
    products: {
      get() {
        return this.$store.getters['product/getProducts']
      },
      set(value) {
        return this.$store.commit('product/SET_PRODUCTS', value)
      }
    },
  },

  methods: {
    async editItem(item) {
      this.editedIndex = this.products.indexOf(item)
      await this.$store.dispatch('product/getProduct', item._id)
      this.isCreate = false
      this.showDialog = true
    },
    async createItem() {
      await this.$store.commit('product/SET_PRODUCT', {...this.defaultItem})
      this.isCreate = true
      this.showDialog = true
    },
    async handleSave(product) {
      if (this.editedIndex > -1) {
        await this.$store.dispatch('product/updateProduct', product)
        Object.assign(this.products[this.editedIndex], product)
        this.editedIndex = -1
      } else {
        await this.$store.dispatch('product/createProduct', product)
        await this.$store.dispatch('product/fetchAllProducts')
      }
    },
    closeDialog() {
      this.showDialog = false
    },

    getEpisodesList(item) {
      this.currentProduct = item
      if (item.entryType === 'multiple') {
        episodeService().getAllEpisodes(item._id).then(({data}) => {
          this.episodes = data.data
          this.episodesListDialog = true
        }).catch(() => this.$toast.error('خطایی رخ داده است'))
      } else {
        this.currentProduct = null
        this.$toast.info('امکلن تعریف اپیزود برای این محصول امکان پدیر نیست')
      }
    },
    handleOpenEpisodeDialog() {
      this.episodeDialog = true;
    },
    editIEpisode(item) {
      this.episodeEditedIndex = this.episodes.indexOf(item)
      this.episodeEditedItem = Object.assign({}, item)
      this.episodeEditedItem = {...this.episodeEditedItem, releaseDate: transformDateToJalali(item.releaseDate)}
      this.episodeDialog = true
    },
    closeEpisode() {
      this.episodeDialog = false
      this.$nextTick(() => {
        this.episodeEditedItem = Object.assign({}, this.episodeDefaultItem)
        this.episodeEditedIndex = -1
        this.$refs.episodeForm.resetValidation()
      })
    },
    saveEpisode() {
      if (this.$refs.episodeForm.validate()) {
        this.episodeEditedItem = {
          ...this.episodeEditedItem,
          releaseDate: new Date(transformJalaliDateToGeorgian(this.episodeEditedItem.releaseDate)).getTime()
        }
        if (this.episodeEditedIndex > -1) {
          episodeService().updateEpisode(this.episodeEditedItem).then(() => {
            episodeService().getAllEpisodes(this.currentProduct._id).then(({data}) => {
              this.episodes = data.data
              this.$toast.success('عملیات با موفقیت انجام شد')
              this.closeEpisode()
            })
          }).catch(() => this.$toast.error('خطایی رخ داده است'))
        } else {
          episodeService().createEpisode(this.episodeEditedItem).then(() => {
            episodeService().getAllEpisodes(this.currentProduct._id).then(({data}) => {
              this.episodes = data.data
              this.$toast.success('عملیات با موفقیت انجام شد')
              this.closeEpisode()
            })
          }).catch(() => this.$toast.error('خطایی رخ داده است'))
        }
      }
    },
    closeEpisodeListDialog() {
      this.episodes = [];
      this.currentProduct = null;
      this.episodesListDialog = false
    },

  },
}
</script>

<style scoped>

</style>
