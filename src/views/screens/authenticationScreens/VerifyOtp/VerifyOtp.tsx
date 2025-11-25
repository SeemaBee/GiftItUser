import { View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './VerifyOtp.styles';
import { ChevronLeft } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AllNavParamList } from '../../../../navigation/AllNavParamList';
import Container from '../../../components/container';
import CommonText from '../../../components/commonText';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../../../../utils/colors';
import CommonButton from '../../../components/commonButton';
import OTPInput from '../../../components/otpInut';
import { CommonActions, RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken, setUser } from '../../../../store/slices/authSlice';
import { verifyOtpApi } from '../../../../api/auth/authAPI';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/loader';
import { userType } from '../../../../utils/constants';

type NavigationProp = NativeStackNavigationProp<AllNavParamList, 'VerifyOtp'>;

type Props = {
  navigation: NavigationProp;
  route: RouteProp<AllNavParamList, 'VerifyOtp'>;
};

const VerifyOtp = ({ navigation, route }: Props) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const email = route.params.email;

  const [secondsLeft, setSecondsLeft] = useState(30);
  const [showResend, setShowResend] = useState(false);

  const handleVerify = async () => {
    if (otp === '') {
      setOtpError('Required');
    } else if (otp.length < 4) {
      setOtpError('Otp should be of 6 digit');
    } else {
      const from = route.params.from;
      setShowLoader(true);
      try {
        const data = await verifyOtpApi(email, otp, userType);
        console.log('data - ', data);
        dispatch(setToken(data.token));
        await AsyncStorage.setItem('authToken', data.token);
        if (from == 'SignUp' || from === 'login') {
          AsyncStorage.setItem('loggedIn', JSON.stringify(true));
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            }),
          );
        } else {
          navigation.navigate('ResetPassword', { email: email });
        }
      } catch (error: any) {
        Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
      } finally {
        setShowLoader(false);
      }
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (secondsLeft > 0) {
      timer = setTimeout(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else {
      setShowResend(true);
    }

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleResend = () => {
    setSecondsLeft(30);
    setShowResend(false);
  };

  return (
    <Container contentStyle={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.pop()}>
          <ChevronLeft
            size={moderateScale(30)}
            color={colors.black}
            strokeWidth={2}
          />
        </TouchableOpacity>
        <CommonText style={styles.title}>Verify Otp</CommonText>
      </View>
      <CommonText style={styles.description}>
        Code has been send to your email.
      </CommonText>
      <OTPInput
        onChange={otp => {
          setOtp(otp);
          setOtpError('');
        }}
      />
      <View style={styles.errorBox}>
        <CommonText style={styles.error}>{otpError}</CommonText>
      </View>
      {showResend ? (
        <View style={styles.resendBox}>
          <CommonText style={styles.resendText}>
            Didn’t receive the code?{' '}
          </CommonText>
          <CommonText
            onTextPress={() => handleResend()}
            style={styles.linkText}
          >
            Resend Code
          </CommonText>
        </View>
      ) : (
        <View style={styles.resendBox}>
          <CommonText style={styles.resendText}>
            Resend code in {secondsLeft} Sec...
          </CommonText>
        </View>
      )}
      <CommonButton
        label="Verify"
        onPress={() => handleVerify()}
        fullWidth={true}
      />
      {showLoader && <Loader show={showLoader} />}
    </Container>
  );
};

export default VerifyOtp;
