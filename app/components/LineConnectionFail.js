import React, { Component } from 'react';
import {
   Text,
   Animated
} from 'react-native';
import { appFont } from '../config/constants';

class LineConnectionFail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         expanded: false,
         animation: new Animated.Value(0)
      };
   }

   shouldComponentUpdate(nextProps) {
      // console.log('current props: ', this.props);
      // console.log('nextProps ', nextProps);
      if (this.props.show !== nextProps.show) {
         this.toggle();
      }
      return false;
   }

   toggle = () => {
      const { expanded } = this.state;

      const initValue = expanded ? 25 : 0;
      const toValue = expanded ? 0 : 25;

      this.setState({
         expanded: !expanded
      }, () => {
         this.state.animation.setValue(initValue);
         Animated.timing(
            this.state.animation,
            {
               toValue,
               duration: 300
            }
         ).start();
      });
   }
   
   render() {
      return (
         <Animated.View style={[styles.container, { height: this.state.animation }]}>
            <Text style={styles.text}>No internet connection!</Text>
         </Animated.View>
      );
   }
}

export default LineConnectionFail;

const styles = {
   container: {
      // height: 25,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center'
   },
   text: {
      color: '#FFF',
      fontSize: 12,
      fontFamily: appFont
   }
};
