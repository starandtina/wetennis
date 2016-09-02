const ROOT_URL = '/api?method='

export const WETENNIS_URL = 'http://wetennis.cn:3000'

export default {
  // Latest
  fetchNewsList: `${ROOT_URL}fetchNewsList`,
  fetchNews: `${ROOT_URL}fetchNews`,
  fetchNewsComments: `${ROOT_URL}fetchNewsComments`,
  likeNewsComment: `${ROOT_URL}likeNewsComment`,
  saveNewsComment: `${ROOT_URL}saveNewsComment`,

  // Dashbaord
  signUp: `${ROOT_URL}signup`,
  signIn: `${ROOT_URL}signin`,
  checkPhoneDuplicated: `${ROOT_URL}checkPhoneDuplicated`,
  checkUserNameDuplicated: `${ROOT_URL}checkUserNameDuplicated`,
  sendActivationCode: `${ROOT_URL}sendActivationCode`,
  resetPassword: `${ROOT_URL}resetPassword`,
  fetchMyData: `${ROOT_URL}fetchMyData`,
  fetchMySettings: `${ROOT_URL}fetchMySettings`,
  updateMySettings: `${ROOT_URL}updateMySettings`,
  fetchMyMatch: `${ROOT_URL}fetchMyMatch`,
  fetchMyPractice: `${ROOT_URL}fetchMyPractice`,
  fetchUserInfo: `${ROOT_URL}fetchUserInfo`,
  uploadEquipmentImage: `${ROOT_URL}uploadEquipmentImage`,
  addEquipment: `${ROOT_URL}addEquipment`,
  updateEquipment: `${ROOT_URL}updateEquipment`,
  deleteEquipment: `${ROOT_URL}deleteEquipment`,
  updateBGImage: `${ROOT_URL}updateBGImage`,

  //Times
  fetchTime: `${ROOT_URL}fetchTime`,
  fetchTimeInfo: `${ROOT_URL}fetchTimeInfo`,
  addTimeMessage: `${ROOT_URL}addTimeMessage`,
  addTimeMatch: `${ROOT_URL}addTimeMatch`,
  deleteTime: `${ROOT_URL}deleteTime`,

  //Upload Image
  uploadImage: `${ROOT_URL}uploadImage`,

  // Event
  events: `${ROOT_URL}events`,
  fetchEventGroups: `${ROOT_URL}eventGroups`,
  eventFilter: `${ROOT_URL}eventFilter`,
  fetchRegisteredUsers: `${ROOT_URL}registeredUsers`,
  fetchPartners: `${ROOT_URL}fetchPartners`,

  // event details
  fetchEventDetails: `${ROOT_URL}eventDetails`,
  fetchEventNotices: `${ROOT_URL}eventNotices`,
  fetchEventSponsors: `${ROOT_URL}eventSponsors`,
  fetchEventComments: `${ROOT_URL}eventComments`,
  likeComment: `${ROOT_URL}eventLikeComment`,
  sendComment: `${ROOT_URL}eventSendComment`,
  registerEvent: `${ROOT_URL}registerEvent`,
  eventDraw: `${ROOT_URL}eventDraw`,
  eventFollow: `${ROOT_URL}eventFollow`,

  // event score
  fetchEventScore: `${ROOT_URL}eventScore`,
  fetchEventScoreFilter: `${ROOT_URL}eventScoreFilter`,

  // event schedule
  fetchEventSchedule: `${ROOT_URL}eventSchedule`,
  fetchEventScheduleFilter: `${ROOT_URL}eventScheduleFilter`,

  // event match
  fetchEventMatchInfo: `${ROOT_URL}eventMatchInfo`,
  fetchEventMatchComments: `${ROOT_URL}eventMatchComments`,
  likeEventMatchComments: `${ROOT_URL}eventLikeMatchComment`,
  sendEventMatchComments: `${ROOT_URL}eventSendMatchComment`,
  fetchEventMatchTechnicalStatistics: `${ROOT_URL}eventMatchTechnicalStatistics`,
  fetchEventMatchGuess: `${ROOT_URL}eventMatchGuess`,

  // draw table
  fetchEventDrawTable: `${ROOT_URL}eventDrawTable`,
  // fetchEventDrawTable: `${ROOT_URL}eventDrawTable`,
  fetchEventDrawTableFilter: `${ROOT_URL}eventDrawTableFilter`,

  // rankings
  fetchRankings: `${ROOT_URL}rankings`,
  fetchRankingsFilter: `${ROOT_URL}rankingsFilter`,
  like: `${ROOT_URL}like`,

  // ranking details info
  fetchRankingDetailsInfo: `${ROOT_URL}rankingDetailsInfo`,
  fetchRankingDetailsTab: `${ROOT_URL}rankingDetailsTab`,

  // Referee
  fetchReferee: `${ROOT_URL}referee`,
  operateReferee: `${ROOT_URL}operateReferee`,

  // Guess
  fetchGuessEvents: `${ROOT_URL}guessEvents`,
  fetchGuessEventInfo: `${ROOT_URL}guessEventInfo`,
  cascadeFilter: `${ROOT_URL}cascadeFilter`,
  fetchBettingInfo: `${ROOT_URL}bettingInfo`,
  bettingSubmit: `${ROOT_URL}bettingSubmit`,

  // comments
  fetchComments: `${ROOT_URL}fetchComments`,
  sendComment: `${ROOT_URL}sendComment`,
  likeComment: `${ROOT_URL}likeComment`,
}
