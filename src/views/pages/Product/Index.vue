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
          <v-dialog
              v-model="dialog"
              persistent
              max-width="800px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
              >
                افزودن محصول جدید
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="productForm">
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
                            v-model="editedItem.startYear"
                            label="سال شروع"
                            type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="3"
                      >
                        <v-text-field
                            v-model="editedItem.endYear"
                            label="سال پایان"
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
                          sm="4"
                      >
                        <!--                      <v-autocomplete-->
                        <!--                          :rules="[-->
                        <!--                            multiSelectRequired('این فیلد الزامی است'),-->
                        <!--                            ]"-->
                        <!--                          v-model="editedItem.directors"-->
                        <!--                          :items="[]"-->
                        <!--                          item-text="fa"-->
                        <!--                          item-value="role"-->
                        <!--                          chips-->
                        <!--                          label="کارگردان"-->
                        <!--                          multiple-->
                        <!--                          deletable-chips-->
                        <!--                      ></v-autocomplete>-->
                        <v-combobox
                            :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                            v-model="editedItem.directors"
                            label="کارگردان"
                            multiple
                            chips
                            append-icon=""
                            persistent-hint
                            deletable-chips
                        ></v-combobox>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="4"
                      >
                        <!--                      <v-autocomplete-->
                        <!--                          :rules="[-->
                        <!--                            multiSelectRequired('این فیلد الزامی است'),-->
                        <!--                            ]"-->
                        <!--                          v-model="editedItem.language"-->
                        <!--                          :items="[]"-->
                        <!--                          item-text="fa"-->
                        <!--                          item-value="role"-->
                        <!--                          chips-->
                        <!--                          label="زبان"-->
                        <!--                          multiple-->
                        <!--                          deletable-chips-->
                        <!--                      ></v-autocomplete>-->
                        <v-combobox
                            :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                            v-model="editedItem.language"
                            label="زبان"
                            multiple
                            chips
                            append-icon=""
                            persistent-hint
                            deletable-chips
                        ></v-combobox>
                      </v-col>

                      <v-col
                          cols="12"
                          sm="4"
                      >
                        <v-autocomplete
                            :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                            v-model="editedItem.genres"
                            :items="generes"
                            item-text="fa"
                            item-value="en"
                            chips
                            label="ژاتر ها"
                            multiple
                            deletable-chips
                        ></v-autocomplete>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="4"
                      >
                        <!--                      <v-autocomplete-->
                        <!--                          :rules="[-->
                        <!--                            multiSelectRequired('این فیلد الزامی است'),-->
                        <!--                            ]"-->
                        <!--                          v-model="editedItem.writers"-->
                        <!--                          :items="[]"-->
                        <!--                          item-text="fa"-->
                        <!--                          item-value="role"-->
                        <!--                          chips-->
                        <!--                          label="نویسندگان"-->
                        <!--                          multiple-->
                        <!--                          deletable-chips-->
                        <!--                      ></v-autocomplete>-->
                        <v-combobox
                            :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                            v-model="editedItem.writers"
                            label="نویسندگان"
                            multiple
                            chips
                            append-icon=""
                            persistent-hint
                            deletable-chips
                        ></v-combobox>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="4"
                      >
                        <!--                      <v-autocomplete-->
                        <!--                          :rules="[-->
                        <!--                            multiSelectRequired('این فیلد الزامی است'),-->
                        <!--                            ]"-->
                        <!--                          v-model="editedItem.actors"-->
                        <!--                          :items="[]"-->
                        <!--                          item-text="fa"-->
                        <!--                          item-value="role"-->
                        <!--                          chips-->
                        <!--                          label="بازیگران"-->
                        <!--                          multiple-->
                        <!--                          deletable-chips-->
                        <!--                      ></v-autocomplete>-->
                        <v-combobox
                            :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                            v-model="editedItem.actors"
                            label="بازیگران"
                            multiple
                            chips
                            append-icon=""
                            persistent-hint
                            deletable-chips
                        ></v-combobox>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="4"
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
                          sm="4"
                      >
                        <v-text-field
                            :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                            v-model="editedItem.imdbId"
                            label="آی دی imdb"
                            type="number"
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="4"
                      >
                        <v-autocomplete
                            v-model="editedItem.entryType"
                            :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                            label="نوع ورودی"
                            :items="entryType"
                            item-text="fa"
                            item-value="en"
                            dense
                        ></v-autocomplete>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="4"
                      >
                        <v-autocomplete
                            v-model="editedItem.titleType"
                            :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                            label="عنوان ورودی"
                            :items="titleTypes"
                            item-text="fa"
                            item-value="en"
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
import {required, verifyMobilePhone, verifyUserName, multiSelectRequired, length} from "../../../plugins/rule";
import {productService} from "../../../service/productService";
import {entryType} from '../../../plugins/constant'
import {
  transformEntryType,
  transformTitleType,
  transformDateToJalali,
  transformJalaliDateToGeorgian
} from '../../../plugins/transformData'
import {permission} from "../../../plugins/permission";
import {episodeService} from "../../../service/episodeService";
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'

export default {
  components: {
    vDatePicker: VuePersianDatetimePicker,

  },
  name: "Index",
  data: () => ({
    dialog: false,
    dialogDelete: false,
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
    editedItem: {
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
    required,
    verifyMobilePhone,
    verifyUserName,
    multiSelectRequired,
    length,
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
    this.$store.dispatch('fetchOrganizations')
    this.$store.dispatch('product/fetchAllProducts')
    this.$store.dispatch('product/fetchAllGeneres')
    this.$store.dispatch('product/fetchAllTitleTypes')
    this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
  },
  computed: {
    isSuperAdmin() {
      return permission().isSuperAdmin()
    },
    products: {
      get() {
        return this.$store.getters['product/getProducts']
      },
      set(value) {
        return this.$store.commit('product/SET_PRODUCTS', value)
      }
    },
    generes() {
      return this.$store.getters['product/getGeneres']
    },
    titleTypes() {
      return this.$store.getters['product/getTitleTypes']
    },
    organizationList() {
      return this.$store.getters['getOrganizations']
    },
    formTitle() {
      return this.editedIndex === -1 ? 'افزودن محصول' : 'ویرایش محصول'
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
      productService().getProduct(item._id).then(({data}) => {
        this.editedIndex = this.products.indexOf(item)
        this.editedItem = Object.assign({}, data.data[0])
        this.dialog = true
      })
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.$refs.productForm.resetValidation()
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
      if (this.$refs.productForm.validate()) {
        if (this.editedIndex > -1) {
          productService().updateProduct(this.editedItem).then(() => {
            Object.assign(this.products[this.editedIndex], this.editedItem)
            this.close()
          })
        } else {
          productService().createProduct(this.editedItem).then(() => {
            this.$store.dispatch('product/fetchAllProducts').then(() => {
              this.close()
            })
          })
        }
      }
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
