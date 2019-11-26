<template>
  <el-cascader  clearable
    v-model="modelCascaderData.modelValue" :options="modelCascaderData.selectOptions"
    change-on-select>
  </el-cascader>
</template>

<script>
export default {
  name: 'HyhtCascader',
  components:{
  },
  props: {
    modelCascaderData:Object,
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
