import React, { Component } from 'react';
import { BottomTabBar } from 'react-navigation-tabs';
import { connect } from 'react-redux';

class TabBarComponent extends Component {
   render() {
      return !this.props.isKeyboardShow ? <BottomTabBar {...this.props} /> : null;
   }
}

const mapStateToProps = ({ app }) => ({
   isKeyboardShow: app.isKeyboardShow
});

export default connect(mapStateToProps)(TabBarComponent);
