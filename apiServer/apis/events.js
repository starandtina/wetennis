const Router = require("koa-router");

const router = new Router({
  prefix: "/events"
});

router.get("/", function (ctx, next) {
  ctx.body = {
    name: "123"
  }
});

module.exports = router;
