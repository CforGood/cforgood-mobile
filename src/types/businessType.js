
import {  } from 'react'; import PropTypes from 'prop-types';

import categoryType from './categoryType';
import perkType from './perkType';

export default PropTypes.shape({
//  geocoded_by: addressType.isRequired,
//  category: categoryType.isRequired,
  perks: PropTypes.arrayOf(perkType),
});
