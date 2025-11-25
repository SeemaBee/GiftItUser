import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { moderateScale } from 'react-native-size-matters';
import CommonText from './commonText';
import { Fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';

export interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  data: DropdownItem[];
  initialValue: DropdownItem | null;
  placeHolderText: string;
  onSelect: (val: string | null) => void;
  error?: string;
}

const CommonDropDown = ({
  label,
  data,
  initialValue,
  placeHolderText,
  onSelect,
  error = '',
}: DropdownProps) => {
  const [value, setValue] = useState<DropdownItem | null>(null);

  useEffect(() => {
    if (initialValue !== null) {
      setValue(initialValue);
    }
  }, [initialValue]);

  function renderItem(item: DropdownItem) {
    return (
      <View style={styles.optionTile}>
        <CommonText style={styles.optionText}>{item.label}</CommonText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CommonText style={styles.label}>{label}</CommonText>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.optionText}
        containerStyle={{ borderRadius: moderateScale(10) }}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeHolderText}
        value={value}
        onChange={item => {
          setValue(item);
          onSelect(item.value);
        }}
        // renderLeftIcon={() =>
        //   leadingIcon ? (
        //     <Ionicons name={leadingIcon} style={styles.inputIcon} />
        //   ) : null
        // }
        renderItem={val => {
          return renderItem(val);
        }}
      />
      {!!error && <CommonText style={styles.error}>{error}</CommonText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: moderateScale(15),
  },
  label: {
    fontSize: Fonts.text,
    marginBottom: moderateScale(6),
    color: colors.black,
    letterSpacing: 0,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: moderateScale(25),
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: moderateScale(12),
    height: moderateScale(50),
  },
  inputIcon: {
    marginRight: moderateScale(10),
    fontSize: moderateScale(20),
    color: colors.placeholderText,
  },
  placeholderStyle: {
    color: colors.placeholderText,
    fontSize: moderateScale(14),
  },
  optionTile: {
    flexDirection: 'row',
    padding: moderateScale(5),
  },
  optionText: {
    fontSize: Fonts.smallText,
    letterSpacing: 0,
  },
  error: {
    alignSelf: 'flex-end',
    color: colors.error,
    fontSize: Fonts.miniText,
    marginTop: moderateScale(4),
  },
});

export default CommonDropDown;
