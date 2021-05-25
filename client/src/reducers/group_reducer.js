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
    default:
      return state;
  }
}
