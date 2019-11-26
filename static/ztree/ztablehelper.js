var TableHelper = function () {
  if (this instanceof TableHelper) {
      var that = this;
      var treeTableLLXHelper = new TreeTableLLXHelper();
      var commonUtil = new CommonUtil();
      this.data = null;
      this.zTreeNodes = null;
      this.id = null;
      this.viewId = null;
      this.pageInfo = null;
      this.selectInfo = null;
      this.isInitPageFlag = false;
      that.viewWidth = null;
      this.temple = "simple";
      this.isThreeRows = 1;
      this.isPageInfo = false;
      this.bLStr = null;
      this.screenWidth = null;
      this.dataHt = null;
      this.ztreeHt = null;
      this.ztreeBoxHt = null;
      this.upData = null;
      this.headboxHt = $("#"+that.viewId+" li.headbox").height();
      this.pagination_boxHt = null;
      //ztable树的对象设置，点击折叠收缩回调方法
      this.setting = {
        view: {
          dblClickExpand: false,
          showLine: false,
          showIcon: false,
          addDiyDom: function(treeId, treeNode){
            that.addDiyDom(treeId, treeNode)
          }
        },
        callback: {
          onCollapse: function (event, treeId, treeNode) {
						that.addChildrenHeight(treeNode,0);
          },
          onExpand: function (event, treeId, treeNode) {
            that.addChildrenHeight(treeNode,1);
          },
        },
        data: {
          simpleData: {
            enable: true
          }
        }
      };
      //使用treeTableLLXHelper控件初始化传过来的表头数据，定义数据和类型
      this.initTableHead = function (viewWidth) {
        var html = '';
        html += '<li class="headbox">';
        var cwidth ='style="width:'+viewWidth+'px"';
        html += '<table border="0" cellspacing="0" cellpadding="0" '+cwidth+'>';
        html += treeTableLLXHelper.getReHeadHtml(that.bLStr,that.temple);
        html += '</table>';
        html += '</li>';
        return html;
      };
    	//自定义DOM节点
      this.addDiyDom = function (treeId, treeNode) {
        var spaceWidth = 15;
        var liObj = $("#" + treeNode.tId);
        var aObj = $("#" + treeNode.tId + "_a");
        var switchObj = $("#" + treeNode.tId + "_switch");
        var icoObj = $("#" + treeNode.tId + "_ico");
        var spanObj = $("#" + treeNode.tId + "_span");
        aObj.attr('title', '');
        aObj.attr('text-decoration',"none");
        var kbLStr = that.bLStr;
        if("diy"==that.temple){
          kbLStr = treeTableLLXHelper.getContentList()[0].minWidth +"px";
        }
				if (3 == that.isThreeRows) {
					//三维
					var oneRowBtn = '<div class="tbodycell tbodycell_left swich" style="width: '+kbLStr+'"></div>';
	        aObj.append();
	        switchObj.before(spaceStr);
	        var bLStr = that.bLStr ;
	        if("diy"==that.temple){
	          bLStr = that.temple;
	        }
	        var nodeContentHtml  = treeTableLLXHelper.getContentHtml(treeNode,bLStr,treeNode.level+1,that.isThreeRows,treeId);
	        aObj.append(nodeContentHtml);

	        var div = $(liObj).find('div').eq(treeNode.level+1);
	        var spaceStr = "<span style='height:1px;display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
	        switchObj.remove();
	        spanObj.remove();
	        icoObj.remove();
	        div.prepend(switchObj);
				}else if(2 == that.isThreeRows){
					//二维
					var oneRowBtn = '<div class="tbodycell tbodycell_left swich" style="width: '+kbLStr+'"></div>';
	        aObj.append();
	        switchObj.before(spaceStr);
	        var bLStr = that.bLStr ;
	        if("diy"==that.temple){
	          bLStr = that.temple;
	        }
	        var nodeContentHtml  = treeTableLLXHelper.getContentHtml(treeNode,bLStr,treeNode.level+1,that.isThreeRows,treeId);
	        aObj.append(nodeContentHtml);

	        var div = $(liObj).find('div').eq(treeNode.level+1);
	        var spaceStr = "<span style='height:1px;display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
	        switchObj.remove();
	        spanObj.remove();
	        icoObj.remove();
	        div.prepend(switchObj);
				} else{
					//一维
					aObj.append('<div class="tbodycell tbodycell_left swich" style="width: '+kbLStr+'"></div>');
	        var div = $(liObj).find('div').eq(0);
	        switchObj.remove();
	        spanObj.remove();
	        icoObj.remove();
	        div.append(switchObj);
	        div.append(spanObj);
	        var spaceStr = "<span style='height:1px;display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
	        switchObj.before(spaceStr);
	        var bLStr = that.bLStr ;
	        if("diy"==that.temple){
	          bLStr = that.temple;
	        }
	        var nodeContentHtml  = treeTableLLXHelper.getContentHtml(treeNode,bLStr,treeNode.level+1,treeId);
	        aObj.append(nodeContentHtml);
				}

				var treeHt = $("#"+that.viewId).height();
      	that.ztreeBoxHt = $("#"+that.viewId+" div.ztreeBox").height();
      	var headboxHt = $("#"+that.viewId+" li.headbox").height();
      	that.pagination_boxHt = $("#"+that.viewId+" div.pagination_box").height();
      	that.dataHt = (that.data.dataSource.length)*40;
				if (that.isPageInfo) {
	      	if ((treeHt-that.ztreeBoxHt - headboxHt - that.pagination_boxHt) <= that.dataHt) {
		  			$("#"+that.id+" .laserDivpaddingRight").each(function(){
					    $(this).css("padding-right","21px")
					  });
	      	}
				} else{
					if ((treeHt - that.ztreeBoxHt - headboxHt) <= that.dataHt) {
		  			$("#"+that.id+" .laserDivpaddingRight").each(function(){
					    $(this).css("padding-right","21px")
					  });
	      	}
				}
//				console.log(that.ztreeBoxHt,headboxHt,that.pagination_boxHt,that.dataHt,(treeHt - that.ztreeBoxHt - that.headboxHt) >= that.dataHt)

      };
      //初始化页面，构建页面
      this.initView = function(){
        var html ='';
        html +='<div class="ztreetable_section">';
        html += '<div class="ztree_head">'
	      html +='  <div class="ztreeBox" >';
	      if(commonUtil.isNotEmpty(that.data.tableName)){
	      	html +='  <div class="ztree_header">'+that.data.tableName+'</div>'
	      }else{
	      	html +='  <div class="ztree_header"></div>'
	      }
	      if(commonUtil.isNotEmpty(that.data.creatTime) && commonUtil.isNotEmpty(that.data.unit)){
	        html +='  <div class="ztree_con">';
	        if(commonUtil.isNotEmpty(that.data.creatTime)){
	          html +='<span class="ztree_con_1">所属期:'+that.data.creatTime+'</span>';
	        }
	        if(commonUtil.isNotEmpty(that.data.unit)){
	          html +='<span class="ztree_con_2">单位:'+that.data.unit+'</span>';
	        }
	        html +='</div>';
	      }
	      html +='</div>';
	      html +='  <div id="'+that.id+'" class="ztree ztreetable">';
	      html +='  </div>';
        if(that.isPageInfo){
          html +='<div class="pagination_box">';
          html +='  <div id="pagTabTool_'+that.id+'" class="pagTabTool"><!-- 这里是分页器 --></div>';
          html +='  </div>';
        }
	      html +='  </div>';
        $("#" + that.viewId).html(html);
        if("diy" == that.temple){
          $('#'+that.id).css("overflow","auto");
        }
      };
      //重新计算表头的宽度
      this.updateLiWidth = function () {
//      if("diy"==that.temple){
          $("#"+that.id+".ztreetable.ztree li").each(function () {
            $(this).css("width",that.viewWidth);
          })
          $("#"+that.id).parent().width(that.viewWidth);
          // $("#"+that.id ).find("li").each(function(){
          //   log($(this))
          //   $(this).attr("tabindex","");});
//      }
      };
      $(window).resize(function(){
      	that.updateLiWidth();
      })
      this.initPageInfo = function () {
        //回调函数的作用是显示对应分页的列表项内容
        //回调函数在用户每次点击分页链接的时候执行
        //参数page_index{int整型}表示当前的索引页
        // var initPagination = function() {
        // 创建分页
        $("#pagTabTool_"+that.id).pagination(that.pageInfo.pages, {
          // items_per_page:1 //每页显示1项
          items_per_page: 1,//每页显示的条目数
          current_page: that.pageInfo.pageNum-1,//当前选中的页面
          num_edge_entries: 0,//	两侧显示的首尾分页的条目数
          num_display_entries:5 ,//连续分页主体部分显示的分页条目数
          callback: function (page_index, jq) {
            if(that.isInitPageFlag){
              if(commonUtil.isFunc(that.selectInfo)){
                that.selectInfo(page_index+1, that.pageInfo,"pageinfo",jq);
                that.pageInfo.pageNum = page_index+1;
              }
            }else{
              that.isInitPageFlag = true;
            }

          }
        });
      };
      this.updateInit = function (data) {
        $('#'+that.viewId).html("");
        treeTableLLXHelper.init(data.columns,that.temple);

        var viewWidth = $("#"+that.viewId).width();
      	var viewWidthLen = treeTableLLXHelper.getContentList().length;
        viewWidth = viewWidth - viewWidth%(viewWidthLen*10);
        var bLStr = treeTableLLXHelper.getCWidth(viewWidth);
        if(that.temple == "diy"){
          viewWidth = treeTableLLXHelper.getDIYWidth();
          bLStr = viewWidth+"px";
        }
        that.bLStr = bLStr;
        var kbLStr = bLStr;
        if("diy"==that.temple){
          kbLStr = treeTableLLXHelper.getContentList()[0].minWidth +"px";
        }
        treeTableLLXHelper.initData(data.dataSource,kbLStr);
        that.zTreeNodes = data.dataSource;

        that.initView();
        $.fn.zTree.init($("#"+that.id), that.setting, that.zTreeNodes);
        that.initViewHead(viewWidth);
        that.viewWidth = viewWidth;
        that.updateLiWidth();
      };
      //更新数据
      this.updateData = function (data,bLStr) {
        var kbLStr = bLStr;
        if("diy"==that.temple){
          kbLStr = treeTableLLXHelper.getContentList()[0].minWidth +"px";
        }
        treeTableLLXHelper.initData(data,kbLStr);
        that.zTreeNodes = data.dataSource;
        $("#" + that.id).html("");
        // that.initView();
        $.fn.zTree.init($("#"+that.id), that.setting, that.zTreeNodes);
//      that.initViewHead(that.viewWidth);
        that.updateLiWidth();
      };
      //设置页码的返回字段
      this.setPageInfo = function (pageinfo) {
        that.pageInfo = {
          "pageNum": pageinfo.pageNum,
          "pageSize": pageinfo.pageSize,
          "size": pageinfo.size,
          "orderBy": pageinfo.orderBy,
          "startRow": pageinfo.startRow,
          "endRow": pageinfo.endRow,
          "total": pageinfo.total,
          "pages": pageinfo.pages,
          "firstPage": pageinfo.firstPage,
          "prePage": pageinfo.prePage,
          "nextPage": pageinfo.nextPage,
          "lastPage": pageinfo.lastPage,
          "isFirstPage": pageinfo.isFirstPage,
          "isLastPage": pageinfo.isLastPage,
          "hasPreviousPage": pageinfo.hasPreviousPage,
          "hasNextPage": pageinfo.hasNextPage,
          "navigatePages": pageinfo.navigatePages,
          "navigatepageNums": pageinfo.navigatepageNums
        }
      };
      //创建diy的页码表格
      this.createDiyPageinfoTable = function (viewId,pageInfo,func) {
        that.temple = "diy";
        that.isPageInfo = true;
        that.selectInfo = func;
        that.setPageInfo(pageInfo);
        that.init(viewId,pageInfo.list);
      };
      //创建简单的页码表格
      this.createSimplePageinfoTable = function (viewId,pageInfo,func) {
	      that.isPageInfo = true;
	      that.setPageInfo(pageInfo);
	      that.selectInfo = func;
	      that.init(viewId,pageInfo.list);
	    };
      //创建diy的表格，可自定义表头宽度
      this.createDiyTable = function (viewId,data) {
        that.temple = "diy";
        that.init(viewId,data);
      };
      //创建简单表格，自适应表头
      this.createSimpleTable = function (viewId,data) {
        that.init(viewId,data);
      };
      //初始化表头，有数据追加在表头后面，无数据就提示
      this.initViewHead = function (viewWidth) {
        var li_head = that.initTableHead(viewWidth);
//      var rows = $("#"+that.id).find('li');
        var rows = $("#"+that.id);
        if(rows.html()) {
          rows.eq(0).before(li_head)
        } else {
          rows.eq(0).before(li_head);
          rows.eq(0).before('<li class="no_data_li"><div>无符合条件数据</div></li>')
        }
      };
      //定义控件的高度，计算比较实际高度和可用高度产生滚动
      this.usefulTreeHeightIfAdd = function(treeNode){
      	that.ztreeBoxHt = $("#"+that.viewId+" div.ztreeBox").height();
      	that.headboxHt = $("#"+that.viewId+" li.headbox").height();
      	that.pagination_boxHt = $("#"+that.viewId+" div.pagination_box").height();
      	that.dataHt = (that.data.dataSource.length)*40;

      	if (that.isPageInfo){
      		that.initPageInfo();

					that.ztreeHt =$("#"+that.viewId).height()-that.ztreeBoxHt-that.headboxHt-that.pagination_boxHt;
					if (that.ztreeHt >= that.dataHt) {
						$("#"+that.id).height(that.dataHt+"px");
					} else{
					  $("#"+that.id).height(that.ztreeHt+"px").css("overflow-y","auto");
					}
				} else{
					$("#"+that.id).height($("#"+that.viewId).height()-that.ztreeBoxHt-that.headboxHt+"px").css("overflow-y","auto");
				}
      },
      //数据下钻，折叠按钮打开关闭，增减可用高度，配合初始化的usefulTreeHeightIfAdd使用
      this.addChildrenHeight = function(treeNode,type){
      	if (treeNode !== undefined && treeNode !== null) {
      		var treeNodeChildrenHt = (treeNode.children.length)*40;
      		var initDataHt = (that.data.dataSource.length)*40;
      		if(1 == type){
      			that.dataHt += treeNodeChildrenHt;
      		}else{
      			that.dataHt -= treeNodeChildrenHt;
      		}
      		if (that.ztreeHt >= that.dataHt) {
      			//树的高度 >= 实际可用高度 753 >= 400
						$("#"+that.id).height(that.dataHt+"px");
					} else{
						$("#"+that.id).height(that.ztreeHt+"px").css("overflow-y","auto");
					}
      	}
      },
      //初始化ztree-数据和方法
      this.init = function (viewId,data) {
        that.viewId = viewId;
        that.data = data;
        that.id = that.viewId+"_"+commonUtil.guid();

        treeTableLLXHelper.init(data.columns,that.temple);

        var viewWidth = $("#"+that.viewId).width();
        var viewWidthLen = treeTableLLXHelper.getContentList().length;
        viewWidth = viewWidth - viewWidth%(viewWidthLen*10);
        var bLStr = treeTableLLXHelper.getCWidth(viewWidth);
        if(that.temple == "diy"){
          viewWidth = treeTableLLXHelper.getDIYWidth();
          bLStr = viewWidth+"px";
        }
        that.bLStr = bLStr;
        var kbLStr = bLStr;
        if("diy"==that.temple){
          kbLStr = treeTableLLXHelper.getContentList()[0].minWidth +"px";
        }

        treeTableLLXHelper.initData(data.dataSource,kbLStr);
        that.zTreeNodes = data.dataSource;
        that.initView();
        $.fn.zTree.init($("#"+that.id), that.setting, that.zTreeNodes);
        that.initViewHead(viewWidth);
        that.viewWidth = viewWidth;
        that.updateLiWidth();

				if ($("#" + that.viewId + " .ztreeBox")) {
					var headboxht = $("#" + that.viewId + " .ztreeBox").height() + "px";
				} else{
					headboxht = "0px";
				}
				that.usefulTreeHeightIfAdd();
				//屏幕发生变化，重新计算宽度，保证线条对接
        $(window).resize(function(){
        	var viewWidth = $("#"+that.viewId).width();
	        var viewWidthLen = treeTableLLXHelper.getContentList().length;
	        viewWidth = viewWidth - viewWidth%(viewWidthLen*10);
	        var bLStr = treeTableLLXHelper.getCWidth(viewWidth);
	        if(that.temple == "diy"){
	          viewWidth = treeTableLLXHelper.getDIYWidth();
	          bLStr = viewWidth+"px";
	        }
	        that.bLStr = bLStr;
	        var kbLStr = bLStr;
	        if("diy"==that.temple){
	          kbLStr = treeTableLLXHelper.getContentList()[0].minWidth +"px";
	        }

	        treeTableLLXHelper.initData(data.dataSource,kbLStr);
	        that.zTreeNodes = data.dataSource;
	        that.initView();
	        $.fn.zTree.init($("#"+that.id), that.setting, that.zTreeNodes);
	        that.initViewHead(viewWidth);
	        that.viewWidth = viewWidth;
	        that.updateLiWidth();

					if ($("#" + that.viewId + " .ztreeBox")) {
						var headboxht = $("#" + that.viewId + " .ztreeBox").height() + "px";
					} else{
						headboxht = "0px";
					}
					that.usefulTreeHeightIfAdd();
       });

//				if(1 == that.useClickCellStyle){
//					$("#" + that.viewId + " .tbodycell").bind("click",that.clickCell)
//				}else{
//					$("#" + that.viewId + " .tbodycell .goup").bind("click",that.clickCellBtn)
//					$("#" + that.viewId + " .tbodycell .godown").bind("click",that.clickCellBtn)
//					$("#" + that.viewId + " .tbodycell .gowarn").bind("click",that.clickCellBtn)
//				}

				$("#" + that.viewId + " .colUp").bind("click",that.colUpDownBtn);
        $("#" + that.viewId + " .colDown").bind("click",that.colUpDownBtn);

     };

      //升降序点击方法
      this.colUpDownBtn = function(e){
      	$("div").removeClass("colCurHigh");
      	$(this).addClass("colCurHigh");
      	var curUpDownBtnType = $(e.currentTarget).attr("_data_type");
      	var curUpDownBtnName = $(e.currentTarget).attr("_data_name");
      	var arrDate = [];
      	//选中高亮，未选中的不高亮
      	if(that.isPageInfo){
      		that.selectInfo(curUpDownBtnType, curUpDownBtnName,"orderby",e);
      	}else{
      		//将数据的字段 curUpDownBtnName根据curUpDownBtnType进行排序，将1进行升序，2进行降序
      		//递归数据摸个字段进行升降序
      		//刷新数据 updateData
      		if (1 == curUpDownBtnType) {
						that.upData = that.data.dataSource.sort(that.compareNum(curUpDownBtnName,1));
      		} else{
      			that.upData = that.data.dataSource.sort(that.compareNum(curUpDownBtnName,2));
      		}
      		that.updateData(that.data,that.bLStr);
      	}
      };
      //升降序字段比较
      this.compareNum = function(property,type){
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
   		//单击单元格带出的信息
   		this.clickCell = function(e){
				//当前行的id标识
				var parentId = $(this).parent().attr("id");
				//当前单元格>列表头带出的标志
				var curCellDataIndex = $(e.currentTarget).attr("_cell_dataIndex");
				console.log(parentId," ",curCellDataIndex)
    	};
   		/**
     * 根据权限展示功能按钮
     * @param treeNode
     * @returns
     */
      this.formatHandle = function(treeNode){
        var htmlStr = '';
        htmlStr += '<div class="icon_div"><a class="icon_see" href="javascript:view(\'' + treeNode.id + '\')">查看</a></div>';
        htmlStr += '<div class="icon_div"><a class="icon_edit" href="javascript:edit(\'' + treeNode.id + '\')">修改</a></div>';
        return htmlStr;
      }

  }else{
    return new TableHelper();
  }
};
var TreeTableLLXHelper = function(){
  if(this instanceof TreeTableLLXHelper){
    var that = this;
    var commonUtil = new CommonUtil();
    this.data = null;
    this.tier = null;
    this.list = null;
    this.headHtml = "";
    //返回表头数据
    this.getReHeadHtml = function(bLStr,type){
      that.headHtml = that.getHeadHtml(that.list,bLStr,type);
      return that.headHtml;
    };
    //表头-table数据
    this.getContentList = function () {
      var rlist =  that.list&&that.list.length>0?that.list[that.list.length-1]:[];
      return rlist;
    };
    //表头数据 dataIndex存在就返回
    this.getOneContent = function () {
      var rList = that.getContentList();
      return rList&& rList.length>0?rList[0].dataIndex:null;
    };
    //在DIY后台数据定义每列宽度
    this.getDIYWidth = function () {
      var list = that.getContentList();
      var sum = 0;
      for(var i=0;i<list.length;i++){
        if(list[i].minWidth && list[i].minWidth>0){
          sum += list[i].minWidth;
        }
      }
      return sum;
    };
    //在自适应宽度时，定义每列宽度bLStr
    this.getCWidth = function (viewWidth) {
      var rlist = that.getContentList();
      var bL = commonUtil.percentNum(viewWidth,rlist.length);
      // var bLStr = bL+"%";
      var bLStr = bL+"px";
      return bLStr;
    };
    this.contains = function(arr, obj) {
	    var i = arr.length;
	    while (i--) {
	        if (arr[i] === obj) {
	            return true;
	        }
	    }
	    return false;
		};
		//渲染表体数据，判断是几维数据
    this.getContentHtml = function (data,bLStr,level,isThreeRows,treeId) {
      var html = '';
      console.log(data.hyhttablekpi)

      if(data){
        var rlist = that.getContentList();
        console.log(rlist)
        var i = (2 == isThreeRows||3 == isThreeRows)?0:1;
    		for( ;i<rlist.length;i++){
	          if("diy"==bLStr){
	            bLStr = rlist[i].minWidth+"px";
	          }
	          if (3 == isThreeRows &&((level == 2 && i==1)|| (level == 3 && (i==1||i==2)))) {
	          	if(level == 2 && i==1){
	          		html += '<div class="tbodycell tbodycell_padding tbodycell_'+rlist[i].align+'" style="width: '+bLStr+'">';

//			          if(commonUtil.isNotEmpty(rlist[i].dataIndex)){
//			            html += data[rlist[i][dataIndex]];
//			            html += data[rlist[i]["hyhttable_"+dataIndex"+_kpi"]];
//			               var newArr = data[0].hyhttablekpi.split(",");
//								//    console.log(newArr,that.contains(newArr,"down"))
//
//								      var y = {
//								      	"up":'<div class="goup"></div>',
//								      	"down":'<div class="godown"></div>',
//								      	"warn":'<div class="gowarn"></div>',
//								      }
//								      var _value_icon_html = '';
//								      var _value_icon = '';
//								      var _class_font = '';
//								      for(var i=0;i<newArr.length;i++){
//								      	var _type = newArr[i].split("#")[0];
//								      	var _opt = newArr[i].split("#").length>1?newArr[i].split("#")[1]:"";
//								      	if(commonUtil.isNotEmpty(_type) ){
//								      		if("font" == _type){
//									      		_class_font = "font";
//									      	}else{
//									      		_value_icon += commonUtil.isNotEmpty(y[_type])?y[_type]:"";
//									      	}
//								      	}
//
//								      }
//								      if(commonUtil.isNotEmpty(_value_icon)){
//								      	_value_icon_html += '<div class="markingBtn">';
//								      	_value_icon_html += _value_icon;
//								      	_value_icon_html += '</div>';
//								      }
//
//			          }


								html += '</div>';
	          	}else{
	          		$(".level2.switch.noline_docu").hide();
	          		html += '<div class="tbodycell tbodycell_padding tbodycell_'+rlist[i].align+'" style="width: '+bLStr+'">';
			          if(commonUtil.isNotEmpty(rlist[i].dataIndex)){
			            html += data[rlist[i].dataIndex];
			          }
								html += '</div>';
	          	}
	          } else if(2 == isThreeRows && (level == 2 && i==1)){
	          	$(".level1.switch.noline_docu").hide();
	          	html += '<div class="tbodycell tbodycell_padding tbodycell_'+rlist[i].align+'" style="width: '+bLStr+'">';
		          if(commonUtil.isNotEmpty(rlist[i].dataIndex)){
		            html += data[rlist[i].dataIndex];
		          }
							html += '</div>';
	          }else{
	          	var swich = i==0?"swich":"";
	          	var lasterDivClass = i==rlist.length-1?"laserDivpaddingRight":"";
	          	html += '<div _cell_dataIndex="' + rlist[i].dataIndex + '"  class="tbodycell '+swich+' tbodycell_'+rlist[i].align+' '+ lasterDivClass +'" style="width: '+bLStr+'">';
		          if(commonUtil.isNotEmpty(rlist[i].dataIndex)){
		          	html += data[rlist[i].dataIndex];
//		            html += '<span class="'+_class_font+'">'+data[rlist[i].dataIndex]+'</span>';
//		            html += _value_icon_html;
		          }
							html += '</div>';
	          }
    		}
      }
      return html;
    };
    this.initData = function(data,kbLStr){
      var name = that.getOneContent();
      that.formartData(data,name,kbLStr,0);
    };
    this.formartData = function (data,name,kbLStr,level) {
      if(data && data.length>0){
        for(var i=0;i<data.length;i++){
          if(commonUtil.isNotEmpty(data[i][name])){
            data[i].name = data[i][name];
            data[i].level = level;
            that.handleShowText(data[i],kbLStr);
            if(data[i].children && data[i].children.length>0){
              that.formartData(data[i].children,name,kbLStr,(level+1));
            }
          }
        }
      }
    };
    this.handleShowText = function (treeNode,kbLStr) {
      if(treeNode && treeNode.name && treeNode.name.length>3 ){
        var mLength = new Number(kbLStr.replace("px",""));
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
    this.init = function (data,type) {
      that.data = data;
      that.tier = that.getHeadTier(that.data);
      that.arr = that.formatHeadData(that.data);
      that.list = that.getColumnList(that.arr,that.tier);
      that.handleRowAndColpan(that.list,type);
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
    this.handleRowAndColpan = function(list,type){
      //处理宽度
      if("diy" == type && list.length>1) {
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
      //处理col 从上往下找
      // for(var i=0;i<list.length;i++){
      //   for(var j=0;j<list[i].length;j++){
      //     if( (i+1)<list.length){
      //       var num = that.getColsNum(list,(i+1),list[i][j].hyhtid);
      //       if(num>0){
      //         list[i][j].colSpan = num;
      //       }
      //     }
      //   }
      // }
    };
    this.getColsWidth = function (list,col,hyhtid) {
      var width = 0;
      for(var i=0;i<list[col].length;i++){
        if(hyhtid == list[col][i].hyhtpid){
          if(commonUtil.isNotEmpty(list[col][i].minWidth)){
            width+=list[col][i].minWidth;
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
    //表头table的数据，list是数据，blstr是返回定义的宽度，type是这个表头定义的类型（diy,simple),diy是自己每列宽度，simply是自适应的宽度
    this.getHeadHtml = function (list,bLStr,type) {
      var html = "";
      for(var i=0;i<list.length;i++){
      	var flag = (i ==list.length-1);
        html += '<tr>';
        for(var j=0;j<list[i].length;j++){
          if("diy" == type){
            html+=that.getHeadTd(list[i][j],type,flag);
          }else{
            html+=that.getHeadTd(list[i][j],bLStr,flag);
          }
        }
        html += '</tr>';
      }
      return html;
    };
    //给表头tr>td存放数据，取出data进行前台处理，判断是否有升降序按钮放在最后一行tr
    this.getHeadTd = function (data,bLStr,flag) {
      var name = data.name;
      var dataIndex = data.dataIndex;
      var rowSpan = data.rowSpan;
      var align = data.align;
      var minWidth = data.minWidth;
      var colSpan = data.colSpan;
      var isShowOrderBy = data.isShowOrderBy;

      var stylehtml = "";
      if(commonUtil.isNotEmpty(bLStr)){
        if("diy" == bLStr){
          stylehtml = 'style="width:'+minWidth+'px"';
        }else{
          bLStr = bLStr.replace("px","");
          bLStr = (colSpan*bLStr)+"px";
          stylehtml = 'style="width:'+bLStr+'"';
        }
      }
      if (flag) {
      	var colBtnBox = '<div class= "colBtnBox"><div class="colUp" _data_type="1" _data_name="' + dataIndex + '"></div><div class="colDown" _data_type="2" _data_name="' + dataIndex + '"></div></div>';
      	if ("true" == isShowOrderBy) {
      		return '<td rowspan="'+rowSpan+'" colspan="'+colSpan+'" '+stylehtml+'>' + name + colBtnBox + '</td>';
      	} else{
      		return '<td rowspan="'+rowSpan+'" colspan="'+colSpan+'" '+stylehtml+'>' + name + '</td>';
      	}
      } else{
      	return '<td rowspan="'+rowSpan+'" colspan="'+colSpan+'" '+stylehtml+'>' + name + '</td>';
      }
    };
    //设置返回的数据对象
    this.setHeadTdObj = function(data,hyhtpid,hyhtid,hyhtcj,hyhtlie){
      return {
        "name": data.name,
        "dataIndex": data.dataIndex,
        "minWidth": data.minWidth,
        "rowSpan": data.rowSpan,
        "align": data.align,
        "hyhtpid": hyhtpid,
        "hyhtid": hyhtid,
        "hyhtcj": hyhtcj,
        "hyhtlie": hyhtlie,
        "isShowOrderBy": data.isShowOrderBy,
        "colSpan":1,
        "isdel":0,
        "style":"golink,goup,godown,gowarn"
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
    new TreeTableLLXHelper();
  }
};
var CommonUtil = function () {
  if(this instanceof CommonUtil){
    var that = this;
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
  getTableHelper:function(){
    return new TableHelper();
  }
});
