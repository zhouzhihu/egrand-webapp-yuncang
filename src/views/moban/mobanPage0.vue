<template>
  <div class="userCustomMobanPage1">
    <div class="userCustomMobanPageContainer">
        <div class="userCustomMobanPageContainer-buttons">
            <el-button @click="viewOnQueryEvent">查 询</el-button>
            <el-button @click="viewOnResetEvent">重 置</el-button>
        </div>
        <div class="userCustomMobanPageContainer-contents">
            <div class="userCustomMobanPageContainer-conditions">
                <el-form label-width="30%" :inline="true" :model="conditionsForm" class="demo-form-inline userCustomMobanPageContainer-conditions__form">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="输入框:">
                                <HyhtInput :inputValue='input'></HyhtInput>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="基础下拉框:">
                                <HyhtSelect :modelSelectValue='intSelect'></HyhtSelect>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="级联下拉框:">
                            <HyhtCascader :modelCascaderData='cascaderSelect'></HyhtCascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="多选下拉框:">
                                <HyhtMupSelect :modelMupSelectValue='multiSelect'></HyhtMupSelect>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="全选多选下拉框:">
                                <HyhtCheckSel :modelChkSelectVal='checkAllMultiSelect'></HyhtCheckSel>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="日期选择器:">
                                <HyhtDate :modelHyhtDateVal='datePick'></HyhtDate>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="月选择器:">
                                <HyhtDateMonth :modelHyhtDateMonthVal='monthPick'></HyhtDateMonth>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="周选择器:">
                                <HyhtDateWeek :modelHyhtDateWeekVal='weekPick'></HyhtDateWeek>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="年选择器:">
                                <HyhtDataYear :modelHyhtDateYearVal='yearPick'></HyhtDataYear>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="日期时间选择器:">
                                <HyhtDateTime :modelHyhtDateTimeVal='datetimePick'></HyhtDateTime>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="日期范围选择器:">
                                <HyhtDaterange :modelHyhtDaterangeVal='daterangePick'></HyhtDaterange>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="userCustomMobanPageContainer-tables">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="fwmc" label="服务名称" align="center" width="200"></el-table-column>
                    <el-table-column prop="fwms" label="服务描述" align="center" width="200"></el-table-column>
                    <el-table-column prop="fwflId" label="Id" align="center" width="200"></el-table-column>
                    <el-table-column prop="lrrq" label="lrrq日期" align="center" width="200"></el-table-column>

                    <el-table-column prop="xgrq" label="xgrq日期" align="center" width=""></el-table-column>

                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button @click="viewOnShowEvent(scope.row)" type="text" size="small">查看</el-button>
                            <el-button @click="viewOnEditEvent(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="viewOnDelectEvent(scope.row)" class="operationAbnormalColor" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="userCustomMobanPageContainer-paginations">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>

    </div>
  </div>
