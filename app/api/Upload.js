
import RNFetchBlob from 'react-native-fetch-blob';
import { firebaseApp } from '../config/firebaseConfig';

const Upload = async (imageSource, mine = 'image/jpeg') => {
   const Blob = RNFetchBlob.polyfill.Blob;
   window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
   window.Blob = Blob;

   const sessionID = new Date().getTime();
   const imageRef = firebaseApp.storage().ref('thumbnail').child(`${sessionID}.jpg`);
   try {
      const imageBlob = await RNFetchBlob.fs.readFile(imageSource, 'base64');
      const blob = await Blob.build(imageBlob, { type: `${mine}; BASE64` });
   
      await imageRef.put(blob, { contentType: mine });
      return imageRef.getDownloadURL();
   } catch (error) {
      return error;
   }
};

export default Upload;
