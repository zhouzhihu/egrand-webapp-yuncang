import axios from "axios";
import router from '../router/index';
import { Message } from 'element-ui';
axios.interceptors.request.use(
  config => {
    if (this.getToken()==null) {
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });
var instance1 = axios.create({
  timeout: 60000
});
var setDate2 = function(data,fun){
  if(data.errorCode == '060004'){
      Message.error('帐号身份己过期,请重新登录')
    if(new auth().IsAuTh){
      router.push({"path":"/login"});
    }
  }else{
    fun(data);
  }

}

var setDate = function (url,response,fun) {
  if(response!=null && response!=undefined){
    if(response.response !=null && response.response.status!='200'){
      if(new auth().isToken(url)) {
        new auth().removeToken();
      }
      var data =  {
        'success':false,
        'errorCode':response.response.status,
        'errorMsg':response.message,
        'data':''
      };
      fun(data);
    }
  }
}
export class Httpclient {
  constructor(httpApicode,XAPITOKEN,isopen){
    this.httpApicode = httpApicode    //请求的项目的识别code，例如："/tjfxapi","/lcyqapi"
    this.XAPITOKEN = XAPITOKEN       //请求的项目的请求头headers的名称
    this.isopen = isopen             //是否使用不需要校验token方式的请求
  }
  get(url,params,fun) {
    if(this.isopen=="isopen"?false:true&&new auth().getToken()==null){
      Message.error('帐号身份己过期,请重新登录')
      router.push({"path":"/login"});
    }else{
      instance1.get(this.httpApicode+url, {
        params: params,
        headers:[this.isopen]? {
          "analysisCode":new auth().getanalysisCode('analysisCode'),
          "securityId":new auth().getsecurityId('securityId'),
          [this.XAPITOKEN]:new auth().getToken()
      }:{[this.XAPITOKEN]:new auth().getToken()}
      }).then(function (response) {
        setDate2(response.data,fun);
      }).catch(function (response) {
        setDate(url,response,fun);
      });
    }
  }
  notokenget(url,params,fun) {
    instance1.get(this.httpApicode+url, {
      params: params,
      headers: {[this.XAPITOKEN]:new auth().getToken()}
    }).then(function (response) {
      setDate2(response.data,fun);
    }).catch(function (response) {
      setDate(url,response,fun);
    });
  }
  post(url,params,fun,headers) {
      var newHeaders = {
        headers:[this.isopen]? {
          "analysisCode":new auth().getanalysisCode('analysisCode'),
          "securityId":new auth().getsecurityId('securityId'),
          [this.XAPITOKEN]:new auth().getToken()
          }:{[this.XAPITOKEN]:new auth().getToken()}
      }
      if( arguments.length == 4){
        newHeaders["headers"]=headers;
      }
      if(this.isopen=="isopen"?false:true&&new auth().getToken()==null){
        Message.error('帐号身份己过期,请重新登录')
        router.push({"path":"/login"});
      }else{
        instance1.post(this.httpApicode+url, params,newHeaders
        ).then(function (response) {
          setDate2(response.data,fun);
        }).catch(function (response) {
          setDate(url,response,fun);
        });
      }
  }
  del(url,params,fun){
    if(this.isopen=="isopen"?false:true&&new auth().getToken()==null){
      Message.error('帐号身份己过期,请重新登录')
      router.push({"path":"/login"});
    }else{
      instance1.delete(this.httpApicode+url, {
        params: params,
        headers:[this.isopen]? {
          "analysisCode":new auth().getanalysisCode('analysisCode'),
          "securityId":new auth().getsecurityId('securityId'),
          [this.XAPITOKEN]:new auth().getToken()
      }:{[this.XAPITOKEN]:new auth().getToken()}
      }).then(function (response) {
        setDate2(response.data,fun);
      }).catch(function (response) {
        setDate(url,response,fun);
      });
    }
  }
  put(url,params,fun) {
    if(this.isopen=="isopen"?false:true&&new auth().getToken()==null){
      Message.error('帐号身份己过期,请重新登录')
      router.push({"path":"/login"});
    }else{
      instance1.put(this.httpApicode+url, params,{headers:{[this.XAPITOKEN]:new auth().getToken()}}
      ).then(function (response) {
        setDate2(response.data,fun);
      }).catch(function (response) {
        setDate(url,response,fun);
      });
    }
  }
  loginPost(url,params,fun,headers){
    var newHeaders = {
      headers:[this.isopen]? {
        "analysisCode":new auth().getanalysisCode('analysisCode'),
        "securityId":new auth().getsecurityId('securityId'),
        [this.XAPITOKEN]:new auth().getToken()
    }:{[this.XAPITOKEN]:new auth().getToken()}
    }
    if( arguments.length == 4){
      newHeaders["headers"]=headers;
    }
    instance1.post(this.httpApicode+url, params,newHeaders
      ).then(function (response) {
        setDate2(response.data,fun);
      }).catch(function (response) {
        setDate(url,response,fun);
    });
  }
}
export class anycshttp{
    constructor(httpApicode,XAPITOKEN){
        this.httpApicode = httpApicode    //请求的项目的识别code，例如："/tjfxapi","/lcyqapi"
        this.XAPITOKEN = XAPITOKEN       //请求的项目的请求头headers的名称
    }
  async anycshttpData(ajaxDataArr) {
    var that =this
    var resvData=[]
    for(var i=0;i<ajaxDataArr.length;i++){
      var data = await new Promise((resolve) => {
        if(ajaxDataArr[i].type=='notokenget'||ajaxDataArr[i].type==undefined){
          new Httpclient(this.httpApicode,this.XAPITOKEN).notokenget(ajaxDataArr[i].url, ajaxDataArr[i].params, function (res) {
             resolve(res);
          })
        }
        if(ajaxDataArr[i].type=='get'){
          new Httpclient(this.httpApicode,this.XAPITOKEN).get(ajaxDataArr[i].url, ajaxDataArr[i].params, function (res) {
            resolve(res);
          })
        }
        if(ajaxDataArr[i].type=='post'){
          new Httpclient(this.httpApicode,this.XAPITOKEN).post(ajaxDataArr[i].url, ajaxDataArr[i].params, function (res) {
            resolve(res);
          })
        }
       });
       resvData.push(data)
    }
    return new Promise((resolve) => {
      setTimeout(function(){
      resolve(resvData);
      },3000)
    })

  }
}
export class auth{
  constructor(){
      this.TokenKey = "kfzpt-api-token"
      this.CurrentTime = "CURRENT-TIME"
      this.IsAuTh=true
  }
  getTokenKey() {
    return this.TokenKey;
  }
  getToken(token) {
    var that = this;
    var curtimes = new Date().getTime();
    var oldtimes = sessionStorage.getItem(that.CurrentTime);
    if( oldtimes==null ){
      return null;
    }else if( (curtimes - oldtimes) > 35*60*1000 ){
      return that.removeToken();
    }else{
      sessionStorage.setItem(that.CurrentTime,new Date().getTime());
      return sessionStorage.getItem(that.TokenKey);
    }
  }
  setToken(token) {
    var that = this;
    sessionStorage.setItem(that.CurrentTime,new Date().getTime());
    return sessionStorage.setItem(that.TokenKey,token);
  }
  removeToken() {
    var that = this;
    sessionStorage.removeItem(that.CurrentTime);
    sessionStorage.removeItem(that.TokenKey);
    return null;
  }
  isToken(url){
    var whiteList = ["/login"];
    if(whiteList.indexOf(url) !== -1) {
      return true;
    }else{
      return false;
    }
  }
  setUsername(username){
    return sessionStorage.setItem("userName",username);
  }
  setTaxcode(taxcode){
    return sessionStorage.setItem("taxCode",taxcode);
  }
  getUsername(username){
  return sessionStorage.getItem("userName",username);
  }
  getTaxcode(taxcode){
    return sessionStorage.getItem("taxCode",taxcode);
  }
  getsecurityId(securityId){
    return sessionStorage.getItem("securityId",securityId);
  }
  getanalysisCode(analysisCode){
    return sessionStorage.getItem("analysisCode",analysisCode);
  }
}
