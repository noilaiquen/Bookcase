import moment from 'moment';

import DatePicker from './DatePicker';
import Picker from './Picker';

const timeAgo = (datetime, format = 'YYYY-MM-DD HH:mm:ss') => (
   moment(datetime, format).fromNow()
);

export { 
   DatePicker,
   Picker,
   timeAgo
};
