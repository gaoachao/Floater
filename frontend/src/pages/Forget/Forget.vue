<template>
	<div class="wrapper">
		<div class="login">
			<h1>忘记密码</h1>
			<form>
				<div class="txt-field">
					<input type="text" placeholder="Email" required v-model="email">
				</div>
				<div class="txt-field">
					<input type="password" placeholder="New Password" autocomplete="on" required v-model="password">
				</div>
				<div class="txt-field" id="Authcode-field">
					<input type="text" placeholder="Authcode" required v-model="authcode">
				</div>
				<div class="information" ref="information">

				</div>
				<div class="pass" @click="sendEmail">点击发送验证码</div>
				<div class="submit" @click="forgetPassword">
					<span>确定</span>
				</div>
				<div class="signup-link">
					不小心点错了？
					<span id="signup" @click="toLogin">点击登录</span>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import {
	reqForgetGetCode,
	reqForgetPassword
} from '../../api/index';

export default {
	name: 'Forget',
	data() {
		return {
			email: '',
			password: '',
			authcode: ''
		}
	},
	methods: {
		toLogin() {
			this.$router.push({
				name: 'Login',
				// query:{

				// }
			})
		},
		sendEmail() {
			//此处做邮箱格式的校验（是否为HUST的邮箱）
			const reg = "@hust\.edu\.cn$"
			if (!this.email.trim()) {
				this.$refs.information.innerText = "*邮箱不能为空"
			} else if (!this.email.match(reg)) {
				this.$refs.information.innerText = "*邮箱格式不正确"
			} else {
				let emailData = {
					//去除空格
					email: this.email.trim()
				};
				reqForgetGetCode(emailData)
					.then((response) => {
						// console.log(response);
						this.$refs.information.innerText = '*发送成功'
					})
					.catch((error) => {
						console.log(error);
						// console.log(error.response.data);
						this.$refs.information.innerText = '*该用户尚未注册'
					})
			}
		},
		forgetPassword() {
			const reg = "@hust\.edu\.cn$"
			if (!this.email.trim()) {
				this.$refs.information.innerText = "*邮箱不能为空"
			} else if (!this.password.trim()) {
				this.$refs.information.innerText = "*密码不能为空"
			} else if (!this.authcode.trim()) {
				this.$refs.information.innerText = "*验证码不能为空"
			} else if (!this.email.match(reg)) {
				this.$refs.information.innerText = "*邮箱格式不正确"
			} else {
				const userInfo = {
					email: this.email.trim(),
					password: this.password,
					authCode: this.authcode.trim()
				};
				reqForgetPassword(userInfo)
					.then(response => {
						console.log(response);
						this.$refs.information.innerText = "*密码修改成功";
						setTimeout(this.toLogin, 3000);
					})
					.catch(error => {
						console.log(error);
						if (error.response.data.errorCode === 10001) {
							this.$refs.information.innerText = "*验证码没有发送";
						} else if(error.response.data.errorCode === 10002) {
							this.$refs.information.innerText = "*验证码错误";
						}
					})
			}
		}
	},
}
</script>

<style lang="scss" scoped>

.wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	width: 100vw;
	height: 100vh;
	background-color: #BCD8ED;

	.login {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 80vw;
		height: 50vh;
		background-color: #fff;
		border-radius: 10px;
	}

	h1 {
		font-size: 4vh;
		width: 100%;
		text-align: center;
		padding: 0 0 1.5vh 0;
		border-bottom: 1px solid silver;
		margin-bottom: 1.5vh;
	}

	form {
		width: 80%;
		padding: 0 3vw;
		box-sizing: border-box;

		.txt-field {
			position: relative;
			border-bottom: 2px solid #adadad;
			margin: 2.5vh 0;

			input {
				width: 100%;
				font-size: 2vh;
				border: none;
				outline: none;
			}

			input::placeholder {
				color: #adadad;
				font-size: 2vh;
			}
		}

		#Authcode-field {
			margin-bottom: 1.5vh;
		}

		.information {
			height: 2.5vh;
			width: 100%;
			color: #D17775;
		}

		.pass {
			font-size: 2vh;
			color: #a6a6a6;
			cursor: pointer;
			margin-left: 1px;
			margin-bottom: 2vh;
			margin-top: 1vh;
			text-align: center;
		}

		.submit {
			width: 100%;
			height: 5vh;
			border: 1px solid;
			background-color: #2691d9;
			color: #e9f4fb;
			font-size: 2.5vh;
			border-radius: 4vh;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.signup-link {
			text-align: center;
			font-size: 2vh;
			margin: 2vh 0 2vh 0;
			color: #666666;

			span {
				color: #2691d9;
				text-decoration: none;
			}
		}
	}
}
</style>