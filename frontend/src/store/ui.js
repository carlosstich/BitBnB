const SET_LOGIN_MODAL = "ui/setLoginModal";
const SET_HEADER_POSITION = "ui/setHeaderPosition";
const SET_SPOT_MODAL = "ui/setSpotModal";
const SET_SIGNUP_MODAL = "ui/setSignupModal";
const SET_EDIT_SPOT = "ui/setSpotForEditing";
const SET_REVIEW_MODAL = "ui/setReviewModal";
const SET_DELETE_SPOT_MODAL = 'ui/setDeleteSpotModal';

export const setLoginModal = (showLoginModal) => {
  return { type: SET_LOGIN_MODAL, showLoginModal };
};

export const setHeaderPosition = (headerPosition) => {
  return { type: SET_HEADER_POSITION, headerPosition };
};

export const setSpotModal = (showSpotModal) => {
  return { type: SET_SPOT_MODAL, showSpotModal };
};
export const setSignupModal = (showSignupModal) => {
  return { type: SET_SIGNUP_MODAL, showSignupModal };
};
export const setSpotForEditing = (spot) => {
  return { type: SET_EDIT_SPOT, spot };
};
export const setReviewModal = (showReviewModal) => {
  return { type: SET_REVIEW_MODAL, showReviewModal };
};

export const setDeleteSpotModal = showDeleteSpotModal => { return { type: SET_DELETE_SPOT_MODAL, showDeleteSpotModal } };

export default function uiReducer(state = {}, action) {
  switch (action.type) {
    case SET_LOGIN_MODAL:
      return { ...state, showLoginModal: action.showLoginModal };
    case SET_SIGNUP_MODAL:
      return { ...state, showSignupModal: action.showSignupModal };
    case SET_HEADER_POSITION:
      return { ...state, headerPosition: action.headerPosition };
    case SET_EDIT_SPOT:
      return { ...state, spot: action.spot };
    case SET_SPOT_MODAL:
      return { ...state, showSpotModal: action.showSpotModal };
      case SET_DELETE_SPOT_MODAL:
            return { ...state, showDeleteSpotModal: action.showDeleteSpotModal };
    case SET_REVIEW_MODAL:
      return { ...state, showReviewModal: action.showReviewModal };
    default:
      return state;
  }
}
