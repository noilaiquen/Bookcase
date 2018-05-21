import moment from 'moment';

import DatePicker from './DatePicker';
import Picker from './Picker';
import global from '../config/global';

const timeAgo = (datetime, format = 'YYYY-MM-DD HH:mm:ss') => (
   moment(datetime, format).fromNow()
);

const setUserToGlobalStore = user => (
   new Promise((resolve) => {
      global.user = user;
      resolve(user);
   })
);

export { 
   DatePicker,
   Picker,
   timeAgo,
   setUserToGlobalStore
};
