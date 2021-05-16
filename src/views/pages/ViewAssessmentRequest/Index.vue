<template>
  <v-container>
    <v-tabs class="mt-5" color="grey darken-3" v-model="tabsMenu">
      <v-tab
          href="#submitted"
          @click="handleTab1"
      >ایجاد شده
      </v-tab>
      <v-tab
          href="#inqueu"
          @click="handleTab2"
      >در صف
      </v-tab>
      <v-tab
          href="#assigned"
          @click="handleTab3"
      >ارجاع شده
      </v-tab>
      <v-tab
          href="#confirmed"
          @click="handleTab4"
      >تایید شده
      </v-tab>
      <v-tab
          href="#working"
          @click="handleTab5"
      >در حال بررسی
      </v-tab>
      <v-tab
          href="#completed"
          @click="handleTab6"
      >تکمیل شده
      </v-tab>
    </v-tabs>
    <v-divider></v-divider>

    <v-tabs-items v-model="tabsMenu">

      <v-tab-item class="mt-5" value="submitted">
        <v-col cols="12">
          <v-data-table
              :headers="headers"
              :items="submitted"
              :search="search1"
              no-results-text="اطلاعاتی یافت نشد"
              class="w-100"
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-text-field
                    v-model="search1"
                    label="جست جو"
                    single-line
                    hide-details
                    autofocus
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{item}">
              <v-icon
                  small
                  class="mr-2"
                  @click="changeStatus(item,0)"
                  v-if="canSetStatusAndAssignToBrokerage"
              >
                mdi-eye
              </v-icon>
              <v-icon
                  small
                  class="mr-2"
                  @click="changeBrokerage(item,0)"
                  v-if="canSetStatusAndAssignToBrokerage"
              >
                mdi-cloud
              </v-icon>
            </template>
            <template v-slot:item.status="{ item }">
              {{ transformAssessmentRequestStatus(item.status) }}
            </template>
            <template v-slot:item.submitDate="{ item }">
              {{ transformDateToJalali(item.submitDate) }}
            </template>
          </v-data-table>
        </v-col>
      </v-tab-item>

      <v-tab-item class="mt-5" value="inqueu">
        <v-col cols="12">
          <v-data-table
              :headers="headers"
              :items="inqueu"
              :search="search2"
              no-results-text="اطلاعاتی یافت نشد"
              class="w-100"
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-text-field
                    v-model="search2"
                    label="جست جو"
                    single-line
                    hide-details
                    autofocus
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{item}">
              <v-icon
                  small
                  class="mr-2"
                  @click="assignedToMe(item,1)"
                  v-if="canAssignTome"
              >
                mdi-cloud
              </v-icon>
            </template>
            <template v-slot:item.status="{ item }">
              {{ transformAssessmentRequestStatus(item.status) }}
            </template>
            <template v-slot:item.submitDate="{ item }">
              {{ transformDateToJalali(item.submitDate) }}
            </template>
          </v-data-table>
        </v-col>
      </v-tab-item>

      <v-tab-item class="mt-5" value="assigned">
        <v-col cols="12">
          <v-data-table
              :headers="headers"
              :items="assigned"
              :search="search3"
              no-results-text="اطلاعاتی یافت نشد"
              class="w-100"
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-text-field
                    v-model="search3"
                    label="جست جو"
                    single-line
                    hide-details
                    autofocus
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{item}">
              <v-icon
                  small
                  class="mr-2"
                  @click="unAssignMe(item,2)"
                  v-if="canAssignTome"
              >
                mdi-eye
              </v-icon>
            </template>
            <template v-slot:item.status="{ item }">
              {{ transformAssessmentRequestStatus(item.status) }}
            </template>
            <template v-slot:item.submitDate="{ item }">
              {{ transformDateToJalali(item.submitDate) }}
            </template>
          </v-data-table>
        </v-col>
      </v-tab-item>

      <v-tab-item class="mt-5" value="confirmed">
        <v-col cols="12">
          <v-data-table
              :headers="headers"
              :items="confirmed"
              :search="search4"
              no-results-text="اطلاعاتی یافت نشد"
              class="w-100"
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-text-field
                    v-model="search4"
                    label="جست جو"
                    single-line
                    hide-details
                    autofocus
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:item.status="{ item }">
              {{ transformAssessmentRequestStatus(item.status) }}
            </template>
            <template v-slot:item.submitDate="{ item }">
              {{ transformDateToJalali(item.submitDate) }}
            </template>
          </v-data-table>
        </v-col>
      </v-tab-item>

      <v-tab-item class="mt-5" value="working">
        <v-col cols="12">
          <v-data-table
              :headers="headers"
              :items="working"
              :search="search5"
              no-results-text="اطلاعاتی یافت نشد"
              class="w-100"
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-text-field
                    v-model="search5"
                    label="جست جو"
                    single-line
                    hide-details
                    autofocus
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:item.status="{ item }">
              {{ transformAssessmentRequestStatus(item.status) }}
            </template>
            <template v-slot:item.submitDate="{ item }">
              {{ transformDateToJalali(item.submitDate) }}
            </template>
          </v-data-table>
        </v-col>
      </v-tab-item>

      <v-tab-item class="mt-5" value="completed">
        <v-col cols="12">
          <v-data-table
              :headers="headers"
              :items="completed"
              :search="search6"
              no-results-text="اطلاعاتی یافت نشد"
              class="w-100"
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-text-field
                    v-model="search6"
                    label="جست جو"
                    single-line
                    hide-details
                    autofocus
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:item.status="{ item }">
              {{ transformAssessmentRequestStatus(item.status) }}
            </template>
            <template v-slot:item.submitDate="{ item }">
              {{ transformDateToJalali(item.submitDate) }}
            </template>
          </v-data-table>
        </v-col>
      </v-tab-item>
    </v-tabs-items>

    <!--    statusDialog-->
    <v-dialog
        v-model="statusDialog"
        persistent
        max-width="300px"
    >
      <v-card>
        <v-card-text>
          <v-select
              :items="assessmentRequestStatus"
              item-text="fa"
              item-value="code"
              v-model="statusSelectValue"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="saveStatus()"
          >
            تایید
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="closeStatus"
          >
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    statusDialog-->

    <!--    brokerage-->
    <v-dialog
        v-model="brokerageDialog"
        persistent
        max-width="300px"
    >
      <v-card>
        <v-card-text>
          <v-select
              :items="brokerage"
              item-text="name"
              item-value="_id"
              v-model="brokerageValue"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="saveBrokerage"
          >
            تایید
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="closeBrokerage"
          >
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    brokerage-->

  </v-container>
