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

type OutlineButtonProps = {
  fullWidth?: boolean;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  borderColor?: string;
  textColor?: string;
};

const baseButtonStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: moderateScale(50),
  marginTop: moderateScale(16),
  borderWidth: 1.5,
  paddingVertical: moderateScale(10),
  paddingHorizontal: moderateScale(16),
  backgroundColor: 'transparent',
};

const styles = StyleSheet.create({
  fullWidthStyle: {
    ...baseButtonStyle,
    width: '100%',
    height: moderateScale(50),
  },
  normalStyle: {
    ...baseButtonStyle,
  },
  fullWidthLabel: {
    fontSize: Fonts.largeText,
    fontFamily: Fonts.PoppinsMedium,
  },
  label: {
    fontSize: Fonts.smallText,
    fontFamily: Fonts.PoppinsMedium,
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    color: colors.disabled,
  },
});

const CommonOutlineButton: React.FC<OutlineButtonProps> = ({
  fullWidth = false,
  label,
  onPress,
  disabled = false,
  buttonStyle,
  textStyle,
  borderColor = colors.primary,
  textColor = colors.primary,
}) => {
  const containerStyle = useMemo(
    () => [
      fullWidth ? styles.fullWidthStyle : styles.normalStyle,
      { borderColor },
      disabled && styles.disabledButton,
      buttonStyle,
    ],
    [fullWidth, borderColor, disabled, buttonStyle],
  );

  const labelStyle = useMemo(
    () => [
      fullWidth ? styles.fullWidthLabel : styles.label,
      { color: textColor },
      disabled && styles.disabledText,
      textStyle,
    ],
    [fullWidth, textColor, disabled, textStyle],
  );

  return (
    <TouchableOpacity
      style={containerStyle}
      activeOpacity={0.85}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <CommonText style={labelStyle}>{label}</CommonText>
    </TouchableOpacity>
  );
};

export default CommonOutlineButton;
