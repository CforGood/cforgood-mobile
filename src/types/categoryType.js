
import {  } from 'react'; import PropTypes from 'prop-types';

export default PropTypes.shape({
  name: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  color: PropTypes.string.isRequired,
});
