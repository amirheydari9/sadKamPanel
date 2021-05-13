<template>
  <div class="w-100 d-flex flex-column justify-start">
    <v-col cols="12" sm="5" class="d-flex justify-center align-center">
      <v-text-field
          v-model="productSearch"
          label="جستجو در محصولات"
          :loading="isLoading"
          outlined
      ></v-text-field>
      <v-dialog
          v-model="productDialog"
          max-width="800px"
          persistent
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="primary"
              dark
              class="mr-3"
              v-bind="attrs"
              v-on="on"
          >
            افزودن محصول جدید
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">محصول جدید</span>
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
                        v-model="productEditedItem.enTitle"
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
                        v-model="productEditedItem.faTitle"
                        label="نام فارسی"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="3"
                  >
                    <v-text-field
                        v-model="productEditedItem.startYear"
                        label="سال شروع"
                        type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="3"
                  >
                    <v-text-field
                        v-model="productEditedItem.endYear"
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
                        v-model="productEditedItem.duration"
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
                        v-model="productEditedItem.rate"
                        label="امتیاز"
                        type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="4"
                  >
                    <v-combobox
                        :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                        v-model="productEditedItem.directors"
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
                    <v-combobox
                        :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                        v-model="productEditedItem.language"
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
                        v-model="productEditedItem.genres"
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
                    <v-combobox
                        :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                        v-model="productEditedItem.writers"
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
                    <v-combobox
                        :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                        v-model="productEditedItem.actors"
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
                        v-model="productEditedItem.submittedBy"
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
                        v-model="productEditedItem.imdbId"
                        label="آی دی imdb"
                        type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="4"
                  >
                    <v-autocomplete
                        v-model="productEditedItem.entryType"
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
                        v-model="productEditedItem.titleType"
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
                        v-model="productEditedItem.description"
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
                @click="saveProduct"
            >
              ذخیره
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="closeProduct"
            >
              انصراف
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <v-data-table
        :headers="productHeaders"
        :items="filteredProducts"
        :search="search"
        no-results-text="اطلاعاتی یافت نشد"
        class="elevation-1 w-100"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="assessmentRequest(item)"
        >
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>

    <!--    ایجاد اپیزود-->
    <v-dialog
        v-model="episodeDialog"
        max-width="600px"
        persistent
    >
      <!--      <template v-slot:activator="{ on, attrs }">-->
      <!--        <v-btn-->
      <!--            color="primary"-->
      <!--            dark-->
      <!--            class="mb-2"-->
      <!--            v-bind="attrs"-->
      <!--            v-on="on"-->
      <!--        >-->
      <!--          افزودن اپیزود جدید1-->
      <!--        </v-btn>-->
      <!--      </template>-->
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
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                      v-model="episodeEditedItem.releaseDate"
                      label="زمان انتشار"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                  <v-autocomplete
                      v-model="episodeEditedItem.parent"
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                      label="نام محصول"
                      :items="products"
                      item-text="faTitle"
                      item-value="_id"
                      dense
                      disabled
                  ></v-autocomplete>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    v-if="isSuperAdmin"
                >
                  <v-autocomplete
                      v-model="episodeEditedItem.submittedBy"
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

    <!--    لیست اپیزود-->
    <v-dialog
        v-model="episodeListDialog"
        persistent
    >
      <v-card>
        <v-card-text>
          <v-data-table
              :headers="episodeHeaders"
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
            <!--      <template v-slot:item.organizationType="{ item }">-->
            <!--        {{ transformOrganizationType(item) }}-->
            <!--      </template>-->
            <template v-slot:item.actions="{item}">
              <v-icon
                  small
                  class="mr-2"
                  @click="handleTabsDialogInEpisodeList(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="closeEpisodeList"
          >
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    لیست اپیزود-->

    <!--    تب ها-->
    <v-dialog
        v-model="tabsDialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-text>
          <v-tabs class="mt-5" color="grey darken-3" v-model="tabsMenu">
            <v-tab
                href="#assessment"
                @click="handleTab1"
            >ارزیابی
            </v-tab>
            <v-tab
                href="#chat"
            >فراگیر
            </v-tab>
            <v-tab
                href="#file"
            >فایل
            </v-tab>
          </v-tabs>
          <v-divider></v-divider>

          <v-tabs-items v-model="tabsMenu">

            <v-tab-item class="mt-5" value="assessment">
              <p>تب 1</p>
            </v-tab-item>

            <v-tab-item class="mt-5" value="chat">
              <p>تب 2</p>
            </v-tab-item>

            <v-tab-item class="mt-5" value="file">
              <p>تب 3</p>
            </v-tab-item>

          </v-tabs-items>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="closeTabs"
          >
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    تب ها-->

  </div>
</template>

<script>
import {required, verifyMobilePhone, verifyUserName, multiSelectRequired} from "../../../plugins/rule";
import {transformOrganizationType} from "../../../plugins/transformData";
import {permission} from "../../../plugins/permission";
import axios from 'axios'
import {productService} from "../../../service/productService";
import {entryType} from "../../../plugins/constant";
import {episodeService} from "../../../service/episodeService";
import {assessmentRequestService} from "../../../service/assessmentRequestService";

