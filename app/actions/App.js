export const CONNECTION_CHANGE = 'CONNECTION_CHANGE';
export const KEYBOARD_SHOW = 'KEYBOARD_SHOW';
export const KEYBOARD_HIDE = 'KEYBOARD_HIDE';
export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

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
