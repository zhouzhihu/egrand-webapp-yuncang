<template>
  <div class="btnstyle" >
    <span v-if="spaceIconShow(thisIndex)" v-for="(space, levelIndex) in thisScope.row._level" class="ms-tree-space"></span>
    <span size="mini" v-if="toggleIconShow(thisIndex,thisScope.row ) && thisData.name === '栏位' && !thisScope.row._expanded"
          @click="toggle(thisScope.$index)" class="iconfont icon-icon_jia" id="jia">
    </span>
    <span size="mini" v-if="toggleIconShow(thisIndex,thisScope.row ) && thisData.name === '栏位' && thisScope.row._expanded"
          @click="toggle(thisScope.$index)" class="iconfont icon-icon_jian" id="jian">
    </span>
    {{thisScope.row[thisData.dataIndex]}}
  </div>
</template>
<style type="text/css">
  .icon-icon_jia{color: #3491EB;}
  .icon-icon_jian{color: #3491EB;}
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
