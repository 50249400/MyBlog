<template>
  <div id="Backstage">
    <el-header height="50px">
        <div>个人博客维护系统</div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="1"
            text-color="#fff"
          >
            <el-menu-item index="1" @click="menuRouter('career')">
              <el-icon><Menu/></el-icon>
              <span>职业生涯</span>
            </el-menu-item>
            <el-menu-item index="2" @click="menuRouter('setting')">
              <el-icon><Setting/></el-icon>
              <span>设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import {
  Menu,
  Setting
} from "@element-plus/icons-vue";
export default defineComponent({
  name: "Backstage",
  setup() {
    const $router = useRouter();
    // 控制菜单路由跳转
    const menuRouter = (url: string) => {
      $router.push({ path: `/backstage/index/${url}` });
    }

    return{
      menuRouter
    }
  }
});
</script>
  
<style lang="scss" scoped>
#Backstage{
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(67, 74, 80);
  border-bottom: 2px solid #ffd04b;
  color: $white;
}
.el-container.is-vertical{
  flex-direction: row;
}
.el-container{
  flex: 1;
}
.el-aside{
  background: rgb(67, 74, 80);
}
.el-main{
  --el-main-padding: 0;
}
</style>
  