import React from 'react';
import {
   View,
   FlatList
} from 'react-native';
import SearchListItem from './SearchListItem';

const SearchList = props => (
   <View style={styles.container}>
      <FlatList
         data={props.data}
         keyExtractor={item => item.id}
         renderItem={({ item }) => (
            <SearchListItem
               book={item}
               onSelect={props.onSelect}
            />
         )}
      />
   </View>
);

export default SearchList;

const styles = {
   container: {
      zIndex: 10,
      backgroundColor: '#FFF',
      width: '100%'
   }
};
