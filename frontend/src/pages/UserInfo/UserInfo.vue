<template>
	<div class="wrapper">
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
		toMyBottle(){
			this.$router.push({
				name: 'MyBottle',
			})
		},
		toAdvice(){
			this.$router.push({
				name:'Advice'
			})
		},
		toMyEmail(){
			this.$router.push({
				name:'MyEmail'
			})
		},
		exit(){
			// alert('确定要退出登录吗？');
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