export default {
  name: "Index",
  data: () => ({
    productDialog: false,
    episodeListDialog: false,
    episodeDialog: false,
    tabsDialog: false,
    isLoading: false,
    productSearch: null,
    filteredProducts: [],
    episodes: [],
    productIdForHandleEpisode: null,
    tabsMenu: null,
    search: '',
    productHeaders: [
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
    episodeHeaders: [
      {text: 'نام انگلسیی', value: 'enTitle'},
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
    productEditedIndex: -1,
    episodeEditedIndex: -1,
    productEditedItem: {
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
    productDefaultItem: {
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
    episodeEditedItem: {
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
    episodeDefaultItem: {
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
        text: 'در خواست ارزیابی',
        disabled: true,
        exact: true
      },
    ],
    episodeIdForTab1: null,
    required,
    verifyMobilePhone,
    verifyUserName,
    transformOrganizationType,
    multiSelectRequired,
    entryType,
  }),
  mounted() {
    this.$store.dispatch('fetchOrganizations')
    this.$store.dispatch('product/fetchAllProducts')
    this.$store.dispatch('product/fetchAllGeneres')
    this.$store.dispatch('product/fetchAllTitleTypes')
    this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
  },
  // beforeDestroy() {
  //   this.$store.commit('episode/SET_EPISODES', [])
  // },
  computed: {
    isSuperAdmin() {
      return permission().isSuperAdmin()
    },
    // episodes() {
    //   return this.$store.getters['episode/getEpisodes']
    // },
    products() {
      return this.$store.getters['product/getProducts']
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
  },

  watch: {
    productDialog(val) {
      val || this.closeProduct()
    },
    productSearch(value) {
      if (!value) {
        this.filteredProducts = [];
        return;
      }
      if (value.length <= 0) return;
      if (this.isLoading) return;
      this.isLoading = true;
      axios.get(`http://sadkam.lincast.ir/api/products/search/${value}`)
          .then(({data}) => {
            this.$nextTick(() => this.filteredProducts = data.data)
          })
          .finally(() => this.isLoading = false)
    },
    episodeDialog(val) {
      val || this.closeEpisode()
    },
    episodeListDialog(val) {
      val || this.closeEpisodeList()
    },
    tabsDialog(val) {
      if (val) {
        this.handleTab1()
      }
      val || this.closeTabs()
    },
  },

  methods: {
    closeProduct() {
      this.productDialog = false
      this.$nextTick(() => {
        this.productEditedItem = Object.assign({}, this.productDefaultItem)
        this.productEditedIndex = -1
        this.$refs.productForm.resetValidation()
      })
    },
    closeEpisode() {
      this.episodeDialog = false
      this.$nextTick(() => {
        this.episodeEditedItem = Object.assign({}, this.episodeDefaultItem)
        this.episodeEditedIndex = -1
        this.$refs.episodeForm.resetValidation()
      })
    },
    closeEpisodeList() {
      this.episodes = [];
      this.productIdForHandleEpisode = null;
      this.episodeListDialog = false
    },

    handleOpenEpisodeDialog() {
      this.episodeEditedItem.parent = this.productIdForHandleEpisode
      this.episodeDialog = true;
    },
    saveProduct() {
      if (this.$refs.productForm.validate()) {
        productService().createProduct(this.productEditedItem).then(() => {
          axios.get(`http://sadkam.lincast.ir/api/products/search/${this.productSearch}`)
              .then(({data}) => {
                this.$nextTick(() => this.filteredProducts = data.data)
                this.closeProduct()
              })
              .finally(() => this.isLoading = false)
        })
      }
    },

    saveEpisode() {
      if (this.$refs.episodeForm.validate()) {
        console.log(this.episodeEditedItem, 'amir')
        episodeService().createEpisode(this.episodeEditedItem).then(() => {
          episodeService().getAllEpisodes(this.episodeEditedItem.parent).then(({data}) => {
            this.episodes = data.data
            this.closeEpisode()
          })
        })
      }
    },

    assessmentRequest(item) {
      console.log(item, 'item')
      if (item.entryType === 'single') {
        episodeService().getAllEpisodes(item._id).then(({data}) => {
          this.episodeIdForTab1 = data.data[0]._id
          this.tabsDialog = true
        })
      } else if (item.entryType === 'multiple') {
        episodeService().getAllEpisodes(item._id).then(({data}) => {
          this.productIdForHandleEpisode = item._id;
          this.episodes = data.data
          this.episodeListDialog = true
        })
      }
    },

    handleTab1() {
      assessmentRequestService().getAssessmentRequestByEpisode(this.episodeIdForTab1).then((data) => {
        console.log(data)
      })
    },
    handleTabsDialogInEpisodeList(item) {
      this.episodeIdForTab1 = item._id
      this.tabsDialog = true
    },
    closeTabs() {
      this.episodeIdForTab1 = null;
      this.tabsDialog = false;
    }
  },
}
</script>

<style scoped>

</style>

