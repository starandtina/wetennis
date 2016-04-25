const Router = require("koa-router");
const router = new Router();

const events = require("./events");

router.use(events.routes());

module.exports = router;
