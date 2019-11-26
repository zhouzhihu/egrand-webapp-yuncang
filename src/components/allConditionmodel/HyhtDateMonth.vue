<template>
  <el-date-picker v-model="modelHyhtDateMonthVal.modelValue" type="month"
      placeholder="选择月">
    </el-date-picker>
</template>

<script>
export default {
  name: 'HyhtDateMonth',
  components:{
  },
  props: {
    modelHyhtDateMonthVal:Object,
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
