import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { Card, Button } from 'react-native-elements';
import moment from 'moment';
import { NoteForm, NoteListItem } from './index';
import { firebaseApp } from '../config/firebaseConfig';
import { appTextColor, appFont, appColor } from '../config/constants';
import global from '../config/global';

class Note extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showForm: false,
         text: '',
         notes: [],
         isLoading: false
      };
      this.ref = firebaseApp.database().ref('notes');
      this.onShowForm = this.onShowForm.bind(this);
      this.onInputText = this.onInputText.bind(this);
      this.onCancel = this.onCancel.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
   }

   componentDidMount() {
      this.fetchNotes();
   }

   onShowForm() {
      this.setState({
         showForm: !this.state.showForm
      });
   }

   onInputText(text) {
      this.setState({
         text
      }, () => console.log(this.state.text));
   }

   onCancel() {
      this.setState({
         text: '',
         showForm: false
      });
   }

   onSubmit = async () => {
      const { bookId } = this.props;
      const { text } = this.state;
      try {
         await this.ref.child(bookId).push({
            name: 'Thanh Binh Nguyen',
            content: text,
            datetimeNote: moment().format('YYYY-MM-DD HH:mm:ss')
         });
         this.setState({
            showForm: false,
            text: ''
         }, () => global.setLoadingVisible(false));
      } catch (err) {
         global.setLoadingVisible(false);
         ToastAndroid.show('Somethings was wrong!', ToastAndroid.LONG);
      }
   }

   fetchNotes = async () => {
      this.setState({ isLoading: true });
      const { bookId } = this.props;
      let notes = [];

      this.ref.child(bookId).limitToFirst(5).once('value').then(snapshot => {
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
      const { notes, isLoading } = this.state;
      return (
         <View>
            <Card 
               title="NOTE"
               containerStyle={styles.containerStyle}
               titleStyle={styles.cardTitle}
            >
               {isLoading ? (
                  <View style={styles.loadingContainer}>
                     <ActivityIndicator
                        animating
                        color={appTextColor}
                        size="small"
                     />
                  </View>
               ) : (
                  <View style={{ flex: 1 }}>
                     {notes.length === 0 ? (
                        <Text style={styles.noNoteText}>No note</Text>
                     ) : notes.map(note => <NoteListItem note={note} key={note.key} />) }      
                  </View>
               )}   

               <View>
                  {notes.length > 0 && (
                     <TouchableOpacity
                        style={styles.btnShowMore}
                        onPress={() => this.props.navigation.navigate('notes', { bookId: this.props.bookId })}
                     >
                        <Text style={styles.textShowMore}>Show more</Text>
                     </TouchableOpacity>
                  )}

                  <Button
                     rounded
                     title="Write a note"
                     backgroundColor={appTextColor}
                     onPress={this.onShowForm}
                     fontFamily={appFont}
                  />
               </View>
            </Card>
      
            <NoteForm
               isShow={this.state.showForm}
               onShowForm={this.onShowForm}
               onInputText={this.onInputText}
               onSubmit={this.onSubmit}
               onCancel={this.onCancel}
               text={this.state.text}
            />
         </View>
      );
   }
}

export default Note;

const styles = {
   containerStyle: {
      marginHorizontal: 0
   },
   loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF'
   },
   cardTitle: {
      fontFamily: appFont,
      fontWeight: '100',
      fontSize: 16
   },
   btnShowMore: {
      alignSelf: 'center',
      height: 30
   },
   textShowMore: {
      fontFamily: appFont,
      color: appColor
   },
   noNoteText: {
      fontFamily: appFont,
      alignSelf: 'center',
      marginBottom: 15
   }
};
