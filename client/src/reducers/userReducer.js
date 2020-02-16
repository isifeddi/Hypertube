import {
  UPDATE_USER_SUCCESS,
} from "../actions/userAction";
import { CLEAR_USER_INFORMATION } from '../actions/logoutAction';

export default function (state = null, action) {
    switch (action.type) {
      case UPDATE_USER_SUCCESS:
        return action.data;
      case CLEAR_USER_INFORMATION:
        return null;
      default:
        return state;
    }
}