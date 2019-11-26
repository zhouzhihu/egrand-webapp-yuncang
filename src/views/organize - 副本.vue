<template>
  <el-container class="organize">
    <el-header style="font-size: 12px;height: 40px;line-height: 40px;border-bottom: 1px solid #e7e8ea;">
      <el-row :gutter="20" style="height:100%;line-height: 40px;">
        <el-col :span="12" style="height:40px;line-height: 40px;color:#f56c6c;">
          <i class="el-icon-chat-line-round" style="font-size:18px;"></i>
          【组织】存放我在组织和我管理组织的全部资料，您可以按组织浏览，也可以全文检索您需要的资料！
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <i class="el-icon-delete-solid" style="color:#409eff;font-size:22px;"></i>
          <span>资料暂存(112)</span>
          <i class="el-icon-star-on" style="color:#409eff;font-size:22px;"></i>
          <span>资料收藏(43)</span>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside style="background-color: #fcfcfc;border-right: 1px solid #ededed;width: 250px;">
        <el-container>
          <el-header style="font-size: 12px;height: 40px;line-height: 40px;border-bottom: 1px solid #e7e8ea;">
            <el-col :span="22">
              机关第一党支部
            </el-col>
            <el-col :span="2">
              <el-popover
                placement="bottom"
                title="选择组织"
                width="200"
                trigger="manual"
                v-model="visible">
                  <el-tree
                    class="filter-tree"
                    :data="data"
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
                <el-button icon="fa fa-sitemap" circle slot="reference" @click="visible = !visible" size="mini"></el-button>
              </el-popover>
            </el-col>
          </el-header>
          <el-main style="padding:0px">
            <el-tabs type="card">
              <el-input
                size="mini"
                placeholder="请输入内容">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-tab-pane>
                <span slot="label" style="font-size:12px;"><i class="el-icon-coordinate"></i> 固定分类</span>
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
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label" style="font-size:12px;"><i class="el-icon-edit"></i> 自定义分类</span>
              </el-tab-pane>
              <el-tab-pane label="标签">
                <span slot="label" style="font-size:12px;"><i class="el-icon-collection"></i> 标签</span>
              </el-tab-pane>
            </el-tabs>
          </el-main>
        </el-container>
      </el-aside>
      <el-container>
        <el-main style="padding:0px">
          <el-container>
            <el-header style="background-color: #fff;height: 40px;overflow: hidden;border-bottom: 1px solid #f5f6f9;">
              <el-row :gutter="20" style="height:100%;line-height: 40px;">
                <el-col :span="12">
                  <el-breadcrumb separator="/" style="line-height:40px;height:40px;">
                    <el-breadcrumb-item :to="{ path: '/' }">廉政工作</el-breadcrumb-item>
                    <el-breadcrumb-item>廉政检查</el-breadcrumb-item>
                    <el-breadcrumb-item>一季度检查</el-breadcrumb-item>
                  </el-breadcrumb>
                </el-col>
                <el-col :span="12" style="text-align:right;">
                  <el-input
                    style="width:300px;margin-right:20px;"
                    size="mini"
                    placeholder="请输入内容">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                  <el-radio v-model="radio" label="1">标题</el-radio>
                  <el-radio v-model="radio" label="2">全文</el-radio>
                  <el-button type="primary" size="mini">检索</el-button>
                  <span style="margin-left:20px;">
                    <i class="el-icon-menu" style="color:#409eff"></i>
                    <i class="el-icon-caret-bottom" style="color:#409eff"></i>
                  </span>
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
        </el-main>
      </el-container>
    </el-container>
  </el-container>
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
        visible: false,
        contentHeight: '100px;',
        radio: '1',
        tableData: [{
          name: '中心组学习文件',
          date: '2016-05-02(张三)',
          fileType: 'word',
          size: '10.1K',
        },{
          name: '中心组学习文件',
          date: '2016-05-02(张三)',
          fileType: 'excel',
          size: '10.1K',
        },{
          name: '中心组学习文件',
          date: '2016-05-02(张三)',
          fileType: 'pdf',
          size: '10.1K',
        }],
        data: [{
          label: '我所在组织',
          icon: 'el-icon-user-solid',
          children: [{
            label: '机关第一党支部',
            icon:'el-icon-office-building'
          },{
            label: '办公室',
            icon:'el-icon-office-building'
          },{
            label: '扶贫工作领导小组',
            icon:'el-icon-office-building'
          }]
        }, {
          label: '我管理的组织',
          icon:'el-icon-s-custom'
        }],
        data1: [{
          label: '工作计划(92)',
          icon:'el-icon-folder-opened',
          children: [{
            label: '第一季度工作计划(20)',
            icon:'el-icon-document'
          },{
            label: '第二季度工作计划(52)',
            icon:'el-icon-document'
          },{
            label: '第三季度工作计划',
            icon:'el-icon-document'
          },{
            label: '第四季度工作计划',
            icon:'el-icon-document'
          }]
        },{
          label: '廉政工作(92)',
          icon:'el-icon-folder-opened',
          children: [{
            label: '廉政风险点(20)',
            icon:'el-icon-document'
          },{
            label: '廉政教育(52)',
            icon:'el-icon-document'
          },{
            label: '廉政检查',
            icon:'el-icon-folder-opened',
            children: [{
              label: '一季度检查(4)',
              icon:'el-icon-document'
            },{
              label: '一季度检查(6)',
              icon:'el-icon-document'
            },{
              label: '一季度检查(10)',
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
        that.contentHeight = document.documentElement.clientHeight - 100 + "px";
      }, 100);
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
  };
</script>
