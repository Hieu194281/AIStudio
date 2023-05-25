<template>
  <v-form>
    <v-container fluid class="d-flex flex-column justify-center align-center">
      <v-col cols="12s" sm="4">
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Mật khẩu cũ"
          hint="At least 8 characters"
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-col>
      <p class="red--text">{{ erroroldPassword }}</p>

      <v-col cols="12" sm="4">
        <v-text-field
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show2 ? 'text' : 'password'"
          name="input-10-2"
          label="Mật khẩu mới"
          hint="At least 8 characters"
          value=""
          v-model="new_password"
          class="input-group--focused"
          @click:append="show2 = !show2"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field
          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show3 ? 'text' : 'password'"
          name="input-10-3"
          label="Xác nhận mật khẩu mới"
          hint="At least 8 characters"
          value=""
          v-model="new_password_Cf"
          class="input-group--focused"
          @click:append="show3 = !show3"
        ></v-text-field>
      </v-col>
      <p class="red--text">{{ errorPassword }}</p>

      <v-col cols="12" sm="3"
        ><v-btn class="mr-4" @click="submit"> submit </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </v-col>
    </v-container>
  </v-form>
</template>

<script>
import { ChangePassword } from "@/api/user";
export default {
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      password: "",
      new_password: "",
      new_password_Cf: "",
      errorPassword: "",
      erroroldPassword: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    async submit() {
      console.log(this.password, this.new_password, this.new_password_Cf);
      try {
        await ChangePassword({
          oldPassword: this.password,
          newPassword: this.new_password,
          confirmPassword: this.new_password_Cf,
        });
      } catch (e) {
        if (e.response.data.errors) {
          const error = e.response.data.errors.errors;
          console.log(error);
          if (error.oldPassword) {
            this.errorPassword = "Mật khẩu cũ không đúng";
          } else if (
            error.password === "newPassword must different oldPassword "
          ) {
            this.errorPassword = "Mật khẩu mới trùng với mật khẩu cũ";
          } else {
            this.errorPassword = "Xác nhận mật khẩu không chính xác";
          }
        } else {
          await this.$toast.success("Update Password successfully", {
            position: "top",
          });
          await this.$store.dispatch("user/logout");
          this.$router.push("/login");
        }
      }
    },
    clear() {
      this.password = "";
      this.new_password = "";
      this.new_password_Cf = "";

      this.errorPassword = "";
    },
  },
};
</script>

<style></style>
