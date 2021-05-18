<template>
  <v-navigation-drawer
      v-model="Sidebar_drawer"
      :dark="SidebarColor !== 'white'"
      :color="SidebarColor"
      mobile-breakpoint="960"
      clipped
      :right="$vuetify.rtl"
      mini-variant-width="70"
      :expand-on-hover="expandOnHover"
      app
      id="main-sidebar"
      v-if="user"
  >
    <v-list dense nav>
      <!---USer Area -->
      <v-list-item two-line class="px-0">
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg"/>
        </v-list-item-avatar>

        <v-list-item-content v-if="user">
          <v-list-item-title>{{ user.nickname }}</v-list-item-title>
          <!--          <v-list-item-subtitle class="caption">Webdesigner</v-list-item-subtitle>-->
        </v-list-item-content>
      </v-list-item>
      <!---USer Area -->
      <!---Sidebar Items -->
      <template>
      <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          :active-class="`success white--text`"
          link
      >
        <template v-if="permission().can(item.permission)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-item>
      </template>

      <!--      <template v-for="(item,index) in items">-->
      <!--        <router-link :key="index" :to="item.to" v-if="new Permission().can(item.permission)">{{item.title}}</router-link>-->
      <!--      </template>-->

      <!---Sidebar Items -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {mapState} from "vuex";
import {permission} from '../../plugins/permission'

export default {
  name: "Sidebar",
  props: {
    expandOnHover: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    permission,
    items: [
      {
        title: "داشبورد",
        icon: "mdi-view-dashboard",
        to: "/dashboard/basic-dashboard",
        permission: 'user_manager'
      },
      {
        title: "مدیریت کاربران",
        icon: "mdi-account-circle",
        to: "/users",
        permission: 'user_manager'
      },

      {
        title: "مدیریت سازمان ها",
        icon: "mdi-account-circle",
        to: "/organizations",
        permission: 'user_manager'
      },
      {
        title: "مدیریت محصولات",
        icon: "mdi-account-circle",
        to: "/products",
        permission: 'user_manager'
      },
      {
        title: "مدیریت اپیزودها",
        icon: "mdi-account-circle",
        to: "/episodes",
        permission: 'user_manager'
      },
      {
        title: "درخواست ارزیابی",
        icon: "mdi-account-circle",
        to: "/assessmentRequest",
        permission: 'user_manager'
      },
      {
        title: "درخواست ارزیابی 1",
        icon: "mdi-account-circle",
        to: "/assessmentRequest1",
        permission: 'user_manager'
      },
      {
        title: "مشاهده درخواست ارزیابی",
        icon: "mdi-account-circle",
        to: "/viewAssessmentRequest",
        permission: 'user_manager'
      },
    ]
  }),
  computed: {
    ...mapState(["SidebarColor", "SidebarBg"]),
    Sidebar_drawer: {
      get() {
        return this.$store.state.Sidebar_drawer;
      },
      set(val) {
        this.$store.commit("SET_SIDEBAR_DRAWER", val);
      }
    },
    user() {
      console.log(this.$store.getters['getCurrentUser'])
      return this.$store.getters['getCurrentUser']
    },
  },
  watch: {
    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    }
  },

  methods: {
  }
};
</script>
<style lang="scss">
#main-sidebar {
  box-shadow: 1px 0 20px rgba(0, 0, 0, .08);
  -webkit-box-shadow: 1px 0 20px rgba(0, 0, 0, .08);

  .v-navigation-drawer__border {
    display: none;
  }

  .v-list {
    padding: 8px 15px;
  }

  .v-list-item {
    &__icon--text,
    &__icon:first-child {
      justify-content: center;
      text-align: center;
      width: 20px;

    }

  }
}
</style>
