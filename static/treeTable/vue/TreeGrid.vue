<template>
  <el-table-column  v-if="isFolder" :key="column.name" :label="column.name" :prop="column.dataIndex"  align="center">
    <template v-for="item in column.children" >
      <el-table-column :key="item.name" :label="item.name" :prop="item.dataIndex"  align="center">

        <template v-for="(itemChildren,index2) in item.children">
          <el-table-column :key="itemChildren.name" :label="itemChildren.name" :prop="itemChildren.dataIndex"  align="center">
            <template slot-scope="scope">
               <tree-node :thisData="itemChildren" :dataSource="dataSource" :thisIndex="index2" :thisScope="scope" :treeStructure="treeStructure"></tree-node>
            </template>

            <template v-for="(nextChildren,index2) in itemChildren.children">
              <el-table-column :key="nextChildren.name" :label="nextChildren.name" :prop="nextChildren.dataIndex"  align="center">
                <template slot-scope="scope">
                  <tree-node :thisData="nextChildren" :dataSource="dataSource" :thisIndex="index2" :thisScope="scope" :treeStructure="treeStructure"></tree-node>
                </template>

                <template v-for="(nextChildren2,index2) in nextChildren.children">
                  <el-table-column :key="nextChildren2.name" :label="nextChildren2.name" :prop="nextChildren2.dataIndex"  align="center">
                    <template slot-scope="scope">
                      <tree-node :thisData="nextChildren2" :dataSource="dataSource" :thisIndex="index2" :thisScope="scope" :treeStructure="treeStructure"></tree-node>
                    </template>

                    <template v-for="(nextChildren3,index2) in nextChildren2.children">
                      <el-table-column :key="nextChildren3.name" :label="nextChildren3.name" :prop="nextChildren3.dataIndex"  align="center">
                        <template slot-scope="scope">
                          <tree-node :thisData="nextChildren3" :dataSource="dataSource" :thisIndex="index2" :thisScope="scope" :treeStructure="treeStructure"></tree-node>
                        </template>

                        <template v-for="(nextChildren4,index2) in nextChildren3.children">
                          <el-table-column :key="nextChildren4.name" :label="nextChildren4.name" :prop="nextChildren4.dataIndex"  align="center">
                            <template slot-scope="scope">
                              <tree-node :thisData="nextChildren4" :dataSource="dataSource" :thisIndex="index2" :thisScope="scope" :treeStructure="treeStructure"></tree-node>
                            </template>

                            <template v-for="(nextChildren5,index2) in nextChildren4.children">
                              <el-table-column :key="nextChildren5.name" :label="nextChildren5.name" :prop="nextChildren5.dataIndex"  align="center">
                                <template slot-scope="scope">
                                  <tree-node :thisData="nextChildren5" :dataSource="dataSource" :thisIndex="index2" :thisScope="scope" :treeStructure="treeStructure"></tree-node>
                                </template>

                              </el-table-column>
                            </template>
                          </el-table-column>
                        </template>
                      </el-table-column>
                    </template>
                  </el-table-column>
                </template>
              </el-table-column>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
    </template>
  </el-table-column>


    <el-table-column v-else  :key="column.dataIndex" :label="column.name" align="center" >
      <template slot-scope="scope">
        <span v-if="spaceIconShow(thisIndex)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space"></span>
        <div class="btnstyle" v-if="toggleIconShow(thisIndex,scope.row)" @click="toggle(scope.$index)">
          <i v-if="!scope.row._expanded" class="iconfont icon-icon_jia" :aria-hidden=true></i>
          <i v-if="scope.row._expanded" class="iconfont icon-icon_jian" :aria-hidden=true></i>
        </div>
        <span v-else-if="thisIndex===0" class="ms-tree-space"></span>
        {{scope.row[column.dataIndex]}}
      </template>
    </el-table-column>
</template>


<script>
	import '../../icon2/iconfont.css'
  import Utils from '../utils/index.js'
  import treeNode from './TreeNode.vue'
//  import Vue from 'vue'
  export default {
    components: {treeNode},
    name: 'tree-grid',
    props:
      {
// 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
      treeStructure: {
        type: Boolean,
        default: function () {
          return false
        }
      },
 //这是相应的字段展示
      column: {},
//index
      thisIndex: {
        type: Number,
        default: function () {
          return 1
        }
      },
// 这是数据源
      dataSource: {
        type: Array,
        default: function () {
          return []
        }
      },
// 这个是是否展示操作列
      treeType: {
        type: String,
        default: function () {
          return 'normal'
        }
      },
// 是否默认展开所有树
      defaultExpandAll: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    data () {
      return {}
    },
    computed: {
      isFolder() {
        return this.column.children && this.column.children.length;
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
<style scoped>
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
