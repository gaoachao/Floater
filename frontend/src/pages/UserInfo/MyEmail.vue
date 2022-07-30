<template>
	<div class="wrapper">
		<div class="title-wrapper">
			<i class="fas fa-angle-left fa-2x" id="icon" @click="toUserInfo"></i>
			<div class="title-word">我的邮箱</div>
		</div>
		<div class="email-wrapper">
			<div class="email">
				<div class="now-email" ref="email"></div>
			</div>
			<div class="">

			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'MyEmail',
	data() {
		return {
			email: ''
		}
	},
	methods: {
		toUserInfo() {
			this.$router.push({
				name: 'UserInfo'
			})
		}
	},
	mounted() {
		const nowEmail = localStorage.getItem('email');
		this.email = nowEmail;
		console.log(this.email);
		this.$refs.email.innerText = nowEmail;
	}
}
</script>
<style lang="scss" scoped>
.wrapper {
	height: 100vh;
	width: 100vw;

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

	.email-wrapper {
		width: 100%;
		height: 100%;

		.email {
			margin-top: 3vh;
			width: 100%;
			height: 5vh;
			display: flex;
			justify-content: center;
			align-items: center;
			.now-email {
				font-size: 2.2vh;
				color:#001945;
			}
		}
	}
}
</style>