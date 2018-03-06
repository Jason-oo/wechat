module.exports = function(app, conn) {
	app.post("/getfriends", (req, res) => {
		let id = req.body.id;
		if(id) {
			let sql = "select friendsid from user where id='" + id + "';";
			conn.query(sql, (err, rs) => {
				if(err) {
					console.log(err.message);
				} else {
					let sql = "select id,nickname,portrait from user where id in (" + rs[0].friendsid + ");"
					console.log(sql);
					conn.query(sql, (err, rs) => {
						res.send(rs);
					})

				}
			})
		}else{
			console.log("id不存在");
		}

	});
	//	app.get("/getAllUser", (req, res) => { //获取
	//		let sql = "select username,nickname from user";
	//		conn.query(sql, (err, rs) => {
	//			if(err) {
	//				console.log(err.message);
	//			} else {
	//				res.send(rs);
	//			}
	//		})
	//	});
	app.post("/register", (req, res) => { //注册
		console.log(req.body);
		let data = req.body;
		let post = {
			username: data.username,
			pwd: data.pwd,
			nickname: data.nickname,
			rtime: data.rtime
		}
		conn.query("insert into user set ?", post, function(err, rs) {
			if(err) {
				console.log(err.message);
			} else {
				res.send("ok");
			}
		})
	});
	//登陆
	app.post("/login", (req, res) => {
		let _user = req.body;
		console.log(_user);
		let username = _user.username;
		let pwd = _user.pwd;
		conn.query("select id,pwd,portrait,nickname from user where username = ? limit 1", [username], (err, rs) => {
			if(err) console.log(err.message);
			else {
				if(rs.length != 0) {
					rs = rs[0];
					if(rs.pwd === pwd) {
						res.send({
							errno: 1,
							msg: '登陆成功',
							id: rs.id,
							portrait: rs.portrait,
							nickname: rs.nickname,
						})
					} else {
						res.send({
							errno: 2,
							msg: '密码错误'
						})
					}
				} else {
					res.send({
						errno: 0,
						msg: '用户名不存在'
					});
				}
			}
		})
	});
	app.get("/getUserInfo", (req, res) => {
		let id = req.query.tid;
		let sql = "select nickname,portrait from user where id='" + id + "';";

		conn.query(sql, (err, rs) => {
			if(err) console.log(err.message);
			else {
				res.send(rs);
			}
		});
	});

}