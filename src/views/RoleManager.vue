<template>
  <div>
    <div class="text-h4 ma-4">Quản lí Role (phân quyền)</div>
    <TableRole></TableRole>
  </div>
</template>

<script>
import AddUser from "@/components/AddUser.vue";
import TableRole from "@/components/TableRole.vue";
export default {
  components: { AddUser, TableRole },
};
</script>

<style></style>
