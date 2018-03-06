module.exports = function(app,conn){
	
	app.post("/session",(req,res)=>{
		let sql = "update user set sessionid='"+req.session.id+"' where username='"+req.body.username+"';"
		conn.query(sql,(err,rs)=>{
			if(err) console.log(err.message);
			else{res.send("ok");}
		})
		
	})
}
