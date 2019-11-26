<template>
   <el-select v-model="modelMupSelectValue.modelValue" placeholder="请选择" clearable collapse-tags multiple>
    <el-option v-for="item in modelMupSelectValue.selectOptions" :key="item.value"
      :label="modelMupSelectValue.selectProps?item[modelMupSelectValue.selectProps.label]:item.label" 
      :value="modelMupSelectValue.selectProps?item[modelMupSelectValue.selectProps.value]:item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'HyhtMupSelect',
  components:{
  },
  props: {
    modelMupSelectValue:Object,
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
      
  }
}
</script>
