<template>
	<div>
		<div class="login-header">登陆微信</div>
		<div class="weui-cells_form">
			<div class="weui-cell">
				<div class="weui-cell__hd"><label class="weui-label">账 号</label></div>
				<div class="weui-cell__bd">
					<input class="weui-input" type="text" placeholder="手机号" v-model="username" @blur="testUsername">
				</div>
			</div>
			<div class="weui-cell">
				<div class="weui-cell__hd"><label class="weui-label">密 码</label></div>
				<div class="weui-cell__bd">
					<input class="weui-input" type="password" placeholder="密码" v-model="pwd" @blur="testPwd">
				</div>
			</div>
			<a href="javascript:;" class="weui-btn weui-btn_primary" @click="loginbtn">登陆</a>
			<div class="weui-footer">
				<p class="weui-footer__links">
					<a href="#/register" class="weui-footer__link">没有账号？去注册</a>
				</p>
			</div>
		</div>
		<!--pop-->
		<div class="js_dialog" id="iosDialog2" style="opacity: 1;" v-show='isMsgShow'>
			<div class="weui-mask"></div>
			<div class="weui-dialog">
				<div class="weui-dialog__bd" v-text="msg"></div>
				<div class="weui-dialog__ft">
					<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="hideMsg">知道了</a>
				</div>
			</div>
		</div>
		<!--toast-->
		<div id="toast" v-show="isToastShow">
			<div class="weui-mask_transparent"></div>
			<div class="weui-toast">
				<i class="weui-icon-success-no-circle weui-icon_toast"></i>
				<p class="weui-toast__content">登陆成功</p>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from "jquery";
	export default {
		data() {
			return {
				username: '',
				isUsernameCorrect: false,
				pwd: '',
				isPwdCorrect: false,
				msg: '',
				isMsgShow: false,
				isToastShow: false,
			}
		},
		methods: {
			testUsername() {
				let reg = /^1[3|5|7|8][0-9]{9}$/;
				if(reg.test(this.username)) {
					this.isUsernameCorrect = true;
				}
			},
			testPwd() {
				if(this.pwd != "") {
					this.isPwdCorrect = true;
				}
			},
			loginbtn() {
				if(!this.isUsernameCorrect) {
					this.msg = "用户名格式不正确";
					this.isMsgShow = "true";
					return;
				}
				if(!this.isPwdCorrect) {
					this.msg = "密码不能为空";
					this.isMsgShow = "true";
					return;
				}
				let userInfo = {
					username: this.username,
					pwd: this.pwd
				}
				let self = this;
				$.ajax({ //数据回传设置session和cookie
					type: "post",
					url: "http://10.40.153.58:7878/login",
					data: userInfo,
					success(data) {
						self.msg = data.msg;
						if(data.errno == 1) {
							//改变登陆状态
							self.isToastShow = true;
							self.$store.state.user={
								userId: data.id,
								portrait: data.portrait,
								isLogin: true,
								nickname: data.nickname,
							}
							setTimeout(() => {
								location.href = "#/tab/wechat";
							}, 1200)
						}else{
							self.msg = data.msg;
							self.isMsgShow = true;
						}

					}

				})
			},
			hideMsg() {
				this.isMsgShow = false;
			}
		}
	}
</script>

<style>
	.login-header {
		width: 100%;
		height: 45px;
		background: #35353A;
		text-align: center;
		color: #fff;
		line-height: 45px;
		font-size: 18px;
		margin-bottom: 10px;
	}
	
	.weui-btn {
		width: 90%;
		margin: 10px auto;
	}
</style>