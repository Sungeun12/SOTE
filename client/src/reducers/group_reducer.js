import { groupConstants } from '../constants/group_constants';

const initialState = {
  groupList: [],
  request: false,
  error: false,
  uploading: false,
  isUploaded: false,
  currentGroup: {},
  createGroup: {},
  notices: [],
  votes: [],
  currentNotice: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case groupConstants.CREATE_GROUP_REQUEST:
      return { ...state, uploading: true };
    case groupConstants.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        isUploaded: true,
        createGroup: action.payload,
      };
    case groupConstants.CREATE_GROUP_FAILURE:
      return { ...state, error: true };

    case groupConstants.ALL_GROUP_LOAD_REQUEST:
      return { ...state, request: true };
    case groupConstants.ALL_GROUP_LOAD_SUCCESS:
      return { ...state, request: false, groupList: action.payload };
    case groupConstants.ALL_GROUP_LOAD_FAILURE:
      return { ...state, request: false, error: true };

    case groupConstants.ID_GROUP_LOAD_REQUEST:
      return { ...state, request: true };
    case groupConstants.ID_GROUP_LOAD_SUCCESS:
      return {
        ...state,
        request: false,
        currentGroup: action.payload.group,
        notices: action.payload.notices,
        votes: action.payload.votes,
      };
    case groupConstants.ID_GROUP_LOAD_FAILURE:
      return { ...state, request: false, error: true };

    case groupConstants.ID_NOTICE_LOAD_REQUEST:
      return { ...state, request: true };
    case groupConstants.ID_NOTICE_LOAD_SUCCESS:
      return {
        ...state,
        request: false,
        currentNotice: action.payload,
      };
    case groupConstants.ID_NOTICE_LOAD_FAILURE:
      return { ...state, request: false, error: true };
    case groupConstants.UNLOAD_GROUP:
      return {
        ...state,
        currentNotice: null,
        request: false,
        error: false,
        votes: [],
        notices: [],
      };
    case groupConstants.UNLOAD_GROUP_NOTICE:
      return { ...state, request: false, error: false, currentNotice: null };

    case groupConstants.DELETE_NOTICE_REQUEST:
      return { ...state, request: true };
    case groupConstants.DELETE_NOTICE_SUCCESS:
      return {
        ...state,
        // eslint-disable-next-line no-underscore-dangle
        notices: state.notices.filter(notice => notice._id !== action.payload),
      };
    case groupConstants.DELETE_NOTICE_FAILURE:
      return { ...state, error: true };

    case groupConstants.UPDATE_NOTICE_REQUEST:
      return { ...state, request: true };
    case groupConstants.UPDATE_NOTICE_SUCCESS:
      return {
        ...state,
        notices: state.notices.map(notice => {
          // eslint-disable-next-line no-underscore-dangle
          if (notice._id === action.payload.noticeId) {
            return {
              ...notice,
              title: action.payload.body.title,
              description: action.payload.body.description,
            };
          }
          return notice;
        }),
      };
    case groupConstants.UPDATE_NOTICE_FAILURE:
      return { ...state, error: true };
    default:
      return state;
  }
}
