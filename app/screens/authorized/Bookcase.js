import React, { Component } from 'react';
import {
   View,
   FlatList,
   DeviceEventEmitter
} from 'react-native';
import { HeaderBookcase, BookcaseListItem } from '../../components';
import { appFont } from '../../config/constants';
import { firebaseApp } from '../../config/firebaseConfig';
import global from '../../config/global';
import imageHeader from '../../assets/header4.jpg';

export default class Bookcase extends Component {
   static navigationOptions = props => ({
      header: <HeaderBookcase
      title="bookcase"   
      search
      imageBackground={imageHeader}
      {...props}
      />
   });
   
   constructor(props) {
      super(props);
      this.state = {
         books: [],
         booksSearch: [],
         isSearching: false,
         refreshing: true,
         textSearch: '',
         errorMessage: ''
      };
      this.ref = firebaseApp.database().ref('bookcase').child(global.user.uid);
      this.fetchBooks = this.fetchBooks.bind(this);
      this.onSearch = this.onSearch.bind(this);
   }

   componentWillMount = () => {
      DeviceEventEmitter.addListener('refreshBookcase', () => this.fetchBooks());
   }

   componentDidMount = () => {
      this.fetchBooks();
      this.props.navigation.setParams({
         onSearch: this.onSearch,
         onClearSearch: () => this.setState({ textSearch: '', isSearching: false })
      });
   }

   onSearch = text => {
      this.setState({
         textSearch: text,
         isSearching: true
      }, () => {
         const { books, textSearch } = this.state;
         const newData = books.filter(book => {
            const bookName = book.title.toUpperCase();
            const textSearchUpperCase = textSearch.toUpperCase();
            return bookName.indexOf(textSearchUpperCase) > -1;
         });
   
         this.setState({
            booksSearch: newData,
            isSearching: !!textSearch.length
         });
      });
   }

   fetchBooks = () => {
      this.setState({ refreshing: true });
      const books = [];
      this.ref.once('value').then(snapshot => {
         snapshot.forEach(childSnapshot => {
            books.push({
               _id: childSnapshot.key,
               title: childSnapshot.val().title,
               author: childSnapshot.val().author,
               rating: childSnapshot.val().rating,
               page: childSnapshot.val().page,
               is_finished: childSnapshot.val().is_finished,
               date_finished: childSnapshot.val().date_finished,
               thumbnail: childSnapshot.val().thumbnail,
            });
         });
         this.setState({ books, refreshing: false });
      })
         .catch(() => this.setState({ refreshing: false }));
   }

   render() {
      const { books, booksSearch, refreshing, isSearching } = this.state;
      return (
         <View style={styles.container}>
            <FlatList
               data={isSearching ? booksSearch : books}
               keyExtractor={(item) => item._id}  //eslint-disable-line
               renderItem={({ item }) => (
                  <BookcaseListItem book={item} {...this.props} />
               )}
               refreshing={refreshing}
               onRefresh={this.fetchBooks}
               keyboardShouldPersistTaps="always"
               keyboardDismissMode="on-drag"
            />
         </View>
      );
   }
}

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
   inputSearchContainer: {
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
   }
};
