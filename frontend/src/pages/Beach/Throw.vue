<template>
	<div class="wrapper">
		<div class="icon-wrapper">
			<i class="fas fa-arrow-left fa-2x" @click="toBeach"></i>
		</div>
		<form class="choose-area">
			<div class="title-wrapper">
				<div>给这只瓶子打上标签#</div>
			</div>
			<div class="choice-wrapper">
				情感瓶<input type="radio" name="bottleType" v-model="bottleType" value="emotion">
				分享瓶<input type="radio" name="bottleType" v-model="bottleType" value="life">
				学业瓶<input type="radio" name="bottleType" v-model="bottleType" value="study">
				flag瓶<input type="radio" name="bottleType" v-model="bottleType" value="flag">
			</div>
			<div class="title-wrapper">
				<div>分享当下的心情</div>
			</div>
			<textarea v-model="content"></textarea>
			<div class="title-wrapper">
				<div>是否放入漂流瓶博物馆？</div>
			</div>
			<div class="choice-wrapper">
				是<input type="radio" name="isMuseum" v-model="isMuseum" value="true">
				否<input type="radio" name="isMuseum" v-model="isMuseum" value="false">
			</div>
			<div class="title-wrapper">
				<div>是否上传图片？</div>
			</div>
			<div class="upload-image">
				<input type="file" name="upload" ref="uploadImage" hidden="hidden" accept="image/png, image/jpeg"
					@change="updateFileName">
				<div class="custom-button">
					<div class="custom-button-word" @click="uploadImage">选择图片</div>
				</div>
				<div class="custom-text" ref="customText">尚未选择图片</div>
			</div>
			<div class="image-wrapper">
				<img ref="image" id="nowImage">
			</div>
			<div class="information-wrapper">
				<div class="information" ref="information"></div>
			</div>
			<div class="submit" @click="submit">
				<span>扔到海里</span>
			</div>
		</form>
	</div>
</template>
<script>
import { reqThrowBottle } from '../../api/index';
export default {
	name: 'Throw',
	data() {
		return {
			content: '',
			bottleType: '',
			isMuseum: 'false',
			isImage: '',
			imageName: ''
		}
	},
	methods: {
		toBeach() {
			this.$router.push({
				name: 'Beach',
			})
		},
		uploadImage() {
			this.$refs.uploadImage.click();
		},
		updateFileName() {
			let regExp = /[0-9a-zA-Z\^\&\`\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_]+$/;
			if (this.$refs.uploadImage.value) {
				this.$refs.customText.innerText = this.$refs.uploadImage.value.match(regExp);
				const file = this.$refs.uploadImage.files[0];
				const reader = new FileReader();
				const that = this;
				reader.readAsDataURL(file);
				reader.onload = function () {
					const result = reader.result;
					that.$refs.image.src = result;
				}
			} else {
				this.$refs.customText.innerText = '尚未选择图片';
				this.$refs.image.src = '';
			}

		},
		submit() {
			let regExp = /[0-9a-zA-Z\^\&\`\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_]+$/;
			if (!this.content.trim()) {
				this.$refs.information.innerText = '分享内容不能为空';
				return;
			}
			if (!this.bottleType.trim()) {
				this.$refs.information.innerText = '瓶子类型不能为空';
				return;
			}
			if (!this.isMuseum.trim()) {
				this.$refs.information.innerText = '请选择是否放入漂流瓶博物馆';
				return;
			}
			if (this.$refs.uploadImage.value) {
				//如果传图片
				this.isImage = 'true';
				this.imageName = this.$refs.uploadImage.value.match(regExp)[0];
				const authorization = localStorage.getItem('Authorization');
				const email = localStorage.getItem('email');
				const headers = {
					Authorization: 'Bearer ' + authorization
				}
				const formData = new FormData();
				const file = this.$refs.uploadImage.files[0];
				// console.log(file);
				formData.append("content", this.content);
				formData.append("bottleType", this.bottleType);
				formData.append("isMuseum", this.isMuseum);
				formData.append("isImage", this.isImage);
				formData.append("imageName", this.imageName);
				formData.append("email", email);
				formData.append("file", file);
				reqThrowBottle(formData, headers)
					.then(response => {
						console.log(response);
						this.$refs.information.innerText = '分享成功';
					})
					.catch(error => {
						console.log(error);
						this.$refs.information.innerText = '分享失败';
					})
			} else {
				//如果不传图片
				this.isImage = 'false';
				this.imageName = 'null';
				const email = localStorage.getItem('email');
				const bottleInfo = {
					content: this.content,
					bottleType: this.bottleType,
					isMuseum: this.isMuseum,
					isImage: this.isImage,
					imageName: this.imageName,
					email: email
				}

				const authorization = localStorage.getItem('Authorization');
				const headers = {
					Authorization: 'Bearer ' + authorization
				}
				reqThrowBottle(bottleInfo, headers)
					.then(response => {
						console.log(response);
						this.$refs.information.innerText = '分享成功';
					})
					.catch(error => {
						console.log(error);
						this.$refs.information.innerText = '分享失败';
					})
			}

		}
	}
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

		.choice-wrapper {
			font-size: 2.1vh;
			margin-top: 0.6vh;
			margin-bottom: 0.6vh;
		}

		textarea {
			margin-top: 1.5vh;
			margin-left: 0.5vw;
			margin-bottom: 1vh;
			width: 90%;
			height: 16vh;
			border: 1px solid #001a42;
			border-radius: 5px;
			font-size: 2vh;
			color: #141b2c
		}

		.upload-image {
			.custom-button {
				margin-top: 1.5vh;
				height: 4vh;
				width: 50vw;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 3vh;
				background-color: #BDC6DF;

				.custom-button-word {
					font-size: 2.2vh;
				}
			}

			.custom-text {
				padding-top: 1vh;
				width: 50vw;
				font-size: 2vh;
				text-align: center;
				color: #8E6C91;
			}
		}

		.image-wrapper {
			margin-top: 1vh;
			width: 100%;
			height: 17vh;

			#nowImage {
				height: 100%;
				border: none;
				max-width: 80vw;
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