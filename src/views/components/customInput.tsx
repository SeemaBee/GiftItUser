import React, { forwardRef, useCallback, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  KeyboardTypeOptions,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import CommonText from "./commonText";
import { Fonts } from "../../utils/fonts";
import { colors } from "../../utils/colors";
import { Eye, EyeOff } from "lucide-react-native";

type CustomTextInputProps = {
  label: string;
  value: string;
  onChangeText?: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCorrect?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoComplete?:
    | "off"
    | "name"
    | "email"
    | "username"
    | "password"
    | "tel"
    | "street-address"
    | "postal-code"
    | "cc-number";
  error?: string;
  onSubmit?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  boxStyle?: StyleProp<ViewStyle>;
} & Omit<TextInputProps, "onChangeText">;

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      label,
      value,
      onChangeText,
      keyboardType = "default",
      editable = true,
      placeholder = "",
      secureTextEntry = false,
      autoCorrect = true,
      autoCapitalize = "none",
      autoComplete = "off",
      error = "",
      onSubmit,
      multiline = false,
      numberOfLines,
      boxStyle,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isSecure, setIsSecure] = useState(secureTextEntry);

    const toggleSecureEntry = useCallback(() => {
      setIsSecure((prev) => !prev);
    }, []);

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    return (
      <View style={[styles.inputGroup, boxStyle]}>
        <CommonText style={styles.label}>{label}</CommonText>

        <View
          style={[
            styles.inputContainer,
            isFocused && { borderColor: colors.primary },
          ]}
        >
          <TextInput
            key={isSecure ? "secure" : "normal"}
            textContentType="oneTimeCode"
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
            numberOfLines={numberOfLines}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmitEditing={onSubmit}
            style={[styles.input, multiline && styles.multilineInput]}
            textAlignVertical={multiline ? "top" : "center"}
            {...props}
          />

          {secureTextEntry && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={toggleSecureEntry}
              style={styles.eyeIcon}
            >
              {isSecure ? (
                <EyeOff
                  size={moderateScale(20)}
                  color={colors.placeholderText}
                />
              ) : (
                <Eye size={moderateScale(20)} color={colors.placeholderText} />
              )}
            </TouchableOpacity>
          )}
        </View>

        {!!error && <CommonText style={styles.error}>{error}</CommonText>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: moderateScale(12),
    width: "100%",
  },
  label: {
    fontSize: Fonts.text,
    marginBottom: moderateScale(6),
    color: colors.black,
    fontFamily: Fonts.PoppinsMedium,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
    borderRadius: moderateScale(25),
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: moderateScale(14),
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
    height: moderateScale(120),
  },
  eyeIcon: {
    padding: moderateScale(6),
  },
  error: {
    alignSelf: "flex-end",
    color: colors.error,
    fontSize: Fonts.miniText,
    marginTop: moderateScale(4),
    fontFamily: Fonts.PoppinsRegular,
  },
});

export default CustomTextInput;
