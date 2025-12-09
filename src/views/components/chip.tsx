import { View, StyleSheet } from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../../utils/colors";
import CommonText from "./commonText";
import { Fonts } from "../../utils/fonts";

type Props = {
  label: string;
};

const Chip = ({ label }: Props) => {
  return (
    <View style={styles.container}>
      <CommonText style={styles.label}>{label}% OFF</CommonText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(13),
    backgroundColor: colors.topTabColor,
    borderRadius: moderateScale(50),
  },
  label: {
    fontSize: Fonts.miniText,
    fontFamily: Fonts.PoppinsSemiBold,
  },
});

export default Chip;
