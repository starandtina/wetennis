wetennis
=============================

Table of Contents
-----------------
1. [API](#api)
1. [搭建开发环境](#setup-dev-env)
1. [最新新闻](#latest-news)
1. [赛事](#event)
1. [时光](#time)
1. [竟猜](#guess)
1. [我](#me)
1. [裁判](#裁判)

<!-- |Task|Description|Time|Progress|
|---|---|---|---|
|搭建开发环境|||Done|
|最新新闻|||Done|
|赛事|||70%|
|时光||70%|
|竟猜|||70%|
|我||||90%|
|裁判||||| -->

<a name='api'>API</a>
---------------------

### 新闻

- [ ] 新闻列表
- [ ] 新闻详情

### 用户

- [x] ~~注册~~
- [x] ~~登录~~
- [x] ~~发送验证码~~
- [x] ~~验证用户名~~
- [x] ~~验证电话号码~~
- [x] ~~重置密码~~
- [x] ~~读取个人信息~~

#### Blockers

- ~~需要确认是否需要同时支持**重置密码**和**找回密码**？**需要**~~


### 赛事

- [x] ~~赛事过滤~~
- [ ] 赛事列表
虽然可以出数据 但是有BUG 选择全部的时候应该是可以出数据的，但是现在只有选择 成都/进行中 这个filter才有数据

- [x] ~~赛事过滤~~
- [x] ~~赛事详情~~
- [ ] 评论、发表评论、 对评论点赞 **评论修改为统一接口，需要调整接口**
- [x] ~~签表请求~~
- [x] ~~赞助商信息~~
- [ ] 关注赛事 **未通**
```
{"code":2,"errorMsg":"添加失败","data":"not ok"}
```

- [ ] 赛事签表-小组赛/淘汰赛 **未通**
- [ ] 获取赛程过滤条件 **Error**
- [ ] 获取赛程列表
- [ ] 赛事消息
- [ ] 赛事得分列表 **未提供接口**
- [ ] 赛程过滤条件 **未提供接口**
- [ ] 赛程列表 **未提供接口**

### 排名

- [x] ~~获取排名过滤条件~~
- [ ] 获取排名列表 **未通 参数意义不明**
- [ ] 获取详细信息 **未提供接口**
- [ ] 获取tab内容 **未提供接口**

### 竞猜

- [ ] 获取竞猜赛事列表 **未提供接口**
- [ ] 获取竞猜赛事详细信息 **未提供接口**
- [ ] 获取竞猜赛事过滤条件 **未提供接口**
- [ ] 获取竞猜押注信息 **未提供接口**
- [ ] 押注 **未提供接口**

### 评论相关api

- [ ] 获取评论 **未提供接口**
- [ ] 发送评论 **未提供接口**
- [ ] 对评论点赞 **未提供接口**


<a name='setup-dev-env'>搭建开发环境</a>
--------------------------------------

* [React](https://github.com/facebook/react) (`^15.0.0`)
* [immutable-js](https://github.com/facebook/immutable-js) (`^3.7.6`)
* [Redux](https://github.com/rackt/redux) (`^3.0.0`)
  * react-redux (`^4.0.0`)
  * redux-devtools (`Maybe we can use the Redux DevTools chrome extensions`)
  * redux-thunk middleware
* [redux-promise](https://github.com/acdlite/redux-promise) (`^0.5.3`)
* [redux-actions](https://github.com/acdlite/redux-actions) (`^0.9.1`)
* [redux-immutable](https://github.com/gajus/redux-immutable) (`^3.0.6`)
* [react-router](https://github.com/rackt/react-router) (`^2.0.0`)
* [react-router-redux](https://github.com/rackt/react-router-redux) (`^4.0.0`)
* [Webpack](https://github.com/webpack/webpack)
  * Bundle splitting and CSS extraction
  * Sass w/ CSS modules, autoprefixer, and minification
* [Koa](https://github.com/koajs/koa) (`^2.0.0-alpha`)
* [Flow](http://flowtype.org/) (`^0.22.0`)
* [Babel](https://github.com/babel/babel) (`^6.3.0`)
  * [react-transform-hmr](https://github.com/gaearon/react-transform-hmr) hot reloading for React components
  * [redbox-react](https://github.com/KeywordBrain/redbox-react) visible error reporting for React components
  * [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) so transforms aren't inlined
  * [babel-plugin-transform-react-constant-elements](https://babeljs.io/docs/plugins/transform-react-constant-elements/) save some memory allocation
  * [babel-plugin-transform-react-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types) remove `PropTypes`
* [ESLint](http://eslint.org)
  * Uses [Standard Style](https://github.com/feross/standard) by default, but you're welcome to change this.


<a name='latest-news'>最新新闻</a>
---------------------------------

- [x] ~~最新新闻列表~~(8/5/2016)
- [x] ~~新闻列表过滤~~(8/5/2016)
- [x] ~~新闻详细页面~~(8/14/2016)
- [x] ~~关注新闻~~(8/14/2016)
- [x] ~~新闻评论~~(8/14/2016)


<a name='event'>赛事</a>
-----------------------

- [x] ~~赛事列表~~
- [x] ~~赛事详细页面 (6/23/2016)~~
- [x] ~~赛事信息~~ (6/27/2016)
- [x] ~~签表 (7/3/2016)~~
- [x] ~~赛程 (7/7/016)~~
- [x] ~~比分 (7/13/2016)~~
- [x] ~~报名~~
  - [x] ~~组别列表 (6/24/2016)~~
  - [x] ~~项目列表 (6/25/2016)~~
  - [x] ~~搭档选择（如果选择双打项目）(6/26/2016)~~
  - [x] ~~已报名成员列表(6/27/2016)~~
  - [x] ~~报名确认页面（单人/双人，每项信息可编辑）(6/28/2016)~~
  - [x] ~~支付页面, 只支持微信支付 (6/30/2016)~~
- [x] ~~排名（全局）~~
  - [x] ~~排名列表 (7/17/2016)~~
  - [x] ~~某人详细名次信息~~
    - [x] ~~关注 (7/19/2016)~~
    - [x] ~~个人信息，包括用户名，生日... (7/19/2016)~~
    - [x] ~~单/双打积分，历史记录 (7/22/2016)~~
    - [x] ~~单/双打胜负比，包括今年和总计 (7/22/2016)~~
    - [x] ~~单/双打历史成绩 (7/22/2016)~~
  - [x] ~~比赛~~
    - [x] ~~成绩统计 (8/8/2016)~~
    - [x] ~~技术统计页面 (8/10/2016)~~
    - [x] ~~评论页面 (8/11/2016)~~
    - [x] ~~竞猜页面 (复用竞猜)~~


<a name='time'>时光</a>
----------------------

- [ ] 时光列表 (8/20/2016)
- [ ] 添加我的心情 (8/25/2016)
- [ ] 添加我的约球 (8/30/2016)

<a name='guess'>竟猜</a>
-----------------------

- [ ] 竞猜列表页面(8/15/2016)
- [ ] 我的竞猜页面(8/19/2016)
- [ ] 竞猜项目列表页面(8/23/2016)
- [ ] 竞猜项目详细页面(8/27/2016)
- [ ] 投注页面(8/30/2016)
- [ ] 投注确认页面(8/30/2016)


<a name='me'>我</a>
------------------

- [x] ~~登录页面 (6/22/2016)~~
- [x] ~~注册页面 (6/22/2016)~~
- [x] ~~找回密码 (7/2/2016)~~
- [x] ~~重置密码 (7/4/2016)~~
- [ ] Dashboard页面
  - [x] ~~个人基本信息 (7/8/2016)~~
  - [x] ~~我的比赛 (8/10/2016)~~
  - [x] ~~我的约球 (8/13/2016)~~
  - [ ] 我的竞猜页面 (8/30/2016)(复用我的竟猜)
  - [ ] 个人装备 (7/24/2016)
- [ ] 赛事得分列表 **未提供接口**
