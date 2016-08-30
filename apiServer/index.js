const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();

const router = Router({
  prefix: "/api"
});

router.post('/', function (ctx, next) {
  var fs = require('fs')
  var path = require('path')
  var file = path.resolve(__dirname, 'JSON', ctx.query.method + '.json')

  var data = fs.readFileSync(file, 'utf8')

  console.log('Reading JSON file from ' + file + ' for ' + ctx.path);
  ctx.body = JSON.parse(data)

  return next()
});


app.use(router.routes())
  .use(router.allowedMethods())


app.listen(8000);

console.log("api server run at http://localhost:8000");
