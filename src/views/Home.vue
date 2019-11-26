<template>
  <el-row class="container">
    <!--头部-->
    <div class="homeMainHeaderMenu" v-show="thisHiddenContent">
      <div class="topbar-wrap">
        <div class="topbar-logo topbar-btn">
        </div>
        <div class="topbar-title topbar-btn">
            <span class="headerW">
                <img class="headerW-img"  src="../../static/assets/img/logo_tjfxpt.png"/>
            </span>
        </div>
        <div class="topbar-account topbar-btn user_btn">
          <el-dropdown trigger="click">
						<span class="el-dropdown-link userinfo-inner">
		          	<img style="vertical-align: middle;height: 15px;margin-bottom: 2px;"
                     src="../../static/assets/img/home-hy.png"/> 欢迎你，广州忆科 </span>
            <el-dropdown-menu slot="dropdown" class="position_down">
              <el-dropdown-item class="click el-dropdown-menu_nopadding">
              <div>
              <div class="click1" @click="userinfoClick"><img src="../../static/assets/img/jbxx2.png" /><br />用户信息</div>
              </div>
              </el-dropdown-item>
              <el-dropdown-item class="logout">
                <div @click="logout">退出系统</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!--中间-->
    <el-col :span="24" class="homeMainContainer" id="homeMainContainer">
      <!--左侧导航-->
      <div v-show="thisHiddenContent1" class="homeMainContainerSideMenu" id="tuola"
           style="height: 100%;background-color: #ECF4F7;z-index: 999;overflow-y: auto;overflow-x:hidden;">
        <aside id="aside" :class="collapsed?'menu-collapsed':'menu-expanded'" style="height: 100%;max-width: 70px;background:#043869;">
          <div id="tjfxMenu">
            <ul class="icon-list">
              <li>
                <el-badge :value="8" class="item" style="margin-right: 0px">
                  <span @click="openTab({'name': '我', 'path': '#/person', icon: 'el-icon-user-solid'})">
                    <i class="el-icon-user-solid"></i>
                    <span class="icon-name">我</span>
                  </span>
                </el-badge>
              </li>
              <li>
                <span @click="openTab({'name': '组织', 'path': '#/organize', icon: 'el-icon-s-home'})">
                    <i class="el-icon-s-home"></i>
                    <span class="icon-name">组织</span>
                </span>
              </li>
              <li>
                <span @click="openTab({'name': '云仓', 'path': '#/cloud', icon: 'el-icon-folder-opened'})">
                  <i class="el-icon-folder-opened"></i>
                  <span class="icon-name">云仓</span>
                </span>
              </li>
              <li>
                <span>
                  <i class="el-icon-setting"></i>
                  <span class="icon-name">配置</span>
                </span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      <!--右侧内容区-->
      <section class="content-container" style="overflow: auto;" id="contentContainer">
        <!--面包屑-->
        <div class="navboard" v-show="navhidden">
          <!--按钮区-->
          <div class="home_group_btn">
            <div class="tab_button" style="white-space: nowrap;overflow: hidden;">
              <a @click="shang"><img class="img_nav" src="../../static/assets/img/hyht_xz.png"/></a>
              <a @click="xia"><img class="img_nav2" src="../../static/assets/img/hyht_xy.png"/></a>
              <div class="fullscreen fullscreenbtn">
                <img class="fullscreenbtn_tp" src="../../static/assets/img/hyht_qp.png" alt="" v-show="btn_show2" @click="thisShow">
                <img class="fullscreenbtn_qp" src="../../static/assets/img/hyht_tp.png" alt="" v-show="btn_show1" @click="thisHidden">
              </div>
            </div>
          </div>
           <!--tab区-->
          <el-tabs id="emper-tab" class="home_tab_plan" v-model="editableTabsValue" type="border-card" @tab-remove="removeTab" @tab-open="openTab"
            @tab-click="tabclick" :closable="true" width="100%">
            <el-tab-pane v-for="(item, index) in list" v-if='item.ishow'
              :id='index' :key="index" :name='index+""' >
               <span slot="label" :title='item.name' ><i v-if='item.tabsicon' :class="item.tabsicon"></i>{{item.name.length > 6?item.name.substring(0, 6)+ '...':item.name}}</span>
              <div :id='"iframeOut"+index'></div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </section>
    </el-col>
   <!--右键菜单-->
    <ul v-show="show_rightmenu" id="rightmenu">
      <li @click="close_other()" style="cursor: pointer;">关闭其他标签</li>
      <li @click="close_all()" style="cursor: pointer;">关闭所有标签</li>
      <li @click="close_right()" style="cursor: pointer;">关闭右侧标签</li>
    </ul>
    <!--常用功能菜单-->
    <ul v-show="show_changyong_add" id="changyong_add" style="position: absolute;z-index: 10">
      <li @click="changyong_add()" style="cursor: pointer;">加为常用功能</li>
    </ul>
    <ul v-show="show_changyong_shanchu" id="changyong_shanchu" style="position: absolute;z-index: 10">
      <li @click="changyong_shanchu()" style="cursor: pointer;">删除</li>
    </ul>
  </el-row>
