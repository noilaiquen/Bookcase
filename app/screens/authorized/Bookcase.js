import React, { Component } from 'react';
import {
   View,
   FlatList,
   DeviceEventEmitter
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
   // HeaderBookcase,
   BookcaseListItem,
   BookcaseEmpty
} from '../../components';
import { appFont } from '../../config/constants';
import { 
   retrieveCollection,
   clearSearch,
   searchBook
} from '../../actions/Book';
// import imageHeader from '../../assets/header4.jpg';

class Bookcase extends Component {
   // static navigationOptions = props => ({
   //    header: <HeaderBookcase
   //       title="bookcase"   
   //       search
   //       imageBackground={imageHeader}
   //       {...props}
   //    />
   // });

   componentWillMount = () => {
      DeviceEventEmitter.addListener('refreshBookcase', () => this.props.fetchCollection());
   }

   componentDidMount = () => {
      this.props.fetchCollection();
   }

   componentWillUnmount = () => {
      DeviceEventEmitter.removeListener('refreshBookcase');
   }

   render() {
      const { 
         books, isLoading, fetchCollection, 
         booksSearch, isSearching, dispatch, onSearch
      } = this.props;

      return (
         <View style={styles.container}>
            {books.length === 0 ? (
               <BookcaseEmpty {...this.props} />
            ) : (
               <FlatList
                  ListHeaderComponent={
                     <SearchBar
                        onChangeText={text => onSearch(text)}
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
                  onRefresh={() => fetchCollection()}
                  keyboardShouldPersistTaps="always"
                  keyboardDismissMode="on-drag"
               />
            )} 
         </View>
      );
   }
}

const mapStateToProps = ({ book }) => ({
   books: book.books,
   isLoading: book.isLoading,
   booksSearch: book.booksSearch,
   isSearching: book.isSearching,
});

const mapDispatchToProps = dispatch => (
   bindActionCreators({ 
      fetchCollection: retrieveCollection,
      onSearch: searchBook
   }, dispatch)
);

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
