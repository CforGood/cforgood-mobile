import fonts from './fonts';
import metrics from './metrics';
import colors from './colors';
 
const Styles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: colors.white,
    },
    container: {
      flex: 1,
      backgroundColor: colors.transparent,
    },
    title: {
      color: colors.snow,
    },
    subtitle: {
      color: colors.snow,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  wrap: {
    alignItems: 'center',
    flexDirection:'row' , 
    flexWrap: 'wrap'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  end: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  circle: {
    height: metrics.icons.tiny,
    width: metrics.icons.tiny,
    borderRadius: metrics.icons.tiny/2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tinyImage: {
    height: metrics.images.tiny,
    width: metrics.images.tiny,
  },
  smallImage: {
    height: metrics.images.small,
    width: metrics.images.small, 
  },
  mediumImage: {
    height: metrics.images.medium,
    width: metrics.images.medium,
  },
  imageContain: {
    //resizeMode: 'contain',
    flex: 1,
  },
  imageCover: {
    resizeMode: 'cover',
    flex: 1
  } 
};

export default Styles;
