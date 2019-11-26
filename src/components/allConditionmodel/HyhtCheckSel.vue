<template>
   <el-select v-model="modelChkSelectVal.modelValue" placeholder="请选择" clearable collapse-tags multiple>
    <div class="moban_select_btn">
        <el-button size="mini" class="allChecked" @click="allChecked(modelChkSelectVal)">全选</el-button>
        <el-button size="mini" class="allChecked" @click="allCancle(modelChkSelectVal)">全不选</el-button>
    </div>
    <el-option v-for="item in modelChkSelectVal.selectOptions" :key="item.value"
      :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>

<style>
    .moban_select_btn {
    border-bottom: 1px solid #e9e9e9;
    margin-bottom: 5px;
    padding: 0 0 6px 8px;
    }

    .moban_select_btn .el-button {
    padding: 3px;
    border: 1px solid #e9e9e9;
    color: #666;
    }

    .moban_select_btn .el-button:active {
    background-color: #3492eb;
    color: #fff;
    border-color: #3491eb;
    }

    .moban_select_btn .el-button:focus {
    border: 1px solid #e9e9e9;
    color: #666;
    }
</style>

<script>
export default {
  name: 'HyhtCheckSel',
  components:{
  },
  props: {
    modelChkSelectVal:Object,
  },
  data () {
    return{
     
    }
  },
  created(){
   
  },
  mounted() {
   
  },
  methods: {
    allChecked(){
        var that = this 
        that.modelChkSelectVal.modelValue = []
        for (var i = 0; i < that.modelChkSelectVal.selectOptions.length; i++) {
            that.modelChkSelectVal.modelValue.push(that.modelChkSelectVal.selectOptions[i].value)
        }
    },
    allCancle(){
        var that = this 
        that.modelChkSelectVal.modelValue = []
        
    }
  }
}
</script>