</template>
<script>
import HyhtInput from '../../components/allConditionmodel/HyhtInput'
import HyhtSelect from '../../components/allConditionmodel/HyhtSelect'
import HyhtMupSelect from '../../components/allConditionmodel/HyhtMupSelect'
import HyhtCheckSel from '../../components/allConditionmodel/HyhtCheckSel'
import HyhtCascader from '../../components/allConditionmodel/HyhtCascader'
import HyhtDate from '../../components/allConditionmodel/HyhtDate'
import HyhtDateTime from '../../components/allConditionmodel/HyhtDateTime'
import HyhtDateWeek from '../../components/allConditionmodel/HyhtDateWeek'
import HyhtDateMonth from '../../components/allConditionmodel/HyhtDateMonth'
import HyhtDataYear from '../../components/allConditionmodel/HyhtDataYear'
import HyhtDaterange from '../../components/allConditionmodel/HyhtDaterange'
export default {
  name: "userCustomMobanPage1",
  components:{
      HyhtInput,HyhtSelect,HyhtMupSelect,HyhtCheckSel,HyhtCascader,
      HyhtDate,HyhtDateTime,HyhtDateWeek,HyhtDateMonth,HyhtDataYear,
      HyhtDaterange
  },
  data() {
    return {
        conditionsForm:{},
        //输入框
        input:{modelValue:"121"},
        //下拉框
        intSelect:{
            modelValue:"1",
            selectOptions:[{
                value: '1',
                label: '黄金糕'
            }, {
                value: '2',
                label: '双皮奶'
            }, {
                value: '3',
                label: '蚵仔煎'
            }, {
                value: '4',
                label: '龙须面'
            }, {
                value: '5',
                label: '北京烤鸭'
            }
            ]
        },
        //多选下拉框
        multiSelect:{
            modelValue:['1','2'],
            selectOptions:[{
                value: '1',
                label: '黄金糕'
            }, {
                value: '2',
                label: '双皮奶'
            }, {
                value: '3',
                label: '蚵仔煎'
            }, {
                value: '4',
                label: '龙须面'
            }, {
                value: '5',
                label: '北京烤鸭'
            }
            ]
        },
        //带有全选功能的多选下拉框
        checkAllMultiSelect:{
            modelValue:['1','2'],
            selectOptions:[{
                value: '1',
                label: '黄金糕'
            }, {
                value: '2',
                label: '双皮奶'
            }, {
                value: '3',
                label: '蚵仔煎'
            }, {
                value: '4',
                label: '龙须面'
            }, {
                value: '5',
                label: '北京烤鸭'
            }
            ]
        },
        //级联下拉（选择框）
        cascaderSelect:{
            modelValue:[],
            selectOptions:[
            {
                value: 'zhinan',
                label: '指南',
                children: [
                {value: 'yizhi',label: '一致'},{ value: 'fankui',label: '反馈'},
                {value: 'xiaolv',label: '效率'},
                ]
            },
            {
                value: 'daohang',
                label: '导航',
                children: [
                {value: 'cexiangdaohang',label: '侧向导航'},
                { value: 'dingbudaohang',label: '顶部导航'}
                ]
            }
            ]
        },
        //日期选择器
        datePick:{
            modelValue:"2019-10-12"
        },
        //日期时间选择器（含有时分秒）
        datetimePick:{
            modelValue:"2019-10-12 12:12:33"
        },
        //周选择器
        weekPick:{
            modelValue:"2019w10"
        },
        //月选择器
        monthPick:{
            modelValue:"2019-10"
        },
        //年选择器
        yearPick:{
            modelValue:"2018"
        },
        //日期范围选择器
        daterangePick:{
            modelValue:['2019-10-12','2019-10-19']
        },


        tableData: [

            {
              "id": "02493ebaeb2d4e23b50d7fa64af0f2da",
              "fwmc": "对象存储",
              "fwms": "对海量图片、视频、音频、文件的集中存储，实现上传、下载、压缩、分享",
              "fwflId": "3ebfa3b2f9b44eecaf0ed41e307449fc",
              "lrrq": 1551502574000,
              "xgrq": 1552894298000,
              "yxbz": "Y",
              "scbz": "N",
              "iconId": "alyzcfw_icon_1552893355352",
              "url": "http://106.15.92.96:20050/lcyq/#/lcconfig/lcjm/index",
              "xh": 4,
              "apiUrl": "http://106.15.92.96:20052",
              "pch": null,
              "zssx": null
            },
            {
              "id": "0cd098e89316476eb4bdbd8e701e04da",
              "fwmc": "大数据管理门户项目",
              "fwms": "更快，更稳定，更好用",
              "fwflId": "ccfae42c79584662b7b32dfc115dc0f8",
              "lrrq": 1551503925000,
              "xgrq": 1552893475000,
              "yxbz": "Y",
              "scbz": "Y",
              "iconId": "alyzcfw_icon_1551503927837",
              "url": "http://106.15.92.96:20050",
              "xh": 0,
              "apiUrl": "http://47.100.196.53:20051",
              "pch": "45cf2684424a48e3a4206f4a84c3eb8d",
              "zssx": null
            }],
        currentPage: 1,
        total:20,
        pageSize:10,
        pageNo:1,
    };
  },
  created() {
    var that = this;
    that.$notify({
        title: '用户自定义模板1',
        message: '按钮组+查询表单+操作表格+分页（路由：#/mobanPage1）',
        duration: 5000
    });
  },
  mounted() {
    var that = this;
  },
  methods: {
    // 查询
    viewOnQueryEvent(){
        var that = this;
        var conditionsForm = {
            input:that.input, //输入框
            intSelect:that.intSelect, //基础下拉框
            cascaderSelect:that.cascaderSelect, //级联下拉框
            multiSelect:that.multiSelect, //多选下拉框
            checkAllMultiSelect:that.checkAllMultiSelect, //全选多选下拉框
            datePick:that.datePick,  //日期选择器
            monthPick:that.datePick,  //月选择器
            yearPick:that.yearPick,  //年选择器
            weekPick:that.weekPick,  //周选择器
            datetimePick:that.datetimePick, //日期时间选择器
            daterangePick:that.daterangePick,//时间范围选择器
        }
        that.conditionsForm = that.$mycommon.getcinditionForm(conditionsForm)
        console.log("that.conditionsForm",that.conditionsForm)


        that.$openhttpclient.get("/rest/fw/list",
                    					{},
                    					function(res) {
                    					if(res.success) {
                    					console.log(that.tableData)
                    						console.log(res.data)
                    					} else {
                    						that.$message.error("登录失败：" + res.errorMsg);
                    					}
                    				});


    },
    // 重置
    viewOnResetEvent(){
        var that = this;
        that.input.modelValue = ""; //输入框
        that.intSelect.modelValue = ""; //基础下拉框
        that.cascaderSelect.modelValue  = []; //级联下拉框
        that.multiSelect.modelValue  = []; //多选下拉框
        that.checkAllMultiSelect.modelValue  = []; //全选多选下拉框
        that.datePick.modelValue  = "";  //日期选择器
        that.monthPick.modelValue  = "";  //月选择器
        that.yearPick.modelValue  = "";  //年选择器
        that.weekPick.modelValue  = "";  //周选择器
        that.datetimePick.modelValue  = ""; //日期时间选择器
        that.daterangePick.modelValue  = [];//时间范围选择器
    },
    handleSizeChange(val) {
        var that = this;
        that.pageSize = val;
    },
    handleCurrentChange(val) {
        var that = this;
        that.pageNo = val;
    },
    // 查看
    viewOnShowEvent(scope){
        var that = this;
        console.log(scope);
    },
    // 编辑
    viewOnEditEvent(scope){
        var that = this;
        console.log(scope);
    },
    // 删除
    viewOnDelectEvent(scope){
        var that = this;
        console.log(scope);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$message({
            type: 'success',
            message: '删除成功!'
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        })
    },

  }
};
</script>
