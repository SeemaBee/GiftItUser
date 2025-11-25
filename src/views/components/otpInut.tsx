import React, { useMemo, useRef, useState } from 'react';
import {
  Keyboard,
  TextInput,
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../../utils/colors';
import { Fonts } from '../../utils/fonts';

type OTPInputProps = {
  onChange: (otp: string) => void;
};

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const OTPInput = ({ onChange }: OTPInputProps) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const inputs = Array.from({ length: 4 }, () => useRef<TextInput>(null));

  const handlePress = (keyValue: string, index: number): void => {
    const newOtp = [...otp];

    if (keyValue === 'Backspace') {
      if (newOtp[index] === '') {
        if (index > 0) inputs[index - 1].current?.focus();
      } else {
        newOtp[index] = '';
      }
    } else if (digits.includes(keyValue)) {
      newOtp[index] = keyValue;
      if (index < 3) {
        inputs[index + 1].current?.focus();
      } else {
        Keyboard.dismiss();
      }
    }

    setOtp(newOtp);
    otpMaker(newOtp);
  };

  const otpMaker = (otpArray: string[]) => {
    const isComplete = otpArray.every(digit => digit !== '');
    const otpStr = isComplete ? otpArray.join('') : '';
    onChange(otpStr);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={inputs[index]}
            style={styles.otpInput}
            maxLength={1}
            placeholder="X"
            placeholderTextColor={colors.placeholderText}
            keyboardType="number-pad"
            value={value}
            onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) =>
              handlePress(e.nativeEvent.key, index)
            }
            onSubmitEditing={() => Keyboard.dismiss()}
            submitBehavior="submit"
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    width: moderateScale(70),
    height: moderateScale(90),
    textAlign: 'center',
    fontSize: Fonts.title,
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: moderateScale(5),
    backgroundColor: colors.inputBackground,
    color: colors.black,
  },
  errorIcon: {
    alignItems: 'center',
    marginTop: moderateScale(8),
  },
});

export default OTPInput;
