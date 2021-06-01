import { groupConstants } from '../constants/group_constants';

export default function (state = {}, action) {
  switch (action.type) {
    case groupConstants.CREATE_GROUP_REQUEST:
      return { uploading: true };
    case groupConstants.CREATE_GROUP_SUCCESS:
      return {
        isUploaded: true,
        createGroup: action.payload,
      };
    case groupConstants.CREATE_GROUP_FAILURE:
      return {};

    case groupConstants.ALL_GROUP_LOAD_REQUEST:
      return { request: true };
    case groupConstants.ALL_GROUP_LOAD_SUCCESS:
      return { groupList: action.payload };
    case groupConstants.ALL_GROUP_LOAD_FAILURE:
      return {};
    default:
      return state;
  }
}
