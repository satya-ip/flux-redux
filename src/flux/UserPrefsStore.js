import {Store} from './Store';

const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_FONT_SIZE_PREFERENCE = 'UPDATE_FONT_SIZE_PREFERENCE';

export class UserPrefsStore extends Store{
  getInitialState(){
    return localStorage['preferences'] ? JSON.parse(localStorage['preferences']) : {
      userName: "Satya",
      fontSize: "small"
    }
  }

  __onDispatch(action){
    switch (action.type) {
      case UPDATE_USERNAME:
        this.__state.userName = action.value;
        this.__emitChange();
        break;
      case UPDATE_FONT_SIZE_PREFERENCE:
        this.__state.fontSize = action.value;
        this.__emitChange();
        break;
    }

  }

  getUserPreferences(){
    return this.__state;
  }
}
