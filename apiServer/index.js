const Koa = require("koa");
const Router = require("koa-router");
const body = require("koa-better-body");
const cors = require("koa-cors");
const app = new Koa();

const apis = require("./apis");
const router = Router({
  prefix: "/api"
});

app.use(body());
app.use(cors());

router.use(apis.routes());

router.post('/:method', function (rep, res) {
  var fs = require('fs')
  var path = require('path')
  var file = path.resolve(__dirname, 'JSON', rep.params.method + '.json')

  var data = fs.readFileSync(file, 'utf8')

  console.log('Reading JSON file from ' + file + ' for ' + rep.path);
  rep.body = JSON.parse(data)
});


app.use(router.routes())
  .use(router.allowedMethods())


app.listen(8000);

console.log("api server run at http://localhost:8000");
