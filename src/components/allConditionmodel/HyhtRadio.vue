<template>
   <el-radio-group v-model="modelRadioValue.modelValue">
    <el-radio  v-for="(item,index) in modelRadioValue.RadioOptions" :key="index" :label="item.label">
        {{item.name}}
    </el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'HyhtRadio',
  components:{
  },
  props: {
    modelRadioValue:Object,
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
