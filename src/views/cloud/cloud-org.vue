<template>
  <el-container>
    <el-main style="padding:0px">
      <el-header style="font-size: 12px;height: 120px;border-bottom: 1px solid #e7e8ea;padding:0 5px;">
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
              <el-button type="primary" size="mini" @click.native="onAdvSearch">高级检索</el-button>
            </span>
            <el-tabs>
              <el-tab-pane>
                <span slot="label" style="font-size:12px;"><i class="el-icon-coordinate"></i> 固定分类</span>
                <div style="padding:12px;">
                  <el-row :gutter="20" style="font-size:16px;margin-bottom:12px;">
                    <el-col :span="6"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>工作计划(3)</el-col>
                    <el-col :span="6"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>上级检查(8)</el-col>
                    <el-col :span="6"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>业务工作(8)</el-col>
                    <el-col :span="6"><i class="fa fa-folder" style="margin-right:5px;color:#a7a7a7;"></i>工作总结(5)</el-col>
                  </el-row>
                  <el-row :gutter="20" style="font-size:16px;">
                    <el-col :span="6"><i class="fa fa-folder" style="margin-right:5px;color:#409eff;"></i>廉政工作(14)</el-col>
                    <el-col :span="6"><i class="fa fa-plus" style="margin-right:5px;color:#a7a7a7;"></i>添加</el-col>
                  </el-row>
                </div>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label" style="font-size:12px;"><i class="el-icon-edit"></i> 自定义分类</span>
              </el-tab-pane>
              <el-tab-pane label="标签">
                <span slot="label" style="font-size:12px;"><i class="el-icon-collection"></i> 标签</span>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside style="background-color: #fcfcfc;border-right: 1px solid #ededed;width: 200px;">
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
        options: [{
          value: 'all',
          label: '全部'
        }],
        value: '',
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
        data1: [{
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
      const that = this;
      setTimeout(function(){
        that.contentHeight = document.documentElement.clientHeight - 200 + "px";
      }, 100);
    },
    methods: {
      initPage(){
        //todo
      },
      onAdvSearch(){
        console.log("1");
        this.$router.push({path: '/advSearch'});
      },
      handleNodeClick(data) {
        console.log(data);
      }
    },
    watch:{
      '$route'(to,from) {
        //重新获取数据
        this.initPage();
      }
    }
  };
</script>
