var TreeHelper = function () {
  if (this instanceof TreeHelper) {
    var that = this;
    this.isCheck = false;
    this.isRMenu = false;
    this.setting = {
      view: {
        dblClickExpand: false
      },
      check: {
        enable: this.isCheck
      },
      callback: {
        onClick: function (event, treeId, treeNode) {
          if("menu_section" == that.template){
            that.beforeClick(treeId, treeNode);
          }
          that.zcfun(event, treeId, treeNode);
        },
        onRightClick: function (event, treeId, treeNode) {
          that.OnRightClick(event, treeId, treeNode)
        }
      }
    };
    this.zNodes = '';
    this.addCount = 1;
    this.zTree = null;
    this.id = '';
    this.rMenuId = '';
    this.rMenuKey = null;//"#"+'';
    this.viewId = '';
    this.zcfun = null;
    this.ycqfun = null;
    this.ychfun = null;
    this.curMenu = null;
    this.menuType = null;//simpel default diy
    this.curMenuType = 1;
    this.curSystemNode = null;
    this.menuTypes = ["default","diy"];
    this.selectNode = function(){
      return {id:"select_node_"+that.id, name:"搜索结果",icon:that.icons[that.icons.length-1]};
    };
    this.isYMenu = function(){return that.isArrayObj(that.menuTypes,that.menuType)};
    this.getSelectedNodes = function () {
      return that.zTree != null ? that.zTree.getSelectedNodes()[0] : null;
    };
    this.rOperateMenu = [
      {"id": "m_addp", "name": "增加同级节点"},
      {"id": "m_add", "name": "增加子节点"},
      {"id": "m_del", "name": "删除节点"},
      {"id": "m_addcygn", "name": "加入常用功能"},
      {"id": "m_del", "name": "移除常用功能"}
      ];
    this.cOperateMenu = [this.rOperateMenu[0],this.rOperateMenu[1],this.rOperateMenu[2]];
    this.cSystemMenu = [this.rOperateMenu[3],this.rOperateMenu[4]];
    this.rDIYMenu = [];
    this.template = "ztree_section";//menu_section
    this.initRMenuView = function (menus) {
      var html = "";
      html += '  <div id="' + that.rMenuId + '">';
      html += '  <ul class="right_ul">';
      for (var i = 0; i < menus.length; i++) {
        html += '  <li id="' + that.rMenuId + menus[i].id + '">' + menus[i].name + '</li>';
      }
      html += '  </ul>';
      html += '  </div>';
      return html;

    };
    //根据文本框的关键词输入情况自动匹配树内节点 进行模糊查找
    this.AutoMatch = function(obj) {
      var flag = false;
      var thisValue =  $(obj.data).val();
      if(obj.keyCode == undefined || obj.keyCode == null){
        flag = true;
      }else{
        if(obj.keyCode == 13){
          flag = true;
        }else{
        }
      }
      if(!flag){return;}
      var nodeList = null;
      var selectMenuNode = that.zTree.getNodes();
      var showNodeIndex = that.zTree.getNodes().length-1;
      that.removeTreeNode(selectMenuNode[showNodeIndex]);
      that.addTreeNode(null,that.selectNode());

      if (thisValue && thisValue.length > 0 ) {
          nodeList = that.zTree.getNodesByParamFuzzy("name", thisValue);
      }

      selectMenuNode = that.zTree.getNodes();
      if(nodeList && nodeList.length>0){
        that.addTreeNode(selectMenuNode[showNodeIndex],nodeList);
      }
      that.beforeClick(that.id,selectMenuNode[showNodeIndex]);
    };
    //获取指定节点的一级节点
    this.getOneFirsterNode = function(pNode){
      while (pNode && pNode.level !==0) {
        pNode = pNode.getParentNode();
      }
      return pNode;
    }
    //收缩菜单
    this.contractionMenu = function(pNode){
      if(pNode) {
        var a = $("#" + pNode.tId + "_a");
        a.removeClass("cur");
        that.zTree.expandNode(pNode, false);
      }
    };
    //展开菜单
    this.extendedMenuCss = function(pNode){
      if(pNode){
        var a = $("#" + pNode.tId + "_a");
        a.addClass("cur");
      }
    }
    //菜单折叠
    this.beforeClick = function(treeId, node) {
      //是否有子节点
      // if (node.isParent) {
        //如果是顶级节点
        if (node.level === 0) {
          //获取之前选中的顶级节点
          var pNode = that.getOneFirsterNode(that.curMenu);
          //之前的顶级节点和现在的顶级节点不一致的话，删除之前的顶级节点样式
          if (pNode !== node) {
              that.contractionMenu(pNode);
          }
          //给现在顶级节点增加样式
          // that.expandMenuNodeByNode(node);
          that.openMenuNodeByNode(node);
          // that.extendedMenuCss(node);
          // that.zTree.expandNode(pNode, false);
          // //计算展开那个节点
          // var isOpen = false;
          // for (var i=0,l=node.children.length; i<l; i++) {
          //   if(node.children[i].open) {
          //     isOpen = true;
          //     break;
          //   }
          // }
          // //之前已经展开过节点
          // if (isOpen) {
          //   that.zTree.expandNode(node, true);
          //   that.curMenu = node;
          // } else {//之前没有展开过节点
          //   var lNode = node;
          //   if(node.children && node.children.length>0){
          //     lNode = node.children[0].isParent?node.children[0]:node
          //   }
          //   that.zTree.expandNode(lNode, true);
          //   that.curMenu = lNode;
          // }
        }
        //如果不是顶级节点
        else {
          //打开
          // var preNode = node.getPreNode();
          // for(var i=0;i<preNode.children.length;i++){
          //   if(node.id != preNode.children[i].id && node.open==false){
              that.zTree.expandNode(node);
          //   }else{
          //     if(preNode.children[i].open){
          //       that.zTree.expandNode(preNode.children[i],false);
          //     }
          //   }
          // }
        }
      return !node.isParent;
    };
    this.initRMenuViewCss = function () {
      $("div#" + that.rMenuId).css({
        'position': 'absolute',
        'visibility': 'hidden',
        "background": "#FFFFFF",
        "border": " 1px solid #D3DCE6",
        "box-shadow": "0 2px 4px 0 rgba(0,0,0,0.12), 0 0 6px 0 rgba(0,0,0,0.04)",
        "border-radius": "2px",
        "padding-left":"5px"
      });
      $("div#" + that.rMenuId + " ul li").css({
        'cursor': 'pointer',
        'list-style': 'none outside none',
        "list-style": "none",
        "line-height": "28px",
        "width": "120px",
        "height": "28px",
        "padding-left": "6px !important",
        "color": "#666"
      });
    };
    this.handerRMenuFunc = function (event) {
      //隐藏菜单
      that.hideRMenu();
      var type = event.data;
      var data = null;
      var selectedNode = that.getSelectedNodes();
      var peerNode = selectedNode != null ? selectedNode.getParentNode() : null;
      if ("m_addp" == type) {
        if (that.isFunc(that.ycqfun)) {
          data = that.ycqfun(type, selectedNode,event);
        }
        if (data && data.success == true) {
          that.addTreePeerNode(peerNode, data.node);
        }
      }else if("m_addcygn" == type){
        if (that.isFunc(that.ycqfun)) {
          data = that.ycqfun(type, selectedNode,event);
        }
        if (data && data.success == true) {
          var selectMenuNode = that.zTree.getNodes();
          selectedNode.checked = selectMenuNode[0].checked;
          that.zTree.addNodes(selectMenuNode[0], selectedNode, true);
        }
      } else if ("m_add" == type) {
        if (that.isFunc(that.ycqfun)) {
          data = that.ycqfun(type, selectedNode,event);
        }
        if (data && data.success == true) {
          that.addTreeNode(selectedNode, data.node);
        }
      } else if ("m_del" == type) {
        var msg = "";
        if (selectedNode && selectedNode.children && selectedNode.children.length > 0) {
          msg = "要删除的节点是父节点，如果删除将连同子节点一起删掉。\n\n请确认！";
        } else {
          msg = "确定删除该节点。\n\n请确认！";
        }
        that.removeConfirm(msg,function(flag){
          if(flag){
           if (that.isFunc(that.ycqfun)) {
             data = that.ycqfun(type, selectedNode,event);
           }
           if(data && data.success){
             that.removeTreeNode(selectedNode);
           }
          }
        });

      } else {
        if (that.isFunc(that.ycqfun)) {
          data = that.ycqfun(type, selectedNode,event);
        }
      }
      //执行完成后
      if (that.isFunc(that.ychfun)) {
        that.ychfun(type, selectedNode, data);
      }
    }
    this.initRMenuViewFunc = function (menus) {
      for (var i = 0; i < menus.length; i++) {
        $("#" + that.rMenuId + menus[i].id).bind("click", menus[i].id, that.handerRMenuFunc);
      }
      $("#nameSearch_" + that.rMenuId).bind("keydown", "#nameSearch_" + that.rMenuId,that.AutoMatch );
      $("#imgBox_" + that.rMenuId).bind("click", "#nameSearch_" + that.rMenuId,that.AutoMatch );
    };
    this.initView = function () {
      var html = "";

      html += '<div class="' + that.template + '">';
      if(that.template == "menu_section"){
         html += ' <div class="inputBox"><input class="inputSearch"  id="nameSearch_' + that.rMenuId + '" type="text"  placeholder="输入功能名称" value="" /><div class="imgBox"  id="imgBox_'+that.rMenuId+'"><img class="imgSearch" src="../../../static/ztree/css/img/icon_cx.png"></div></div>';
       }
      html += '  <div class="content_wrap">';
      html += ' <div class="zTreeDemoBackground left">';
      html += '  <ul id="' + this.id + '" class="ztree '+that.sysMenuBtn  +'"  ></ul>';
      html += '   </div>';
      html += '  </div>';
      //构建右击菜单
      if (that.isYMenu) {
        html += that.initRMenuView(that.rDIYMenu);
      }
      html +='<div class="msg_box" id="msg_'+this.id+'" ><div class="dialogcontent" id="msg_dialogcontent_'+that.id+'"></div><div class="dialogfooter"><button class="dialogsure" id="dialogsure_'+that.id+'">确 认</button><button class="dialogclose" id="dialogclose_'+that.id+'">取 消</button></div>';
      html += '  </div>';
      $("#" + that.viewId).html(html);
      if (that.isYMenu) {
        that.initRMenuViewCss();
        that.initRMenuViewFunc(that.rDIYMenu);
      }
    }
    this.isShowName = null;
    this.init = function () {
      if (that.isYMenu) {
        that.rMenuId = that.viewId + "_" + that.guid();
        that.rMenuKey = "#" + that.rMenuId;
      }
      that.id = that.viewId + "_" + that.guid();
      that.initView();
      if(that.isNotEmpty(that.isShowName)){
        that.formatData(that.zNodes,that.isShowName);
      }
      $.fn.zTree.init($("#" + that.id), that.setting, that.zNodes);
      that.zTree = $.fn.zTree.getZTreeObj(that.id);

      // if(that.menuType == "system"){
      // 	var showNodeIndex = 0;
      // 	that.openMenuNode(showNodeIndex);
      // }
    };
    this.openMenuNode = function(showNodeIndex,tree){
      if(that.zTree.getNodes() && that.zTree.getNodes().length > showNodeIndex){
        var showNode = that.zTree.getNodes()[showNodeIndex];
        that.openMenuNodeByNode(showNode,tree);
      }
    }
    this.openMenuNodeByNode = function (showNode,tree) {
      if(tree){
        that.curMenu = tree
      }else{
        that.curMenu = that.getFirstTreeLasterNode(showNode.children);
      }
      that.curMenu = that.curMenu != null?that.curMenu:showNode;
      that.zTree.selectNode(that.curMenu);
      that.extendedMenuCss(showNode);
    };
    this.expandMenuNodeByNode = function (showNode) {
      var lNode = that.getFirstTreeLasterNode(showNode.children);
      lNode = that.curMenu != null?that.curMenu:showNode;
      that.extendedMenuCss(lNode);
      that.zTree.expandNode(lNode, true);
      that.curMenu = lNode;
    };
    //获取子树的最后层级节点
    this.getFirstTreeLasterNode = function(tree){
      if(tree && tree.length >0 ){
        if(tree[0]){
          if(tree[0].children && tree[0].children.length>0){
            return that.getFirstTreeLasterNode(tree[0].children);
          }else{
            return tree[0];
          }
        }
      }
      return null;
    }
    //创建简单菜单
    this.createSimpleMenu = function (viewId, zNodes, zcfun) {
      this.menuType = "simpel";
      this.viewId = viewId;
      this.formatSimpleData(zNodes);
      this.zNodes = zNodes;
      this.zcfun = zcfun;
      this.init();
    };
    //创建包含增删节点操作的菜单
    this.createOperateMenu = function (viewId, zNodes, zcfun, ycqfun, ychfun) {
      this.menuType = "default";
      this.viewId = viewId;
      this.zNodes = zNodes;
      this.zcfun = zcfun;
      this.ycqfun = ycqfun;
      this.ychfun = ychfun;
      this.rDIYMenu = that.cOperateMenu;
      this.init();
    };
    //创建自定义菜单
    this.createDIYMenu = function (viewId, zNodes,diyMenu, zcfun, ycqfun, ychfun) {
      this.menuType = "diy";
      this.viewId = viewId;
      this.zNodes = zNodes;
      this.zcfun = zcfun;
      this.ycqfun = ycqfun;
      this.ychfun = ychfun;
      this.rDIYMenu = diyMenu;
      this.init();
    };
    //创建home项目的菜单
    this.createSystemMenu = function (viewId, zNodes, zcfun, ycqfun, ychfun) {
      this.menuType = "system";
      this.template = "menu_section";
      this.sysMenuBtn = "sysMenuBtn";
      zNodes.push(that.selectNode());
      this.formatSystemData(zNodes);
      this.viewId = viewId;
      this.zNodes = zNodes;
      this.zcfun = zcfun;
      this.ycqfun = ycqfun;
      this.ychfun = ychfun;
      this.rDIYMenu = that.cSystemMenu;
      this.init();
    };
    //右击事件
    this.OnRightClick = function (event, treeId, treeNode) {
      if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        that.zTree.cancelSelectedNode();
        that.showRMenu("root", event.clientX, event.clientY);
      } else if (treeNode && !treeNode.noR) {
        that.zTree.selectNode(treeNode);
        if(that.menuType == "system"){
          var allNode = that.zTree.getNodes();
          if(allNode[0].open){
            $(that.rMenuKey+that.rDIYMenu[0].id).hide();
            $(that.rMenuKey+that.rDIYMenu[1].id).show();
          }else{
            $(that.rMenuKey+that.rDIYMenu[0].id).show();
            $(that.rMenuKey+that.rDIYMenu[1].id).hide();
          }
        }
        that.showRMenu("node", event.clientX, event.clientY);
      }
    };
    //显示菜单
    this.showRMenu = function (type, x, y) {
      $(that.rMenuKey + " ul").show();
      // for(var i=0;i<that.rDIYMenu.length;i++){
      //   $(that.rMenuKey+that.rDIYMenu[i].id).show();
      // }
      y += document.body.scrollTop;
      x += document.body.scrollLeft;
      //console.log($("#" + that.id).offset(),y,x)
      $(that.rMenuKey).css({
        "top": y - $("#" + that.id).offset().top + 100 + "px",
        "left": x - $("#" + that.id).offset().left + 30 + "px",
        "visibility": "visible"
      });
      $("body").bind("mousedown", that.onBodyMouseDown);
    };
    this.onBodyMouseDown = function (event) {
      if (!(event.target.id == "rMenu" || $(event.target).parents(that.rMenuKey).length > 0)) {
        $(that.rMenuKey).css({"visibility": "hidden"});
      }
    };
    this.hideRMenu = function () {
      if ($(that.rMenuKey)) {
        $(that.rMenuKey).css({"visibility": "hidden"});
      }
      $("body").unbind("mousedown", that.onBodyMouseDown);
    };
    this.addTreePeerNode = function (peerNode, newNode) {
      if (peerNode) {
        newNode.checked = peerNode.checked;
        console.log(peerNode, newNode)
        that.zTree.addNodes(peerNode, newNode);
      } else {
        console.log(peerNode, newNode)
        that.zTree.addNodes(null, newNode);
      }
    };
    this.addTreeNode = function (selectedNode, newNode) {
      if (selectedNode) {
        newNode.checked = selectedNode.checked;
        console.log(selectedNode, newNode)
        that.zTree.addNodes(selectedNode, newNode);
      } else {
        that.zTree.addNodes(null, newNode);
      }
    };

    //弹出删除的确认框
    this.removeConfirm = function (msg,fun) {
      // var flag = false;
      if(that.isNotEmpty(msg)){
         $("#msg_dialogcontent_"+that.id).html(msg);
         $("#msg_"+that.id).show();
         $("#dialogclose_"+that.id).bind("click",function(){
            $("#msg_"+that.id).hide();
            fun(false);
            flag = false;
         })
         $("#dialogsure_"+that.id).bind("click",function(){
           $("#msg_"+that.id).hide();
            fun(true);
            flag = true;
         })
      }
      //  alert(flag)
      //  return flag;
    };
    this.removeTreeNode = function (node) {
        that.zTree.removeNode(node);
    };
    this.formatSimpleData = function (nodes) {
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].noR = true;
        if (nodes[i].children != null && nodes[i].children.length > 0) {
          that.formatSimpleData(nodes[i].children)
        }
      }
    };
    this.formatData = function (nodes,name) {
      for (var i = 0; i < nodes.length; i++) {
        nodes[i]["name"] = nodes[i][name];
        if (nodes[i].children != null && nodes[i].children.length > 0) {
          that.formatData(nodes[i].children,name)
        }
      }
    };
    this.icons = [
    "../../../static/ztree/css/img/icon_cygn.png",
    "../../../static/ztree/css/img/icon_gncd.png",
    "../../../static/ztree/css/img/icon_xtgn.png",
    "../../../static/ztree/css/img/icon_ssjg.png"];
    this.formatSystemData = function (nodes) {
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].icon = that.icons[i];
        nodes[i].noR = true;
        if (nodes[i].children && nodes[i].children.length > 0){
            that.formatNoRData(nodes[i].children);
        }
      }
    };
    this.formatNoRData = function(nodes){
      if(nodes){
        for(var i=0;i<nodes.length;i++){
          if(nodes[i].children && nodes[i].children.length>0){
            nodes[i].noR = true;
            that.formatNoRData(nodes[i].children);
          }else{
            nodes[i].noR = false;
          }
        }

      }
    };
    this.guid = function () {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }

      return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    };
    this.isFunc = function (func) {
      if (that.isNotEmpty(func)) {
        return typeof func == 'function';
      }
      return false;
    };
    this.isNotEmpty = function (value) {
      if (value != undefined && value != null && value != '' && (value + "").trim().length != 0) {
        return true;
      } else {
        return false;
      }
    };
    this.isArrayObj = function(arr,obj){
      if(arr){
        for(var i=0;i<arr.length;i++){
          if(arr[i]==obj){
            return true;
          }
        }
      }
      return false;
    };
  } else {
    return new TreeHelper();
  }
};

$.fn.extend({
getTreeHelper:function(){
  return new TreeHelper();
}
});
