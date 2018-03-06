const conn = require("./config/db");
const user = require("./routes/user");
const express = require("express");
var bodyParser = require('body-parser');
var wsocket = require("./websocket");
//const session = require('express-session');


const app = express();

//app.use(session({
//	secret: 'keyboard cat',
//	resave: false,
//	saveUninitialized: true,
//	cookie: {
//		maxAge: 3 * 24 * 3600 * 1000,
//		httpOnly: false,
//	}
//}))

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use(express.static('public'));

user(app, conn);
wsocket(app, conn);

console.log("server start");