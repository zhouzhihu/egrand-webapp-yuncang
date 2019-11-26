var TableHelper2 = function () {
  if(this instanceof TableHelper2 ){
    var that = this;
    var commonUtil = new CommonUtil();
    var treeTableLLXHelper = new TreeTableLLXHelper2();
    //初始化数据
    this.data = {
      "tableName": null,//主题
      "creatTime": null,//时间
      "unit": null,//单位
      "columns": [],//表头对象
      "dataSource": [],//列表数据
      "pageinfo_front":false,//是否是前台分页
      "pageinfo_use":false,//是否使用pageinfo
      "pageinfo_callback":false,//是否使用回调
      "order_front":false,//是否是前台排序
      "head_overflow":false//表头是否超出省略
    };
    //分页对象数据
    this.pageInfo = {
      "pages":5,
      "pageNum":1,
      "pageSize": 2,
      "total":10,
      "list":[]
    };
    //处理后可用数据
    this.tableHelper = {
      "viewId" : null,//最外层的div容器
      "id" : null,//ztree操作的div容器
      "tableName": null,//主题
      "creatTime": null,//时间
      "unit": null,//单位
      "temple":"simple",//模板类型，diy
      "headList": [],//表头数据
      "zTreeNodes": [],//树形数据
      "showNodes":[],//显示的数据
      "dimensionality": 1,//维度1-3
      "pageinfo_front":false,//是否是前台分页
      "pageinfo_use":false,//是否使用pageinfo
      "pageinfo_callback":false,//是否使用回调
      "order_front":false,//是否是前台排序
      "head_overflow":false//表头是否超出省略
    }
    //setting 是ztree默认配置
    this.setting = {
      view: {
        dblClickExpand: false,
        showLine: false,
        showIcon: false,
        addDiyDom: function(treeId, treeNode){
          that.initDiyDom(treeId, treeNode)
        }
      },
      callback: {
        onCollapse: function (event, treeId, treeNode) {

        },
        onExpand: function (event, treeId, treeNode) {
        	$('#'+that.tableHelper.viewId+ ' .goicon').unbind("click").bind("click",that.kpiTurnMore);

        },
      },
      data: {
        simpleData: {
          enable: true
        }
      }
    };
    //刷新树的内容
    this.updateNode = function (list,type) {
      //2.3 处理表体数据 添加显示的字段
      treeTableLLXHelper.initData(list,that.tableHelper.headList,0,that.getFirstTdWidth());
      that.tableHelper.showNodes = list;
      if(commonUtil.isNotEmpty(type) && type==1){
        that.tableHelper.zTreeNodes = list;
      }
      $.fn.zTree.init($("#"+that.tableHelper.id), that.setting,that.tableHelper.showNodes );
    };

    //分页回调事件 pageNum 第几页 pageInfo分页对象 type 固定为pageinfo
    this.callbackPageInfo = function (pageNum,pageInfo,type,jq){};
    //排序字段回调 curUpDownBtnType 排序类型：1升序，0降序 curUpDownBtnName 排序字段 type 类型，固定是orderby，
    this.callbackOrderBy = function (curUpDownBtnType, curUpDownBtnName,type,e) {};
    //单元格指标字段回调 callbackkpiTurnMore
    //字段：kpiTurnMoreBtnType,kpiTurnMoreBtnColName,kpiTurnMoreBtnRowName分别表示点击的指标类型(1-字体下转，2-上升下钻，3-下降下钻，4-警告下钻),列指标,行指标
    //(up,down,warn=> 分别代表 上升，下降，警告)  (font#1,up#1,down#1,warn#1=> 分别代表 字体可下钻，上升可下钻，下降可下钻，警告可下钻)
    this.callbackkpiTurnMore = function (kpiTurnMoreBtnType,kpiTurnMoreBtnColName,kpiTurnMoreBtnRowName,e) {};
    //页面元素构造器
    this.rendererView = function () {
      var html ='';
      html +='<div class="ztreetable_section">';
      html += '<div class="ztree_head">'
      html +='  <div class="ztreeBox" >';
      //1、构建标体
      if(commonUtil.isNotEmpty(that.tableHelper.tableName)){
        html +='  <div class="ztree_header">'+that.tableHelper.tableName+'</div>'
      }else{
        html +='  <div class="ztree_header"></div>'
      }
      //2、构建所属期和单位
      if(commonUtil.isNotEmpty(that.tableHelper.creatTime) && commonUtil.isNotEmpty(that.tableHelper.unit)){
        html +='  <div class="ztree_con">';
        if(commonUtil.isNotEmpty(that.tableHelper.creatTime)){
          html +='<span class="ztree_con_1">所属期:'+that.tableHelper.creatTime+'</span>';
        }
        if(commonUtil.isNotEmpty(that.tableHelper.unit)){
          html +='<span class="ztree_con_2">单位:'+that.tableHelper.unit+'</span>';
        }
        html +='</div>';
      }
      html +='</div>';
      //3、构建树形内容
      html +='  <div id="'+that.tableHelper.id+'" class="ztree ztreetable">';
      html +='  </div>';
      //4、构建分页器
      if(that.tableHelper.pageinfo_use){
        html +='<div class="pagination_box">';
        html +='  <div id="pagTabTool_'+that.tableHelper.id+'" class="pagTabTool"><!-- 这里是分页器 --></div>';
        html +='  </div>';
      }
      html +='  </div>';
      //初始化页面
      $("#" + that.tableHelper.viewId).html(html);
    };
    //列表数据构造器自定义节点的内容,构建行内容
    this.initDiyDom = function (treeId, treeNode) {
      var switchObj = $("#" + treeNode.tId + "_switch");
      var icoObj = $("#" + treeNode.tId + "_ico");
      var spanObj = $("#" + treeNode.tId + "_span");
      switchObj.remove();
      spanObj.remove();
      icoObj.remove();
      var liObj = $("#" + treeNode.tId);
      var aObj = $("#" + treeNode.tId + "_a");
      aObj.attr('title', '');
      var spaceWidth = 15;
      var spaceStr = "<span style='height:1px;display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
      aObj.attr('text-decoration',"none");
      var frishNode = that.tableHelper.dimensionality==1?'<div class="tbodycell tbodycell_left swich" style="width: '+that.getFirstTdWidth()+'px"></div>':"";
      aObj.append(frishNode);
      //增加内容
      that.tableHelper.dimensionality==3?switchObj.before(spaceStr):"";
      var nodeContentHtml  = treeTableLLXHelper.getContentHtml(treeNode,that.getLastHead(),that.tableHelper.dimensionality,that.tableHelper.temple,that.getTDWidth(),treeNode.level+1);
      aObj.append(nodeContentHtml);
      //处理+/-号列
      var no = that.tableHelper.dimensionality>1?treeNode.level+1:0;
      var div = $(liObj).find('div').eq(no);
      div.prepend(switchObj);
      that.tableHelper.dimensionality==1?div.append(spanObj):"";
      that.tableHelper.dimensionality<3?switchObj.before(spaceStr):"";
    };
    //分页构造器
    this.initPageInfo = function () {
      if(that.tableHelper.pageinfo_front){
        that.pageInfo.pages = (that.tableHelper.zTreeNodes.length - that.tableHelper.zTreeNodes.length % that.pageInfo.pageSize )/that.pageInfo.pageSize +1;
      }
      $("#pagTabTool_"+that.tableHelper.id).pagination(that.pageInfo.pages, {
        // items_per_page:1 //每页显示1项
        items_per_page: 1,//每页显示的条目数
        current_page: that.pageInfo.pageNum-1,//当前选中的页面
        num_edge_entries: 0,//	两侧显示的首尾分页的条目数
        num_display_entries:5 ,//连续分页主体部分显示的分页条目数
        link_to:"javascript:void(0);",//分页的链接
        callback: function (pageNum, jq) {
          if(that.tableHelper.pageinfo_callback){
            that.pageInfo.pageNum = pageNum+1;
            if(that.tableHelper.pageinfo_front){
              //如果是前台分页
              var list = that.tableHelper.zTreeNodes.slice((that.pageInfo.pageNum-1)*that.pageInfo.pageSize,that.pageInfo.pageNum*that.pageInfo.pageSize);
              that.updateNode(list);
            }else{
              if(commonUtil.isFunc(that.callbackPageInfo)){
                that.callbackPageInfo(pageNum+1,that.pageInfo,"pageinfo",jq);
              }
            }
          }else{
            that.updateNode(that.pageInfo.list,1);
          }
        }
      });

    };
    //表头构造器
    this.initViewHead = function () {
      var _that = this;
      //获取整个表头的内容
      this.getTableHeadHtml = function (viewWidth,headList,type,tdWidth,headOverflow) {
        var html = '';
        html += '<li class="headbox">';
        var _style ='width:'+viewWidth+'px;';
        html += '<table border="0" cellspacing="0" cellpadding="0" style="'+_style+'">';
        html += _that.getHeadTRHtml(headList,type,tdWidth,headOverflow);
        html += '</table>';
        html += '</li>';
        return html;
      };
      //构造一行的内容
      this.getHeadTRHtml = function (headList,type,tdWidth,headOverflow) {
        var html = "";
        for(var i=0;i<headList.length;i++){
          var isLast = (i ==headList.length-1);
          html += '<tr>';
          for(var j=0;j<headList[i].length;j++){
            html+=_that.getHeadTDHtml(headList[i][j],type,tdWidth,isLast,headOverflow);
          }
          html += '</tr>';
        }
        return html;
      };
      //构造一个td的内容
      this.getHeadTDHtml = function (data,type,tdWidth,isLast,headOverflow) {
        var width = "";
        var _value = data.name;
        var _rowspan = data.rowSpan;
        var _colspan = data.colSpan;
        var useWidth = 0;
        if("diy" == type){
          useWidth = data.minWidth;
          useWidth = useWidth - _colspan*1;
        }else{
          useWidth = _colspan*tdWidth;
        }
        if(headOverflow){
          var useLen = (useWidth - (useWidth-1)%14)/14;
          if(useLen<_value.length){
            _value = _value.substring(0,useLen-1) +"...";
          }
        }
        width = "width:"+useWidth+"px;max-width:"+useWidth+"px;";
        // width+= "overflow:hidden;text-overflow:ellipsis;white-space:nowrap;";
        var _style = width;
        //处理列表排序
        if(isLast && data.isShowOrderBy){
          var colCurHighColUp = data.curOrderBy==1?"colCurHigh":"";
          var colCurHighColDown = data.curOrderBy==2?"colCurHigh":"";
          var colBtnBox = '<div class= "colBtnBox"><div class="colUp '+colCurHighColUp+'" _data_type="1" _data_name="' + data.dataIndex + '"></div><div class="colDown '+colCurHighColDown+'" _data_type="2" _data_name="' + data.dataIndex + '"></div></div>';
          _value+=colBtnBox;
        }
        var html = '<td rowspan="'+_rowspan+'" colspan="'+_colspan+'" style='+_style+'><div style="width: 100%;height: 100%">'+_value+'</div></td>';
        return html;
      }
      var headHtml = _that.getTableHeadHtml(that.getViewUseWidth(),that.tableHelper.headList,that.tableHelper.temple,that.getTDWidth(),that.tableHelper.head_overflow);
      // var rows = $("#"+that.tableHelper.id).find('li');
      var rows = $("#"+that.tableHelper.id);
      if(rows.length > 0) {
        rows.eq(0).before(headHtml)
        // $("#"+that.tableHelper.id).append(headHtml);
      } else {
        $("#"+that.tableHelper.id).append('<li ><div style="text-align: center;line-height: 30px;" >无符合条件数据</div></li>')
      }
    };
    //div容器的实际宽度
    this.getViewWidth = function () {
      return $("#"+that.tableHelper.viewId).width();
    };
    //获取最后一列head
    this.getLastHead = function () {
      return that.tableHelper.headList && that.tableHelper.headList.length>0 ? that.tableHelper.headList[that.tableHelper.headList.length-1]:[];
    }
    //ztree的实际使用宽度
    this.getViewUseWidth = function () {
      var last = that.getLastHead();
      var width = 0;
      if("diy" == that.tableHelper.temple){
        for(var i=0;i<last.length;i++){
          width += last[i].minWidth;
        }
      }else{
        width = that.getViewWidth();
        width = width - width%(last.length*10);
        var rdWidth = commonUtil.percentNum(width,last.length);
        if(rdWidth<60){
          width = 60*last.length;
        }
      }
      return width;
    };
    //获取平均Td的宽度
    this.getTDWidth = function () {
      var last = that.getLastHead();
      var width = that.getViewUseWidth();
      var rdWidth = commonUtil.percentNum(width,last.length);
      return rdWidth;
    };
    //获取第一列的宽度
    this.getFirstTdWidth = function () {
      var lastList = that.getLastHead();
      var node = lastList.length>0?lastList[0]:null;
      var width = null;
      if("diy" == that.tableHelper.temple){
        width = node.minWidth;
      }else{
        width = that.getTDWidth();
      }
      return width;
    };
    //页面加载完渲染
    this.rendererViewAfter = function () {
      //控制页面宽度
      $("#"+that.tableHelper.id+".ztreetable.ztree li").each(function () {
        $(this).css("width",that.getViewUseWidth());
      })
      $("#"+that.tableHelper.id).parent().width(that.getViewUseWidth());
      //给排序增加绑定事件
      $('#'+that.tableHelper.viewId+ ' .colUp').bind("click",that.colUpDownBtn);
      $('#'+that.tableHelper.viewId+ ' .colDown').bind("click",that.colUpDownBtn);
      //单元格指标绑定下钻事件
      $('#'+that.tableHelper.viewId+ ' .goicon').bind("click",that.kpiTurnMore);
    };
    //单元格指标绑定下钻方法
    this.kpiTurnMore = function(e){
			var kpiTurnMoreBtnType = $(e.currentTarget).attr("_data_type");
      var kpiTurnMoreBtnColName = $(e.currentTarget).attr("_data_colname");
      var kpiTurnMoreBtnRowName = $(e.currentTarget).attr("_data_rowname");
      console.log(kpiTurnMoreBtnType,kpiTurnMoreBtnColName,kpiTurnMoreBtnRowName);
      if(commonUtil.isFunc(that.callbackkpiTurnMore)){
      	 that.callbackkpiTurnMore(kpiTurnMoreBtnType,kpiTurnMoreBtnColName,kpiTurnMoreBtnRowName,e);
      }
    };
    //页面排序按钮
    that.colUpDownBtn = function (e) {
      $("div").removeClass("colCurHigh");
      $(this).addClass("colCurHigh");
      var curUpDownBtnType = $(e.currentTarget).attr("_data_type");
      var curUpDownBtnName = $(e.currentTarget).attr("_data_name");
      //选中高亮，未选中的不高亮
      if(that.tableHelper.order_front){
        //将数据的字段 curUpDownBtnName根据curUpDownBtnType进行排序，将1进行升序，2进行降序
        if (1 == curUpDownBtnType) {
          that.upData = that.tableHelper.showNodes.sort(commonUtil.compareNum(curUpDownBtnName,1));
        } else{
          that.upData = that.tableHelper.showNodes.sort(commonUtil.compareNum(curUpDownBtnName,2));
        }
        that.updateNode(that.tableHelper.showNodes);
      }else{
        if(commonUtil.isFunc(that.callbackOrderBy)){
          that.callbackOrderBy(curUpDownBtnType, curUpDownBtnName,"orderby",e);
        }
      }
    }
    //初始构造函数
    this.init = function (viewId,data,pageInfo) {
      //1、初始化数据
      //记录原始数据
      that.data = data;
      that.tableHelper.viewId = viewId;
      that.tableHelper.id = that.tableHelper.viewId+"_"+commonUtil.guid();
      commonUtil.copyObj(data,that.tableHelper);
      //2、处理数据格式
      //2.1 处理表头数据 将表头转换成[tr[td]]格式
      that.tableHelper.headList = treeTableLLXHelper.init(data.columns,that.tableHelper.temple,that.getViewWidth());
      that.tableHelper.zTreeNodes = that.tableHelper.dataSource;
      that.pageInfo = pageInfo;
      that.init2();



    };
    this.init2 = function () {

      //3、构建页面
      that.rendererView();
      //4、数据进行渲染
      if(that.tableHelper.pageinfo_use){
        //4.2 分页器渲染
        that.initPageInfo();
      }else{
        //4.1 ztree数据渲染
        that.updateNode(that.tableHelper.zTreeNodes,1);
      }
      that.initViewHead();

      //4.3 宽高渲染
      that.rendererViewAfter();
    };
    $(window).resize(function(){
      if("simple" == that.tableHelper.temple){
        that.init2();
      }
    });

  }else{return new TableHelper2();}
}

