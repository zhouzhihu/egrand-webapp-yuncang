<template>
  <el-date-picker v-model="modelHyhtDateVal.modelValue" type="date"
      placeholder="选择日期">
    </el-date-picker>
</template>

<script>
export default {
  name: 'HyhtDate',
  components:{
  },
  props: {
    modelHyhtDateVal:Object,
  },
  data () {
    return{
      sdasd:""
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
