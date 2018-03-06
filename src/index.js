import Vue from "vue";
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import io from "socketClient";
Vue.use(Vuex);
Vue.use(VueRouter);

import routes from "./routes";

import 'weui';
import '../template/base.css';

const router = new VueRouter({
	routes
});

const store = new Vuex.Store({
	state: {
		//存放登陆信息
		user: window.sessionStorage.state ? JSON.parse(window.sessionStorage.state) : {
			userId: '',
			portrait: '',
			isLogin: false,
			nickname: '',
		},
		//socket实例
		socket: io("http://10.40.153.58:7878"),
		//会话好友id
		tid: '',
		//存放会话信息
		historyMsg: {
			smsg: [],
			rmsg: []
		}
	}
	//getters: {
	//	getSocket: state => state.socket,
	//	getUser: state => state.user,
	//	getHistoryMsg: state => state.historyMsg
	//},
	//mutation: {
	//	setTid(state,data){
	//		state.tid = data;
	//	}
	//}
})

//router.beforeEach((to, from, next) => { //设置全局导航守卫
//	if(!store.state.user.isLogin) {
//		router.push({
//			name: "login"
//		});
//	}
//	if(to.name === "login") {
//		if(store.state.user.isLogin) {
//			router.push({
//				name: "wechat"
//			});
//		}
//	}
//	next();
//
//})

new Vue({
	el: '#app',
	data: {},
	template: `
		<router-view></router-view>
	`,
	router,
	store,
	computed: {
		userId() {
			return this.$store.state.user.userId
		},
		tid() {
			return this.$store.state.tid
		},
		socket() {
			return this.$store.state.socket
		}
	},
	watch: {
		userId() {
			if(this.userId != "") {
				this.socket.emit("getid", {
					id: this.userId
				});
				var storage = window.sessionStorage
				storage.state = JSON.stringify(this.$store.state.user);
			}
		},
		tid() {
			this.socket.emit("getTid", {
				tid: this.tid
			});
		}
	},
	mounted() {
		if(this.userId != "") {
			this.socket.emit("getid", {
				id: this.userId
			});
		}

	}
});