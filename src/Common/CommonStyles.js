import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors} from '../constants/Colors';

const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingTitle: {
    fontWeight: '500',
    color: Colors.blackColor,
    fontSize: wp('10%'),
  },
  buttonText5: {
    fontWeight: '500',
    color: Colors.whiteColor,
    fontSize: wp('5%'),
  },
  paddingTop20: {paddingTop: wp('20%')},
  marginTop10: {marginTop: wp('10%')},
  marginTop7: {marginTop: wp('7%')},
  marginTop5: {marginTop: wp('5%')},
  inputField: {
    borderBottomWidth: 1,
    borderColor: Colors.blackColor,
    width: wp('80%'),
    fontSize: wp('4.5%'),
  },
  inputFieldHeading: {
    color: Colors.blackColor,
    fontWeight: '400',
    fontSize: wp('4%'),
    paddingBottom: wp('1%'),
  },
  //loader style
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 185, 255, 0.05)', // Semi-transparent black
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    flex: 1,
  },
  logoContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  logoContainer: {
    width: wp('10%'),
    height: wp('10%'),
  },
});

export default CommonStyles;
