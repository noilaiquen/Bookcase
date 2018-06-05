import { BackHandler, Alert } from 'react-native';

const handleAndroidBackButton = cb => {
   BackHandler.addEventListener('hardwareBackPress', () => {
      cb();
      return true; //không cho hàm mặt định đóng app
   });
};

const removeAndroidBackButtonHandler = () => {
   BackHandler.removeEventListener('hardwareBackPress', () => null);
};

const alertExit = () => {
   Alert.alert(
      '',
      'Exit app?',
      [
         { text: 'OK', onPress: () => BackHandler.exitApp() },
         { text: 'Cancel', onPress: () => null, style: 'cancel' },
      ],
      { cancelable: false }
   );
};

export { 
   handleAndroidBackButton,
   removeAndroidBackButtonHandler,
   alertExit
};
