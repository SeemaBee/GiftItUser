import React, { useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import CommonText from './commonText';
import { Fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';

type ButtonProps = {
  fullWidth?: boolean;
  label: string;
  icon?: string;
  onPress: () => void;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
};

const baseButtonStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.primary,
  borderRadius: moderateScale(50),
  marginTop: moderateScale(16),
  borderWidth: 1,
  borderColor: colors.primary,
};

const styles = StyleSheet.create({
  fullWidthStyle: {
    ...baseButtonStyle,
    width: '100%',
    height: moderateScale(50),
  },
  normalStyle: {
    ...baseButtonStyle,
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(8),
  },
  fullWidthLabel: {
    fontSize: Fonts.largeText,
    fontFamily: Fonts.PoppinsRegular,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  label: {
    fontSize: Fonts.smallText,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
  },
  disabledText: {
    color: colors.buttonText,
  },
});

const CommonButton: React.FC<ButtonProps> = ({
  fullWidth = false,
  label,
  onPress,
  disabled = false,
  buttonStyle,
  textStyle,
}) => {
  const containerStyle = useMemo(
    () => [
      fullWidth ? styles.fullWidthStyle : styles.normalStyle,
      disabled && styles.disabledButton,
      buttonStyle,
    ],
    [fullWidth, disabled, buttonStyle],
  );

  const labelStyle = useMemo(
    () => [
      fullWidth ? styles.fullWidthLabel : styles.label,
      disabled && styles.disabledText,
      textStyle,
    ],
    [fullWidth, disabled, textStyle],
  );

  return (
    <TouchableOpacity
      style={containerStyle}
      activeOpacity={0.8}
      onPress={disabled ? undefined : onPress}
    >
      <CommonText style={labelStyle}>{label}</CommonText>
    </TouchableOpacity>
  );
};

export default CommonButton;
