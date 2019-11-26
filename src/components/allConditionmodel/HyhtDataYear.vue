<template>
    <el-date-picker v-model="modelHyhtDateYearVal.modelValue" type="year"
      placeholder="选择年">
    </el-date-picker>
</template>

<script>
export default {
  name: 'HyhtDateYear',
  components:{
  },
  props: {
    modelHyhtDateYearVal:Object,
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
