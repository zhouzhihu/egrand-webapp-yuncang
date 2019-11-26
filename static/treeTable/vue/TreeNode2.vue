<template>
  <div class="btnstyle" >
    <span v-if="spaceIconShow(thisIndex) && thisData.name === '栏次'" v-for="(space, levelIndex) in thisScope.row._level" class="ms-tree-space"></span>
    <span size="mini" v-if="toggleIconShow(thisIndex,thisScope.row ) && thisData.name === '栏次' && !thisScope.row._expanded"
          @click="toggle(thisScope.$index)" class="iconfont icon-icon_jia" id="jia">
    </span>
    <span size="mini" v-if="toggleIconShow(thisIndex,thisScope.row ) && thisData.name === '栏次' && thisScope.row._expanded"
          @click="toggle(thisScope.$index)" class="iconfont icon-icon_jian" id="jian">
    </span>
    <span  v-if="isNoChilden(thisIndex,thisScope.row ) && thisData.name === '栏次'"class="btn" >
    </span>
    {{thisScope.row[thisData.dataIndex]}}
    <a href="https://www.baidu.com/" v-if="thisData.name == '1'">{{thisScope.row[thisData.dataIndex]}}</a>
    <el-popover trigger="hover" placement="top" v-else-if="thisData.name == '2'">
      <p>姓名: {{ thisScope.row.hymc }}</p>
      <p>住址: {{ thisScope.row.address }}</p>
      <span slot="reference" class="name-wrapper">
        <el-tag size="medium">{{thisScope.row[thisData.dataIndex]}}</el-tag>
      </span>
    </el-popover>
    <el-progress v-else-if="thisData.name == '百分比'" :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
    <span v-else>{{thisScope.row[thisData.dataIndex]}}</span>
    <span size="mini" v-if="thisData.name !='栏次'&&thisScope.row[thisData.dataTbbz]==1"
           class="iconfont icon-iconup" id="jian1">
    </span>
    <span size="mini" v-if="thisData.name !='栏次'&&thisScope.row[thisData.dataTbbz]==0"
           class="iconfont icon-desc" id="jian2">
    </span>
    <span size="mini" v-if="thisData.name !='栏次'&&thisScope.row[thisData.dataYj]==1"
           class="iconfont icon-warning" id="jian3">
    </span>
  </div>
</template>
<style type="text/css">
  .icon-icon_jia{color: #3491EB;}
  .icon-icon_jian{color: #3491EB;}
  .btnstyle .iconfont.icon-desc{color: red;font-size: 16px}
  .btnstyle .iconfont.icon-iconup{color: green;font-size: 16px}
  .btnstyle .iconfont.icon-warning{color: orangered;font-size: 16px}
  .btnstyle a{color: #3491EB}
  .btnstyle .el-tag{padding: 0;margin: 0!important;background-color:#3491EB }
  .btn {width: 12px;display: inline-block; }
</style>
<script>
  export default {
    name: 'tree-node',
    props:
      {
        thisScope: {},
        //这是相应的字段展示
        thisData: {},
        // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
        treeStructure: {
          type: Boolean,
          default: function () {
            return false
          }
        },
        // 这是数据源
        dataSource: {
          type: Array,
          default: function () {
            return []
          }
        },
//index
      thisIndex: {
        type: Number,
        default: function () {
          return 1
        }
      }
    },
    methods: {
      // 展开下级
      toggle: function (trIndex) {
        let me = this
        console.info(me.dataSource)
        let record = me.dataSource[trIndex]
        record._expanded = !record._expanded
      },
      // 显示层级关系的空格和图标
      spaceIconShow (index) {
        let me = this
        if (me.treeStructure && index === 0) {
          return true
        }
        return false
      },
      // 点击展开和关闭的时候，图标的切换
      toggleIconShow (index, record) {
        let me = this
        if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
          return true
        }
        return false
      },
      // 是否存在子节点
      isNoChilden (index, record) {
        let me = this
        if (me.treeStructure && index === 0){
          if(record.children===undefined || record.children===null || record.children.length===0){
            return true
          }
        }
        return false
      }
    }
  }
</script>
<style thisScoped>
  .ms-tree-space{
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 12px;
    height: 14px;}
  .ms-tree-space::before{content: ""}
  table td{
    line-height: 26px;
  }
  .btnstyle .iconfont {
    font-size: 12px;
  }

</style>
