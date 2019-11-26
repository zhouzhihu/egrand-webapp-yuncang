// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import uploader from 'vue-simple-uploader'
import VueEasyCm from 'vue-easycm'
import $ from 'jquery'
import router from './router'
import '../src/util/format';
import promise from 'es6-promise';
promise.polyfill();
import { Httpclient,auth,anycshttp } from '../src/util/httplient';
import { getcinditionForm,common } from '../src/util/common';
//******样式文件
import '../theme/index.css'
import 'font-awesome/css/font-awesome.min.css'
Vue.use(VueEasyCm)

Vue.config.productionTip = false
Vue.prototype.$mycommon = new common();
Vue.prototype.$egdCommon = Vue.prototype.$mycommon;
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(uploader)
Vue.prototype.$httpclient = new Httpclient("/kfzptportalapi","kfzpt-api-token");
Vue.prototype.$openhttpclient = new Httpclient("/kfzptportalapi","kfzpt-api-token",'isopen');  //发布的页面不需要做鉴权校验
Vue.prototype.$anycshttp = new anycshttp("/kfzptportalapi","kfzpt-api-token");   //同步请求
//这个是所有使用组件的表单初始化，在表达做ajax交互的还好需要使用到，使用如下注释，得到符合交互要求的对象
// var deal ={
//   "VmodelInput":that.inputValue,
//   "VmodelselectVal":that.selectData,
//   "VmodelMupVal":that.mupSelectData
// }
// that.FormObj = that.$initCinditionForm.getcinditionForm(deal)
Vue.prototype.$initCinditionForm = new getcinditionForm();
const $auth = new auth();
Vue.prototype.$auth = new auth();
/* eslint-disable no-new */
async function MainSyncInit() {
  const response = await new Promise(resolve => {
      new Httpclient("/kfzptportalapi","kfzpt-api-token").notokenget('/web/static/mock/dns_env.json', {}, function (res) {
        resolve(res);
      })
  });
  const loginUrl = response.dns.sso_host+'/logout?service='+response.dns.sso_host+'/login?service='+response.dns.home_host+response.dns.home_url;
  const home_url= response.dns.home_host+response.dns.home_url
  router.beforeEach((to, from, next) => {
    // 判断该路由是否需要登录权限
    if ($auth.getToken()) { //当前是否有token存在
      if(to.path=="/login"){
        $auth.removeToken();;
        window.location.href = loginUrl;
      }else{
        next();
      }
    }else{
      if(!response.dns.isCaslogin){
        //不是cas验证登陆，就跳到默认路由（如果接口有做token认证，则先跳到登陆页）
        // next("/login");
        next();
      }
      else if($auth.IsAuTh){ //是否需要鉴权
        var url = document.location.href;
        var ticketLen = "ticket=".length;
        var ticketIndex = url.indexOf("ticket=");
        if(ticketIndex != -1){
          url = url.substring(url.indexOf("ticket=")+ticketLen);
          url = url.substring(0,url.indexOf("#"));
          $auth.setToken("token_api_"+url);
          window.location.href = home_url;
          // window.location.href = "/";
        }else{
          window.location.href = loginUrl;
        }
      }else{
        next();
      }
    }
  })
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
}
MainSyncInit()