</template>
<script>
  import  "../../static/ztree/js/jquery.ztree.all.js"
  import "../../static/ztree/ztreehelper.js"
  export default {
    name: 'home',
    data () {
      return {
        navhidden: true,
        btn_show2: false,
        btn_show1:true,
        editableTabsValue:"",
        show_rightmenu: false, //是否展示右键菜单
        show_changyong_add: false, //是否展示常用功能菜单
        show_changyong_shanchu: false,
        //tab页面的iframe展示
        list:[{ name:"工作首页",path:"#/homePage",ishow:true,tabsicon:"el-icon-s-home"}],
        matcheds: [{name:"工作首页", path:"#/homePage",}],
        menulist: [],
        thisHiddenContent: true,
        levelList: null,
        sanjiao_class: false,
        username: '',
        collapsed: false,
        showMenus: false,
        messageCenter: false,
        userInfo: false,
        thisHiddenContent1: true,
        showToggles: true,
        new_password: false,
        noReadCount: '1',
        runNumber: 25// 折叠与展开执行的次数
      }
    },
    created() {
      var that=this;
      var daping_data;
      if(localStorage.getItem('daping_down_data')!=null||localStorage.getItem('daping_down_data')!=undefined) {
        daping_data = JSON.parse(localStorage.getItem('daping_down_data'))
        if (window.location.search.indexOf(daping_data.SB_DP_code) > 0) {
          that.Treeclick(daping_data)
          localStorage.removeItem('daping_down_data')
        }
      }
      setTimeout(() => {
      }, 1000);
      //this.Get_touxiang();
      that.messageIf();
      window.addEventListener("load", function () {
        //内容区高度
        var contentContainer = document.getElementById("contentContainer"); //外
        if (contentContainer !== undefined && contentContainer !== null) {
          var hh1 = contentContainer.offsetHeight;//856
          //tab页的高度
          var hh3 = 26;
          var containerPadding = document.getElementById("containerPadding"); //内
          if (containerPadding !== undefined && containerPadding !== null) {
          }
        //内容区树的高度
        // var tree = document.getElementById("tree");
        // if (tree !== undefined && tree !== null) {
        //   tree.style.height = (hh1 - hh3 - hh1 * 0.01*2 )+ "px";
        // }
        }
      });

      window.addEventListener('storage',function (e) {
        if(e.storageArea.Drill_down!=undefined&&e.storageArea.Drill_down!=''&&e.storageArea.Drill_down!=null){
          that.Treeclick(JSON.parse(e.storageArea.Drill_down))
          localStorage.removeItem('Drill_down')
        }
        if(e.storageArea.daping_down!=undefined&&e.storageArea.daping_down!=''&&e.storageArea.daping_down!=null){
          var newJson=JSON.parse(e.storageArea.daping_down)
          window.open('/?'+newJson.SB_DP_code)
          localStorage.removeItem('daping_down')
        }
      })
    },
    mounted () {
      var that = this
      // 其他tab里面点击打开新tab
      window.iframeBrige = function (name, path) {
        that.list.push({name: name, path: path, ishow: true})
        that.editableTabsValue = that.list.length - 1 + ""
        that.raderiframe(that.list.length - 1, that.list[that.list.length - 1].path)
      };
      window.closeIframeBrige = function (src){
        var arr = window.top.iframe;
        var idTemp = '';
        for(var i=0;i<arr.length;i++){
          if(arr[i].src.indexOf(src)>-1){
            idTemp = arr[i];
          }
        };
        if(idTemp != ''){
          //var divIframe = $("#"+idTemp).closest("div");
          var divIframe = idTemp.closest("div");
          var num = divIframe.id.substring(9);
          that.list.splice(num,1);
          $("#iframeOut"+num).remove();
          that.raderiframe(that.list.length-1,that.list[this.list.length-1].path)
        }else{
          console.log("子项目参数不对");
        }
      }
      that.raderiframe(0,that.list[0].path)
      window.onresize = function () {
      //  that.watch_height();
      },
      //  that.watch_height();
      //tabs鼠标右击事件开始
      $(".el-tabs__nav").bind("contextmenu",function(e){
        return false;
      });
      $(".el-tabs__nav").bind("contextmenu",function(e){
        that.show_rightmenu = false;
        if(e.which == 3){ //右键
          that.show_rightmenu = true;
          $("#rightmenu").css("left",e.pageX+5).css("top",e.pageY+5);
          //由于使用了饿了么的tabs，vue的contextmenu无法确定点击的是那个tabs，所有得根据点击事件亲确定
          var  atabs = $(".el-tabs__item");
          var target = e.target || e.srcElement;
          var listclicknum = 0; // 当前点击tabs的前面，有几个ishow等于true的
          var  listArrclickNum =null
          if(target.nodeName.toLowerCase() == "span"){
            // var that=target;
            var indexnum;   //当前点击的是第几个
            for(var i=0;i< atabs.length;i++){
              if(target.parentNode&&atabs[i]==target.parentNode){
                indexnum=i;
              }
              if(indexnum>=0){
                for(var i=0;i<that.list.length;i++){
                  //前面是true的有几个
                  if(that.list[i].ishow==true&&indexnum>listclicknum-1){
                    listclicknum++
                    listArrclickNum = i
                  }
                }
                that.close_i = listArrclickNum
                console.log('我是第'+indexnum+'个======'+that.close_i)
              }
            }
          }
        } else if(e.which == 1){ //左键
          that.show_rightmenu = false;
        }
      });
      $("ducument").bind("contextmenu",function(e){
        that.show_rightmenu = false;
      });
     that.$httpclient.notokenget('/web/static/mock/menu.json', {}, function (res) {
       // 模拟菜单
     })
    },
    methods: {
      logout() {
        var that = this;
        that.$confirm('确认退出吗?', '系统', {}).then(() => {
        that.$router.push({
           'path': '/login'
        })
        }).catch(() => {

        });
      },
       //渲染iframer
      raderiframe(idmub,path){
        this.$nextTick(function(){
        // 给iframe赋予名字
        var iframeNameSplit = path.split('#/')[1];
          var htmls = '<iframe id="iframe"'+idmub+' width="100%" src="'+path+'" name="'+iframeNameSplit+
          '" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0">'+
          '<a href="">你的浏览器不支持iframe页面嵌套，请点击这里访问页面内容。</a></iframe>';
          $("#iframeOut"+idmub).html(htmls);
          var iframeOut = document.getElementById("iframeOut"+idmub);
          if (iframeOut !== undefined && iframeOut !== null) {
            var iframeOutHeight = iframeOut.offsetHeight;
          }

          var iframe = document.getElementById("iframe"+idmub);
          if (iframe !== undefined && iframe !== null) {
            var body_height=document.documentElement.clientHeight;
            iframe.style.height = (body_height-87)+ "px";
          }
        });
      },
      //拖拽方法
      oLine (e) {
        var disX = (e || event).clientX
        document.getElementById('line').left = document.getElementById('line').offsetLeft
        document.onmousemove = function (e) {
          var iT = document.getElementById('line').left + ((e || event).clientX - disX)
          var e = e || window.event, tarnameb = e.target || e.srcElement
          var maxT = document.getElementById('tuola').clientWight - document.getElementById('line').offsetWidth
          document.getElementById('line').style.margin = 0
          iT < 0 && (iT = 0)
          iT > maxT && (iT = maxT)
          document.getElementById('aside').style.width = iT + 'px'
          return false
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
          document.getElementById('line').releaseCapture && document.getElementById('line').releaseCapture()
        }
        document.getElementById('line').setCapture && document.getElementById('line').setCapture()
        return false
      },
      userinfoClick(){
      },
      tabclick(){
        var that = this
        that.show_rightmenu = false;
      },
       //全屏
      thisHidden() {
        this.thisHiddenContent = false;
        this.thisHiddenContent1 = false;
        this.btn_show1 = false;
        this.btn_show2 = true;
        this.showToggles = false;
        this.showMenus = false;
        $(".homeMainHeaderMenu").hide();
        $("#homeMainContainer").addClass('fullhomeMainContainer')
      },
      //退屏
      thisShow() {
        this.thisHiddenContent = true;
        this.thisHiddenContent1 = true;
        this.btn_show1 = true;
        this.btn_show2 = false;
        this.showToggles = true;
        $(".homeMainHeaderMenu").show();
         $("#homeMainContainer").removeClass('fullhomeMainContainer')
      },
      //tab栏删除处理
      removeTab(name){
        var that = this;
        if(that.matcheds.length>0&&name=='0'){
          that.$message.error('默认tab不可关闭');
          return false;
        }
        that.list[Number(name)].ishow=false
        if(name==(Number(that.editableTabsValue))){
          var arri=[]  //存储数组下标
          for(var i=0;i<that.list.length;i++){
            if(that.list[i].ishow){
              arri.push(i)
            }
          }
          that.editableTabsValue = arri[arri.length-1]+""
        }
      },
      //点击左侧的菜单树
      openTab(config) {
        this.$nextTick(function(){
          this.list.push({name:config.name,path:config.path,tabsicon:(config.icon ? config.icon : ''),ishow:true})
          this.editableTabsValue =this.list.length-1+""
          this.raderiframe(this.list.length-1,this.list[this.list.length-1].path)
        })
        return false
      },
      //二级树
      messageIf() {
        var theUrl = window.location.hash;
        var message = theUrl;
        switch (message) {
          case "#/message/messageCenter":
            if (this.showMenus || this.userInfo) {
              this.showMenus = false;
              this.userInfo = false;
            }
            this.messageCenter = !this.messageCenter;
            break;

          case "#/jiben/user_info":
            if (this.messageCenter || this.showMenus) {
              this.messageCenter = false;
              this.showMenus = false;
            }
            this.userInfo = !this.userInfo;
            break;

          default:
            if (this.messageCenter || this.userInfo) {
              this.messageCenter = false;
              this.userInfo = false;
            }
            break;
        }

      },
      //tab栏右键菜单的关闭其他按钮
      close_other(){
        var that = this
        for (var i = 0; i < that.list.length; i++) {
          if (that.close_i == i) {
            that.list[i].ishow=true
          }else{
            if(that.list[i].name != that.matcheds[0].name){
              that.list[i].ishow=false;
            }
          }
        }
        that.editableTabsValue = that.close_i+""
        that.show_rightmenu = false;
      },
      //tab栏右键菜单的关闭全部按钮
      close_all() {
        if(this.matcheds.length==0){
          for (var i = 0; i < this.list.length; i++) {
            //没有默认路由
            this.list[i].ishow=false
          }
        }else{
          for (var i = 0; i < this.list.length; i++) {
            if(this.list[i].path==this.matcheds[0].path&&this.list[i].ishow==true){
              this.list[i].ishow=true
              this.editableTabsValue =i+""
            }else{
              this.list[i].ishow=false
            }
          }
        }
        this.show_rightmenu = false;
      },
      //tab栏右键菜单的关闭右侧按钮
      close_right(){
        var that = this
        for (var i = 0; i < that.list.length; i++) {
          if (i>that.close_i) {
            that.list[i].ishow=false
          }
        }
        that.editableTabsValue = that.close_i+""
        that.show_rightmenu = false;
      },
      //处理请求回来的的树的数据
      getArray() {
        var arrs = [];
        for (var i = 0; i < this.menulist.data.length; i++) {
          if (this.menulist.data[i].path != "") {
            arrs.push(this.menulist.data[i].path)
          } else {
            getArray(this.menulist.data[i].path);
          }
        }
      },
      //tab栏右移操作
      shang(){
        var that =this
        for(var i=that.list.slice(0,Number(that.editableTabsValue)-1).length;i>=1;i--){
          if(that.list[i].ishow==true&&i>0){
            that.editableTabsValue = i+""
            break;
          }
        }
        that.editableTabsValue = i+""
      },
      //tab栏左移操作
      xia() {
        var that =this
        for(var i=(Number(that.editableTabsValue))+1;i<that.list.length;i++){
          if(that.list[i].ishow==true){
            that.editableTabsValue = i+""
            break;
          }
        }
      },
      //常用功能删除
      changyong_shanchu(val) {
        var identityId = auth.getIdentityId(identityId);
        var that = this
        var send_json = {id: val.id}
        this.$httpclient.post("/rest/userIdentity/delete/stock/tree", send_json, function (res) {
          if (res.success) {
            that.getStock()
            that.$message.success('删除成功');
          }
        });
        this.show_changyong_shanchu = false;
      },
      //添加常用功能
      changyong_add(val) {

      },
      //无刷新的tabs展示 做过滤，点击同一个，无需重新加载，只需要tab切换到当前即可
      listfiter(term){
        var that =this
        for(var i=0;i<that.list.length;i++){
          if(that.list[i].name==term.name&&that.list[i].path==term.path&&that.list[i].ishow==true){
            that.editableTabsValue = i+""
            return false
            break;
          }
        }
      },
      //设置用户操作日志
      setUserLogs(data) {
        var that = this;
        that.$httpclient.put("/rest/logs", data, function (res) {
          if (res.success) {
          }
        });
      },
      showTreeImg () {
        var that = this
        var id = 'zdButton'// 折叠按钮ID
        var zd = document.getElementById(id)
        var subOpacity = 1 / that.runNumber
        var opacity = new Number(zd.style.opacity)
        opacity += new Number(subOpacity)
        zd.style.opacity = new Number(opacity)
      },
      hideTreeImg () {
        var that = this
        var id = 'zdButton'// 折叠按钮ID
        var zd = document.getElementById(id)
        var subOpacity = 1 / that.runNumber
        var opacity = new Number(zd.style.opacity)
        opacity -= new Number(subOpacity)
        zd.style.opacity = new Number(opacity)
      }
    },
    //监听
    watch: {
      //j监听路由
      $route () {

      }
    }
  }
</script>
