<template>
  <v-data-table
    :headers="headers"
    :items="users"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>List User</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }"
            ><v-icon color="blue darken-4" class="mr-2" v-bind="attrs" v-on="on"
              >mdi-note-plus-outline</v-icon
            >
          </template>
          <v-card style="border-radius: 2%">
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="10" md="10" xl="10">
                    <v-text-field
                      v-model="editedItem.id"
                      label="ID"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="10" md="10" xl="10">
                    <v-text-field
                      v-model="editedItem.userEmail"
                      label="Email"
                    ></v-text-field>
                    <p class="red--text">{{ errorEmail }}</p>
                    <p></p>
                  </v-col>
                  <v-col cols="12" sm="10" md="5" xl="5">
                    <v-text-field
                      v-model="editedItem.userFirstName"
                      label="First name"
                    ></v-text-field>
                    <p class="red--text">{{ errorFirstName }}</p>
                  </v-col>
                  <v-col cols="12" sm="10" md="5" xl="5">
                    <v-text-field
                      v-model="editedItem.userLastName"
                      label="Last name"
                    ></v-text-field>
                    <p class="red--text">{{ errorLastName }}</p>
                  </v-col>
                  <v-col cols="12" sm="10" md="10" xl="10">
                    <v-select
                      :items="dataRole"
                      v-model="editedItem.userRoleName"
                      item-text="roleName"
                      item-value="roleName"
                      label="Role"
                    ></v-select>
                    <p class="red--text">{{ errorRole }}</p>
                  </v-col>
                  <v-col cols="12" sm="10" md="10" xl="10">
                    <v-text-field
                      v-model="editedItem.userAddress"
                      label="Address"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-text-field
          max-width="100"
          class="size-0 rounded-xl justify-center mt-5 ml-4"
          solo
          v-model="search"
          placeholder="Search..."
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
        <v-dialog v-model="dialogDelete" max-width="600px" class="d-flex">
          <v-card>
            <v-card-title class="text-h5 d-flex">
              <v-icon dark color="red"> mdi-minus-circle </v-icon>
              Are you sure you want to delete this user?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { parseTime } from "@/utils/parseTime";
import { getUser, deleteUser, updateUser, addUser } from "@/api/user";
import { getRole } from "@/api/role";
import user from "@/store/modules/user";
export default {
  data: () => ({
    search: "",
    errorRole: "",
    errorEmail: "",
    errorLastName: "",
    errorFirstName: "",
    itemsRole: {},
    menu: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: true,
        value: "id",
      },
      {
        text: "FirstName",
        align: "start",
        sortable: false,
        value: "userFirstName",
      },
      {
        text: "LastName",
        align: "start",
        sortable: false,
        value: "userLastName",
      },
      { text: "Email", value: "userEmail", sortable: true },
      { text: "Role", value: "userRoleName", sortable: false },
      { text: "InitPassword", value: "userInitPassword", sortable: false },
      {
        text: "CreatedTime",
        value: "createDate",
        sortable: false,
        title: "1111",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],

    users: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      userEmail: "",
      userFirstName: "",
      userLastName: "",
      userRoleId: "",
      userAddress: "",
      createDate: "",
    },
    defaultItem: {
      userEmail: "",
      userFirstName: "",
      userLastName: "",
      userRoleId: "",
      userAddress: "",
      createDate: "",
    },

    dataRole: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
    this.getRole();
  },

  methods: {
    async getRole() {
      const resRole = await getRole();
      this.dataRole = resRole.data.data;
      // dataRole.forEach((role) => {
      //   this.itemsRole.push({ id: role.id, roleName: role.roleName });
      // });

      this.dataRole.forEach((role) => {
        this.itemsRole[role.roleName] = role.id;
      });
    },

    async initialize() {
      const res = await getUser();
      let data = res.data.dataList;

      this.users = data;
      this.users.forEach((user) => {
        user.createDate = parseTime(user.createDate);
      });
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      console.log(this.editedItem);
      await deleteUser(this.editedItem.id);
      this.$toast.success("Delete User successfully", {
        position: "top",
      });
      this.users.splice(this.editedIndex, 1);
      this.initialize();
      this.closeDelete();
    },

    close() {
      this.errorFirstName = "";
      this.errorLastName = "";
      this.errorEmail = "";
      this.errorRole = "";
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        try {
          await updateUser(this.editedItem.id, {
            userRoleId: this.itemsRole[this.editedItem.userRoleName],
            userEmail: this.editedItem.userEmail,
            userAvatar: null,
            userFirstName: this.editedItem.userFirstName,
            userLastName: this.editedItem.userLastName,
            userDateOfBirth: null,
            userAddress: this.editedItem.userAddress,
            userPhoneNumber: null,
          });
          this.$toast.success("Update User successfully", {
            position: "top",
          });
          this.initialize();
          this.close();
        } catch (e) {
          this.$toast.error("Update User unsuccessfully", {
            position: "top",
          });
        }
      } else {
        console.log(this.editedItem);
        try {
          await addUser({
            userRoleId: this.itemsRole[this.editedItem.userRoleName],
            userEmail: this.editedItem.userEmail,
            userAvatar: null,
            userFirstName: this.editedItem.userFirstName,
            userLastName: this.editedItem.userLastName,
            userDateOfBirth: null,
            userAddress: this.editedItem.userAddress,
            userPhoneNumber: null,
          });
          this.$toast.success("Add User successfully", {
            position: "top",
          });
          this.initialize();
          this.close();
        } catch (e) {
          const error = e.response.data.errors.errors;

          if (error.firstName) {
            this.errorFirstName = "Không để trống mục này";
          } else {
            this.errorFirstName = "";
          }
          if (error.lastName) {
            this.errorLastName = "Không để trống mục này";
          } else {
            this.errorLastName = "";
          }
          if (error["user role id"]) {
            this.errorRole = "Không để trống mục này";
          } else {
            this.errorRole = "";
          }
          if (error.userEmail) {
            this.errorEmail =
              "Không để trống và điền giống định dạng example@gmail.com";
          } else {
            this.errorEmail = "";
          }
        }
      }
    },
  },
};
</script>
