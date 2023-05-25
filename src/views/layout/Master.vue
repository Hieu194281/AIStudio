<template>
  <v-app id="inspire">
    <v-navigation-drawer clipped v-model="drawer" app class="pa-0">
      <v-divider></v-divider>
      <v-list>
        <v-list-item to="/dashboard">
          <v-list-item-icon
            ><v-icon>mdi-account-details</v-icon></v-list-item-icon
          >
          <v-list-item-title>Quản lí người dùng</v-list-item-title>
        </v-list-item>
        <v-list-group
          no-action
          :value="true"
          prepend-icon="mdi-note-multiple-outline"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Quản lí role</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item to="/abcd">
            <v-list-item-title>ABCD</v-list-item-title>
          </v-list-item>
          <v-list-item to="/efgh">
            <v-list-item-title>EFGH</v-list-item-title>
          </v-list-item>
          <v-list-item to="role">
            <v-list-item-title>Quản lí Role</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item to="/settings">
          <v-list-item-icon><v-icon>mdi-cogs</v-icon></v-list-item-icon>
          <v-list-item-title>Cài đặt</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat app class="blue darken-4 white--text" clipped-left>
      <v-app-bar-nav-icon
        color="white"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title @click="toHome">AI Studio for TA</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="user-info mr-4">
        <p>{{ user.email }}</p>
        <p>{{ user.name }}</p>
      </div>
      <v-avatar class="mr-2" color="primary" size="40"
        ><v-icon>mdi-account-circle</v-icon></v-avatar
      >
      <v-menu offset-y close-on-click>
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="white" dark v-bind="attrs" v-on="on">
            mdi-chevron-down
          </v-icon>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in itemsMenu"
            :key="index"
            :to="item.address"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout()">Đăng xuất</v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    drawer: null,
    itemsMenu: [
      { title: "Thông tin cá nhân", address: "/profile" },
      { title: "Lịch sử đăng nhập", address: "/history" },
      { title: "Đổi mật khẩu", address: "/changepassword" },
    ],
    closeOnClick: true,
    itemsSidebar: [
      {
        title: "Quản lí user",
        icon: "mdi-account-details",
        address: "/dashboard",
      },
      {
        title: "Quản lí role",
        icon: "mdi-note-multiple-outline",
        subLinks: [
          { title: "abcd", subaddress: "/role/abcd" },
          { title: "efgh", subaddress: "/role/efgh" },
          { title: "Quản lí Role", subaddress: "role/manager" },
        ],
      },
      { title: "Settings", icon: "mdi-cogs", address: "/settings" },
    ],
  }),
  computed: {
    user() {
      return {
        email: this.$store.getters.email,
        name:
          this.$store.getters.firstName + " " + this.$store.getters.lastName,
      };
    },
  },
  mounted() {
    this.$store.dispatch("user/getInfo", this.$store.getters.id);
  },
  methods: {
    toHome() {
      this.$router.push("/dashboard");
    },
    async logout() {
      console.log("logoutuut");
      await this.$store.dispatch("user/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0;
  margin-left: 5px;
}
</style>
