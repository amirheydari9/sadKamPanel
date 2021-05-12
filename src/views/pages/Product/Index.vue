<template>
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
                         sm="4"
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
                         sm="4"
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
                         sm="4"
                     >
                       <v-autocomplete
                           :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                           v-model="editedItem.directors"
                           :items="[]"
                           item-text="fa"
                           item-value="role"
                           chips
                           label="کارگردان"
                           multiple
                           deletable-chips
                       ></v-autocomplete>
                     </v-col>
                     <v-col
                         cols="12"
                         sm="4"
                     >
                       <v-autocomplete
                           :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                           v-model="editedItem.language"
                           :items="[]"
                           item-text="fa"
                           item-value="role"
                           chips
                           label="زبان"
                           multiple
                           deletable-chips
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
                           v-model="editedItem.duration"
                           label="زمان"
                       ></v-text-field>
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
                           item-value="role"
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
                       <v-text-field
                           :rules="[
                            length(4,'سال شروع',false),
                            ]"
                           v-model="editedItem.startYear"
                           label="سال شروع"
                       ></v-text-field>
                     </v-col>
                     <v-col
                         cols="12"
                         sm="4"
                     >
                       <v-text-field
                           :rules="[
                            length(4,'سال پایان',false)
                            ]"
                           v-model="editedItem.endYear"
                           label="سال پایان"
                       ></v-text-field>
                     </v-col>
                     <v-col
                         cols="12"
                         sm="4"
                     >
                       <v-autocomplete
                           :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                           v-model="editedItem.writers"
                           :items="[]"
                           item-text="fa"
                           item-value="role"
                           chips
                           label="نویسندگان"
                           multiple
                           deletable-chips
                       ></v-autocomplete>
                     </v-col>
                     <v-col
                         cols="12"
                         sm="4"
                     >
                       <v-autocomplete
                           :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                           v-model="editedItem.actors"
                           :items="[]"
                           item-text="fa"
                           item-value="role"
                           chips
                           label="بازیگران"
                           multiple
                           deletable-chips
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
                           label="entryType"
                           :items="[]"
                           item-text="fa"
                           item-value="type"
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
                           label="titleType"
                           :items="[]"
                           item-text="fa"
                           item-value="type"
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
                           v-model="editedItem.rate"
                           label="امتیاز"
                       ></v-text-field>
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
import {required, verifyMobilePhone, verifyUserName, multiSelectRequired,length} from "../../../plugins/rule";
import {productService} from "../../../service/productService";

export default {
  name: "Index",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: '',
    headers: [
      {text: 'نام انگلسیی', value: 'enTitle',},
      {text: 'نام فارسی', value: 'faTitle'},
      {text: 'کارگردان', value: 'director'},
      {text: 'زمان', value: 'duration'},
      {text: 'تاریخ ساخت', value: 'releaseDate'},
      {text: 'تایید توسط', value: 'submittedBy'},
      {text: 'آی دی imdb', value: 'imdbId'},
      {text: 'نوع', value: 'type'},
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
    length
  }),
  mounted() {
    this.$store.dispatch('product/fetchAllProducts')
    this.$store.dispatch('product/fetchAllGeneres')
    this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
  },
  computed: {
    products() {
      return this.$store.getters['product/getProducts']
    },
    generes() {
      return this.$store.getters['product/getGeneres']
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
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
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
          productService().updateUser(this.editedItem).then(() => {
            Object.assign(this.products[this.editedIndex], this.editedItem)
            this.close()
          })
        } else {
          productService().createUser(this.editedItem).then(() => {
            this.products.push(this.editedItem)
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
