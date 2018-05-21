import React, { Component } from 'react';
import {
   View,
   FlatList,
   StatusBar,
   ActivityIndicator
} from 'react-native';
import { NoteListItem, HeaderLeft } from '../../components';
import { firebaseApp } from '../../config/firebaseConfig';
import { appColor, appTextColor } from '../../config/constants';

export default class ListNote extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isLoading: false,
         notes: []
      };
      this.ref = firebaseApp.database().ref('notes');
   }

   componentDidMount() {
      this.fectNotes();
   }

   fectNotes = async () => {
      this.setState({ isLoading: true });
      
      const { bookId } = this.props.navigation.state.params;
      let notes = [];

      this.ref.child(bookId).once('value').then(snapshot => {
         snapshot.forEach(childSnapshot => {
            notes.push({
               key: childSnapshot.key,
               name: childSnapshot.val().name,
               content: childSnapshot.val().content,
               datetimeNote: childSnapshot.val().datetimeNote
            });
         });
         this.setState({ notes, isLoading: false });
      });
   }

   render() {
      const { isLoading, notes } = this.state;
      return (
         <View style={styles.container}>
            <StatusBar barStyle="dark-content" />   
            <View style={{ marginTop: 20, marginBottom: 10 }}>   
               <HeaderLeft
                  icon="ios-arrow-back"
                  text="Back"
                  color={appColor}
                  onPress={() => this.props.navigation.goBack()}
               />
            </View>
            {isLoading ? (
               <View style={styles.loadingContainer}>
                  <ActivityIndicator
                     animating
                     color={appTextColor}
                     size="small"
                  />
               </View>
            ) : (
               <FlatList
                  data={notes}
                  keyExtractor={(item) => item.key}  //eslint-disable-line
                  renderItem={({ item }) => (
                     <NoteListItem note={item} />
                  )}
               />
            )}
         </View>
      );
   }
}

const styles = {
   container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#FFF'
   },
   loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF'
   }
};
