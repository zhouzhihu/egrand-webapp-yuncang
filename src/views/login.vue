<template>
	<div class="sjzcpt" id="sjzcpt">
		<header class="s_header">
			<div class="s_header_lt">
				<img class="s_header_img1" src="../../static/assets/img/logo_tjfxpt.png"/>
			</div>
			<div class="s_header_rt">
				<img class="s_header_img2" src="../../static/assets/img/login_bz.png"/>
				<span>帮助</span>
			</div>
		</header>
		<section class="s_section" id="s_section">
			<div class="s_section_rt">
				<h3 class="s_section_title">欢迎您登陆</h3>
				<el-form class="s_login_form" ref="login" :model="login">
					<el-form-item>
						<div class="s_left">
							<img class="s_login_left1"  src="../../static/assets/img/login_yonghu.png"/>
							<el-input class="s_login_left2"  v-model="login.username" placeholder="用户"></el-input>
						</div>
					</el-form-item>

					<el-form-item>
						<div class="s_right">
							<img class="s_login_left1" src="../../static/assets/img/login_mima.png"/>
							<el-input class="s_login_left2"  type="password" v-model="login.pwd" placeholder="密码"></el-input>
						</div>
					</el-form-item>
					<el-form-item>
						<el-button class="s_login_btn" type="primary" @click="onSubmit">登录</el-button>
					</el-form-item>
				</el-form>
				<div class="s_login_footer">&ensp;</div>
			</div>
		</section>
		<footer class="s_footer">
			<div class="s_footer_lt">
				<span>Copyright © 2019 国家税务总局河源市税务局</span>
			</div>
			<div class="s_footer_rt">
				<img class="s_footer_img" src="../../static/assets/img/login_iphone.png"/>
				<span>400-820-6789</span>
			</div>
		</footer>

	</div>
</template>
<script>
	export default {
	    data(){
	    	return {
	    		login:{
	    			username:"",
	    			pwd:""
	    		}
	    	}
	    },
	    created(){
		    this.getHt();
        window.addEventListener("resize",function(){
          var boxht = document.getElementById("sjzcpt");
            var winht = document.body.offsetHeight;
            if (boxht !== undefined && boxht !== null) {
          boxht.style.background = 'url("../../static/assets/img/sjzcpt_bg.png") no-repeat';
          boxht.style.backgroundSize = "cover";
          boxht.style.height = winht + "px";
            }
        })
	    },
	    updated(){
		    this.getHt();
	    },
	    methods:{
	    	onSubmit(data){
          var that = this;
          var login_name=that.login.username.indexOf(" ");
          var login_pwd=that.login.pwd.indexOf(" ");
          if(login_name!=-1){
            that.$message.error("账号有空格");
            return;
          }
          if(login_pwd!=-1){
            that.$message.error("密码有空格");
            return;
          }
          if(!that.$mycommon.isNotEmpty(that.login.username)) {
            that.$message.error("登录失败：用户名为空");
            return;
          }
          if(!that.$mycommon.isNotEmpty(that.login.pwd)) {
            that.$message.error("登录失败：密码为空");
            return;
          }
          that.$httpclient.post("/login",
            {accountCode:that.login.username,password:that.login.pwd},
            function(res) {
            if(res.success) {
              auth.setToken(res.data.token);
              sessionStorage.setItem("username",res.data.account.userName);
              sessionStorage.setItem("accountCode",res.data.account.accountCode);
              sessionStorage.setItem("securityId",res.data.account.securityId);
              sessionStorage.setItem("id",res.data.account.id);
              that.$message.success("登录成功");
              that.$router.push({
                path: '/'
              })
              //判断是否为主账号，存储起来
              if(that.login.username.indexOf("@")!=-1){
                sessionStorage.setItem("mianaccount",true);
              }else{
                sessionStorage.setItem("mianaccount",false);
              }
            } else {
              that.$message.error("登录失败：" + res.errorMsg);
            }
          });
	    	},
	    	getHt(){
	    		window.addEventListener("load", function () {
		    		var boxht = document.getElementById("sjzcpt");
			        var winht = document.body.offsetHeight;
			        if (boxht !== undefined && boxht !== null) {
						boxht.style.background = 'url("../../static/assets/img/sjzcpt_bg.png") no-repeat';
						boxht.style.backgroundSize = "cover";
						boxht.style.height = winht + "px";
			        }
		      })
	    	}
	    }
    }
</script>
