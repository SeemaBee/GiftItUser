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
      paddingBottom: bottomTabHeight - moderateScale(30),
    },
    contentStyle: {
      paddingHorizontal: moderateScale(30),
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
      borderWidth: moderateScale(1),
      borderColor: colors.white,
    },
  });
};
