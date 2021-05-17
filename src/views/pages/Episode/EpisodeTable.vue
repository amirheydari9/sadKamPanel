<template>
  <div class="w-100">
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
          <v-btn
              color="primary"
              dark
              class="mb-2"
              @click="createItem"
          >
            افزودن اپیزود جدید
          </v-btn>
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
    <episode-details-dialog
        v-if="showDialog"
        :showDialog="showDialog"
        :isCreate="isCreate"
        @closeDialog="closeDialog"
        @handleSave="handleSave"/>
  </div>
</template>

<script>
import EpisodeDetailsDialog from "./EpisodeDetailsDialog";
import {
  transformOrganization,
  transformDateToJalali,
  transformJalaliDateToGeorgian
} from "../../../plugins/transformData";

export default {
  name: "EpisodeTable",
  components: {EpisodeDetailsDialog},
  data() {
    return {
      showDialog: false,
      isCreate: true,
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
      transformOrganization,
      transformDateToJalali,
      transformJalaliDateToGeorgian
    }
  },
  computed: {
    episodes: {
      get() {
        return this.$store.getters['episode/getEpisodes']
      },
      set(value) {
        return this.$store.commit('episode/SET_EPISODES', value)
      }
    },
  },
  methods: {
    async editItem(item) {
      this.editedIndex = this.episodes.indexOf(item)
      console.log(this.editedIndex,'inddx')
      // await this.$store.commit('episode/SET_USER', {...item})
      await this.$store.dispatch('episode/getEpisode', item._id)
      this.isCreate = false
      this.showDialog = true
    },
    async createItem() {
      await this.$store.commit('episode/SET_EPISODE', {...this.defaultItem})
      this.isCreate = true
      this.showDialog = true
    },
    async handleSave(episode) {
      console.log(this.editedIndex,'inddx')
      if (this.editedIndex > -1) {
        await this.$store.dispatch('episode/updateEpisode', episode)
        Object.assign(this.episodes[this.editedIndex], episode)
        this.editedIndex = -1
      } else {
        await this.$store.dispatch('episode/createEpisode', episode)
        await this.$store.dispatch('episode/fetchEpisodes')
      }
    },
    closeDialog() {
      this.showDialog = false
      this.editedIndex = -1
    }
  },
}
</script>

<style scoped>

</style>
