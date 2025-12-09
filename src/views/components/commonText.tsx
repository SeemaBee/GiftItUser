import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { Fonts } from "../../utils/fonts";
import { colors } from "../../utils/colors";

type Props = {
  style?: StyleProp<TextStyle>;
  children: ReactNode;
  onTextPress?: () => void;
  numberOfLines?: number;
};

const CommonText = ({ style, children, onTextPress, numberOfLines }: Props) => {
  return (
    <Text
      allowFontScaling={false}
      style={[styles.text, style]}
      onPress={onTextPress}
      ellipsizeMode="tail"
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: Fonts.smallText,
    color: colors.black,
    fontFamily: Fonts.PoppinsRegular,
  },
});

export default CommonText;
