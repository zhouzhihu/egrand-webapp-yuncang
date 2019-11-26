<template>
  <el-container class="person">
    <el-aside style="background-color: #fcfcfc;border-right: 1px solid #ededed;width: 180px;">
      <el-container>
        <el-header style="font-size: 12px;height: 40px;line-height: 40px;border-bottom: 1px solid #e7e8ea;">
          操作中心
        </el-header>
        <el-main style="padding:0px">
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
        </el-main>
      </el-container>
    </el-aside>
    <router-view :style="{height:viewHeight}" id="person-view"></router-view>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        viewHeight: '300px;',
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    created(){
      const that = this;
      this.viewHeight = document.documentElement.clientHeight + "px";
      this.$httpclient.notokenget('../../static/mock/person/personMenu.json', {}, function (res) {
        if (res.success) {
          that.data = res.data.list;
        }else{
          that.$message.error("获取数据失败！")
        }
      })
    },
    methods: {
      handleNodeClick(node) {
        console.log(node);
        this.$router.push({ path: node.path });
      }
    }
  };
</script>