//处理数据
var TreeTableLLXHelper2 = function(){
  if(this instanceof TreeTableLLXHelper2){
    var that = this;
    var commonUtil = new CommonUtil();
    this.getContentHtml = function (data,rlist,dimensionality,type,width,level) {
      var html = '';
      if(data){
        var i = dimensionality>1?0:1;
        for( ;i<rlist.length;i++){
          var _class = "tbodycell";
          //最后一类增加类
          i==rlist.length-1?_class +=" laserDivpaddingRight ":"";
          if(3 == dimensionality &&((level == 2 && i==1)|| (level == 3 && (i==1||i==2)))) {
            if(level == 2 && i==1){

            }else{
              $(".level2.switch.noline_docu").hide();
            }
            _class+=" tbodycell_padding switch tbodycell_left "
          } else if(2 == dimensionality && (level == 2 && i==1)){
            $(".level1.switch.noline_docu").hide();
            _class+=" tbodycell_padding switch tbodycell_left "
          }else{
            //第一列增加类swich,且向左
            i==0? _class+=" swich tbodycell_left ":_class+=" tbodycell_"+rlist[i].align+" ";
          }
          // i>0&&dimensionality>1&&level>0&&dimensionality>=level ?_class+=" tbodycell_padding tbodycell_left swich":
          var _style = "";
          var _value = commonUtil.isNotEmpty(rlist[i].dataIndex)?new String(data[rlist[i].dataIndex]).trim():"";
          if("diy"==type){
            _style = "width:"+rlist[i].minWidth+"px";
          }else{
            _style = "width:"+width +"px";
          }
          //判断图标显示
          var ifHasIcon = that.compareIfHasIcon(data,rlist[i]);
          html += '<div class="'+_class+'" style="'+_style+'"><span '+ifHasIcon._attribute_font+' class="' + ifHasIcon._class_font +'">'+_value+'</span>'+ifHasIcon._value_icon_html+'</div>';
        }
      }
      return html;
    };
    //判断单元格数据带出的标志
    //(up,down,warn=> 分别代表 上升，下钻，警告)
    //(font#1,up#1,down#1,warn#1=> 分别代表 字体可下钻，上升可下钻，下降可下钻，警告可下钻)
    this.compareIfHasIcon = function(data,rlist_i){
    	var html = '';
    	var _value_icon_html = '';
      var _value_icon = '';
      var _class_font = '';
      var _attribute_font = '';
      if(commonUtil.isNotEmpty(rlist_i.dataIndex)){
				html += data[rlist_i.dataIndex];
				if (commonUtil.isNotEmpty(data["hyhttable_"+rlist_i.dataIndex+"_kpi"])) {
					var stringKpi = data["hyhttable_"+rlist_i.dataIndex+"_kpi"];
					html += stringKpi;
					var arrayKpi = stringKpi.split(",");
					var htmlKpi = {
						'up':'<div class="goicon goup" _data_type="2" _data_colname="'+rlist_i.dataIndex+'" _data_rowname="'+data.tId+'"></div>',
						'down':'<div class="goicon godown" _data_type="3" _data_colname="'+rlist_i.dataIndex+'" _data_rowname="'+data.tId+'"></div>',
						'warn':'<div class="goicon gowarn" _data_type="4" _data_colname="'+rlist_i.dataIndex+'" _data_rowname="'+data.tId+'"></div>'
					}
					for (var i = 0;i < arrayKpi.length;i++) {
						var _type = arrayKpi[i].split("#")[0]; //返回的指标，font,up,down,warn
						var _type2 = arrayKpi[i].split("#")[1]; //返回的指标,
		      	if(commonUtil.isNotEmpty(_type)){
		      		if("font" == _type){
		      				_class_font = "goicon font";
		      				_attribute_font = '_data_type="1" _data_colname="'+rlist_i.dataIndex+'" _data_rowname="'+data.tId+'"';
			      	}
							_value_icon += commonUtil.isNotEmpty(htmlKpi[_type])?htmlKpi[_type]:"";
		      	}
					}
				}
			}
      if(commonUtil.isNotEmpty(_value_icon)){
      	_value_icon_html += '<div class="markingBtn">';
      	_value_icon_html += _value_icon;
      	_value_icon_html += '</div>';
      }
      return {"_value_icon_html":_value_icon_html,"_class_font":_class_font,"_attribute_font":_attribute_font};
    };
    this.initData = function(data,headList,index,width){
      var lastList = headList && headList.length>0?headList[headList.length-1]:[];
      var node = lastList.length>0?lastList[index]:null;
      if(node && commonUtil.isNotEmpty(node.dataIndex)){
        that.formartData(data,node.dataIndex,0,width);
      }
    };
    this.formartData = function (data,name,level,width) {
      if(data && data.length>0){
        for(var i=0;i<data.length;i++){
          var newname = commonUtil.isNotEmpty(data[i][name])?new String(data[i][name]).trim():"";
          data[i].name = newname;
          data[i].level = level;
          that.handleShowText(data[i],width);
          if(data[i].children && data[i].children.length>0){
            that.formartData(data[i].children,name,(level+1),width);
          }
        }
      }
    };
    this.handleShowText = function (treeNode,mLength) {
      if(treeNode && treeNode.name && treeNode.name.length>3 ){
        var startLength = 37;
        var endLength = 2;
        var levelLength = 15;
        var textlength = 12;
        var text = treeNode.name;
        var level = treeNode.level;
        var oLength = mLength - level*levelLength - startLength -  endLength ;
        var o1 = parseInt(oLength/textlength);
        var o2 = text.length;
        if(o2>o1){
          var newText = new String(text).substring(0,o1-1);
          newText+="...";
          treeNode.name = newText;
        }
      }
    };
    this.init = function (data,type,viewWidth) {
      //获取表头的层级
      var tier = that.getHeadTier(data);
      //格式化表头数据 将数据转换成HeadTdObj对象
      var arr = that.formatHeadData(data);
      //表头处理结果
      var list = that.getColumnList(arr,tier);
      that.handleRowAndColpan(list,type);
      that.formarHead2(list,viewWidth);
      return list;
    };
    //格式化数据
    this.formatHeadData = function (data) {
      var arr = [];
      for(var i=0;i<data.length;i++){
        var hyhtid = commonUtil.guid();
        arr.push(
          that.setHeadTdObj(
            data[i],
            null,
            hyhtid,
            0,
            i
          )
        );
        that.getCurRow(data[i],arr,hyhtid,1,i);
      }
      return arr;
    };
    //遍历遍历children的节点
    this.getCurRow = function (data,arr,hyhtpid,hyhtcj,hyhtlie) {
      if(data.children && data.children.length>0){
        for(var i=0;i<data.children.length;i++){
          var hyhtid = commonUtil.guid();
          arr.push(
            that.setHeadTdObj(
              data.children[i],
              hyhtpid,
              hyhtid,
              hyhtcj,
              hyhtlie
            )
          );
          if(data.children[i].children && data.children[i].children.length>0){
            that.getCurRow(data.children[i],arr,hyhtid,(hyhtcj+1),hyhtlie)
          }
        }
      }
    };
    //获取字段顺序和显示样式
    this.getColumnList = function(list,tier){
      var rlist = [];
      for(var i=0;i<tier;i++){
        rlist[i] = new Array();
      }
      for(var i=0;i<list.length;i++){
        rlist[list[i].hyhtcj].push(list[i])
      }
      return rlist;
    };
    this.formarHead2 = function (list,viewWidth) {
      var flag = true;
      var lastNum = list.length-1;
      var last = list[lastNum];
      for(var i=0;i<last.length;i++){
        if( last[i].minWidth == -1){
          flag = false;
          break;
        }
      }
      if(!flag){
        var tempWidth = 0;
        var tempLen = 0;
        for(var i=0;i<last.length;i++){
          if( last[i].minWidth == -1) {
            tempLen += 1;
          }else{
            tempWidth += last[i].minWidth;
          }
        }
        if(tempLen>0){
          var tempUseWith = viewWidth - tempWidth;
          tempUseWith = tempUseWith - tempUseWith %(tempLen*10);
          var tempRdWidth = commonUtil.percentNum(tempUseWith,tempLen);
          if(tempRdWidth<60){
            tempRdWidth = 60;
          }
          for(var i=0;i<last.length;i++){
            if( last[i].minWidth == -1) {
              last[i].minWidth = last[i].colSpan * tempRdWidth;
            }
          }
          for (var i = list.length - 2; i >= 0; i--) {
            for (var j = 0; j < list[i].length; j++) {
              var width = that.getColsWidth(list, (i + 1), list[i][j].hyhtid);
              if (width > 0) {
                list[i][j].minWidth = width;
              }
            }
          }
        }
      }
    }
    this.handleRowAndColpan = function(list,type){
      //处理宽度
      if(commonUtil.isNotEmpty(type) && "diy" == type && list.length>1) {
        for (var i = list.length - 2; i >= 0; i--) {
          for (var j = 0; j < list[i].length; j++) {
            var width = that.getColsWidth(list, (i + 1), list[i][j].hyhtid);
            if (width > 0) {
              list[i][j].minWidth = width;
            }
            var colspan = that.getColsNum(list, (i + 1), list[i][j].hyhtid);
            if( colspan > 0){
              list[i][j].colSpan = colspan;
            }
          }
        }
      }else{
        for (var i = list.length - 2; i >= 0; i--) {
          for (var j = 0; j < list[i].length; j++) {
            var colspan = that.getColsNum(list, (i + 1), list[i][j].hyhtid);
            if( colspan > 0){
              list[i][j].colSpan = colspan;
            }
          }
        }
      }
      //处理Row
      for(var i=0;i<list.length;i++){
        for(var j=0;j<list[i].length;j++){
          if(list[i][j].rowSpan >1 && (i+1)<list.length){
            that.removeRowAndColpan(list,list[i][j].hyhtlie,(i+1),(i+list[i][j].rowSpan-1))
          }
        }
      }
    };
    this.getColsWidth = function (list,col,hyhtid) {
      var width = 0;
      for(var i=0;i<list[col].length;i++){
        if(hyhtid == list[col][i].hyhtpid){
          if(commonUtil.isNotEmpty(list[col][i].minWidth)){
            var useWidth = 0;
            var ys = list[col][i].minWidth %10;
            if( ys > 0 ){
              useWidth = list[col][i].minWidth - ys + 10;
            }else if( ys == 0 ){
              useWidth = list[col][i].minWidth;
            }else{
              useWidth = list[col][i].minWidth - ys;
            }
            width += useWidth;
          }else{
            list[col][i].minWidth = -1;
            width = list[col][i].minWidth;
          }
        }
      }
      return width;
    };
    this.getColsNum = function (list,col,hyhtid) {
      var num = 0;
      for(var i=0;i<list[col].length;i++){
        if(hyhtid == list[col][i].hyhtpid){
          num += list[col][i].colSpan;
        }
      }
      return num;
    }
    this.removeRowAndColpan = function (list,col ,row1,row2) {
      for(;row1<=row2;row1++){
        for(var i=0;i<list[row1].length;i++){
          if(col == list[row1][i].hyhtlie){
            list[row1].splice(i,1);
            // list[row1][i].isdel = 1;
          }
        }
      }
    };
    //设置对象
    this.setHeadTdObj = function(data,hyhtpid,hyhtid,hyhtcj,hyhtlie){
      return {
        "name": data.name,
        "dataIndex": data.dataIndex,
        "minWidth":commonUtil.isNotEmpty(data.minWidth)?new Number(data.minWidth):0,
        "rowSpan": new Number(data.rowSpan),
        "align": commonUtil.isNotEmpty(data.align)?data.align:"center",
        "hyhtpid":hyhtpid,
        "hyhtid":hyhtid,
        "hyhtcj":hyhtcj,
        "hyhtlie":hyhtlie,
        "isShowOrderBy": data.sort  && (data.sort   === true || data.sort   === false)? data.sort  :false,
        "curOrderBy":data.sortType ? new Number(data.sortType) :0,//1升序，2降序
        "colSpan":1,
        "isdel":0,
      }
    };
    //获取总层级数目
    this.getHeadTier = function (data) {
      var tier = 0;
      if(data && data.length>0){
        tier++;
        var tierDate = data[0];
        while (tierDate.children && tierDate.children.length > 0) {
          tier++;
          tierDate = tierDate.children[0];
        }
      }
      return tier;
    };
    //获取
  }else{
    new TreeTableLLXHelper2();
  }
};
var CommonUtil = function () {
  if(this instanceof CommonUtil){
    var that = this;
    //复制对象字段
    this.copyObj = function (obj1,obj2) {
      for (var key in obj1){
        obj2[key] = obj1[key];
      }
    };
    //升降序字段比较
    this.compareNum = function(property,type){
      //type 2是降序 1是升序
      if (2 == type) {
        return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value2 - value1;
        }
      } else{
        return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
        }
      }
    }
    this.isFunc = function (func) {
      if (that.isNotEmpty(func)) {
        return typeof func == 'function';
      }
      return false;
    };
    this.percentNum = function (num,num2) {
      return (num/num2).toFixed(2);
    }
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
  }else{
    return new CommonUtil();
  }
};
$.fn.extend({
getTableHelper2:function(){
  return new TableHelper2();
}
});
