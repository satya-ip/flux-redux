import { Dispatcher, UserPrefsStore } from './flux';

const controlPanelDispatcher = new Dispatcher();
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_FONT_SIZE_PREFERENCE = 'UPDATE_FONT_SIZE_PREFERENCE';

const useNameUpdateAction = (name) => {
  return {
    type: UPDATE_USERNAME,
    value: name
  }
};

const fontPreferenceUpdateAction = (size) => {
  return {
    type: UPDATE_FONT_SIZE_PREFERENCE,
    value: size
  }
};

document.getElementById('userNameInput').addEventListener('input', ({target}) => {
  const name = target.value;
  console.log("Dispatching...", name);
  controlPanelDispatcher.dispatch(useNameUpdateAction(name));
})

document.forms.fontSizeForm.fontSize.forEach( element => {
  element.addEventListener('change', ({target}) => {
    controlPanelDispatcher.dispatch(fontPreferenceUpdateAction(target.value));
  })
})

const userPrefsStore = new UserPrefsStore(controlPanelDispatcher);

userPrefsStore.addListener((state) => {
  console.info("The current state is...", state);
  render(state);
  localStorage['preferences'] = JSON.stringify(state);
})

const render = ({userName, fontSize}) => {
  document.getElementById("userName").innerText = userName;
  document.getElementsByClassName("container")[0].style.fontSize = fontSize === "small" ? "16px":"24px";
  document.forms.fontSizeForm.fontSize.value = fontSize;
}

render(userPrefsStore.getUserPreferences());
