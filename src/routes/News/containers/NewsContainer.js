import { connect } from 'react-redux'

import News from 'routes/News/components/News'
import { likeNews } from 'routes/News/routes/Detail/modules/newsDetail'

// in general, if we don't have to map state to properties then it's ok to use the `connect` on presentional components
export default connect(
  null,
  {
    likeNews
  },
)(News)
