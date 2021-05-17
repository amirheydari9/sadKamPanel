<template>
  <v-dialog v-model="show" max-width="800px" persistent>
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
                    v-model="episode.enTitle"
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
                    v-model="episode.faTitle"
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
                    v-model="episode.duration"
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
                    v-model="episode.rate"
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
                    v-model="episode.seasonNumber"
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
                    v-model="episode.episodeNumber"
                    label="شماره قسمت"
                    type="number"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  style="margin-top: 20px"
              >
                <v-text-field
                    id="my-custom-input"
                    persistent-hint
                    readonly
                    v-model="episode.releaseDate"
                    label="زمان انتشار"
                    :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                ></v-text-field>
                <v-date-picker
                    auto-submit
                    v-model="episode.releaseDate"
                    element="my-custom-input"
                >
                </v-date-picker>

<!--                <v-col-->
<!--                    cols="12"-->
<!--                    sm="6"-->
<!--                >-->
<!--                  <v-autocomplete-->
<!--                      :rules="[-->
<!--                            required('این فیلد الزامی است'),-->
<!--                            ]"-->
<!--                      :loading="isLoading"-->
<!--                      :items="dialogFilteredProducts"-->
<!--                      :search-input.sync="dialogProductSearch"-->
<!--                      item-text="enTitle"-->
<!--                      :item-value="episode.parent"-->
<!--                      label="نام محصول"-->
<!--                      return-object-->
<!--                      @change="handleDialogProductName"-->
<!--                  ></v-autocomplete>-->
<!--                </v-col>-->
                <v-col
                    cols="12"
                    sm="6"
                    v-if="isSuperAdmin"
                >
                  <v-autocomplete
                      v-model="episode.submittedBy"
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
                      v-model="episode.description"
                      label="توضیحات"
                  ></v-text-field>
                </v-col>
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
</template>

<script>
import {multiSelectRequired, verifyMobilePhone, verifyUserName, required} from "../../../plugins/rule";
import {permission} from "../../../plugins/permission";
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import {entryType} from "../../../plugins/constant";

export default {
  name: "EpisodeDetailsDialog",
  components: {
    vDatePicker: VuePersianDatetimePicker,
  },
  props: {
    showDialog: {Boolean, isRequired: true},
    isCreate: {Boolean, isRequired: true}
  },
  data() {
    return {
      required,
      verifyMobilePhone,
      verifyUserName,
      multiSelectRequired,
      entryType,
    }
  },
  computed: {
    show() {
      return this.showDialog
    },
    episode() {
      return this.$store.getters['episode/getEpisode']
    },
    isSuperAdmin() {
      return permission().isSuperAdmin()
    },
    // generes() {
    //   return this.$store.getters['episode/getGeneres']
    // },
    // titleTypes() {
    //   return this.$store.getters['episode/getTitleTypes']
    // },
    organizationList() {
      return this.$store.getters['organization/getOrganizations']
    },
    entryTypeIsMultiple() {
      return this.episode.entryType === 'single' ? false : true
    },
    formTitle() {
      return this.isCreate ? 'افزودن اپیزود' : 'ویرایش اپیزود'
    },
  },
  methods: {
    close() {
      this.$refs.episodeForm.resetValidation()
      this.$emit('closeDialog')
    },
    save() {
      if (this.$refs.episodeForm.validate()) {
        this.$emit('handleSave', this.episode)
        this.close()
      }
    }
  }
}
</script>

<style scoped>

</style>
