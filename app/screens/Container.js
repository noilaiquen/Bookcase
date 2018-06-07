import React, { Component } from 'react';
import {
   View,
   StatusBar
} from 'react-native';
import { Loading, LineConnectionFail } from '../components';
import global from '../config/global';

StatusBar.setBackgroundColor('transparent');
StatusBar.setTranslucent(true);

export default class Container extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loadingIsVisible: false,
         isConnection: true
      };
      global.setLoadingVisible = this.setLoadingVisible.bind(this);
      global.setConnectionStatus = this.setConnectionStatus.bind(this);
   }

   setLoadingVisible = value => {
      this.setState({
         loadingIsVisible: value
      });
   }

   setConnectionStatus = () => {
      this.setState({
         isConnection: !this.state.isConnection
      });
   }

   render() {
      return (
         <View style={styles.container}>
            <Loading isVisible={this.state.loadingIsVisible} />
            <LineConnectionFail show={this.state.isConnection} />
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

