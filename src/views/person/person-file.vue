<template>
  <el-container>
    <el-main style="padding:0px" id="personFileMain">
      <el-header style="height: 60px;overflow: hidden;border-bottom: 1px solid #e7e8ea;">
        <el-row :gutter="20" style="height:100%;line-height: 60px;">
          <el-col :span="12" style="display:flex">
            <div style="flex: 0 0 auto;">
              <i class="el-icon-folder-opened" style="font-size:38px;color:#52a2d7;line-height: 60px;height: 60px;"></i>
            </div>
            <div style="flex: 1 1 auto;margin-left:5px;">
              <div style="display: flex;color: #252e36;font-size: 16px;line-height: 22px;margin-top:15px;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item :to="{ path: '/' }">个人文件</el-breadcrumb-item>
                </el-breadcrumb>
                <i class="el-icon-star-off" style="font-size:20px;color:#52a2d7;margin-left:5px;cursor:pointer;" title="添加收藏"></i>
              </div>
              <div style="display: flex;color: #747b93;height: 18px;line-height: 18px;overflow: hidden;">已用 17.21 MB/共 20.00 GB</div>
            </div>
          </el-col>
          <el-col :span="12" style="text-align:right">
            <el-button size="mini" type="danger" circle style="margin-right:0px;">周</el-button>
            <el-button size="mini" round style="margin-left:0px;"><i class="el-icon-plus" style="font-size:8px;color:#52a2d7;"></i>协作成员</el-button>
            <el-button size="mini">分享<i class="el-icon-caret-bottom"></i></el-button>
            <el-button size="mini"><i class="el-icon-more"></i></el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-header style="background-color: #fff;height: 40px;overflow: hidden;border-bottom: 1px solid #ededed;">
          <el-row :gutter="20" style="height:100%;line-height: 40px;">
            <el-col :span="12">
              <el-button type="primary" size="mini" icon="el-icon-plus">新建</el-button>
              <el-button type="primary" size="mini">上传<i class="el-icon-upload el-icon--right"></i></el-button>
            </el-col>
            <el-col :span="12"  style="text-align:right">
              <el-input
                style="width:200px;"
                size="mini"
                placeholder="请输入内容">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <span style="margin-left:20px;">
                  <i class="el-icon-menu" style="color:#409eff"></i>
                  <i class="el-icon-caret-bottom" style="color:#409eff"></i>
                </span>
            </el-col>
          </el-row>
        </el-header>
        <el-container>
          <div style="width:100%;">
            <easy-cm :list="$egdCommon.getFileContextMenu('file')" @ecmcb="onFileContextMenuClick" :itemSize="12" :arrow="true" :tag="1"></easy-cm>
            <easy-cm :list="$egdCommon.getFileContextMenu('folder')" @ecmcb="onFolderContextMenuClick" :itemSize="12" :arrow="true" :tag="2"></easy-cm>
            <el-table class="table-box-person" :data="fileData" height="434" :style="{height:contentHeight}" @row-contextmenu="onRowContextMenu" @row-dblclick="onRowDblClick">
              <el-table-column prop="name" label="名称">
                <template slot-scope="scope">
                  <span style="height:40px;line-height:40px;cursor:pointer;">
                    <span :style="'color:' + $egdCommon.getFileColor(scope.row.fileType) + ';font-size:25px;vertical-align: middle;'">
                      <i :class="$egdCommon.getFileIcon(scope.row.fileType)"></i>
                    </span>
                    <span style="margin-left: 8px;">{{scope.row.name}}</span>
                    <span class="u-btn"><i class="fa fa-star-o"></i><i class="el-icon-collection-tag"></i></span>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="date" label="修改时间(修改人)" width="280">
                <template slot-scope="scope">
                  <span class="date" style="margin-left: 8px;">{{scope.row.date}}</span>
                  <span class="u-btn" style="position:absolute;;height:58px;line-height:58px;top:0px;left:0px;">
                    <el-button v-if='$egdCommon.isFolder(scope.row.fileType)' size="small">协作成员</el-button>
                    <el-button v-if='!$egdCommon.isFolder(scope.row.fileType)' size="small">编辑</el-button>
                    <el-button size="small">分享</el-button>
                    <el-button @click="onMoreClick($event, ($egdCommon.isFolder(scope.row.fileType) ? '2' : '1'), scope.row.id)" icon="el-icon-more" size="small"></el-button>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="size" label="大小" width="120">
              </el-table-column>
            </el-table>
          </div>
        </el-container>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        contentHeight: '100px;',
        id: 0,
        fileData: []
      }
    },
    created() {
      const that = this;
      setTimeout(function(){
        that.contentHeight = document.documentElement.clientHeight - 100 + "px";
      }, 100);
      this.initPage();
    },
    methods: {
      initPage(){
        const that = this;
        this.id = this.$route.params.id ? this.$route.params.id : 0;
        this.$httpclient.notokenget('../../static/mock/person/personFile' + this.id + '.json', {}, function (res) {
          if (res.success) {
            that.fileData = res.data.list;
          }else{
            that.$message.error("获取数据失败！")
          }
        })
      },
      onMoreClick(e, tag, id){
        this.id = id;
        this.$root.$emit('easyAxis',{
          tag: tag,
          x: e.clientX,
          y: e.clientY
        });
      },
      onRowContextMenu(row, event){
        this.id = row.id;
        event.stopPropagation();
        event.preventDefault();
        this.$root.$emit('easyAxis',{
          tag: this.$egdCommon.isFolder(row.fileType) ? "2" : "1",
          x: event.clientX,
          y: event.clientY
        });
      },
      onRowDblClick(row, event){
        if(this.$egdCommon.isFolder(row.fileType))
          this.$router.push({path: '/file/' + row.id});
      },
      onFileContextMenuClick(indexList){
        console.log(this.id);
        console.log(indexList);
      },
      onFolderContextMenuClick(indexList){
        console.log(this.id);
        console.log(indexList);
      }
    },
    watch:{
      '$route'(to,from) {
        //重新获取数据
        this.initPage();
      }
    }
  };
</script>
