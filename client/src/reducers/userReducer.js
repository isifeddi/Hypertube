import {
  UPDATE_USER_SUCCESS,
  UPDATE_IMAGE
} from "../actions/userAction";


import { CLEAR_USER_INFORMATION } from '../actions/logoutAction';

export default function (state = null, action) {
    switch (action.type) {
      case UPDATE_USER_SUCCESS:
        return action.data;
      case CLEAR_USER_INFORMATION:
        return null;
      case UPDATE_IMAGE:
        {
          return {...state,image:action.data}; 
        }
        
      default:
        return state;
    }
}