import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { colors } from '../../../../utils/colors';
import { moderateScale } from 'react-native-size-matters';
import { Fonts } from '../../../../utils/fonts';

export const getStyles = () => {
  const bottomTabHeight = useBottomTabBarHeight();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingBottom: bottomTabHeight,
      paddingTop: moderateScale(20),
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: colors.white,
    },
    tab: {
      width: '50%',
      paddingVertical: moderateScale(12),
      borderBottomWidth: moderateScale(1),
      borderBottomColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeTab: {
      borderBottomColor: colors.primary,
    },
    inactiveTab: {
      borderBottomColor: colors.grey7,
    },
    tabText: {
      fontSize: Fonts.smallText,
      color: colors.grey6,
    },
    activeTabText: {
      color: colors.primary,
    },
    flx: {
      flex: 1,
    },
    subContainer: {
      padding: moderateScale(20),
    },
    card: {
      backgroundColor: colors.inputBackground,
      borderRadius: moderateScale(20),
    },
    productBox: {
      padding: moderateScale(20),
      flexDirection: 'row',
    },
    img: {
      width: moderateScale(80),
      height: moderateScale(80),
      marginRight: moderateScale(10),
    },
    productName: {
      fontFamily: Fonts.SatisfyRegular,
      fontSize: Fonts.title,
    },
    orderIDText: {
      fontSize: Fonts.smallText,
      color: colors.grey6,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    discountedPrice: {
      fontSize: Fonts.largeText,
      color: colors.black,
      fontFamily: Fonts.PoppinsSemiBold,
    },
    actualPrice: {
      fontSize: Fonts.smallText,
      fontFamily: Fonts.PoppinsMedium,
      textDecorationLine: 'line-through',
      color: colors.grey6,
    },
    trackBox: {
      backgroundColor: colors.primary,
      paddingHorizontal: moderateScale(8),
      paddingVertical: moderateScale(4),
      borderRadius: moderateScale(50),
    },
    trackText: {
      fontSize: Fonts.miniText,
      color: colors.secondary,
    },
    divider: {
      width: '100%',
      height: moderateScale(1),
      backgroundColor: colors.grey7,
    },
    buyerBox: {
      padding: moderateScale(20),
    },
    buyerTitle: {
      fontFamily: Fonts.PoppinsSemiBold,
      fontSize: Fonts.smallText,
    },
    buyerRow: {
      flexDirection: 'row',
    },
    buyerLabel: {
      width: '45%',
      fontSize: Fonts.smallText,
    },
    buyerValue: {
      width: '55%',
      fontSize: Fonts.smallText,
      fontFamily: Fonts.PoppinsMedium,
    },
  });
};
