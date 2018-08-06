import React, { Component } from 'react';
import {
   View,
   StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { Loading, LineConnectionFail } from '@components';

StatusBar.setBackgroundColor('transparent');
StatusBar.setTranslucent(true);

class Container extends Component {
   render() {
      return (
         <View style={styles.container}>
            <Loading isVisible={this.props.isLoading} />
            <LineConnectionFail show={this.props.isConnected} />
            {this.props.children} 
         </View>
      );
   }
}

const mapStateToProps = ({ app }) => ({
   isLoading: app.isLoading,
   isConnected: app.isConnected
});

export default connect(mapStateToProps)(Container);

const styles = {
   container: {
      flex: 1
   }
};

