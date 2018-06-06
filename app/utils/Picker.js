import ImagePicker from 'react-native-image-picker';

const Picker = cb => {
   ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
         console.log('User cancelled image picker');
      } else if (response.error) {
         console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
         console.log('User tapped custom button: ', response.customButton);
      } else {
         const source = {
            uri: response.uri
         };

         // You can also display the image using data:
         // let source = { uri: 'data:image/jpeg;base64,' + response.data };
         cb(source, response.data);
      }
   });
};

export default Picker;

