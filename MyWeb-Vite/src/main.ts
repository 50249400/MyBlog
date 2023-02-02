import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import locale from 'element-plus/lib/locale/lang/zh-cn';


// 导入请求拦截器
import { Request } from '../service/interceptors'
import VueAxios from 'vue-axios'


const app = createApp(App);
app.use(router)
app.use(ElementPlus,{locale})
app.use(VueAxios, Request.init())
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
