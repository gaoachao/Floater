<template>
	<div class="wrapper">
		<div class="title-wrapper-header">
			<i class="fas fa-angle-left fa-2x" id="icon" @click="toUserInfo"></i>
			<div class="title-word">评价及建议</div>
		</div>
		<form class="choose-area">
			<div class="title-wrapper">
				<div>您对 Floater 有什么评价？</div>
			</div>
			<textarea v-model="comment"></textarea>
			<div class="title-wrapper">
				<div>您对 Floater 有什么建议？</div>
			</div>
			<textarea v-model="advice"></textarea>
			<div class="information-wrapper">
				<div class="information" ref="information"></div>
			</div>
			<div class="submit" @click="submit">
				<span>确定</span>
			</div>
		</form>
	</div>
</template>
<script>
import { sendAdvice } from '../../api/index';
export default {
	name: 'Throw',
	data() {
		return {
			comment: '',
			advice: ''
		}
	},
	methods: {
		toUserInfo() {
			this.$router.push({
				name: 'UserInfo'
			})
		},
		submit() {
			if(!this.comment && !this.advice){
				this.$refs.information.innerText = '评价和建议不能都为空';
				return;
			}
			const email = localStorage.getItem('email');
			const authorization = localStorage.getItem('Authorization');
			const headers = {
				Authorization: 'Bearer ' + authorization
			}
			const data = {
				email: email,
				comment: this.comment,
				advice: this.advice
			}
			sendAdvice(data, headers)
				.then(response => {
					this.$refs.information.innerText = '提交成功'
				})
				.catch(error => {
					console.log(error);
					this.$refs.information.innerText = '提交失败'
				})
			setTimeout(this.toUserInfo,1000);
		}
	}
}
</script>
<style lang="scss" scoped>
.wrapper {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	.title-wrapper-header {
		height: 14.5vh;
		width: 100%;
		// background-color: #5C7B90;
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

	.choose-area {
		// background-color: rgb(250, 250, 250);
		height: 82vh;
		width: 80vw;
		margin-top: 2vh;
		position: relative;

		.title-wrapper {
			color: #575e71;
			font-size: 2.6vh;
		}

		.choice-wrapper {
			font-size: 2.1vh;
			margin-top: 0.6vh;
			margin-bottom: 0.6vh;
		}

		textarea {
			margin-top: 1.5vh;
			margin-left: 0.5vw;
			margin-bottom: 1vh;
			width: 95%;
			height: 20vh;
			border: 1px solid #001a42;
			border-radius: 5px;
			font-size: 2vh;
			color: #141b2c
		}

		.information-wrapper {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 3vh;
			position: absolute;
			bottom: 11vh;

			.information {
				color: #D17775;
				font-size: 2.2vh;
			}
		}


		.submit {
			width: 100%;
			height: 5vh;
			border: 1px solid;
			background-color: #315da9;
			color: #e9f4fb;
			font-size: 2.5vh;
			border-radius: 4vh;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			bottom: 5vh;
		}
	}
}
</style>