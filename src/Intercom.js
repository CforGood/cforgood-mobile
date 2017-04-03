// @flow
import React, { 
  PureComponent,
} from 'react';

import { connect } from 'react-redux';
import IntercomRN from 'react-native-intercom';


class Intercom extends PureComponent {
  
  componentDidMount() {
    if(this.props.user !== null){
      this.registerIdentifiedUser(this.props.user);
    }

    IntercomRN.addEventListener(IntercomRN.Notifications.UNREAD_COUNT, this._onUnreadChange)
    
  }
  
  componentWillMount(){
    //IntercomRN.displayMessageComposer();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user !== null && this.props.user === null){
      this.registerIdentifiedUser(nextProps.user);
    }
  }

  componentWillUnmount() {
    IntercomRN.removeEventListener(IntercomRN.Notifications.UNREAD_COUNT, this._onUnreadChange);
  }

  _onUnreadChange = ({ count }) => {
    //...
  }

  registerIdentifiedUser(user) {
    //alert(JSON.stringify(user))
    IntercomRN.registerIdentifiedUser({ userId: String(user.id) })
    .then(() => {
      console.log('registerIdentifiedUser done');

      return IntercomRN.updateUser({
        email: user.email,
        name: user.name ,
      });
    })
    .catch((err) => {
      console.log('registerIdentifiedUser ERROR', err);
    });
  }

  componnentWillMount(){
    IntercomRN.logEvent('viewed_screen', { extra: 'metadata' });
  }

  render () {
    return null
  }
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.user.data
});


export default connect(mapStateToProps)(Intercom);
