<template>
  <div id="Home">
    <header>
        <div class="hd-top">
          <div
            class="hd-top-item"
            :class="{ select: menuIndex == index }"
            v-for="(item, index) in menuList"
            :key="index"
            @click="hdTopMenuClick(index)"
          >
            {{ item.title }}
          </div>
        </div>
      </header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
export default defineComponent({
  name: "Home",
  setup() {
    let menuIndex = ref(0);
    const menuList = [
      {
        title: "职业生涯",
      },
      {
        title: "开发中",
      },
    ];

    const state = reactive({
      start: 0,
      limit: 10,
      tableData: [],
      total: 0
    });

    function hdTopMenuClick(index: number) {
      menuIndex.value = index;
    }

    return {
      menuIndex,
      menuList,
      hdTopMenuClick,
    };
  },
});
</script>

<style lang="scss" scoped>
#Home {
  width: 100vw;
  height: 100vh;
  background-image: url(../../assets/images/home-bg.jpg);
  background-size: cover;
  overflow: hidden;
}
.content {
  height: inherit;
  display: flex;
  flex-direction: column;
}
header {
    background: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    .hd-top {
      width: 85%;
      height: 45px;
      line-height: 45px;
      color: #ffffff;
      display: flex;
      .hd-top-item {
        width: 120px;
        text-align: center;
        cursor: pointer;
      }
      .select {
        background: #2f4f4f;
      }
    }
  }
</style>
