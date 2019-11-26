<template>
    <el-date-picker v-model="modelHyhtDaterangeVal.modelValue" type="daterange"
     start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
    </el-date-picker>
</template>

<script>
export default {
  name: 'HyhtDaterange',
  components:{
  },
  props: {
    modelHyhtDaterangeVal:Object,
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
