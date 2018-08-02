import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { NoteForm, NoteListItem } from './index';
import { firebaseApp } from '../config/firebaseConfig';
import { appTextColor, appFont, appColor } from '../config/constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
   toggleFormNote,
   fetchBookNotes,
   addBookNote
} from '../actions/Note';

class Note extends Component {
   constructor(props) {
      super(props);
      this.state = {
         text: '',
      };
      this.ref = firebaseApp.database().ref('notes');
      this.onShowForm = this.onShowForm.bind(this);
      this.onInputText = this.onInputText.bind(this);
      this.onCancel = this.onCancel.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
   }

   componentDidMount() {
      const { bookId, actions } = this.props;
      actions.fetchBookNotes(bookId);
   }

   onShowForm() {
      this.props.actions.toggleFormNote();
   }

   onInputText(text) {
      this.setState({ text });
   }

   onCancel() {
      this.setState({ text: '' }, () => this.props.actions.toggleFormNote());
   }

   onSubmit = async () => {
      const { bookId, actions } = this.props;
      const { text } = this.state;
      actions.addBookNote(text, bookId);
   }
   
   render() {
      const { notes, isLoading, isError } = this.props;
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
               isShow={this.props.showForm}
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

const mapStateToProps = ({ note }) => ({
   notes: note.notes,
   isLoading: note.isLoading,
   isError: note.isError,
   showForm: note.showForm
});

const mapDispatchToProps = dispatch => ({
   actions: bindActionCreators({
      fetchBookNotes,
      toggleFormNote,
      addBookNote
   }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);

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
