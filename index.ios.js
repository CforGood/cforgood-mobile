
import { AppRegistry } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('CforGood', () => App);


/*

┌────────────┬───────────────────────────────────────┐
│ Name       │ Deployment Key                        │
├────────────┼───────────────────────────────────────┤
│ Production │ YoiPKcGXzVWIdUMB9nWuX-pBw6CGE1hsPAnnb │
├────────────┼───────────────────────────────────────┤
│ Staging    │ DK3F2dTBjEWN_vTZMc9ExMUYnCqRE1hsPAnnb │
└────────────┴───────────────────────────────────────┘

code-push release-react CforGood-IOS ios -m --description "update"
code-push promote CforGood-IOS Staging Production -r 100%
*/
