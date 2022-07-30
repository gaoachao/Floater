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
		</div>
		<div class="privacy-wrapper">
			<div class="privacy-title">
				已验证通过
				<i class="fas fa-check"></i>
			</div>
			<div class="privacy">
				您的邮箱仅被用于验证Huster的身份，本产品保证您的隐私安全。
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
		height: 5vh;

		.email {
			margin-top: 3vh;
			width: 100%;
			height: 5vh;
			display: flex;
			justify-content: center;
			align-items: center;

			.now-email {
				font-size: 2.2vh;
				color: #2E3036;
			}
		}
	}

	.privacy-wrapper {
		width: 100%;
		margin-top: 2vh;
		color: #2E3036;

		.privacy-title {
			height: 5vh;
			font-size: 3vh;
			text-align: center;
		}

		.privacy {
			height: 8vh;
			margin: 2vh 12vw 0 10vw;
			font-size: 2.3vh;
			text-align: center;
		}
	}
}
</style>