<template>
  <div class="d-flex flex-column">
    <div class="text-h4 ma-4">Profile</div>

    <v-divider class="mt-2"></v-divider>
    <div class="user-details d-flex flex-grow-1">
      <div class="user-image d-flex flex-column flex-grow-0 align-center">
        <v-img
          class="ma-5 mt-10"
          max-height="300"
          max-width="220"
          :src="url"
        ></v-img>

        <v-btn
          color="primary"
          class="text-none d-flex justify-center align-center"
          depressed
          @click="onButtonClick"
          >Chọn ảnh
        </v-btn>
        <input
          ref="uploader"
          class="d-none"
          type="file"
          accept="image/*"
          @change="onFileChanged"
        />

        <div class="text-h7 d-flex justify-center ma-5">
          {{ this.user.userFirstName }} {{ this.user.userLastName }}
        </div>
      </div>
      <v-divider vertical></v-divider>
      <div class="user-info flex-grow-1">
        <div class="text-h6 ma-5">Thông tin cụ thể:</div>
        <template>
          <v-container fluid>
            <v-row>
              <v-col cols="2">
                <v-subheader class="text-h7">ID</v-subheader>
              </v-col>
              <v-col cols="10">
                <v-text-field v-model="user.id" disabled></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="2">
                <v-subheader>Email</v-subheader>
              </v-col>
              <v-col cols="10">
                <v-text-field v-model="user.userEmail"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="2">
                <v-subheader>Tên</v-subheader>
              </v-col>
              <v-col cols="10">
                <v-text-field v-model="user.userLastName"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="2">
                <v-subheader>Họ</v-subheader>
              </v-col>
              <v-col cols="10">
                <v-text-field v-model="user.userFirstName"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <v-subheader>Địa chỉ</v-subheader>
              </v-col>
              <v-col cols="10">
                <v-text-field v-model="user.userAddress"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <v-subheader>Điện thoại</v-subheader>
              </v-col>
              <v-col cols="10">
                <v-text-field v-model="user.userPhoneNumber"></v-text-field>
                <p class="red--text">{{ error }}</p>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <div class="d-flex justify-center align-center">
          <v-btn class="mr-5" color="primary" @click="save()">SAVE</v-btn>
          <v-btn @click="cancel()" color="error">Cancel</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "@/assets/avatar.png";
import { getInfoUser, updateUser } from "@/api/user";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      error: "",
      user: {
        userRoleId: "",
        userEmail: "",
        userAvatar: "",
        userFirstName: "",
        userLastName: "",
        userDateOfBirth: "",
        userAddress: "",
        userPhoneNumber: "",
      },
    };
  },
  computed: {
    url() {
      if (this.user.userAvatar == null) return avatar;
      else {
        return this.user.userAvatar;
      }
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      let id = this.$store.getters.id;
      try {
        const response = await getInfoUser(id);
        const data = response.data.data;
        this.user = data;
        console.log(this.user);
      } catch (e) {
        console.log(e);
      }
    },
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result;
        this.user.userAvatar = rawImg;
      };
      reader.readAsDataURL(file);
    },
    async save() {
      try {
        await updateUser(this.$store.getters.id, this.user);
        console.log(this.user);

        await this.initialize();
        await this.$store.dispatch("user/getInfo", this.$store.getters.id);
        this.$toast.success("Update User successfully", {
          position: "top",
        });
      } catch (e) {
        this.error = "Nhập đúng định dạng số điện thoại";
      }
    },
    cancel() {
      this.error = "";
      this.initialize();
    },
  },
};
</script>

<style>
.user-image {
  width: 300px;
}
</style>
