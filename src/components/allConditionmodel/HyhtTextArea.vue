<template>
  <el-input v-model="modelHyhtTextAreaVal.modelValue" placeholder="请输入内容" 
    type="textarea" :rows="modelHyhtTextAreaVal.rows?modelHyhtTextAreaVal.rows:3" >
  </el-input>
</template>

<script>
export default {
  name: 'HyhtTextArea',
  components:{
  },
  props: {
    modelHyhtTextAreaVal:Object,
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
