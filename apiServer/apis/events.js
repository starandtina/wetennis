const Router = require("koa-router");

const router = new Router({
  prefix: "/events"
});

router.post("/", function (ctx, next) {
  ctx.body = {
    "code": 0,
    "errorMsg": "",
    "data": [
      {
        "id": 1,
        "name": "华桥城*东岸2016成都业余网球精英赛 成都站",
        "startDate": "2016.04.15",
        "endDate": "2016.04.20",
        "type": "俱乐部",
        "location": "四川省 成都市 锦江区 红星路1号",
        "thumb": "http://e.hiphotos.baidu.com/news/q%3D100/sign=3abb8c8fbe389b503effe452b534e5f1/fc1f4134970a304e2975366bd6c8a786c8175ccf.jpg"
      },
      {
        "id": 1,
        "name": "华桥城*东岸2016成都业余网球精英赛 成都站",
        "startDate": "2016.04.15",
        "endDate": "2016.04.20",
        "type": "俱乐部",
        "location": "四川省 成都市 锦江区 红星路1号",
        "thumb": "http://e.hiphotos.baidu.com/news/q%3D100/sign=3abb8c8fbe389b503effe452b534e5f1/fc1f4134970a304e2975366bd6c8a786c8175ccf.jpg"
      }
    ]
  }
});

router.post("/:id", function(ctx, next) {
  ctx.body = "123";
});

module.exports = router;
