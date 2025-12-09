import { Keyboard, TextInput, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { styles } from "./ResetPassword.styles";
import { ChevronLeft } from "lucide-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AllNavParamList } from "../../../../navigation/AllNavParamList";
import Container from "../../../components/container";
import CommonText from "../../../components/commonText";
import CustomTextInput from "../../../components/customInput";
import CommonButton from "../../../components/commonButton";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../../../../utils/colors";
import { passwordRegex } from "../../../../utils/regex";
import Loader from "../../../components/loader";
import { resetPasswordApi } from "../../../../api/auth/authAPI";
import { userType } from "../../../../utils/constants";
import { CommonActions, RouteProp } from "@react-navigation/native";
import Toast from "react-native-simple-toast";

type NavigationProp = NativeStackNavigationProp<
  AllNavParamList,
  "ResetPassword"
>;

type Props = {
  navigation: NavigationProp;
  route: RouteProp<AllNavParamList, "ResetPassword">;
};

const ResetPassword = ({ navigation, route }: Props) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassErr, setNewPassErr] = useState("");
  const [confirmPassErr, setConfirmPassErr] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const email = route.params.email;

  const confirmPassRef = useRef<TextInput>(null);

  const handleChangePassword = async () => {
    Keyboard.dismiss();
    let hasErr = false;
    if (newPassword.trim() === "") {
      hasErr = true;
      setNewPassErr("Required");
    } else if (!passwordRegex.test(newPassword.trim())) {
      hasErr = true;
      setNewPassErr(
        "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character."
      );
    }
    if (confirmPassword.trim() === "") {
      hasErr = true;
      setConfirmPassErr("Required");
    }
    if (newPassword != confirmPassword) {
      hasErr = true;
      setConfirmPassErr("Passwords did not match.");
    }
    if (!hasErr) {
      setShowLoader(true);
      try {
        const response = await resetPasswordApi(email, newPassword, userType);
        if (response?.success) {
          Toast.showWithGravity("Password changed.", Toast.LONG, Toast.BOTTOM);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Onboarding" }],
            })
          );
        }
      } catch (error: any) {
        Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
      } finally {
        setShowLoader(false);
      }
    }
  };

  return (
    <Container contentStyle={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft
            size={moderateScale(30)}
            color={colors.black}
            strokeWidth={2}
          />
        </TouchableOpacity>
        <CommonText style={styles.title}>Reset Password</CommonText>
      </View>
      <CustomTextInput
        label="Enter New Password"
        placeholder="xxxxxxxxxx"
        value={newPassword}
        onChangeText={(text) => {
          setNewPassword(text);
          setNewPassErr("");
        }}
        secureTextEntry={true}
        onSubmitEditing={() => confirmPassRef.current?.focus()}
        returnKeyType="next"
        error={newPassErr}
      />
      <CustomTextInput
        ref={confirmPassRef}
        label="Confirm Password"
        placeholder="xxxxxxxxxx"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          setConfirmPassErr("");
        }}
        secureTextEntry={true}
        returnKeyType="done"
        error={confirmPassErr}
      />
      <CommonButton
        label="Change Password"
        onPress={() => handleChangePassword()}
        fullWidth={true}
      />
      {showLoader && <Loader show={showLoader} />}
    </Container>
  );
};

export default ResetPassword;
