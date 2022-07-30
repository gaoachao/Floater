<template>
	<div class="wrapper" ref="wrapper">
		<div class="title-wrapper">
			<div class="title-word">个人中心</div>
		</div>
		<div class="img-wrapper">
			<img class="img" src="../../assets/image/entrance.png">
		</div>
		<div class="user-wrapper">
			<div class="my-bottles item" @click="toMyBottle">
				<i class="fas fa-wine-bottle"></i>
				<div class="exclude-icon">
					<div class="title">我的漂流瓶</div>
					<i class="fas fa-angle-right" id="angle-right"></i>
				</div>
			</div>
			<div class="my-email item" @click="toMyEmail">
				<i class="fas fa-envelope"></i>
				<div class="exclude-icon">
					<div class="title">我的邮箱</div>
					<i class="fas fa-angle-right" id="angle-right"></i>
				</div>
			</div>
			<div class="change-password item" @click="toChange">
				<i class="fas fa-eraser"></i>
				<div class="exclude-icon">
					<div class="title">修改密码</div>
					<i class="fas fa-angle-right" id="angle-right"></i>
				</div>
			</div>
			<div class="advice item" @click="toAdvice">
				<i class="fas fa-marker"></i>
				<div class="exclude-icon">
					<div class="title">评价及建议</div>
					<i class="fas fa-angle-right" id="angle-right"></i>
				</div>
			</div>
			<div class="exit" @click="exit">
				<div class="exit-word">退出登录</div>
			</div>
		</div>
		<div class="footer">
			<div class="icon-wrapper ">
				<i class="fas fa-edit fa-2x" id="beach" @click.once="toBeach"></i>
			</div>
			<div class="icon-wrapper">
				<i class="fas fa-archive fa-2x" id="museum" @click.once="toMuseum"></i>
			</div>
			<div class="icon-wrapper">
				<i class="fas fa-user fa-2x" id="userInfo"></i>
			</div>
		</div>
		<div class="alert" ref="alert">
			<div class="title">确定退出登录吗？</div>
			<div class="content">
				<div class="word-wrapper" id="confirm" @click="confirm">
					<div>确 定</div>
				</div>
				<div class="word-wrapper" id="cancel" @click="cancel">
					<div>取 消</div>
				</div>
			</div>
		</div>
		<div class="gray-bg" ref="grayBg"></div>
	</div>
</template>
<script>
export default {
	name: 'UserInfo',
	methods: {
		toMuseum() {
			this.$router.push({
				name: 'Museum',
			})
		},
		toBeach() {
			this.$router.push({
				name: 'Beach',
			})
		},
		toChange() {
			this.$router.push({
				name: 'Change',
			})
		},
		toMyBottle() {
			this.$router.push({
				name: 'MyBottle',
			})
		},
		toAdvice() {
			this.$router.push({
				name: 'Advice'
			})
		},
		toMyEmail() {
			this.$router.push({
				name: 'MyEmail'
			})
		},
		exit() {
			this.$refs.grayBg.classList.add('active');
			this.$refs.alert.classList.add('active');
		},
		cancel(){
			this.$refs.grayBg.classList.remove('active');
			this.$refs.alert.classList.remove('active');
		},
		confirm(){
			localStorage.removeItem('Authorization');
			localStorage.removeItem('email');
			this.$router.push({
				name:'Entrance'
			})
		}
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
		// background-color: #5C7B90;
		position: relative;

		.title-word {
			position: absolute;
			top: 8vh;
			left: 7vw;
			color: #555f71;
			font-size: 3.5vh;
		}
	}

	.img-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;

		.img {
			height: 25vh;
		}
	}

	.user-wrapper {
		height: 53.5vh;
		width: 100%;
		position: relative;

		.item {
			margin-left: 7vw;
			margin-bottom: 0.5vh;
			display: flex;
			font-size: 2.5vh;
			height: 6vh;
			align-items: center;
			// border-bottom: 0.5px solid #dee2f184;
			position: relative;
			color: #2E3036;

			.exclude-icon {
				display: flex;
				margin-left: 3vw;
				position: relative;
				align-items: center;
				width: 100%;
				border-bottom: 0.5px solid #dee2f184;
				height: 100%;

				#angle-right {
					position: absolute;
					right: 3vw;
					color: #D0D4E3;
				}
			}
		}
	}

	.exit {
		position: absolute;
		bottom: 3vh;
		width: 50vw;
		background-color: #894C5A;
		height: 5vh;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 2vh;

		.exit-word {
			font-size: 2.5vh;
			color: #FCFCFF;
		}
	}

	.alert {
		position: absolute;
		height: 26vh;
		width: 80vw;
		top: 32vh;
		left: 10vw;
		background-color: #F1F0F6;
		border-radius: 3vh;
		display: none;
		z-index: 100;

		.title {
			margin-top: 3vh;
			text-align: center;
			font-size: 2.5vh;
		}

		.content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.word-wrapper {
				height: 5.5vh;
				width: 80%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 3vh;
				border-radius: 2.2vh;
				background-color: #2E7DB2;
				margin-top: 2.5vh;
				color: #ffffff;
			}

			#confirm {
				background-color: #894C5A;
			}
		}
	}

	.gray-bg {
		display: none;
		background-color: #3b3b3b77;
		position: absolute;
		top: 0;
		width: 100%;
		height: 93vh;
		z-index: 10;
	}

	.active{
		display: block !important;
	}
}

.footer {
	height: 7vh;
	position: fixed;
	bottom: 0;
	width: 100%;
	background-color: #5C7B90;
	display: flex;
	justify-content: space-between;

	.icon-wrapper {
		width: 30vw;
		display: flex;
		justify-content: center;
		align-items: center;

		i {
			color: #F8FCFF;
		}

		#userInfo {
			color: #61B4E4;
		}
	}
}
</style>