</template>

<script>
import {transformDateToJalali, transformAssessmentRequestStatus} from '../../../plugins/transformData'
import {assessmentRequestStatus} from "../../../plugins/constant";
import {permission} from "../../../plugins/permission";

export default {
  name: "Index",
  data() {
    return {
      tabsMenu: null,
      search1: '',
      search2: '',
      search3: '',
      search4: '',
      search5: '',
      search6: '',
      headers: [
        {text: 'وضعیت', value: 'status'},
        {text: 'تاریخ ایجاد', value: 'submitDate'},
        {text: 'توضیحات', value: 'description'},
        {text: 'عملیات', value: 'actions', sortable: false},
      ],
      statusDialog: false,
      brokerageDialog: false,
      currentItem: null,
      currentTab: null,
      assessmentRequestStatus,
      statusSelectValue: 0,
      brokerageValue: null,
      transformDateToJalali,
      transformAssessmentRequestStatus,
    }
  },
  computed: {
    canSetStatusAndAssignToBrokerage() {
      return permission().isSecretariant() && permission().isOrders()
    },
    canAssignTome() {
      return permission().isBrokerage() && permission().isOrders()
    },
    brokerage() {
      return this.$store.getters['getBrokerage']
    },
    submitted: {
      get() {
        return this.$store.getters['assessmentRequest/getSubmitted']
      },
      set(value) {
        return this.$store.commit('assessmentRequest/SET_SUBMITTED', value)
      }
    },
    inqueu: {
      get() {
        return this.$store.getters['assessmentRequest/getInqueu']
      },
      set(value) {
        return this.$store.commit('assessmentRequest/SET_INQUEU', value)
      }
    },
    assigned: {
      get() {
        return this.$store.getters['assessmentRequest/getAssigned']
      },
      set(value) {
        return this.$store.commit('assessmentRequest/SET_ASSIGNED', value)
      }
    },
    confirmed: {
      get() {
        return this.$store.getters['assessmentRequest/getConfirmed']
      },
      set(value) {
        return this.$store.commit('assessmentRequest/SET_CONFIRMED', value)
      }
    },
    working: {
      get() {
        return this.$store.getters['assessmentRequest/getWorking']
      },
      set(value) {
        return this.$store.commit('assessmentRequest/SET_WORKING', value)
      }
    },
    completed: {
      get() {
        return this.$store.getters['assessmentRequest/getCompleted']
      },
      set(value) {
        return this.$store.commit('assessmentRequest/SET_COMPLETED', value)
      }
    },
  },
  beforeDestroy() {
    this.$store.commit('assessmentRequest/SET_SUBMITTED', [])
    this.$store.commit('assessmentRequest/SET_INQUEU', [])
    this.$store.commit('assessmentRequest/SET_ASSIGNED', [])
    this.$store.commit('assessmentRequest/SET_CONFIRMED', [])
    this.$store.commit('assessmentRequest/SET_WORKING', [])
    this.$store.commit('assessmentRequest/SET_COMPLETED', [])
  },
  mounted() {
    if (this.canSetStatusAndAssignToBrokerage) {
      this.$store.dispatch('fetchOrganizations')
    }
    this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
    this.fetchAssessmentListByStatus(0)
  },
  methods: {
    fetchAssessmentListByStatus(status) {
      try {
        this.$store.dispatch('assessmentRequest/fetchAssessmentListByStatus', status)
      } catch (e) {
        this.$toast.error('خظا در دریافت اطلاعات')
      }
    },
    handleTab1() {
      this.fetchAssessmentListByStatus(0)
    },
    handleTab2() {
      this.fetchAssessmentListByStatus(1)
    },
    handleTab3() {
      this.fetchAssessmentListByStatus(2)
    },
    handleTab4() {
      this.fetchAssessmentListByStatus(3)
    },
    handleTab5() {
      this.fetchAssessmentListByStatus(4)
    },
    handleTab6() {
      this.fetchAssessmentListByStatus(5)
    },
    changeStatus(item, currentTab) {
      this.statusDialog = true
      this.item = item
      this.currentTab = currentTab
    },
    changeBrokerage(item, currentTab) {
      this.brokerageDialog = true
      this.item = item
      this.currentTab = currentTab
    },
    async saveStatus() {
      try {
        const assessment = {
          status: this.statusSelectValue,
          assessmentRequestId: this.item._id
        }
        await this.$store.dispatch('assessmentRequest/setStatusOfAssessmentRequest', assessment)
        this.fetchAssessmentListByStatus(this.currentTab)
        this.$toast.success('عملیات با موفقیا انجام شد')
        this.closeStatus()
      } catch (e) {
        this.$toast.error('عملیات انجام نشد')
      }
    },
    async assignedToMe(item, index) {
      const brokerage = {
        brokerageId: this.brokerageValue,
        assessmentRequestId: item._id
      }
      try {
        await this.$store.dispatch('assessmentRequest/assignAssessmentRequestToBrokerage', brokerage)
        this.fetchAssessmentListByStatus(index)
        this.$toast.success('عملیات با موفقیت انجام شد')
      } catch (e) {
        this.$toast.error('عملیات انجام نشد')
      }
    },
    async saveBrokerage() {
      try {
        if (!this.brokerageValue) {
          this.$toast.error('کارگزاری را انتخاب کنید')
          return false
        }
        const brokerage = {
          brokerageId: this.brokerageValue,
          assessmentRequestId: this.item._id
        }
        await this.$store.dispatch('assessmentRequest/assignAssessmentRequestToBrokerage', brokerage)
        this.fetchAssessmentListByStatus(this.currentTab)
        this.$toast.success('عملیات با موفقیت انجام شد')
        this.closeBrokerage()
      } catch (e) {
        this.$toast.error('عملیات انجام نشد')
      }
    },
    closeStatus() {
      this.statusDialog = false
      this.item = null
      this.currentTab = null
    },
    closeBrokerage() {
      this.brokerageDialog = false
      this.item = null
      this.currentTab = null
    },
    async unAssignMe(item, index) {
      try {
        const data = {
          assessmentRequestId: item._id
        }
        await this.$store.dispatch('assessmentRequest/unAssignAssessmentRequestToBrokerage', data)
        this.fetchAssessmentListByStatus(index)
        this.$toast.success('عملیات با موفقیت انجام شد')
      } catch (e) {
        this.$toast.error('عملیات انجام نشد')
      }
    }
  },
}
</script>

<style scoped>

</style>
