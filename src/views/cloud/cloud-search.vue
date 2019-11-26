<template>
  <el-container>
    <el-header style="font-size: 14px;height:40px;line-height: 40px;">
      <i class="fa fa-ellipsis-v" style="margin-right:10px;color:#409eff"></i>资料检索
    </el-header>
    <el-main style="border-bottom: 1px solid #e7e8ea;height:160px;padding:0px;">
      <el-container>
        <el-header style="font-size: 12px;height:125px;line-height: 40px;border-bottom: 1px solid #e7e8ea;text-align:right;">
          <el-row>
            <el-col :span="20">
              <el-row>
                <el-col :span="24">
                  <el-input
                    style="width:450px;margin-right:10px;"
                    size="small"
                    placeholder="请输入检索关键字">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                  <el-radio v-model="radio" label="1">标题</el-radio>
                  <el-radio v-model="radio" label="2">全文</el-radio>
                  <el-button type="primary" size="mini">检索</el-button>
                </el-col>
                <el-col :span="24">
                  <el-row>
                    <el-col :span="6" style="text-align:right;">
                      标签：
                    </el-col>
                    <el-col :span="16">
                      <el-checkbox-group v-model="checkList">
                        <el-checkbox label="全部"></el-checkbox>
                        <el-checkbox label="党建"></el-checkbox>
                        <el-checkbox label="业务"></el-checkbox>
                        <el-checkbox label="计划"></el-checkbox>
                        <el-checkbox label="总结"></el-checkbox>
                        <el-checkbox label="汇报"></el-checkbox>
                        <el-checkbox label="检查"></el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                    <el-col :span="2">
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="24">
                  <el-row>
                    <el-col :span="6" style="text-align:right;">
                      提交时间：
                    </el-col>
                    <el-col :span="18">
                      <el-checkbox-group v-model="submit_checkList">
                        <el-checkbox label="全部"></el-checkbox>
                        <el-checkbox label="一周内"></el-checkbox>
                        <el-checkbox label="一个月内"></el-checkbox>
                        <el-checkbox label="三个月内"></el-checkbox>
                        <el-checkbox label="半年"></el-checkbox>
                        <el-checkbox label="全年"></el-checkbox>
                        <el-checkbox label="指定时间"></el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4">
            </el-col>
          </el-row>
        </el-header>
        <el-main :style="{height:contentHeight}">
          <el-row>
            <el-col :span="12">
              <i class="fa fa-sort-desc" style="font-size:25px;margin-right:5px;"></i><span style="font-size:16px;font-height:blob;">检索结果：</span>本次检索结果共10个文件
            </el-col>
            <el-col :span="12" style="text-align:right;">
              按时间：
              <el-select size="mini" v-model="value" placeholder="请选择" style="width:120px;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input
                style="width:150px;"
                size="mini"
                placeholder="当前文件夹搜索">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-col>
          </el-row>
          <el-main>
            <el-row style="border-bottom:1px solid #ccc;padding:10px;">
              <el-col :span="1">
                <i class="fa fa-file-word-o" style="color:#409eff"></i>
              </el-col>
              <el-col :span="17">
                <span style="font-size:16px;">XXX第一季度<span style="color:#409eff">廉政</span>自查表</span><br/>
                <span style="color:#409eff">廉政</span>风险点内容：财务管理。<span style="color:#409eff">廉政</span>风险点表现形式：项目资金分配的公正性。已建立防范管理制度情况：党组会议、局长办公会规定
                ，执行财务管理制度，严格执行新农合资金各项规定，认真执行制度，严格卫生行政许可和卫生行政处罚审批...<br/>
                提交人：王建国   2019-11-06 09:54  浏览次数：135次
              </el-col>
              <el-col :span="6" style="text-align:right;">
                <i class="fa fa-download" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-minus-square" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-share" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-trash-o" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-star-o" style="color:#ccc;margin-right:15px;"></i>
              </el-col>
            </el-row>
            <el-row style="border-bottom:1px solid #ccc;padding:10px;">
              <el-col :span="1">
                <i class="fa fa-file-word-o" style="color:#409eff"></i>
              </el-col>
              <el-col :span="17">
                <span style="font-size:16px;">XXX第一季度<span style="color:#409eff">廉政</span>自查表</span><br/>
                <span style="color:#409eff">廉政</span>风险点内容：财务管理。<span style="color:#409eff">廉政</span>风险点表现形式：项目资金分配的公正性。已建立防范管理制度情况：党组会议、局长办公会规定
                ，执行财务管理制度，严格执行新农合资金各项规定，认真执行制度，严格卫生行政许可和卫生行政处罚审批...<br/>
                提交人：王建国   2019-11-06 09:54  浏览次数：135次
              </el-col>
              <el-col :span="6" style="text-align:right;">
                <i class="fa fa-download" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-minus-square" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-share" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-trash-o" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-star-o" style="color:#ccc;margin-right:15px;"></i>
              </el-col>
            </el-row>
            <el-row style="border-bottom:1px solid #ccc;padding:10px;">
              <el-col :span="1">
                <i class="fa fa-file-word-o" style="color:#409eff"></i>
              </el-col>
              <el-col :span="17">
                <span style="font-size:16px;">XXX第一季度<span style="color:#409eff">廉政</span>自查表</span><br/>
                <span style="color:#409eff">廉政</span>风险点内容：财务管理。<span style="color:#409eff">廉政</span>风险点表现形式：项目资金分配的公正性。已建立防范管理制度情况：党组会议、局长办公会规定
                ，执行财务管理制度，严格执行新农合资金各项规定，认真执行制度，严格卫生行政许可和卫生行政处罚审批...<br/>
                提交人：王建国   2019-11-06 09:54  浏览次数：135次
              </el-col>
              <el-col :span="6" style="text-align:right;">
                <i class="fa fa-download" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-minus-square" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-share" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-trash-o" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-star-o" style="color:#ccc;margin-right:15px;"></i>
              </el-col>
            </el-row>
            <el-row style="border-bottom:1px solid #ccc;padding:10px;">
              <el-col :span="1">
                <i class="fa fa-file-word-o" style="color:#409eff"></i>
              </el-col>
              <el-col :span="17">
                <span style="font-size:16px;">XXX第一季度<span style="color:#409eff">廉政</span>自查表</span><br/>
                <span style="color:#409eff">廉政</span>风险点内容：财务管理。<span style="color:#409eff">廉政</span>风险点表现形式：项目资金分配的公正性。已建立防范管理制度情况：党组会议、局长办公会规定
                ，执行财务管理制度，严格执行新农合资金各项规定，认真执行制度，严格卫生行政许可和卫生行政处罚审批...<br/>
                提交人：王建国   2019-11-06 09:54  浏览次数：135次
              </el-col>
              <el-col :span="6" style="text-align:right;">
                <i class="fa fa-download" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-minus-square" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-share" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-trash-o" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-star-o" style="color:#ccc;margin-right:15px;"></i>
              </el-col>
            </el-row>
            <el-row style="border-bottom:1px solid #ccc;padding:10px;">
              <el-col :span="1">
                <i class="fa fa-file-word-o" style="color:#409eff"></i>
              </el-col>
              <el-col :span="17">
                <span style="font-size:16px;">XXX第一季度<span style="color:#409eff">廉政</span>自查表</span><br/>
                <span style="color:#409eff">廉政</span>风险点内容：财务管理。<span style="color:#409eff">廉政</span>风险点表现形式：项目资金分配的公正性。已建立防范管理制度情况：党组会议、局长办公会规定
                ，执行财务管理制度，严格执行新农合资金各项规定，认真执行制度，严格卫生行政许可和卫生行政处罚审批...<br/>
                提交人：王建国   2019-11-06 09:54  浏览次数：135次
              </el-col>
              <el-col :span="6" style="text-align:right;">
                <i class="fa fa-download" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-minus-square" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-share" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-trash-o" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-star-o" style="color:#ccc;margin-right:15px;"></i>
              </el-col>
            </el-row>
            <el-row style="border-bottom:1px solid #ccc;padding:10px;">
              <el-col :span="1">
                <i class="fa fa-file-word-o" style="color:#409eff"></i>
              </el-col>
              <el-col :span="17">
                <span style="font-size:16px;">XXX第一季度<span style="color:#409eff">廉政</span>自查表</span><br/>
                <span style="color:#409eff">廉政</span>风险点内容：财务管理。<span style="color:#409eff">廉政</span>风险点表现形式：项目资金分配的公正性。已建立防范管理制度情况：党组会议、局长办公会规定
                ，执行财务管理制度，严格执行新农合资金各项规定，认真执行制度，严格卫生行政许可和卫生行政处罚审批...<br/>
                提交人：王建国   2019-11-06 09:54  浏览次数：135次
              </el-col>
              <el-col :span="6" style="text-align:right;">
                <i class="fa fa-download" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-minus-square" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-share" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-trash-o" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-star-o" style="color:#ccc;margin-right:15px;"></i>
              </el-col>
            </el-row>
            <el-row style="border-bottom:1px solid #ccc;padding:10px;">
              <el-col :span="1">
                <i class="fa fa-file-word-o" style="color:#409eff"></i>
              </el-col>
              <el-col :span="17">
                <span style="font-size:16px;">XXX第一季度<span style="color:#409eff">廉政</span>自查表</span><br/>
                <span style="color:#409eff">廉政</span>风险点内容：财务管理。<span style="color:#409eff">廉政</span>风险点表现形式：项目资金分配的公正性。已建立防范管理制度情况：党组会议、局长办公会规定
                ，执行财务管理制度，严格执行新农合资金各项规定，认真执行制度，严格卫生行政许可和卫生行政处罚审批...<br/>
                提交人：王建国   2019-11-06 09:54  浏览次数：135次
              </el-col>
              <el-col :span="6" style="text-align:right;">
                <i class="fa fa-download" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-minus-square" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-share" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-trash-o" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-star-o" style="color:#ccc;margin-right:15px;"></i>
              </el-col>
            </el-row>
            <el-row style="border-bottom:1px solid #ccc;padding:10px;">
              <el-col :span="1">
                <i class="fa fa-file-word-o" style="color:#409eff"></i>
              </el-col>
              <el-col :span="17">
                <span style="font-size:16px;">XXX第一季度<span style="color:#409eff">廉政</span>自查表</span><br/>
                <span style="color:#409eff">廉政</span>风险点内容：财务管理。<span style="color:#409eff">廉政</span>风险点表现形式：项目资金分配的公正性。已建立防范管理制度情况：党组会议、局长办公会规定
                ，执行财务管理制度，严格执行新农合资金各项规定，认真执行制度，严格卫生行政许可和卫生行政处罚审批...<br/>
                提交人：王建国   2019-11-06 09:54  浏览次数：135次
              </el-col>
              <el-col :span="6" style="text-align:right;">
                <i class="fa fa-download" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-minus-square" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-share" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-trash-o" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-star-o" style="color:#ccc;margin-right:15px;"></i>
              </el-col>
            </el-row>
            <el-row style="border-bottom:1px solid #ccc;padding:10px;">
              <el-col :span="1">
                <i class="fa fa-file-word-o" style="color:#409eff"></i>
              </el-col>
              <el-col :span="17">
                <span style="font-size:16px;">XXX第一季度<span style="color:#409eff">廉政</span>自查表</span><br/>
                <span style="color:#409eff">廉政</span>风险点内容：财务管理。<span style="color:#409eff">廉政</span>风险点表现形式：项目资金分配的公正性。已建立防范管理制度情况：党组会议、局长办公会规定
                ，执行财务管理制度，严格执行新农合资金各项规定，认真执行制度，严格卫生行政许可和卫生行政处罚审批...<br/>
                提交人：王建国   2019-11-06 09:54  浏览次数：135次
              </el-col>
              <el-col :span="6" style="text-align:right;">
                <i class="fa fa-download" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-minus-square" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-share" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-trash-o" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-star-o" style="color:#ccc;margin-right:15px;"></i>
              </el-col>
            </el-row>
            <el-row style="border-bottom:1px solid #ccc;padding:10px;">
              <el-col :span="1">
                <i class="fa fa-file-word-o" style="color:#409eff"></i>
              </el-col>
              <el-col :span="17">
                <span style="font-size:16px;">XXX第一季度<span style="color:#409eff">廉政</span>自查表</span><br/>
                <span style="color:#409eff">廉政</span>风险点内容：财务管理。<span style="color:#409eff">廉政</span>风险点表现形式：项目资金分配的公正性。已建立防范管理制度情况：党组会议、局长办公会规定
                ，执行财务管理制度，严格执行新农合资金各项规定，认真执行制度，严格卫生行政许可和卫生行政处罚审批...<br/>
                提交人：王建国   2019-11-06 09:54  浏览次数：135次
              </el-col>
              <el-col :span="6" style="text-align:right;">
                <i class="fa fa-download" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-minus-square" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-share" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-trash-o" style="color:#ccc;margin-right:15px;"></i>
                <i class="fa fa-star-o" style="color:#ccc;margin-right:15px;"></i>
              </el-col>
            </el-row>
          </el-main>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data(){
      return {
        radio: "1",
        contentHeight: '100px',
        checkList: ['检查'],
        submit_checkList: ['全部'],
        options: [{
          value: 'all',
          label: '全部'
        }],
        value: ''
      }
    },
    created() {
      var that = this;
      setTimeout(function(){
        that.contentHeight = document.documentElement.clientHeight - 220 + "px";
      }, 100);
    }
  };
</script>
