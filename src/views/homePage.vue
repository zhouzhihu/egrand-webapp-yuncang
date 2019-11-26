<template>
  <div style="background-color: #e4e4e4">
    <el-container class="homePage" style="padding:5px;">
      <el-header style="font-size: 12px;height: 160px;line-height: 40px;border-bottom: 1px solid #e7e8ea;padding:0px;">
        <el-row>
          <el-col :span="12" style="height: 100%;border: 1px solid #e9e9e9;background-color: #fff;">
            <el-row style="border-bottom:1px solid #e9e9e9;">
              <el-col :span="24">
                <i class="fa fa-bars" style="padding:10px;"></i>常用功能
              </el-col>
            </el-row>
            <el-row style="height:116px;padding:10px;">
              <el-col :span="24">
                <el-row>
                  <el-col :span="6" style="text-align:center">
                    <el-badge :value="15" class="item" type="warning">
                      <i class="fa fa-download" style="font-size:45px;color:#409eff;margin-top:10px;"></i>
                    </el-badge>
                  </el-col>
                  <el-col :span="6" style="text-align:center">
                    <el-badge :value="10" class="item" type="primary">
                      <i class="fa fa-cart-arrow-down" style="font-size:45px;color:#409eff;margin-top:10px;"></i>
                    </el-badge>
                  </el-col>
                  <el-col :span="6" style="text-align:center">
                    <el-badge :value="23" class="item" type="warning">
                      <i class="fa fa-star-o" style="font-size:45px;color:#409eff;margin-top:10px;"></i>
                    </el-badge>
                  </el-col>
                  <el-col :span="6" style="text-align:center">
                    <el-badge :value="8" class="item" type="warning">
                      <i class="fa fa-comments-o" style="font-size:45px;color:#409eff;margin-top:10px;"></i>
                    </el-badge>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" style="text-align:center">
                    资料接收
                  </el-col>
                  <el-col :span="6" style="text-align:center">
                    资料暂存
                  </el-col>
                  <el-col :span="6" style="text-align:center">
                    资料收藏
                  </el-col>
                  <el-col :span="6" style="text-align:center">
                    工作互动
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12" style="height: 100%;border: 1px solid #e9e9e9;background-color: #fff;">
            <el-row style="border-bottom:1px solid #e9e9e9;">
              <el-col :span="24">
                <i class="fa fa-envelope-o" style="padding:10px;"></i>我的消息
              </el-col>
            </el-row>
            <el-row style="height:116px;">
              <el-col :span="24">
                <el-row>
                  <el-col :span="10">
                    <span style="margin-left:15px;"><i class="fa fa-volume-down" style="color:#409eff;margin-right:10px;"></i>2019年第二季度中心组学习资料已经更新</span>
                  </el-col>
                  <el-col :span="8" style="text-align:center;">
                    2019/10/25
                  </el-col>
                  <el-col :span="6">
                    <el-tag type="success">已读</el-tag>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <span style="margin-left:15px;"><i class="fa fa-volume-down" style="color:#409eff;margin-right:10px;"></i>2019年第二季度中心组学习资料已经更新</span>
                  </el-col>
                  <el-col :span="8" style="text-align:center;">
                    2019/10/25
                  </el-col>
                  <el-col :span="6">
                    <el-tag type="success">已读</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-main style="padding:0px">
          <el-header style="font-size: 12px;height: 117px;border-bottom: 1px solid #e7e8ea;padding:0px;">
            <el-row>
              <el-col :span="24">
                <span style="cursor: pointer;font-size: 12px;margin-top: 8px;color: rgb(72, 168, 237);z-index: 2;position: absolute;right: 27px;">
                  <el-input
                    style="width:300px;margin-right:20px;"
                    size="mini"
                    placeholder="请输入内容">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                  <el-radio v-model="radio" label="1">标题</el-radio>
                  <el-radio v-model="radio" label="2">全文</el-radio>
                  <el-button type="primary" size="mini">检索</el-button>
                </span>
                <el-tabs type="card" style="background-color: #fff">
                  <el-tab-pane>
                    <span slot="label" style="font-size:12px;"><i class="el-icon-coordinate"></i> 常用资料</span>
                    <div style="padding:12px;">
                      <el-row :gutter="20" style="font-size:14px;margin-bottom:12px;">
                        <el-col :span="4" style="color:#409eff;"><i class="fa fa-folder" style="margin-right:5px;"></i>中心组学习(92)</el-col>
                        <el-col :span="4"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>党委会议(8)</el-col>
                        <el-col :span="4"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>民主生活会(8)</el-col>
                        <el-col :span="4"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>局长办公会(5)</el-col>
                        <el-col :span="4"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>专题工作会议(5)</el-col>
                        <el-col :span="4"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>分管工作情况(5)</el-col>
                      </el-row>
                      <el-row :gutter="20" style="font-size:14px;">
                        <el-col :span="4"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>风险与问题(92)</el-col>
                        <el-col :span="4"><i class="fa fa-plus" style="margin-right:5px;color:#a7a7a7;"></i>添加</el-col>
                      </el-row>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane>
                    <span slot="label" style="font-size:12px;"><i class="el-icon-edit"></i> 待整理</span>
                    <div style="padding:12px;">
                      <el-row :gutter="20" style="font-size:14px;margin-bottom:12px;">
                        <el-col :span="6"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>工作计划(3)</el-col>
                        <el-col :span="6"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>上级检查(8)</el-col>
                        <el-col :span="6"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>业务工作(8)</el-col>
                        <el-col :span="6"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>工作总结(5)</el-col>
                      </el-row>
                      <el-row :gutter="20" style="font-size:14px;">
                        <el-col :span="6" style="color:#409eff;"><i class="fa fa-folder" style="margin-right:5px;"></i>廉政工作(92)</el-col>
                        <el-col :span="6"><i class="fa fa-plus" style="margin-right:5px;color:#a7a7a7;"></i>添加</el-col>
                      </el-row>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane style="height:100%;">
                    <span slot="label" style="font-size:12px;"><i class="el-icon-collection"></i> 待提交</span>
                    <div style="padding:12px;">
                      <el-row :gutter="20" style="font-size:14px;margin-bottom:12px;">
                        <el-col :span="6"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>工作计划(3)</el-col>
                        <el-col :span="6"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>上级检查(8)</el-col>
                        <el-col :span="6"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>业务工作(8)</el-col>
                        <el-col :span="6"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>工作总结(5)</el-col>
                      </el-row>
                      <el-row :gutter="20" style="font-size:14px;">
                        <el-col :span="6" style="color:#409eff;"><i class="fa fa-folder" style="margin-right:5px;"></i>廉政工作(92)</el-col>
                        <el-col :span="6"><i class="fa fa-plus" style="margin-right:5px;color:#a7a7a7;"></i>添加</el-col>
                      </el-row>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-col>
            </el-row>
          </el-header>
          <el-container>
            <el-aside style="background-color: #fcfcfc;border-right: 1px solid #ededed;width: 250px;">
              <el-main style="padding:0px">
                <el-tree
                  class="filter-tree"
                  :data="data1"
                  :props="defaultProps"
                  default-expand-all
                  @node-click="handleNodeClick"
                  ref="tree">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span>
                          <i :class="node.icon" style="font-size:16px;color:#409eff;"></i>&nbsp;&nbsp;{{ node.label }}
                      </span>
                    </span>
                </el-tree>
              </el-main>
            </el-aside>
            <el-container>
              <el-header style="background-color: #fff;height: 40px;overflow: hidden;border-bottom: 1px solid #f5f6f9;">
                <el-row :gutter="20" style="height:100%;line-height: 40px;">
                  <el-col :span="10">
                    <el-button size="mini" icon="el-icon-download">下载</el-button>
                    <el-button size="mini" icon="el-icon-delete">删除</el-button>
                    <el-button size="mini" icon="el-icon-position">发送</el-button>
                    <el-button size="mini" icon="el-icon-coin">暂存</el-button>
                    <el-button size="mini" icon="el-icon-star-off">收藏</el-button>
                  </el-col>
                  <el-col :span="14"  style="text-align:right">
                    按时间：
                    <el-select size="mini" v-model="value" placeholder="请选择" style="width:120px;">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-input
                      style="width:150px;"
                      size="mini"
                      placeholder="当前文件夹搜索">
                      <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                  </el-col>
                </el-row>
              </el-header>
              <el-container>
                <el-table class="table-box-person" :data="tableData" :style="{height:contentHeight}">
                  <el-table-column prop="name" label="名称">
                    <template slot-scope="scope">
                    <span style="height:40px;line-height:40px;">
                      <span :style="'color:' + ('word' == scope.row.fileType ? '#409eff' : ('excel' == scope.row.fileType ? '#72dca2' : '#ff7398')) + ';font-size:25px;vertical-align: middle;'">
                        <i :class="'fa fa-file-' + scope.row.fileType + '-o'"></i>
                      </span>
                      <span style="margin-left: 8px;">{{scope.row.name}}</span>
                    </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" label="修改时间(修改人)" width="280">
                  </el-table-column>
                  <el-table-column prop="size" label="大小" width="120">
                  </el-table-column>
                </el-table>
              </el-container>
            </el-container>
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      const item = {
        name: '中心组学习文件',
        date: '2016-05-02(张三)',
        size: '10.1K',
      };
      return {
        contentHeight: '100px;',
        radio: '1',
        options: [{
          value: 'all',
          label: '全部'
        }],
        value: '全部',
        tableData: [{
          name: '2019年第一季度中心组学习通知',
          date: '2016-05-02(张三)',
          fileType: 'word',
          size: '10.1K',
        },{
          name: '2019年第一季度中心组学习材料',
          date: '2016-05-02(张三)',
          fileType: 'pdf',
          size: '10.1K',
        },{
          name: '2019年第一季度中心组领导发言',
          date: '2016-05-02(张三)',
          fileType: 'word',
          size: '10.1K',
        },{
          name: '2019年第一季度中心组会议记录',
          date: '2016-05-02(张三)',
          fileType: 'word',
          size: '10.1K',
        },{
          name: '2019年第一季度中心组学习领导发言大纲',
          date: '2016-05-02(张三)',
          fileType: 'word',
          size: '10.1K',
        }],
        data1: [{
          label: '中心组学习(92)',
          icon:'el-icon-folder-opened',
          children: [{
            label: '学习管理办法(20)',
            icon:'el-icon-document'
          },{
            label: '学习计划(52)',
            icon:'el-icon-document'
          },{
            label: '2019第一季度中心组学习',
            icon:'el-icon-folder-opened',
            children: [{
              label: '会议通知(4)',
              icon:'el-icon-document'
            },{
              label: '学习材料(6)',
              icon:'el-icon-document'
            },{
              label: '主题发言稿(10)',
              icon:'el-icon-document'
            },{
              label: '领导发言大纲(5)',
              icon:'el-icon-document'
            },{
              label: '学习会议纪要(8)',
              icon:'el-icon-document'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    created() {
      var that = this;
      setTimeout(function(){
        that.contentHeight = document.documentElement.clientHeight - 328 + "px";
      }, 100);
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
  };
</script>
