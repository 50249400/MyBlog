<template>
  <div id="career" class="router-view">
    <common-table :buttonlist="buttonList" get-data-list-url="/backstage/getCourseList">
    </common-table>
  </div>
</template>
      
<script setup lang="ts">
import { defineComponent, ref, defineAsyncComponent, reactive } from "vue";
const CommonTable = defineAsyncComponent(() => import("../../../components/commonTable/commonTable.vue"));
const buttonList = [
  {
    title: "新增",
    type: "add"
  },
  {
    title: "修改",
    type: "edit"
  },
  {
    title: "删除",
    type: "delete"
  },
  {
    title: "查看",
    type: "detail"
  },
];
</script>
      
<style lang="scss" scoped>
</style>
      