import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { boolean } from 'yup';
import CommonText from './commonText';
import { Check } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

type Props = {
  isSelected: boolean;
  onChange: () => void;
  label: string;
};

const CheckBox = ({ isSelected, onChange, label }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onChange()} activeOpacity={0.8}>
      <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
        {isSelected && <Check size={moderateScale(15)} color={colors.white} />}
      </View>
      <CommonText style={styles.labelText}>{label}</CommonText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(5),
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(8),
  },
  checkboxChecked: {
    backgroundColor: colors.secondary,
  },
  labelText: {
    fontSize: Fonts.extraSmallText,
    color: colors.black,
  },
});

export default CheckBox;
