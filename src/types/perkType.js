
import PropTypes from 'prop-types';


import businessType from './businessType';
import categoryType from './categoryType';

export default PropTypes.shape({
  businesses: PropTypes.arrayOf(businessType),
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  flash: PropTypes.bool.isRequired,
  picture: PropTypes.string,
  offer: PropTypes.string,
  category: categoryType.string,
});
