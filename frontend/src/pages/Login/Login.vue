<template>
	<div class="wrapper">
		<div class="login">
			<h1>登 录</h1>
			<form>
				<div class="txt-field">
					<input type="text" placeholder="Email" required v-model="email">
				</div>
				<div class="txt-field" id="password-field">
					<input type="password" placeholder="Password" autocomplete="on" required v-model="password">
				</div>
				<div class="information" ref="information">

				</div>
				<div class="pass" @click="toForget">忘记密码</div>
				<div class="submit" @click="userLogin">
					<span>确定</span>
				</div>
				<div class="signup-link">
					尚未注册？
					<span id="signup" @click="toRegister">点击注册</span>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import { reqUserLogin } from '../../api/index';
export default {
	name: 'Login',
	data() {
		return {
			email: '',
			password: ''
		}
	},
	methods: {
		toRegister() {
			this.$router.push({
				name: 'Register',
				// query:{

				// }
			})
		},
		toForget() {
			this.$router.push({
				name: 'Forget',
				// query:{

				// }
			})
		},
		toBeach(){
			this.$router.push({
				name:'Beach',
			})
		},
		userLogin() {
			const reg = "@hust\.edu\.cn$"
			if (!this.email.trim()) {
				this.$refs.information.innerText = "*邮箱不能为空"
			} else if (!this.password.trim()) {
				this.$refs.information.innerText = "*密码不能为空"
			} else if (!this.email.match(reg)) {
				this.$refs.information.innerText = "*邮箱格式不正确"
			} else {
				const userInfo = {
					email: this.email.trim(),
					password: this.password,
				};
				reqUserLogin(userInfo)
					.then(response => {
						// console.log(response);

						//将token存入localStorage
						localStorage.setItem("Authorization", response.token);
						//将当前user的邮箱存入localStorage
						localStorage.setItem("email", response.user.email);
						//将token存入vuex中
						this.$store.dispatch('user/changeLogin', response.token);
						this.$refs.information.innerText = "*登录成功";
						setTimeout(this.toBeach, 1000);
					})
					.catch(error => {
						// console.log(error)
						if (error.response.data.number === 423) {
							this.$refs.information.innerText = "*该用户尚未注册";
						} else {
							this.$refs.information.innerText = "*密码错误";
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
		height: 45vh;
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
			margin: 3vh 0;

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

		.information {
			height: 2.5vh;
			width: 100%;
			padding-bottom: 1vh;
			color: #D17775;
		}

		#password-field {
			margin-bottom: 1vh;
		}

		.pass {
			font-size: 2vh;
			color: #a6a6a6;
			cursor: pointer;
			margin-left: 1px;
			margin-bottom: 2vh;
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