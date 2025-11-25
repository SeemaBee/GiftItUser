import { StyleSheet } from 'react-native';
import { colors } from '../../../../utils/colors';
import { moderateScale } from 'react-native-size-matters';
import { Fonts } from '../../../../utils/fonts';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export const getStyles = () => {
  const bottomTabHeight = useBottomTabBarHeight();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    contentContainer: {
      paddingBottom: bottomTabHeight - moderateScale(10),
    },
    imagesContainer: {
      backgroundColor: colors.inputBackground,
      height: moderateScale(350),
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: moderateScale(10),
    },
    imageRow: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    heartBox: {
      width: moderateScale(35),
      height: moderateScale(35),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
      borderRadius: moderateScale(20),
    },
    image: {
      width: moderateScale(250),
      height: moderateScale(250),
    },
    thumbnailContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 12,
      padding: moderateScale(5),
      backgroundColor: colors.white,
      borderRadius: moderateScale(10),
    },
    thumbnail: {
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: moderateScale(8),
    },
    selectedThumbnail: {
      borderWidth: moderateScale(2),
      borderColor: colors.primary,
    },
    thumbnailImage: {
      width: '100%',
      height: '100%',
      borderRadius: moderateScale(6),
    },
    detailContainer: {
      flex: 1,
      padding: moderateScale(20),
      backgroundColor: colors.white,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    simpleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    productName: {
      fontSize: Fonts.titleLarge,
      fontFamily: Fonts.SatisfyRegular,
    },
    ratingText: {
      color: colors.grey6,
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
    divider: {
      width: '100%',
      height: moderateScale(1),
      backgroundColor: colors.grey7,
      marginVertical: moderateScale(15),
    },
    selectColorText: {
      fontFamily: Fonts.PoppinsSemiBold,
      fontSize: Fonts.smallText,
    },
    colorDot: {
      width: moderateScale(20),
      height: moderateScale(20),
      borderRadius: moderateScale(20),
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedColorDot: {
      width: moderateScale(10),
      height: moderateScale(10),
      borderRadius: moderateScale(10),
      backgroundColor: colors.white,
    },
    colorDescText: {
      fontSize: Fonts.smallText,
      color: colors.grey2,
    },
    selectDateText: {
      fontFamily: Fonts.PoppinsMedium,
      fontSize: Fonts.smallText,
    },
    dateTimeText: {
      fontSize: Fonts.smallText,
      color: colors.grey2,
      marginRight: moderateScale(20),
      marginLeft: moderateScale(5),
    },
    counterContainer: {
      width: '30%',
      height: moderateScale(50),
      borderRadius: moderateScale(50),
      backgroundColor: colors.inputBackground,
      paddingHorizontal: moderateScale(10),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    countText: {
      fontSize: Fonts.largeText,
      fontFamily: Fonts.PoppinsMedium,
    },
    buttonStyle: {
      width: '65%',
      height: moderateScale(50),
      marginTop: 0,
    },
  });
};
