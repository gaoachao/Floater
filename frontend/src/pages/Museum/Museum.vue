<template>
	<div class="wrapper">
		<div class="title-wrapper">
			<div class="title-word">漂流瓶博物馆</div>
		</div>
		<div class="bottles" ref="bottles">
			<div class="bottle-wrapper" v-for="bottle in bottles">
				<div class="bottle-type">
					{{ bottle.bottleType }}
				</div>
				<div class="bottle-content">
					{{ bottle.content }}
				</div>
				<div class="bottle-image" v-if="bottle.isImage">
					<img class="image" :src=bottle.path>
				</div>
				<br v-if="!bottle.isImage">
			</div>
		</div>
		<div class="footer">
			<div class="icon-wrapper ">
				<i class="fas fa-edit fa-2x" id="beach" @click.once="toBeach"></i>
			</div>
			<div class="icon-wrapper">
				<i class="fas fa-archive fa-2x" id="museum"></i>
			</div>
			<div class="icon-wrapper">
				<i class="fas fa-user fa-2x" id="userInfo" @click.once="toUserInfo"></i>
			</div>
		</div>
	</div>
</template>
<script>
import { reqMuseumBottle } from '../../api/index';
export default {
	name: 'Museum',
	data() {
		return {
			bottles: []
		}
	},
	methods: {
		toBeach() {
			this.$router.push({
				name: 'Beach',
			})
		},
		toUserInfo() {
			this.$router.push({
				name: 'UserInfo',
			})
		}
	},
	mounted() {
		const authorization = localStorage.getItem('Authorization');
		const headers = {
			Authorization: 'Bearer ' + authorization
		}
		reqMuseumBottle(headers)
			.then(response => {
				// console.log(response);
				response.bottles.forEach(item => {
					let bottle = new Object();
					if (item.isImage === 'true') {
						bottle.isImage = true;
					} else {
						bottle.isImage = false;
					}
					bottle.content = item.content;
					switch (item.bottleType) {
						case 'emotion':
							bottle.bottleType = '情感瓶';
							break;
						case 'life':
							bottle.bottleType = '分享瓶';
							break;
						case 'study':
							bottle.bottleType = '学业瓶';
							break;
						case 'flag':
							bottle.bottleType = 'flag瓶';
							break;
					};
					if (item.isImage === 'false') {
						bottle.path = '';
					} else {
						const imagePath = 'http://localhost:8000/' + item.path;
						bottle.path = imagePath;
					}
					this.bottles.push(bottle);
				})
			})
			.catch(error => {
				console.log(error);
			})
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

	.bottles {
		height: 78.5vh;
		width: 100%;
		overflow-y: scroll;

		.bottle-wrapper {
			margin-top: 2vh;
			margin-bottom: 1.5vh;
			background-color: #F1F0F2;
			width: 86vw;
			margin-left: 7vw;
			border-radius: 4vh;

			.bottle-type {
				color: #410E0B;
				width: 100%;
				height: 3vh;
				margin-left: 6vw;
				padding-top: 2vh;
				font-size: 2.5vh;
			}

			.bottle-content {
				padding-top: 1vh;
				padding-bottom: 1.5vh;
				margin-left: 6vw;
				margin-right: 6vw;
				word-break: break-all;
			}

			.bottle-image {
				margin-left: 6vw;
				padding-bottom: 2.5vh;
				width: 90%;
				height: 20vh;

				.image {
					height: 100%;
					border: none;
					max-width: 70vw;
				}
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

			#museum {
				color: #61B4E4;
			}
		}
	}
}
</style>