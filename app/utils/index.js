import moment from 'moment';
import { NetInfo, Keyboard } from 'react-native';
import { 
   handleAndroidBackButton,
   removeHandlerAndroidBackButton,
   alertExit
} from './AndroindBackHandler';
import DatePicker from './DatePicker';
import Picker from './Picker';
import {
   reduxMiddleware,
   navigationPropConstructor
} from './Redux';

const timeAgo = (datetime, format = 'YYYY-MM-DD HH:mm:ss') => (
   moment(datetime, format).fromNow()
);

const watchConnectionChange = cb => {
   NetInfo.addEventListener('connectionChange', connectionInfo => {
      const isConnected = connectionInfo.type !== 'none' ? true : false;
      cb(isConnected);
   });
};

const removeConnectionChangeListener = () => {
   NetInfo.removeEventListener('connectionChange');
};

const keyboardDidShowListener = cb => {
   Keyboard.addListener('keyboardDidShow', cb);
};

const keyboardDidHideListener = cb => {
   Keyboard.addListener('keyboardDidHide', cb);
};

const removeKeyboardDidShowListener = () => {
   Keyboard.removeListener('keyboardDidShow');
};

const removeKeyboardDidHideListener = () => {
   Keyboard.removeListener('keyboardDidHide');
};

export { 
   DatePicker,
   Picker,
   timeAgo,
   handleAndroidBackButton,
   removeHandlerAndroidBackButton,
   alertExit,
   reduxMiddleware,
   navigationPropConstructor,
   removeConnectionChangeListener,
   watchConnectionChange,
   keyboardDidShowListener,
   keyboardDidHideListener,
   removeKeyboardDidShowListener,
   removeKeyboardDidHideListener
};
