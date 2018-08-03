import React, { Component } from 'react';
import {
   View,
   FlatList,
   StatusBar,
   ActivityIndicator
} from 'react-native';
import { NoteListItem, HeaderLeft } from '../../components';
import { appColor, appTextColor } from '../../config/constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBookNotes } from '../../actions/Note';

class ListNote extends Component {
   componentDidMount() {
      const { bookId } = this.props.navigation.state.params;
      this.props.actions.fetchBookNotes(bookId);
   }

   render() {
      const { isLoading, notes } = this.props;
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

const mapStateToProps = ({ notes, isLoading }) => ({
   notes,
   isLoading
});

const mapDispatchToProps = dispatch => ({
   actions: bindActionCreators({
      fetchBookNotes
   }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ListNote);

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
