<template>
	<div>
		<a :href="'#/dialogue/'+items.id" v-for="items in friends">
			<div class="weui-cell">
				<div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
					<img :src='items.portrait' style="width: 50px;display: block">
					<span class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;">8</span>
				</div>
				<div class="weui-cell__bd">
					<p v-text='items.nickname'></p>
					<p style="font-size: 13px;color: #888888;">帅哥你好</p>
				</div>
			</div>
		</a>
	</div>
</template>

<script>
	import img from '../../public/img/touxiang.jpg';
	import $ from 'jquery';
	export default {
		data() {
			return {
				img: img,
				friends: []
			}
		},
		mounted() {
			console.log(this.$store.state.user.userId)
			let self = this;		
				$.ajax({
					type: "post",
					data:{
						id:self.$store.state.user.userId
					},
					url: "http://10.40.153.58:7878/getfriends",
					success(data) {
						self.friends = data;
					}
				})
		}
	}
</script>

<style>
	a {
		color: #000000;
	}
</style>