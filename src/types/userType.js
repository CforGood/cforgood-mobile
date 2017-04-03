
import { PropTypes } from 'react';

export default PropTypes.shape({
  provider: PropTypes.string,
  uid: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string,
  token: PropTypes.string,
  token_expiry: PropTypes.string,
});
