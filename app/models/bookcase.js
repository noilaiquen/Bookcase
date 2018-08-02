import { firebaseApp } from '../config/firebaseConfig';

export const addToBookcase = data => (
   new Promise((resolve) => {
      firebaseApp.database().ref('bookcase').push(data);
      resolve();
   })
);

export const fetchAllBookCase = () => (
   new Promise((resolve) => {
      const data = [];
      firebaseApp.database().ref('bookcase').once('value').then(dataSnapshot => {
         data.push({
            id: dataSnapshot.key,
            title: dataSnapshot.val().title,
            author: dataSnapshot.val().author,
            is_finished: dataSnapshot.val().is_finished,
            date_finished: dataSnapshot.val().date_finished,
            page: dataSnapshot.val().page,
            thumbnail: dataSnapshot.val().thumbnail
         });
         resolve(data);
      });
   })
);

export const fetchBookByID = async BookId => {
   const snapshot = await firebaseApp.database().ref(`bookcase/${BookId}`).once('value');
   if (snapshot.val()) {
      return {
         title: snapshot.val().title,
         author: snapshot.val().author,
         is_finished: snapshot.val().is_finished,
         date_finished: snapshot.val().date_finished,
         page: snapshot.val().page,
         thumbnail: snapshot.val().thumbnail,
         rating: snapshot.val().rating,
      };
   }
   return null;
};

