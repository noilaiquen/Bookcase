import { NetInfo, Keyboard, BackHandler, Alert } from 'react-native';
import moment from 'moment';
import DatePicker from './DatePicker';
import Picker from './Picker';
import { reduxMiddleware,  navigationPropConstructor } from './Redux';

const timeAgo = (datetime, format = 'YYYY-MM-DD HH:mm:ss') => (
   moment(datetime, format).fromNow()
);

const alertExit = () => {
   Alert.alert(null, 'Exit app?',
      [
         { text: 'OK', onPress: () => BackHandler.exitApp() },
         { text: 'Cancel', onPress: () => null, style: 'cancel' },
      ],
      { cancelable: false }
   );
};

const connectionListener = cb => {
   NetInfo.addEventListener('connectionChange', connectionInfo => {
      const isConnected = connectionInfo.type !== 'none' ? true : false;
      cb(isConnected);
   });
};

const removeConnectionListener = () => {
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

const androidBackButtonListener = cb => {
   BackHandler.addEventListener('hardwareBackPress', () => {
      cb();
      return true; //không cho hàm mặt định đóng app
   });
};

const removeAndroidBackButtonListener = cb => {
   BackHandler.removeEventListener('hardwareBackPress', cb);
};

export { 
   DatePicker,
   Picker,
   timeAgo,
   alertExit,
   reduxMiddleware,
   navigationPropConstructor,
   androidBackButtonListener,
   removeAndroidBackButtonListener,
   connectionListener,
   removeConnectionListener,
   keyboardDidShowListener,
   removeKeyboardDidShowListener,
   keyboardDidHideListener,
   removeKeyboardDidHideListener
};
