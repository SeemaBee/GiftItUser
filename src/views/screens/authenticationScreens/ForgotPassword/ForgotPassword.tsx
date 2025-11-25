import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { styles } from './ForgotPassword.styles';
import { ChevronLeft } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AllNavParamList } from '../../../../navigation/AllNavParamList';
import Container from '../../../components/container';
import CommonText from '../../../components/commonText';
import CustomTextInput from '../../../components/customInput';
import CommonButton from '../../../components/commonButton';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../../../../utils/colors';
import { emailRegex } from '../../../../utils/regex';
import { forgotPasswordApi } from '../../../../api/auth/authAPI';
import { userType } from '../../../../utils/constants';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/loader';

type NavigationProp = NativeStackNavigationProp<
  AllNavParamList,
  'ForgotPassword'
>;

type Props = {
  navigation: NavigationProp;
};

const ForgotPassword = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const handleContinue = async () => {
    let hasErr = false;
    if (email.trim() === '') {
      hasErr = true;
      setEmailError('Email is required');
    } else if (!emailRegex.test(email.trim())) {
      hasErr = true;
      setEmailError('Enter valid email');
    }
    if (!hasErr) {
      setShowLoader(true);
      try {
        let data = await forgotPasswordApi(email, userType);
        if (data) {
          navigation.navigate('VerifyOtp', {
            from: 'ForgotPassword',
            email: email,
          });
        }
      } catch (error: any) {
        Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
      } finally {
        setShowLoader(false);
      }
    }
  };
  return (
    <Container contentStyle={styles.contentStyle}>
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

        <CommonText style={styles.title}>Forgot Password</CommonText>
      </View>

      <CommonText style={styles.description}>
        Enter the registered email address and we'll send you OTP to reset your
        password.
      </CommonText>
      <CustomTextInput
        label="Email Address"
        style={styles.input}
        placeholder="abc@xyz.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={emailError}
        onSubmitEditing={() => handleContinue()}
      />
      <CommonButton
        label="Continue"
        onPress={() => handleContinue()}
        fullWidth={true}
      />
      {showLoader && <Loader show={showLoader} />}
    </Container>
  );
};

export default ForgotPassword;
