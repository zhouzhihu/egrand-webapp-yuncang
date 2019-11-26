<template>
   <el-select v-model="modelSelectValue.modelValue" placeholder="请选择" clearable>
    <el-option v-for="item in modelSelectValue.selectOptions" :key="item.value"
      :label="modelSelectValue.selectProps?item[modelSelectValue.selectProps.label]:item.label" 
      :value="modelSelectValue.selectProps?item[modelSelectValue.selectProps.value]:item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'HyhtSelect',
  components:{
  },
  props: {
    modelSelectValue:Object,
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
