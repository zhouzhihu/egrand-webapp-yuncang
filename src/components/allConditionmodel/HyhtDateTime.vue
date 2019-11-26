<template>
  <el-date-picker v-model="modelHyhtDateTimeVal.modelValue" type="datetime"
      placeholder="选择日期">
    </el-date-picker>
</template>

<script>
export default {
  name: 'HyhtDateTime',
  components:{
  },
  props: {
    modelHyhtDateTimeVal:Object,
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
