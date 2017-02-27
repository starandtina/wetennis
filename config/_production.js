/* eslint key-spacing:0 */
export default () => ({
  compiler_fail_on_warning : false,
  compiler_hash_type       : 'chunkhash:5',
  // If you load a page without dev tools opened, there is no http request for source maps.
  // http://stackoverflow.com/questions/23848364/performance-impact-of-using-css-javascript-source-maps-in-production
  // compiler_devtool         : null,
  compiler_stats           : {
    chunks : true,
    chunkModules : true,
    colors : true
  },
  compiler_public_path: 'http://wetennis.cn:3000/'
})
