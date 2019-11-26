<template>
  <el-date-picker v-model="modelHyhtDateWeekVal.modelValue" type="week"
      format="yyyy 第 WW 周"  placeholder="选择周">
    </el-date-picker>
</template>

<script>
export default {
  name: 'HyhtDateWeek',
  components:{
  },
  props: {
    modelHyhtDateWeekVal:Object,
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
