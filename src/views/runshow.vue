<template>
  <el-row>
  <el-button plain>朴素按钮</el-button>
  <el-button type="primary" @click='testww' plain>主要按钮</el-button>
  <el-button type="success" plain @click='successbtn' >成功按钮</el-button>
  <el-button type="info" plain>信息按钮</el-button>
  <el-button type="warning" plain>警告按钮</el-button>
  <el-button type="danger" plain>危险按钮</el-button>
 <el-transfer v-model="value1" :data="data"></el-transfer>
</el-row>
</template>

<script>
  import  "../../static/ztree/js/jquery.ztree.all.js"
  import "../../static/ztree/ztreehelper"
  export default {
    name: 'runshow',
    data () {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return{
         data: generateData(),
        value1: [1, 4]
      }
    },
    computed: {},
    created () {},
    mounted () {
      
    },
    methods:{
        testww(){
            this.$message('这是一条消息提示');
        },
        successbtn(){
          // that.
        }
    },
   
    //监听
    watch: {
      //j监听路由
      $route () {

      }
    }
  }
</script>
