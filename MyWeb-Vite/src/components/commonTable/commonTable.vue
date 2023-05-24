<template>
  <div id="CommonTable">
    <div class="operation-buttonBox" v-if="props.buttonlist.length > 0">
      <el-button
        v-for="(item, index) in props.buttonlist"
        :key="index"
        plain
        @click="buttonPath(index,item.type)"
        >{{ item.title }}</el-button
      >
    </div>

    <el-table 
    :data="state.tableData" 
    highlight-current-row 
    stripe 
    @current-change="handleCurrentChange"
    style="width: 100%">
      <el-table-column prop="inputDate" label="日期" width="250" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="content" label="正文内容" />
    </el-table>

    <el-pagination background layout="prev, pager, next" style="margin: 15px;float: right;" :total="state.total" />

    <!-- 增改查详情弹窗 -->
    <div class="windowMask" v-show="state.showMask">
      <div class="windowMask-content">
        <div class="content-hd">
          <span>{{ state.maskTitle }}</span>
          <el-icon class="close-icon" @click="closeMask"><Close/></el-icon>
        </div>
        <el-form class="el-form" ref="form" :model="sizeForm" label-width="auto">
          <el-form-item label="时间">
            <el-date-picker
              v-model="sizeForm.inputDate"
              type="date"
              placeholder="选择时间"
              :disabled="state.maskTitle == '查看'"
            />
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="sizeForm.title" type="text" autocomplete="off" :disabled="state.maskTitle == '查看'" />
          </el-form-item>
          <el-form-item label="正文内容">
            <el-input v-model="sizeForm.content" type="text" autocomplete="off" :disabled="state.maskTitle == '查看'" />
          </el-form-item>
          <el-button v-show="state.maskTitle != '查看'" type="primary" @click="submitData">{{ state.maskTitle }}</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, defineAsyncComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { BTNListinterface } from "../../../interface/defaultController";
import {
  Close
} from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { addCourse, editCourse, deleteCourse, getTableList, getTableDetail } from "../../../service/api/backstageController";

const $router = useRouter();
const props = defineProps({
  buttonlist: {
    type: Array as () => Array<BTNListinterface>,
    default: () => [],
  },
  getDataListUrl: {
    type: String
  }
});

const state = reactive({
  showMask: false,
  maskTitle: "",
  start: 0,
  limit: 10,
  tableData: [],
  total: 0,
  tableRowVal: {
    inputDate: '',
    title: '',
    content: '',
    id: ''
  }
});

const sizeForm = reactive({
  inputDate: "",
  title: "",
  content: ""
});

let windowType : string = ""

//显示操作弹窗
const buttonPath = function (index: number,type: string) {
  state.maskTitle = props.buttonlist[index].title;
  windowType = type;
  if(type == 'edit' || type == 'detail'){
    getTableDetail(state.tableRowVal.id, '/backstage').then(res => {
      let resData = res.data.data;
      for(let key in resData){
        sizeForm[key] = resData[key];
      }
    });
  }
  if(type == 'delete'){
    alertMessage('确认要删除此条数据?', () => {
      deleteCourse({ id: state.tableRowVal.id }).then(res => {
        let resCode = res.data.code;
        if(resCode == 200){
          ElMessage({
            type: 'success',
            message: '删除成功',
          });
        }else{
          ElMessage({
            type: 'error',
            message: res.data.message,
          });
        }
      });
    });
  }else{
    state.showMask = true;
  }
};

//退出窗口
const closeMask = function(){
  state.showMask = false;
  state.maskTitle = "";
  for(let key in sizeForm){
    sizeForm[key] = "";
  }
}

//提交表单
const submitData = function(type: string){
  if(!sizeForm.inputDate){
    ElMessage.warning("请选择时间");
    return false;
  }else if(!sizeForm.title){
    ElMessage.warning("请输入标题");
  }else if(!sizeForm.content){
    ElMessage.warning("请输入正文内容");
  }else{
    const fn = windowType == 'edit' ? editCourse(sizeForm) : addCourse(sizeForm);
    fn.then(res => {
      let resData = res.data;
      if(resData.success){
        ElMessage.success(resData.message);
        closeMask();
      }else{
        ElMessage.error(resData.message);
      }
    });
  }
}

//获取列表数据
const getDataList = (url:string) => {
  let requestData = {
    start: state.start,
    limit: state.limit
  };
  getTableList(requestData,url).then(res => {
    let resData = res.data;
    state.tableData = resData.data.dataList;
    state.total = resData.data.total;
    if(!resData.success){ 
      ElMessage.error(resData.message);
    }
  })
}

/* 表格选中 */
const handleCurrentChange = (val: any) => {
  state.tableRowVal = val;
}

const alertMessage = (title: string, fn: Function) => {
  ElMessageBox.confirm(
    title,
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
      fn();
  })
    
}

onMounted(() => {
  if(props.getDataListUrl){
    let url = props.getDataListUrl;
    getDataList(url);
  }
});
</script>

<style lang="scss" scoped>
.operation-buttonBox {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgb(211, 211, 211);
  padding: 0 10px;
  box-sizing: border-box;
}
.windowMask{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  .windowMask-content{
    width: 85%;
    height: 75%;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1000;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    .content-hd{
      height: 50px;
      line-height: 50px;
      background: rgb(67, 74, 80);
      border-bottom: 2px solid #ffd04b;
      color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      box-sizing: border-box;
      .close-icon{
        font-size: 25px;
        cursor: pointer;
      }
    }
    .el-form{
      padding: 15px;
      box-sizing: border-box;
    }
  }
}
</style>

