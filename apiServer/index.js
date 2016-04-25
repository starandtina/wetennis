const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();

const apis = require("./apis");
const router = Router({
  prefix: "/api"
});

router.use(apis.routes());

app.use(router.routes())
   .use(router.allowedMethods())

app.listen(8000);

console.log("api server run at http://localhost:8000");
