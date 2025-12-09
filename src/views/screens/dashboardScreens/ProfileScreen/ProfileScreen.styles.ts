import { StyleSheet } from "react-native";
import { colors } from "../../../../utils/colors";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { moderateScale } from "react-native-size-matters";
import { Fonts } from "../../../../utils/fonts";

export const getStyles = () => {
  const bottomTabHeight = useBottomTabBarHeight();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingTop: moderateScale(30),
      paddingHorizontal: moderateScale(30),
      paddingBottom: bottomTabHeight - moderateScale(30),
    },
    headerTitle: {
      fontSize: Fonts.headingSmall,
      fontFamily: Fonts.SatisfyRegular,
      marginBottom: moderateScale(15),
    },
    content: {
      flex: 1,
    },
    profileImageContainer: {
      alignItems: "center",
      marginTop: moderateScale(20),
      marginBottom: moderateScale(40),
    },
    profileImageWrapper: {
      position: "relative",
    },
    profileImage: {
      width: moderateScale(140),
      height: moderateScale(140),
      borderRadius: moderateScale(70),
      backgroundColor: colors.grey4,
    },
    cameraIconContainer: {
      position: "absolute",
      bottom: moderateScale(5),
      right: moderateScale(5),
      width: moderateScale(36),
      height: moderateScale(36),
      borderRadius: moderateScale(18),
      backgroundColor: colors.secondary,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: moderateScale(3),
      borderColor: colors.white,
    },
    fieldContainer: {
      flexDirection: "row",
      marginBottom: moderateScale(28),
    },
    label: {
      width: "40%",
      fontSize: Fonts.text,
      color: colors.grey6,
    },
    value: {
      fontSize: Fonts.text,
      color: colors.black,
    },
    link: {
      fontSize: Fonts.extraSmallText,
      color: colors.secondary,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: moderateScale(20),
      marginBottom: moderateScale(20),
    },
    footerLink: {
      fontSize: Fonts.smallText,
      color: colors.secondary,
    },
    footerSeparator: {
      fontSize: Fonts.smallText,
      color: colors.divider,
      marginHorizontal: moderateScale(12),
    },
  });
};
