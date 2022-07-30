<template>
	<div class="wrapper">
		<div class="words">
			<div class="words-title">您好</div>
			<div class="words-content">有一封来自远方的信......</div>
		</div>
		<div class="img-wrapper">
			<img class="img" src="../../assets/image/entrance.png">
		</div>
		<div class="button" @click="toLogin">
			<div class="button-title" >
				开始漂流
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Entrance',
	methods:{
		toLogin(){
			this.$router.push({
				name: 'Login',
				// query:{

				// }
			});
		}
	}
}
</script>
<style lang="scss" scoped>
.wrapper {
	background-color: #f8f9fa;
	height: 100vh;
	width: 100vw;
  .words{
		padding-left:13vw;
		padding-top:13vh;
		font-size: 3vh;
		color:#313030;
	}
	.img-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 7vh;
		.img {
			// width: 75vw;
			height: 25vh;
		}
	}

	.button {
		height: 7vh;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80vw;
		background-color: #3D7F94;
		border-radius: 10vw;
		position: absolute;
		bottom: 8vh;
		left: 50%;
		transform: translateX(-50%);
		.button-title {
			color: #fff;
			font-size: 2.5vh;
			font-weight: 500;
		}
	}
}
</style>