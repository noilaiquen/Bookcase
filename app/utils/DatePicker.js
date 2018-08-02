import {
   DatePickerAndroid
} from 'react-native';
import moment from 'moment';

const DatePicker = cb => {
   DatePickerAndroid.open({
      date: new Date()
   }).then(({ year, month, day, action }) => {
      if (action !== DatePickerAndroid.dismissedAction) {
         let newMonth = '';
         let newDay = '';
         if (Number(month) + 1 < 10) {
            newMonth = `0${month + 1}`;
         } else {
            newMonth = month;
         }

         if (Number(day) < 10) {
            newDay = `0${day}`;
         } else {
            newDay = day;
         }
         const dateValue = `${year}-${newMonth}-${newDay}`;
         cb(dateValue);
      } else {
         cb(moment().format('YYYY-MM-DD'));
      }
   }).catch(err => console.log(err));
};

export default DatePicker;
