<template>
	<div class="wrapper">
		<div class="title-wrapper">
			<i class="fas fa-angle-left fa-2x" id="icon" @click="toUserInfo"></i>
			<div class="title-word">我的漂流瓶</div>
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
	</div>
</template>
<script>
import { reqMyBottle } from '../../api/index';
export default {
	name: 'MyBottle',
	data() {
		return {
			bottles: [],
			number: 0,
		}
	},
	methods: {
		toUserInfo(){
			this.$router.push({
				name:'UserInfo'
			})
		}
	},
	mounted() {
		const authorization = localStorage.getItem('Authorization');
		const headers = {
			Authorization: 'Bearer ' + authorization
		}
		const email = localStorage.getItem('email');
		const params = {
			email: email,
		}
		reqMyBottle(params, headers)
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

	.bottles {
		height: 80.5vh;
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

}
</style>