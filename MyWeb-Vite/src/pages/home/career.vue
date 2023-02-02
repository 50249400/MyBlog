<template>
  <div id="home-career">
    <div class="year-box">
        <div class="year-career" v-for="(item,index) in state.yearArr" :key="index" @click="changeYear(item)">
            <div class="year-box-item">
                {{ item }}
            </div>
            <div class="dashline" v-if="index != state.yearArr.length - 1"></div>
        </div>
    </div>
    <ul v-infinite-scroll="ulLoad" class="infinite-list">
      <li
        v-for="(item, index) in state.tableData"
        :key="index"
        class="infinite-list-item"
      >
        <div class="item-content">
          <span class="title">{{ item.title }}</span>
          <span class="date">{{ item.inputDate }}</span>
          <div class="content">
            {{ item.content }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import { getTableList } from "../../../service/api/backstageController";
import format from "../../common/formart";

let state = reactive({
  start: 10,
  limit: 10,
  year: "",
  tableData: [],
  total: 0,
  yearArr: [] as any[]
});

const ulLoad = () => {
  console.log("触底");
};

//获取列表数据
const getDataList = (url: string) => {
  let requestData = {
    start: state.start,
    limit: state.limit,
    year: state.year
  };
  getTableList(requestData, url).then((res) => {
    let resData = res.data;
    state.total = resData.data.total;
    state.yearArr = resData.data.yearArr;
    let dataList = resData.data.dataList;
    
    for (let val of dataList) {
      val.inputDate = format(val.inputDate, "YY-MM-DD");
    }
    state.tableData = dataList;

    if (!resData.success) {
      ElMessage.error(resData.message);
    }
  });
};

// 筛选年份
const changeYear = (year:string) => {
    state.year = year;
    state.start = 0;
    getDataList("/backstage/getCourseList");
}

onMounted(() => {
  getDataList("/backstage/getCourseList");
});
</script>

<style lang="scss" scoped>
#home-career {
    position: relative;
    .year-box{
        width: 200px;
        height: 88%;
        position: absolute;
        left: 5%;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        .year-career{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            &:hover{
                opacity: .8;
            }
        }
        .year-box-item{
            width: 100%;
            height: 65px;
            line-height: 65px;
            text-align: center;
            background: $white;
            color: var(--el-color-primary);
            font-size: 30px;
            font-weight: bold;
            border-radius: 15px;
            
        }
        .dashline{
            flex: 1;
            width: 10px;
            border-left: 10px dashed $white;
        }
    }
  .infinite-list {
    width: 60%;
    height: 88vh;
    padding: 0;
    margin: 0 auto;
    list-style: none;
    overflow: auto;
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
  }
  .infinite-list .infinite-list-item {
    margin: 15px 0;
    .item-content {
      background: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
      padding: 15px;
      box-sizing: border-box;
      .title {
        margin-right: 15px;
      }
      .date {
        font-size: 13px;
        color: $darkGray;
      }
      .content {
        margin-top: 15px;
        color: $red;
      }
    }
  }
  .infinite-list .infinite-list-item + .list-item {
    margin-top: 10px;
  }
}
</style>
