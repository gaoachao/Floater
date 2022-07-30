<template>
	<div class="wrapper">
		<div class="throw button" @click="toThrow">
			<div class="word">扔漂流瓶</div>
		</div>
		<div class="pick-up button" @click="toPickup">
			<div class="word">捡漂流瓶</div>
		</div>

		<div class="footer">
			<div class="icon-wrapper ">
				<i class="fas fa-edit fa-2x" id="beach"></i>
			</div>
			<div class="icon-wrapper">
				<i class="fas fa-archive fa-2x" id="museum" @click.once="toMuseum"></i>
			</div>
			<div class="icon-wrapper">
				<i class="fas fa-user fa-2x" id="userInfo" @click.once="toUserInfo"></i>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Beach',
	methods: {
		toThrow() {
			this.$router.push({
				name: 'Throw'
			})
		},
		toPickup() {
			this.$router.push({
				name: 'Pickup'
			})
		},
		toMuseum() {
			this.$router.push({
				name: 'Museum',
			})
		},
		toUserInfo() {
			this.$router.push({
				name: 'UserInfo',
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.wrapper {
	background-image: url('../../assets/image/beach.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	height: 100vh;
	width: 100vw;

	.button {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 70vw;
		height: 5vh;
		background-color: #5C7B90;
		// background-color: #6e5c3f;
		border-radius: 2.5vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.throw {
		top: 34vh;
	}

	.pick-up {
		top: 44vh;
	}

	.word {
		color: #ffffff;
		font-size: 2.5vh;
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

			#beach{
				color:#61B4E4;
			}
		}
	}

}
</style>