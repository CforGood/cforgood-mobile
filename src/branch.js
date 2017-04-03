// @flow
import React, { 
  PureComponent,
} from 'react';


import branch, {
  AddToWishlistEvent,
  PurchasedEvent,
  PurchaseInitiatedEvent,
  RegisterViewEvent,
  ShareCompletedEvent,
  ShareInitiatedEvent
} from 'react-native-branch';


class BranchIO extends PureComponent {
  
  async componentDidMount() {
    
    // Subscribe to incoming links (both Branch & non-Branch)
    // bundle = object with: {params, error, uri}
    branch.subscribe((bundle) => {
      if (bundle && bundle.params && !bundle.error) {
        // grab deep link data and route appropriately.
      }
    })

    //branch.setDebug();

    branch.userCompletedAction("signup");

    let lastParams = await branch.getLatestReferringParams(); // params from last open
    let installParams = await branch.getFirstReferringParams(); // params from original install
    branch.setIdentity('theUserId');
    branch.userCompletedAction('Purchased Item', {item: 123});
    branch.logout();

    let branchUniversalObject = await branch.createBranchUniversalObject('canonicalIdentifier', {
      automaticallyListOnSpotlight: true,
      metadata: {prop1: 'test', prop2: 'abc'},
      title: 'Cool Content!',
      contentDescription: 'Cool Content Description'})
    branchUniversalObject.userCompletedAction(RegisterViewEvent)
    //branchUniversalObject.userCompletedAction('Custom Action', { key: 'value' })//

    //let shareOptions = { messageHeader: 'Check this out', messageBody: 'No really, check this out!' }
    let linkProperties = { feature: 'share', channel: 'RNApp' }
    let controlParams = { $desktop_url: 'http://cforgood.com/', $ios_url: 'http://cforgood.com/ios', $android_url: 'http://cforgood.com/android' }
    //let {channel, completed, error} = await branchUniversalObject.showShareSheet(shareOptions, linkProperties, controlParams)
    let {url} = await branchUniversalObject.generateShortUrl(linkProperties, controlParams)
    let spotlightResult = await branchUniversalObject.listOnSpotlight()//

//    // optional: release native resources right away when finished with this BUO.
    branchUniversalObject.release()//

    //let rewards = await branch.loadRewards()
    //let redeemResult = await branch.redeemRewards(amount, bucket)
    //let creditHistory = await branch.getCreditHistory()

  }

  render () {
    return null
  }
};

export default BranchIO;
