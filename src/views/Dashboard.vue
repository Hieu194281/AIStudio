<template>
  <div>
    <div class="text-h4 ma-4">Quản lí người dùng</div>

    <table-user></table-user>
  </div>
</template>

<script>
import AddUser from "@/components/AddUser.vue";
import TableUser from "@/components/TableUser.vue";
export default {
  components: { AddUser, TableUser },
};
</script>

<style></style>
