import API from 'utils/API'
import URLConf from 'utils/url'

// ------------------------------------
// Constants
// ------------------------------------

const UPLOAD_IMAGE ='UPLOAD_IMAGE'
const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS'
const UPLOAD_IMAGE_FAILTURE = 'UPLOAD_IMAGE_FAILTURE'

// ------------------------------------
// Actions
// ------------------------------------

export const uploadImage = data => ({
  types: [UPLOAD_IMAGE, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILTURE],
  promise: () => API.post(URLConf.uploadImage, data)
})

