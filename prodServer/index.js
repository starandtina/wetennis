const path = require("path");
const Koa = require("koa");
const koaStatic = require("koa-static");
const convert = require("koa-convert");
const historyApiFallback = require('koa-connect-history-api-fallback');
const app = new Koa();

app.use(convert(historyApiFallback({
  verbose: false
})))
app.use(koaStatic(path.join(__dirname, "..", "dist")));

app.listen(3000);
console.log("api server run at http://localhost:3000");
