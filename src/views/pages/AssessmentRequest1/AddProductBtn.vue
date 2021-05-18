<template>
  <div>
    <v-btn
        color="primary"
        @click="addProduct"
        class="mr-3"
    >
      افزودن محصول
    </v-btn>
    <product-details-dialog
        v-if="productDialog"
        :showDialog="productDialog"
        :isCreate="true"
        @closeDialog="closeProductDetailsDialog"
        @handleSave="handleProductDetailsSave"
    />
  </div>
</template>

<script>
import ProductDetailsDialog from "../Product/ProductDetailsDialog";

export default {
  name: "AddProductBtn",
  components: {
    ProductDetailsDialog,
  },
  data() {
    return {
      productDialog: false,
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
    }
  },
  methods: {
    async addProduct() {
      await this.$store.commit('product/SET_PRODUCT', {...this.defaultItem})
      this.productDialog = true
    },
    async handleProductDetailsSave(product) {
      await this.$store.dispatch('product/createProduct', product)
      await this.$store.dispatch('product/searchProduct', product.enTitle).then(({data}) => {
        this.$store.commit('product/SET_PRODUCTS', [
          ...this.$store.getters['product/getProducts'],
          ...data.data
        ])
      })
    },
    closeProductDetailsDialog() {
      this.productDialog = false
    }
  }
}
</script>

<style scoped>

</style>
