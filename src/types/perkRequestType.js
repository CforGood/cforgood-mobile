
import { PropTypes } from 'react';

import perkType from './perkType';
import userType from './userType';

export default PropTypes.shape({
  user: userType.isRequired,
  perk: perkType.isRequired,
});
