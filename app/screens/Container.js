import React, { Component } from 'react';
import {
   View,
   StatusBar
} from 'react-native';
import Loading from '../components/Loading';
import global from '../config/global';

StatusBar.setBackgroundColor('transparent');
StatusBar.setTranslucent(true);

export default class Container extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loadingIsVisible: false
      };
      global.setLoadingVisible = this.setLoadingVisible.bind(this);
   }

   setLoadingVisible = value => {
      this.setState({
         loadingIsVisible: value
      });
   }

   render() {
      return (
         <View style={styles.container}>
            <Loading isVisible={this.state.loadingIsVisible} />
            {this.props.children}
         </View>
      );
   }
}

const styles = {
   container: {
      flex: 1
   }
};

