import {
   CONNECTION_CHANGE,
   KEYBOARD_SHOW,
   KEYBOARD_HIDE,
   SHOW_LOADING,
   HIDE_LOADING
} from './actionTypes';

export const watchConnection = isConnected => ({
   type: CONNECTION_CHANGE,
   isConnected
});

export const keyboardShow = () => ({
   type: KEYBOARD_SHOW
});

export const keyboardHide = () => ({
   type: KEYBOARD_HIDE
});
