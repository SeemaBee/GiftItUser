import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { moderateScale } from 'react-native-size-matters';
import CommonText from './commonText';
import { Fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { BellDot, ChevronLeft } from 'lucide-react-native';

type Props = {
  label: String;
  showBackButton: boolean;
  onBackPress?: () => void;
  showNotification?: boolean;
  onNotificationPress?: () => void;
};

const Header = ({
  label,
  showBackButton = false,
  onBackPress,
  showNotification = false,
  onNotificationPress,
}: Props) => {
  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onBackPress && onBackPress()}
        >
          <ChevronLeft color={colors.black} size={moderateScale(25)} />
        </TouchableOpacity>
      ) : null}
      <CommonText style={styles.label}> {label}</CommonText>
      {showNotification ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.notificationContainer}
          onPress={() => onNotificationPress && onNotificationPress()}
        >
          <BellDot size={moderateScale(25)} color={colors.white} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Fonts.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
  },
  label: {
    flex: 1,
    fontSize: Fonts.titleMedium,
    color: colors.black,
    fontFamily: Fonts.SatisfyRegular,
  },
  notificationContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
});

export default Header;
