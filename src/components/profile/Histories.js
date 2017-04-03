import React, { PureComponent, PropTypes } from 'react';
import {
  View,
  Text, 
  StyleSheet
} from 'react-native';
 
import { 
  styles,
  metrics,  
} from '../../themes';
import HistoryItem from './HistoryItem';

export default class Histories extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
  };
  
  static defaultProps = {
    type: 'amount'
  };

  render() {
    const { user } = this.props;
    return (
      user.donation_attributes ?
      <View style={[
          styles.screen.mainContainer,
        ]}
      >  
        {
         user.donation_attributes.map((donation,key) => 
           <HistoryItem
             key={key}
             title={donation.cause_name}
             date={donation.created_at}
             price={(this.props.type === 'amount' ? donation.amount : donation.donation) + " €"}
             isLast={(user.donation_attributes.length-1 === key)}
           />
         )
        }              
      </View>
      :
      null
    );
  }
};
