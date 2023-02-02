<template>
  <div id="Login">
    <div class="form-box">
      <div class="form-title">欢迎，请登录</div>
      <el-form ref="ruleFormRef" :rules="ruleForm" class="form" :model="loginForm">
        <div style="width: 100%">
          <el-form-item class="formitem" label="账号" prop="username">
            <el-input v-model="loginForm.username" />
          </el-form-item>
          <el-form-item class="formitem" label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" />
          </el-form-item>
        </div>
        <el-button type="primary" plain style="width: 50%" @click="onSubmit(ruleFormRef)"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import { userLogin } from "../../../service/api/userController";
import { LoginInfo } from "../../../interface/accountController";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Login",
  setup() {
    const $router = useRouter();

    let loginForm: LoginInfo = reactive({
      username: "",
      password: "",
    });
    const ruleFormRef = ref<FormInstance>();
    // 表单校验参数
    const ruleForm = reactive<FormRules>({
      username: [{ required: true, message: "账号不能为空", trigger: "blur" }],
      password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
    });

    // 登录
    const onSubmit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          userLogin({ ...loginForm }).then((res) => {
            let resData = res.data;
            if(resData.success){
              localStorage.setItem("userInfo", JSON.stringify(resData.data));
              ElMessage.success("登录成功");
              $router.push({path: "/backstage/index"});
            }
          });
        }
      });
    };

    return {
      loginForm,
      ruleFormRef,
      ruleForm,
      onSubmit,
    };
  },
});
</script>
  
  <style lang="scss" scoped>
#Login {
  width: 100vw;
  height: 100vh;
  background-image: url(../../assets/images/home-bg.jpg);
  background-size: cover;
}
.form-box {
  width: 650px;
  height: 350px;
  border-radius: 15px;
  position: fixed;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  .form-title {
    color: $white;
    font-size: 28px;
    text-align: center;
    font-weight: bold;
  }
  .form {
    flex: 1;
    background-color: $white;
    margin-top: 10px;
    border-radius: 15px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    .formitem {
      padding: 20px 0;
      margin-bottom: 0;
    }
  }
}
</style>
  