<template>
	<div class="wrapper">
		<div class="icon-wrapper">
			<i class="fas fa-arrow-left fa-2x" @click="toBeach"></i>
		</div>
		<form class="choose-area">
			<div class="title-wrapper">
				<div>您捡到的瓶子类型是：</div>
			</div>
			<div class="callback-word" ref="type">

			</div>

			<div class="title-wrapper">
				<div>是否在漂流瓶博物馆中？</div>
			</div>
			<div class="callback-word" ref="isMuseum">

			</div>
			<div class="title-wrapper">
				<div>对方的分享：</div>
			</div>
			<div class="share-wrapper">
				<div class="share-area" ref="content">
				</div>
				<div class="image-wrapper">
					<img id="nowImage" ref="image">
				</div>
			</div>
			<div class="information-wrapper">
				<div class="information" ref="information"></div>
			</div>
			<div class="submit" @click="pickUpOne">
				<span>再捡一个</span>
			</div>
		</form>
	</div>
</template>
<script>
import { reqPickupBottle } from '../../api/index'
export default {
	name: 'Pickup',
	data() {
		return {
			bottle: {},
		}
	},
	methods: {
		toBeach() {
			this.$router.push({
				name: 'Beach'
			})
		},
		pickUpOne() {
			const authorization = localStorage.getItem('Authorization');
			const email = localStorage.getItem('email');
			const headers = {
				Authorization: 'Bearer ' + authorization
			}
			const params = {
				email: email
			}
			reqPickupBottle(params, headers)
				.then(response => {
					let type;
					this.bottle = response.bottle;
					this.$refs.content.innerText = this.bottle.content;

					switch (this.bottle.bottleType) {
						case 'emotion':
							type = '情感瓶';
							break;
						case 'life':
							type = '分享瓶';
							break;
						case 'study':
							type = '学业瓶';
							break;
						case 'flag':
							type = 'flag瓶';
							break;
					};
					this.$refs.type.innerText = type;
					switch (this.bottle.isMuseum) {
						case 'true':
							this.$refs.isMuseum.innerText = '在里面捏。';
							break;
						case 'false':
							this.$refs.isMuseum.innerText = '不好意思，不在捏。';
							break;
					}
					if (this.bottle.isImage === 'false') {
						this.$refs.image.src = '';
					} else {
						const imagePath = 'http://localhost:8000/' + this.bottle.path;
						this.$refs.image.src = imagePath;
					}

				})
				.catch(error => {
					console.log(error);
					this.$refs.information.innerText = '海里还没有瓶子';
				})
		},
		// information() {
		// 	this.$refs.information.innerText = '捡到一个瓶子'
		// }
	},
	mounted() {
		this.pickUpOne();
	},
}

</script>
<style lang="scss" scoped>
.wrapper {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.icon-wrapper {
		width: 80vw;
		padding-bottom: 1vh;
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

		.callback-word {
			height: 5vh;
			line-height: 5vh;
			width: 100%;
			font-size: 2vh;
		}

		.share-wrapper {
			margin-top: 1.5vh;
			width: 100%;
			height: 45vh;
			border: 1.5px solid #5B77AE;
			border-radius: 5px;

			.share-area {
				margin: 1.5vh 3vw 1vh 3vw;
				font-size: 2vh;
				color: #141b2c;
				word-break: break-all;
			}

			.image-wrapper {
				margin-left: 4vw;
				margin-top: 2vh;
				width: 90%;
				height: 20vh;

				#nowImage {
					height: 100%;
					border: none;
					max-width: 72vw;
				}
			}
		}


		.information-wrapper {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 3vh;
			position: absolute;
			bottom: 7vh;

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
			bottom: 0;
		}
	}
}
</style>