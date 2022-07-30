<template>
	<div class="wrapper">
		<div class="title-wrapper">
			<i class="fas fa-angle-left fa-2x" id="icon" @click="back"></i>
			<div class="title-word"></div>
		</div>
		<div class="login">
			<h1>修改密码</h1>
			<form>
				<div class="txt-field">
					<input type="password" placeholder="Old password" autocomplete="on" required v-model="oldPassword">
				</div>
				<div class="txt-field" id="password-field">
					<input type="password" placeholder="Password" autocomplete="on" required v-model="password">
				</div>
				<div class="information" ref="information">

				</div>
				<div class="submit" @click="change">
					<span>确 定</span>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import { changePassword } from '../../api/index';
export default {
	name: 'Login',
	data() {
		return {
			oldPassword: '',
			password: ''
		}
	},
	methods: {
		back() {
			this.$router.push({
				name: "UserInfo"
			})
		},
		change() {
			if (!this.oldPassword.trim()) {
				this.$refs.information.innerText = "*旧密码不能为空"
			} else if (!this.password.trim()) {
				this.$refs.information.innerText = "*新密码不能为空"
			} else {
				const authorization = localStorage.getItem('Authorization');
				const headers = {
					Authorization: 'Bearer ' + authorization
				};
				const data = {
					password: this.password,
					oldPassword: this.oldPassword
				}
				changePassword(data, headers)
					.then(response => {
						this.$refs.information.innerText = "*密码修改成功";
						setTimeout(this.back, 1000)
					})
					.catch(error => {
						if (error.response.data.errorCode === 10301) {
							this.$refs.information.innerText = "*旧密码错误"
						} else if (error.response.data.errorCode === 10302) {
							this.$refs.information.innerText = "*新密码与旧密码相同"
						} else {
							this.$refs.information.innerText = "*修改密码失败，请检查token"
						}
					})
			}
		}
	},
}
</script>

<style lang="scss" scoped>
.wrapper {
	overflow: hidden;
	width: 100vw;
	height: 100vh;
	background-color: #fff;

	.title-wrapper {
		height: 14.5vh;
		width: 100%;
		position: relative;

		#icon {
			position: absolute;
			top: 9vh;
			left: 5vw;
			color: #555f71;
		}

		.title-word {
			position: absolute;
			top: 8vh;
			left: 50%;
			transform: translateX(-50%);
			color: #555f71;
			font-size: 3.5vh;
		}
	}


	.login {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 80vw;
		height: 40vh;
		background-color: #fff;
		border: #555f71 1px solid;
		border-radius: 10px;
		margin-top: 10vh;
		margin-left:10vw;
	}

	h1 {
		font-size: 4vh;
		width: 100%;
		text-align: center;
		padding: 0 0 1.5vh 0;
		border-bottom: 1px solid silver;
		margin-bottom: 1vh;
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
			background-color: #315da9;
			color: #e9f4fb;
			font-size: 2.5vh;
			border-radius: 4vh;
			margin-top: 2vh;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>