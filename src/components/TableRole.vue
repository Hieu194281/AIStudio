<template>
  <v-data-table
    :headers="headers"
    :search="search"
    :items="roles"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>List Role</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="blue darken-4" class="mr-2" v-bind="attrs" v-on="on"
              >mdi-note-plus-outline</v-icon
            >
          </template>

          <v-card style="border-radius: 2%">
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text class="d-flex justify-center align-center">
              <v-container
                class="d-flex flex-column justify-center align-center"
              >
                <v-img
                  height="175px"
                  :src="url"
                  width="150px"
                  class="mb-5"
                  round
                ></v-img>
                <v-btn
                  color="primary"
                  class="text-none"
                  depressed
                  @click="onButtonClick"
                  >Chọn ảnh
                </v-btn>
                <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  @change="onFileChanged"
                />
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="10" md="10" xl="10">
                    <v-text-field
                      v-model="editedItem.roleName"
                      label="Role"
                    ></v-text-field>
                    <p class="red--text">{{ errorAddRole }}</p>
                  </v-col>

                  <v-col cols="12" sm="10" md="10" xl="10">
                    <v-text-field
                      v-model="editedItem.roleDesc"
                      label="Description"
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
          v-model="search"
          max-width="100"
          class="size-0 rounded-xl justify-center mt-5 ml-4"
          solo
          placeholder="Search..."
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
        <v-dialog v-model="dialogDelete" max-width="500px" class="d-flex">
          <v-card>
            <v-card-title class="text-h5 d-flex">
              <v-icon dark color="red"> mdi-minus-circle </v-icon> Are you sure
              you want to delete role?</v-card-title
            >

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm()">
                OK</v-btn
              >
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
import avatar from "@/assets/avatar.png";
import { getRole, addRole, updateRole, deleteRole } from "@/api/role";
export default {
  data: () => ({
    menu: false,
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Role",
        align: "start",
        sortable: false,
        value: "roleName",
      },
      { text: "Description", value: "roleDesc", sortable: false },
      { text: "CreatedTime", value: "createDate", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    roles: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      icon: avatar,
      roleName: "",
      roleDesc: "",
      createDate: "",
    },
    defaultItem: {
      id: "",
      icon: avatar,
      roleName: "",
      roleDesc: "",
    },
    errorAddRole: "",
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Role" : "Edit Role";
    },
    url() {
      if (this.editedItem.icon == null) return avatar;
      else {
        return this.editedItem.icon;
      }
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
  mounted() {
    this.initialize();
  },

  methods: {
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
        console.log(rawImg);
        this.editedItem.icon = rawImg;
      };
      reader.readAsDataURL(file);
    },
    async initialize() {
      const res = await getRole();
      this.roles = await res.data.data;
      this.roles.forEach((role) => {
        role.createDate = parseTime(role.createDate);
      });
    },

    editItem(item) {
      this.editedIndex = this.roles.indexOf(item);

      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.roles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      console.log(this.editedItem);
      try {
        let res = await deleteRole(this.editedItem.id);
        const { data } = res;
        if (data.message === "deleteSucess") {
          this.roles.splice(this.editedIndex, 1);
          this.closeDelete();
          this.$toast.success("Delete Role successfully", {
            position: "top",
          });
        }
      } catch (e) {
        this.closeDelete();
        this.$toast.error("Delete Role unsuccessfully, Invailid User in Role", {
          position: "top",
        });
      }
    },

    close() {
      this.errorAddRole = "";
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
        console.log(this.editedItem);
        try {
          await updateRole(this.editedItem.id, {
            roleName: this.editedItem.roleName,
            roleDesc: this.editedItem.roleDesc,
            icon: this.editedItem.icon,
          });
          this.$toast.success("Update Role successfully", {
            position: "top",
          });
          this.initialize();
        } catch {
          this.$toast.error("Update Role unsuccessfully", {
            position: "top",
          });
        }
        this.close();
      } else {
        try {
          console.log(this.editedItem.roleName, this.editedItem.roleDesc);
          await addRole({
            icon: this.editedItem.icon,
            roleName: this.editedItem.roleName,
            roleDesc: this.editedItem.roleDesc,
          });
          this.initialize();
          this.$toast.success("Add Role successfully", {
            position: "top",
          });
          this.errorAddRole = "";
          this.close();
        } catch (e) {
          console.log(e);
          console.log();
          const error = e.response.data.errors.roleName;
          if (error == "RoleNameExit") {
            this.errorAddRole = "RoleName đã tồn tại";
          } else {
            this.errorAddRole = "RoleName không được để trống";
          }
        }
      }
    },
  },
};
</script>
