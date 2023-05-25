<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="email"
                    label="Login"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-text v-if="showError" class="red--text"
                >Invailid Login. Please login again</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      showError: false,
    };
  },
  computed: {
    ...mapGetters(["changePassword"]),
  },
  methods: {
    async login() {
      try {
        console.log(this.email, this.password);
        await this.$store.dispatch("user/login", {
          email: this.email,
          password: this.password,
        });
        if (this.changePassword) {
          this.$router.push("/dashboard");
        } else {
          this.$router.push("/changepassword");
        }
      } catch (error) {
        console.log(error);
        this.showError = true;
      }
    },
  },
};
</script>

<style></style>
