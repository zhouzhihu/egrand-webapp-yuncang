<template>
    <div class="userCustomGroupPage">
        <div class="userCustomGroupPageContainer">
            <div class="userCustomMobanPageContainer-tabs">
                <el-tabs v-model="activeName" type="card" @tab-click="tabsHandleClick">
                    <el-tab-pane label="主页tab1：复杂页面" name="second">
                        <div class="userCustomMobanPageContainer-buttons">
                            <el-button @click="viewOnQueryEvent">查 询</el-button>
                            <el-button @click="viewOnResetEvent">重 置</el-button>

                            <el-button @click="viewOnAddedEvent">新 增</el-button>
                        </div>
                        <div id="printOnEvent" class="userCustomMobanPageContainer-conditions">
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
                        <div class="userCustomMobanPageContainer-tabs">
                            <el-tabs v-model="activeName2" type="card" @tab-click="tabsHandleClick2">
                                <el-tab-pane label="子tab1" name="first">
                                    <div class="userCustomMobanPageContainer-buttons">
                                        <el-button @click="viewOnQueryEvent">查 询</el-button>
                                        <el-button @click="viewOnResetEvent">重 置</el-button>
                                    </div>
                                    <div class="userCustomMobanPageContainer-tables">
                                        <el-table :data="tableData" border style="width: 100%">
                                            <el-table-column prop="date" label="日期" align="center" width="200"></el-table-column>
                                            <el-table-column prop="name" label="姓名" align="center" width=""></el-table-column>
                                            <el-table-column prop="address" label="地址" align="center" width=""></el-table-column>
                                            <el-table-column label="状态" align="center" width="180">
                                                <template slot-scope="scope">
                                                    <span class="statusNormalColor" v-if="scope.row.status==1">正常</span>
                                                    <span class="statusAbnormalColor" v-if="scope.row.status==0">异常</span>
                                                </template>
                                            </el-table-column>
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
                                </el-tab-pane>
                                <el-tab-pane label="子tab2" name="second">配置管理</el-tab-pane>
                            </el-tabs>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="主页tab2：空页面" name="first">

                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="userCustomMobanPageContainer-msgDialog">
            <el-dialog title="弹窗模板1" :visible.sync="userCustomOfDialog" width="60%" :before-close="handleCloseDialog1">
                <div class="userCustomMobanPageContainer-msgDialog__btns">
                    <el-button @click="viewOnAffirmEvent">确 认</el-button>
                    <el-button @click="viewOnCancelEvent">取 消</el-button>
                </div>
                <div class="userCustomMobanPageContainer-msgDialog__body">
                    <div class="userCustomMobanPageContainer-msgDialog__bodyTitle">编辑弹窗</div>
                    <div class="userCustomMobanPageContainer-msgDialog__bodyContent">
                        <div class="userCustomMobanPageContainer-conditions">
                        <el-form label-width="40%" :inline="true" :model="conditionsForm" class="demo-form-inline userCustomMobanPageContainer-conditions__form">
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="日期:">
                                        <HyhtDate :modelHyhtDateVal='myDate'></HyhtDate>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="姓名:">
                                        <HyhtInput :inputValue='myName'></HyhtInput>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="地址:">
                                        <HyhtInput :inputValue='myAddress'></HyhtInput>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="状态:">
                                        <HyhtSelect :modelSelectValue='myStatus'></HyhtSelect>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="userCustomMobanPageContainer-msgDialog2">
            <el-dialog title="弹窗模板4" :visible.sync="userCustomOfDialog2" width="70%" :before-close="2">
                <div class="userCustomMobanPageContainer-msgDialog__btns">
                    <el-button @click="viewOnAffirmEvent2">确 认</el-button>
                    <el-button @click="viewOnCancelEvent2">取 消</el-button>
                </div>
                <div class="userCustomMobanPageContainer-msgDialog__body">
                    <div class="userCustomMobanPageContainer-msgDialog__bodyTitle">弹窗模板4</div>
                    <div class="userCustomMobanPageContainer-msgDialog__bodyContent">
                        <div class="userCustomMobanPageContainer-conditions">
                            <el-row>
                                <el-col :span="conditionsForm2.myDate.length>16?24:12">
                                    <div :class="conditionsForm2.myDate.length>16?'conditionsLabelLonger':'conditionsLabel'">日期:</div>
                                    <div :class="conditionsForm2.myDate.length>16?'conditionsContentLonger':'conditionsContent'">{{conditionsForm2.myDate}}</div>
                                </el-col>
                                <el-col :span="conditionsForm2.myStatus.length>16?24:12">
                                    <div :class="conditionsForm2.myStatus.length>16?'conditionsLabelLonger':'conditionsLabel'">状态:</div>
                                    <div :class="conditionsForm2.myStatus.length>16?'conditionsContentLonger':'conditionsContent'">{{conditionsForm2.myStatus}}</div>
                                </el-col>
                                <el-col :span="conditionsForm2.myName.length>16?24:12">
                                    <div :class="conditionsForm2.myName.length>16?'conditionsLabelLonger':'conditionsLabel'">姓名:</div>
                                    <div :class="conditionsForm2.myName.length>16?'conditionsContentLonger':'conditionsContent'">{{conditionsForm2.myName}}</div>
                                </el-col>
                                <el-col :span="conditionsForm2.myAddress.length>16?24:12">
                                    <div :class="conditionsForm2.myAddress.length>16?'conditionsLabelLonger':'conditionsLabel'">地址:</div>
                                    <div :class="conditionsForm2.myAddress.length>16?'conditionsContentLonger':'conditionsContent'">{{conditionsForm2.myAddress}}</div>
                                </el-col>
                                <el-col :span="conditionsForm2.myDec.length>16?24:12">
                                    <div :class="conditionsForm2.myDec.length>16?'conditionsLabelLonger':'conditionsLabel'">备注:</div>
                                    <div :class="conditionsForm2.myDec.length>16?'conditionsContentLonger':'conditionsContent'">{{conditionsForm2.myDec}}</div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </el-dialog>
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
  import HyhtTextArea from '../../components/allConditionmodel/HyhtTextArea'
  import HyhtScatter from '../../components/allechartmoulde/HyhtScatter'
  export default {
    name: "userCustomGroupPage",
    components:{
        HyhtInput,HyhtSelect,HyhtMupSelect,HyhtCheckSel,HyhtCascader,
        HyhtDate,HyhtDateTime,HyhtDateWeek,HyhtDateMonth,HyhtDataYear,
        HyhtDaterange,HyhtTextArea,HyhtScatter
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
        // 文本域
        modelHyhtTextAreaVal:{
            modelValue:"121"
        },
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '广东省广州市越秀区中山六路49号 距离市中心约6356米',
            status:1,
            dec:'描述（meta description），是原页面三大标签TDK中之一，同时也是SEO人员需要着重优化的一个页面优化元素。虽然早在2009年~2010年的时候，Google官方就发声说明，描述标签（meta description）不会影响SEO。但是很多人错误地解读了这个信息。'
            }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '广东省广州市越秀区中山六路49号 距离市中心约6356米',
            status:1,
            dec:'描述（meta description），是原页面三大标签TDK中之一，同时也是SEO人员需要着重优化的一个页面优化元素。虽然早在2009年~2010年的时候，Google官方就发声说明，描述标签（meta description）不会影响SEO。但是很多人错误地解读了这个信息。'
            }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '广东省广州市越秀区中山六路49号 距离市中心约6356米',
            status:0,
            dec:'描述（meta description），是原页面三大标签TDK中之一，同时也是SEO人员需要着重优化的一个页面优化元素。虽然早在2009年~2010年的时候，Google官方就发声说明，描述标签（meta description）不会影响SEO。但是很多人错误地解读了这个信息。'
            }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '广东省广州市越秀区中山六路49号 距离市中心约6356米',
            status:0,
            dec:'描述（meta description），是原页面三大标签TDK中之一，同时也是SEO人员需要着重优化的一个页面优化元素。虽然早在2009年~2010年的时候，Google官方就发声说明，描述标签（meta description）不会影响SEO。但是很多人错误地解读了这个信息。'
        }],
        currentPage: 1,
        total:20,
        pageSize:10,
        pageNo:1,
        activeName:"second",
        activeName2:"first",
        userCustomOfDialog:false,
        userCustomOfDialog2:false,
        // 日期
        myDate:{modelValue:""},
        // 姓名
        myName:{modelValue:""},
        // 地址
        myAddress:{modelValue:""},
        // 状态
        myStatus:{
            modelValue:"1",
            selectOptions:[{
                value: '1',
                label: '正常'
            }, {
                value: '0',
                label: '异常'
            }
            ]
        },
        conditionsForm2:{
            myName:"",
            myDate:"",
            myAddress:"",
            myStatus:"",
            myDec:""
        },
        //输入框
        input2:{modelValue:"121"},
        //下拉框
        intSelect2:{
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
        multiSelect2:{
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
        checkAllMultiSelect2:{
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
        cascaderSelect2:{
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
        datePick2:{
            modelValue:"2019-10-12"
        },
        //日期时间选择器（含有时分秒）
        datetimePick2:{
            modelValue:"2019-10-12 12:12:33"
        },
        //周选择器
        weekPick2:{
            modelValue:"2019w10"
        },
        //月选择器
        monthPick2:{
            modelValue:"2019-10"
        },
        //年选择器
        yearPick2:{
            modelValue:"2018"
        },
        //日期范围选择器
        daterangePick2:{
            modelValue:['2019-10-12','2019-10-19']
        },
      };
    },
    created() {
      var that = this;
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
        // 查看
        viewOnShowEvent(scope){
            var that = this;
            that.conditionsForm2.myName = scope.name;
            that.conditionsForm2.myDate = scope.date;
            that.conditionsForm2.myAddress = scope.address;
            that.conditionsForm2.myStatus = scope.status==1?'正常':'异常';
            that.conditionsForm2.myDec = scope.dec;
            that.userCustomOfDialog2 = true;
        },
        // 编辑
        viewOnEditEvent(scope){
            var that = this;
            that.userCustomOfDialog = true;
            that.myDate.modelValue = scope.date; //日期
            that.myName.modelValue = scope.name; //姓名
            that.myAddress.modelValue = scope.address; //地址
            that.myStatus.modelValue = scope.status==1?'正常':'异常'; //状态
            var conditionsForm = {
                myDate:that.myDate,
                myName:that.myName,
                myAddress:that.myAddress,
                myStatus:that.myStatus
            }
            that.conditionsForm = that.$mycommon.getcinditionForm(conditionsForm)
            console.log("that.conditionsForm",that.conditionsForm)

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
        // 测试：
        viewOnTestEvent(){
            var that = this;

        },
        // 编辑确认:
        viewOnAffirmEvent(){
            var that = this;
            var conditionsForm = {
                myDate:that.myDate, //日期
                myName:that.myName, //姓名
                myAddress:that.myAddress, //地址
                myStatus:that.myStatus, //状态
            }
            that.conditionsForm = that.$mycommon.getcinditionForm(conditionsForm)
            console.log("that.conditionsForm",that.conditionsForm)
            that.userCustomOfDialog = false;
        },
        // 查看确认:
        viewOnAffirmEvent2(){
            var that = this;
            that.userCustomOfDialog2 = false;
        },
        // 编辑取消：
        viewOnCancelEvent(){
            var that = this;
            that.userCustomOfDialog = false;

        },
        // 查看取消：
        viewOnCancelEvent2(){
            var that = this;
            that.userCustomOfDialog2 = false;

        },
        // 帮助：
        viewOnHelpEvent(){
            var that = this;

        },
        // 新增：
        viewOnAddedEvent(){
            var that = this;
            that.$openhttpclient.get("/rest/fw/list",
            					{},
            					function(res) {
            					if(res.success) {
            						console.log(res.data)
            					} else {
            						that.$message.error("登录失败：" + res.errorMsg);
            					}
            				});


            that.userCustomOfDialog = true;
            that.myDate.modelValue = scope.date; //日期
            that.myName.modelValue = scope.name; //姓名
            that.myAddress.modelValue = scope.address; //地址
            that.myStatus.modelValue = scope.status==1?'正常':'异常'; //状态
            var conditionsForm = {
                myDate:that.myDate,
                myName:that.myName,
                myAddress:that.myAddress,
                myStatus:that.myStatus
            }
            that.conditionsForm = that.$mycommon.getcinditionForm(conditionsForm)
            console.log("that.conditionsForm",that.conditionsForm)


        },
        // 上一步：
        viewOnLastStepEvent(){
            var that = this;

        },
        // 下一步：
        viewOnNextStepEvent(){
            var that = this;

        },
        // 全屏：
        viewOnFullScreenEvent(){
            var that = this;

        },
        // 退出全屏：
        viewOnCancelFullScreenEvent(){
            var that = this;

        },
        // 截图：
        viewOnScreenshotsEvent(){
            var that = this;

        },
        // 导出：
        viewOnExportEvent(){
            var that = this;

        },
        // 切换：
        viewOnSwitchEvent(){
            var that = this;

        },
        // 提示：
        viewOnTipsEvent(){
            var that = this;

        },
        // 退出：
        viewOnExitEvent(){
            var that = this;

        },
        // 选择人员：
        viewOnSelectPersonsEvent(){
            var that = this;

        },
        // 发送：
        viewOnSendMessagesEvent(){
            var that = this;

        },
        // 锁屏：
        viewOnLockScreenEvent(){
            var that = this;

        },
        // 保存：
        viewOnSaveEvent(){
            var that = this;

        },
        // 复制：
        viewOnCopyEvent(){
            var that = this;

        },
        // 单击
        viewOnClickObjectEvent(){
            var that = this;

        },
        // 双击
        viewOnDblclickObjectEvent(){
            var that = this;

        },
        cascaderHandleChange(value){
            console.log(value)
        },
        handleSizeChange(val) {
            var that = this;
            that.pageSize = val;
        },
        handleCurrentChange(val) {
            var that = this;
            that.pageNo = val;
        },
        tabsHandleClick(tab, event) {
            console.log(tab, event);
        },
        tabsHandleClick2(tab, event) {
            console.log(tab, event);
        },
        handleCloseDialog1(){
            var that = this;
            that.$confirm('确认关闭？','提示')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        handleCloseDialog2(){
            var that = this;
            that.$confirm('确认关闭？','提示')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },

    }
  };
  </script>
