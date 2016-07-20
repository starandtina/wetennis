// const ROOT_URL = 'http://wetennis.cn:8883/API/FEservice.ashx?method=';
const ROOT_URL = "http://localhost:8000/api?method=";


// Dashbaord
export const signUp = `${ROOT_URL}signup`
export const signIn = `${ROOT_URL}signin`
export const checkPhoneDuplicated = `${ROOT_URL}checkPhoneDuplicated`
export const checkUserNameDuplicated = `${ROOT_URL}checkUserNameDuplicated`

// Event
export const events = `${ROOT_URL}events`
export const fetchEventGroups = `${ROOT_URL}eventGroups`
export const eventFilter = `${ROOT_URL}eventFilter`
export const fetchRegisteredUsers = `${ROOT_URL}registeredUsers`
export const fetchPartners = `${ROOT_URL}fetchPartners`

// event details
export const fetchEventDetails = `${ROOT_URL}getEventDetails`
export const fetchEventNotices = `${ROOT_URL}eventNotices`
export const fetchEventSponsors = `${ROOT_URL}eventSponsors`
export const fetchEventComments = `${ROOT_URL}eventComments`
export const likeComment = `${ROOT_URL}likeComment`
export const sendComment = `${ROOT_URL}sendComment`

// draw table
export const fetchEventDrawTable = `${ROOT_URL}eventDrawTable_qualify`
// export const fetchEventDrawTable = `${ROOT_URL}/eventDrawTable`

// Referee
export const fetchReferee = `${ROOT_URL}referee`
export const operateReferee = `${ROOT_URL}operateReferee`
