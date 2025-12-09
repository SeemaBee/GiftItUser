import { Dimensions, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Fonts } from "../../../../utils/fonts";
import { colors } from "../../../../utils/colors";

const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(30),
    paddingTop: moderateScale(30),
    paddingBottom: moderateScale(60),
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: moderateScale(50),
  },
  title: {
    fontSize: moderateScale(36),
    fontFamily: Fonts.SatisfyRegular,
    color: colors.black,
    marginLeft: moderateScale(15),
  },
});
