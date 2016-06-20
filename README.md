wetennis
=============================

Table of Contents
-----------------
1. [搭建开发环境](#setup-dev-env)
1. [最新新闻](#latest-news)
1. [赛事](#event)
1. [时光](#time)
1. [竟猜](#guess)
1. [我](#me)
1. [裁判](#裁判)

|Task|Description|Time|Progress|
|---|---|---|---|
|搭建开发环境||||
|最新新闻||||
|赛事||||
|时光||||
|竟猜||||
|我|||||
|裁判|||||


<a name='setup-dev-env'>搭建开发环境</a>
-------------

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
-----------

- [ ] 最新新闻列表
- [ ] 新闻列表过滤
- [ ] 新闻详细页面
- [ ] 关注新闻
- [ ] 新闻评论


<a name='event'>赛事</a>
-----

- [x] ~~赛事列表~~
- [ ] 赛事详细页面 (6/23/2016)
- [ ] 赛事信息 (6/27/2016)
- [ ] 比分 (7/3/2016)
- [ ] 赛程 (7/6/016)
- [ ] 签表 (7/13/2016)

- [ ] 报名
  - [ ] 组别列表(7/10/2016)
  - [ ] 项目列表(7/13/2016)
  - [ ] 搭档选择（如果选择双打项目）(7/17/2016)
  - [ ] 已报名成员列表(7/20/2016)
  - [ ] 报名确认页面（单人/双人，每项信息可编辑）(7/23/2016)
  - [ ] 支付页面(7/27/2016)
  - [ ] 只支持微信支付(7/30/2016)
- [ ] 排名（全局）
  - [ ] 排名列表页面 (7/17/2016)
  - [ ] 某人详细名次信息
    - [ ] 关注 (7/19/2016)
    - [ ] 个人信息，包括用户名，生日... (7/19/2016)
    - [ ] 单/双打积分，历史记录 (7/22/2016)
    - [ ] 单/双打胜负比，包括今年和总计 (7/22/2016)
    - [ ] 单/双打历史成绩 (7/22/2016)
    - [ ] 比赛
      - [ ] 除tab外部分 (7/25/2016)
      - [ ] 技术统计页面 (7/28/2016)
      - [ ] 竞猜页面 (复用竞猜)
      - [ ] 评论页面 (7/31/2016)


<a name='time'>时光</a>
-----

？？？

<a name='guess'>竟猜</a>
-----

- [ ] 竞猜列表页面
- [ ] 我的竞猜页面
- [ ] 竞猜项目列表页面
- [ ] 竞猜项目详细页面
- [ ] 投注页面
- [ ] 投注确认页面


<a name='me'>我</a>
--

- [x] ~~登录页面~~
- [ ] 注册页面
- [ ] 找回密码
- [ ] 重置密码
- [ ] Dashboard页面
  - [ ] 个人基本信息(6/23/2016)
  - [ ] 我的比赛页面(6/25/2016)
   - [ ] 约球(6/27/2016)
  - [ ] 我的竞猜页面(6/29/2016)
    - [ ] 我的竞猜(7/01/2016)
    - [ ] 历史竞猜(7/03/2016)
  - [ ] 个人装备(7/05/2016)
