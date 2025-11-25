import React, { forwardRef, useCallback, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  KeyboardTypeOptions,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import CommonText from './commonText';
import { Fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { Eye, EyeOff } from 'lucide-react-native';

type CustomTextInputProps = {
  label: string;
  iconName?: string;
  value: string;
  onChangeText?: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  blurOnSubmit?: boolean;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCorrect?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?:
    | 'off'
    | 'name'
    | 'email'
    | 'username'
    | 'password'
    | 'tel'
    | 'street-address'
    | 'postal-code'
    | 'cc-number';
  error?: string;
  success?: boolean;
  onSubmit?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  readOnly?: boolean;
  boxStyle?: StyleProp<ViewStyle>;
} & Omit<TextInputProps, 'onChangeText'>;

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      label,
      iconName,
      value,
      onChangeText,
      keyboardType = 'default',
      editable = true,
      blurOnSubmit = false,
      placeholder = '',
      secureTextEntry = false,
      autoCorrect = true,
      autoCapitalize = 'none',
      autoComplete = 'off',
      error = '',
      onSubmit,
      multiline = false,
      numberOfLines,
      readOnly = false,
      boxStyle,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isSecure, setIsSecure] = useState(secureTextEntry);

    const toggleSecureEntry = useCallback(() => {
      setIsSecure(prev => !prev);
    }, []);

    return (
      <View style={[styles.inputGroup, boxStyle && boxStyle]}>
        <CommonText style={styles.label}>{label}</CommonText>

        <View style={styles.inputContainer}>
          {/* {iconName && (
            <Ionicons
              name={iconName}
              size={20}
              color={colors.placeholderText}
              style={styles.inputIcon}
            />
          )} */}
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            editable={editable}
            placeholder={placeholder}
            placeholderTextColor={colors.placeholderText}
            secureTextEntry={isSecure}
            autoCorrect={autoCorrect}
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
            multiline={multiline}
            readOnly={readOnly}
            numberOfLines={numberOfLines}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={onSubmit}
            style={[
              styles.input,
              multiline && styles.multilineInput,
              isFocused && { borderColor: colors.primary },
            ]}
            textAlignVertical={multiline ? 'top' : 'center'}
            {...props}
          />

          {secureTextEntry && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={toggleSecureEntry}
              style={styles.eyeIcon}
            >
              {isSecure ? (
                <Eye size={moderateScale(20)} color={colors.placeholderText} />
              ) : (
                <EyeOff
                  size={moderateScale(20)}
                  color={colors.placeholderText}
                />
              )}
            </TouchableOpacity>
          )}
        </View>

        {!!error && <CommonText style={styles.error}>{error}</CommonText>}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: moderateScale(10),
    width: '100%',
  },
  label: {
    fontSize: Fonts.text,
    marginBottom: moderateScale(8),
    color: colors.black,
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: moderateScale(25),
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: moderateScale(12),
  },
  inputIcon: {
    marginRight: moderateScale(10),
  },
  input: {
    flex: 1,
    fontSize: Fonts.smallText,
    fontFamily: Fonts.PoppinsRegular,
    color: colors.black,
    height: moderateScale(50),
    paddingRight: moderateScale(35),
  },
  multilineInput: {
    height: moderateScale(150),
    textAlignVertical: 'top',
  },
  eyeIcon: {
    padding: moderateScale(8),
  },
  error: {
    alignSelf: 'flex-end',
    color: colors.error,
    fontSize: Fonts.miniText,
    marginTop: moderateScale(4),
  },
});

export default CustomTextInput;
