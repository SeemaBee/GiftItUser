import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../../../../utils/colors";

export const getStyles = () => {
  const bottomTabHeight = useBottomTabBarHeight();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingTop: moderateScale(10),
      paddingBottom: bottomTabHeight,
    },
    subContainer: {
      flex: 1,
      // paddingHorizontal: moderateScale(20),
    },
    emptyBox: {
      width: "100%",
      height: moderateScale(300),
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
