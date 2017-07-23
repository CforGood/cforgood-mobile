
import {  } from 'react'; import PropTypes from 'prop-types';

import perkType from './perkType';
import userType from './userType';

export default PropTypes.shape({
  user: userType.isRequired,
  perk: perkType.isRequired,
});
