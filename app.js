const koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");
const bodyparser = require("koa-bodyparser");
const passport = require('koa-passport');
const cors = require('koa2-cors');

// 实例化koa对象
const app = new koa();
const router = new Router();

app.use(bodyparser());
app.use(cors());

// 引入users.js
const users = require("./routes/api/users");

// 路由
router.get("/", async ctx => {
    ctx.body = {msg: "hello Koa Interface"}
})

// config
const db = require("./config/keys").mongoURI;

// 连接数据库
mongoose.connect(db,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 45000,
        keepAlive: true,
        reconnectTries: 10
      })
    .then(() => {
        console.log("Mongodb Connected ...");
    })
    .catch(err => {
        console.log(err);
    });

app.use(passport.initialize());
app.use(passport.session());

// 回调到config文件中 passport.js
require("./config/passport")(passport);

// 配置路由地址 localhost:5000/api/users
router.use("/api/users", users);

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000 ;

app.listen(port, () => {
    console.log('server started on ' + port);
});