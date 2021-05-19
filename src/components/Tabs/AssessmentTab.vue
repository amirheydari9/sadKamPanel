<template>
  <v-tab-item class="mt-5" value="assessment">
    <v-col cols="12">
      <template v-if="assessmentRequest">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
                :value="transformAssessmentRequestStatus(assessmentRequest.status)"
                label="وضعیت"
                readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
                :value="transformDateToJalali(assessmentRequest.submitDate)"
                label="تاریخ ثبت درخواست"
                readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
                v-model="assessmentRequest.description"
                label="توضیحات"
                readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </template>
      <template v-if="!assessmentRequest">
        <v-text-field
            v-model="tab1Desc"
            outlined
            label="توضیحات"
        ></v-text-field>
        <v-btn
            color="primary"
            @click="createAssessmentRequest">
          درخواست ارزیابی
        </v-btn>
      </template>
      <!--      <template v-if="!assessmentRequestInfoObject && canUploadFile">-->
      <!--        <v-text-field-->
      <!--            v-model="tab1Desc"-->
      <!--            outlined-->
      <!--            label="توضیحات"-->
      <!--        ></v-text-field>-->
      <!--        <v-btn-->
      <!--            color="primary"-->
      <!--            @click="createAssessmentRequest">-->
      <!--          درخواست ارزیابی-->
      <!--        </v-btn>-->
      <!--      </template>-->
      <template>
      </template>
    </v-col>
  </v-tab-item>
</template>

<script>
import {transformDateToJalali, transformAssessmentRequestStatus} from '../../plugins/transformData';

export default {
  name: "AssessmentRequestTab",
  data() {
    return {
      transformDateToJalali,
      transformAssessmentRequestStatus,
      tab1Desc: ''
    }
  },
  computed: {
    assessmentRequest() {
      return this.$store.getters['assessmentRequest/getAssessmentRequest']
    }
  },
  mounted() {
    this.$emit('getData')
  },
  methods: {
    createAssessmentRequest() {
      this.$store.dispatch('assessmentRequest/createAssessmentRequest', this.episode._id).then(({data}) => {
        // this.$store.dispatch('assessmentRequest/fetchAssessmentRequest', data.data.id)
        this.$emit('getData')
      })
    }
  }
}
</script>

<style scoped>

</style>
