
import { PropTypes } from 'react';

export default PropTypes.shape({
  name: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  color: PropTypes.string.isRequired,
});
