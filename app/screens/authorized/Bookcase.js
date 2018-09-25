import React, { Component } from 'react';
import {
   View,
   FlatList,
   DeviceEventEmitter
} from 'react-native';
import PropTypes from 'prop-types';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BookcaseListItem, BookcaseEmpty } from '../../components';
import { appFont } from '../../config/constants';
import { retrieveCollection, clearSearch, searchBook } from '../../actions/Book';

class Bookcase extends Component {
   componentWillMount = () => {
      const { actions } = this.props;
      DeviceEventEmitter.addListener('refreshBookcase', () => actions.retrieveCollection());
   }

   componentDidMount = () => {
      const { actions } = this.props;
      actions.retrieveCollection();
   }

   componentWillUnmount = () => {
      DeviceEventEmitter.removeListener('refreshBookcase');
   }

   render() {
      const { 
         books, isLoading, actions,
         booksSearch, isSearching, dispatch
      } = this.props;

      return (
         <View style={styles.container}>
            {books.length === 0 ? (
               <BookcaseEmpty {...this.props} />
            ) : (
               <FlatList
                  ListHeaderComponent={
                     <SearchBar
                        onChangeText={text => actions.searchBook(text)}
                        placeholder='Type Here...'
                        onClear={() => dispatch(clearSearch)}
                        clearIcon={{ type: 'font-awesome', name: 'cancel' }}
                        containerStyle={styles.inputSearchContainer}
                        inputStyle={styles.inputSearch}
                     />
                  }
                  data={isSearching ? booksSearch : books}
                  keyExtractor={(item) => item._id}  //eslint-disable-line
                  renderItem={({ item }) => (
                     <BookcaseListItem book={item} {...this.props} />
                  )}
                  refreshing={isLoading}
                  onRefresh={() => actions.retrieveCollection()}
                  keyboardShouldPersistTaps="always"
                  keyboardDismissMode="on-drag"
               />
            )} 
         </View>
      );
   }
}

Bookcase.propTypes = {
   books: PropTypes.array.isRequired,
   booksSearch: PropTypes.array.isRequired,
   isLoading: PropTypes.bool.isRequired,
   isSearching: PropTypes.bool.isRequired,
   actions: PropTypes.objectOf(PropTypes.func)
};

const mapStateToProps = ({ book }) => ({
   books: book.books,
   isLoading: book.isLoading,
   booksSearch: book.booksSearch,
   isSearching: book.isSearching,
});

const mapDispatchToProps = dispatch => ({
   actions: bindActionCreators({
      retrieveCollection,
      searchBook
   }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Bookcase);

const styles = {
   container: {
      flex: 1,
      backgroundColor: '#FFF',
   },
   containerLoading: {
      flex: 1,
      backgroundColor: '#FFF',
      justifyContent: 'center',
      alignItems: 'center'
   },
   title: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
   },
   /* inputSearchContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      width: 320,
      borderTopWidth: 0,
      borderBottomWidth: 0
   },
   inputSearch: {
      backgroundColor: '#FFF',
      borderRadius: 5,
      color: '#273c75',
      fontFamily: appFont
   } */
   inputSearchContainer: {
      backgroundColor: 'rgba(0,0,0,0.10)',
      borderTopWidth: 0,
      borderBottomWidth: 0
   },
   inputSearch: {
      backgroundColor: '#FFF',
      borderRadius: 5,
      color: '#273c75',
      fontFamily: appFont
   }
};
