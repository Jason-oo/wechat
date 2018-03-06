module.exports = function(app, conn) {

	var server = require('http').createServer(app);
	var io = require('socket.io')(server);
	io.on('connection', function(socket) {
		socket.on("getid", function(data) { //获取用户id并更新数据库
			console.log("当前用户id为" + data.id);
			let sql = "update user set socketid='" + socket.id + "' where id='" + data.id + "';"
			conn.query(sql, (err, rs) => {
				if(err) console.log(err.message);
				else {
					console.log("已更新id为" + data.id + "的socketid为" + socket.id);
				}
			})
			//			socket.on("sendMsg", (data) => {
			//				let sql = "select socketid from user where id='" + data.tid + "';"
			//				conn.query(sql, (err, rs) => {
			//					if(err) console.log(err.message);
			//					else {
			//						io.sockets.sockets[rs[0].socketid].emit("receiveMsg", {
			//							msg: data.msg
			//						});
			//					}
			//				})
			//			})

			//			let sql1 = "select socketid from user where id='" + data.tid + "';"
			//			conn.query(sql1, (err, rs) => {
			//				if(err) console.log(err.message);
			//				else {
			//					socket.on("sendMsg", (data) => {
			//						console.log(data);
			//						console.log(rs);
			//						console.log(io.sockets.sockets)
			//						console.log(rs[0].socketid)
			//						io.sockets.sockets[rs[0].socketid].emit("receiveMsg", data);
			//					})
			//				}
			//			})
			//			let time = new Date();
			//			time =time.getFullYear()+'-'+time.getMonth()+1+'-'+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
			//			socket.on("sendMsg", (msg) => {
			//				let post = {
			//					m_from: data.id,
			//					m_to: data.tid,
			//					cont: msg,
			//					stime: time
			//				}
			//				conn.query("insert into message set ?",post,(err,rs){
			//					if(err) console.log(err.message);
			//				});
			//			})

		})
		socket.on("getTid", function(data) {
			console.log("当前要发送的目标好友id为" + data.tid);
			socket.on("sendMsg", function(msg) {
				console.log(msg);
				let sql = "select socketid from user where id='" + data.tid + "';"
				conn.query(sql, (err, rs) => {
					if(err) console.log(err.message);
					else {
						console.log("目标的socketid为" + rs[0].socketid);
						if(rs[0].socketid) {
							io.sockets.sockets[rs[0].socketid].emit("receiveMsg", {
								msg: msg.msg
							});
						}else{
							console.log("匹配失败");
						}

					}
				})
			})

		})
	});

	server.listen(7878);
}