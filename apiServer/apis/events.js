const Router = require("koa-router");

const router = new Router({
  prefix: "/events"
});

router.post("/", function (ctx, next) {
  const locationFilter = ctx.body.locationFilter;
  const eventFilter = ctx.body.eventFilter;
  const status = ctx.body.status;
  var bodyData = [];
  for (var i = 0, l = 30; i < l; i++) {
    bodyData.push({
        "id": i + 1,
        "name": `location: ${locationFilter}/event: ${eventFilter}/status: ${status}`,
        "startDate": "2016.04.15",
        "endDate": "2016.04.20",
        "type": "俱乐部",
        "location": "四川省 成都市 锦江区 红星路1号",
        "thumb": "http://e.hiphotos.baidu.com/news/q%3D100/sign=3abb8c8fbe389b503effe452b534e5f1/fc1f4134970a304e2975366bd6c8a786c8175ccf.jpg"
    });
  }
  ctx.body = {
    "code": 0,
    "errorMsg": "",
    "data": bodyData
  }
});

router.post("/:id", function(ctx, next) {
  ctx.body = "123";
});

module.exports = router;
