import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './Login.styles';
import CommonText from '../../../components/commonText';
import CustomTextInput from '../../../components/customInput';
import CommonButton from '../../../components/commonButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AllNavParamList } from '../../../../navigation/AllNavParamList';
import { Check } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../../../../utils/colors';
import Container from '../../../components/container';
import { emailRegex } from '../../../../utils/regex';
import { loginApi, resendOtpApi } from '../../../../api/auth/authAPI';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../../../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/loader';
import { userType } from '../../../../utils/constants';

type NavigationProp = NativeStackNavigationProp<AllNavParamList, 'Login'>;

type Props = {
  navigation: NavigationProp;
};

const Login = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    fetchRemberData();
  }, []);

  const fetchRemberData = async () => {
    let data = await AsyncStorage.getItem('loginDetails');
    if (data) {
      setRememberMe(true);
      let loginData = JSON.parse(data);
      setEmail(loginData.email);
      setPassword(loginData.password);
    }
  };

  const passRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    Keyboard.dismiss();
    let hasErr = false;
    if (email.trim() == '') {
      hasErr = true;
      setEmailError('Required');
    } else if (!emailRegex.test(email.trim())) {
      hasErr = true;
      setEmailError('Invalid email');
    }
    if (password.trim() == '') {
      hasErr = true;
      setPasswordError('Required');
    }
    if (!hasErr) {
      setShowLoader(true);
      try {
        const data = await loginApi(email, password, userType);
        console.log('data - ', data.data.user_detail);
        if (data.data.user_detail.email_verified_at != null) {
          if (rememberMe) {
            let loginDetails = {
              email: email,
              password: password,
            };
            await AsyncStorage.setItem(
              'loginDetails',
              JSON.stringify(loginDetails),
            );
          } else {
            await AsyncStorage.removeItem('loginDetails');
          }
          dispatch(setUser(data.data.user_detail));
          dispatch(setToken(data.token));
          await AsyncStorage.setItem(
            'userData',
            JSON.stringify(data.data.user_detail),
          );
          await AsyncStorage.setItem('authToken', data.token);
          await AsyncStorage.setItem('loggedIn', JSON.stringify(true));
          Toast.showWithGravity('Logged In', Toast.LONG, Toast.BOTTOM);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            }),
          );
        } else {
          await resendOtpApi(email, userType);
          clearData();
          navigation.navigate('VerifyOtp', {
            from: 'login',
            email: email,
          });
        }
      } catch (err: any) {
        Toast.showWithGravity(err.message, Toast.LONG, Toast.BOTTOM);
      } finally {
        setShowLoader(false);
      }
    }
  };

  const clearData = () => {
    setEmail('');
    setEmailError('');
    setPassword('');
    setPasswordError('');
  };

  return (
    <Container contentStyle={styles.contentStyle}>
      <CommonText style={styles.title}> Login</CommonText>
      <CustomTextInput
        label="Email Address"
        placeholder="abc@xyz.com"
        value={email}
        onChangeText={text => {
          setEmail(text);
          setEmailError('');
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => passRef.current?.focus()}
        submitBehavior="submit"
        error={emailError}
      />
      <CustomTextInput
        ref={passRef}
        label="Password"
        placeholder="xxxxxxxxxxxx"
        value={password}
        onChangeText={text => {
          setPassword(text);
          setPasswordError('');
        }}
        secureTextEntry={true}
        returnKeyType="done"
        error={passwordError}
        onSubmitEditing={() => handleLogin()}
      />
      <View style={styles.optionsRow}>
        <TouchableOpacity
          style={styles.rememberMeContainer}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
            {rememberMe && (
              <Check size={moderateScale(15)} color={colors.white} />
            )}
          </View>
          <CommonText style={styles.rememberMeText}>Remember Me</CommonText>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            clearData();
            navigation.navigate('ForgotPassword');
          }}
        >
          <CommonText style={styles.forgotPassword}>
            Forgot Password?
          </CommonText>
        </TouchableOpacity>
      </View>
      <CommonButton
        label="Login"
        onPress={() => handleLogin()}
        fullWidth={true}
      />
      <View style={styles.registerContainer}>
        <CommonText style={styles.registerText}>
          Don't have an account?{' '}
        </CommonText>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            clearData();
            navigation.navigate('SignUp');
          }}
        >
          <CommonText style={styles.registerLink}>Register</CommonText>
        </TouchableOpacity>
      </View>
      {showLoader && <Loader show={showLoader} />}
    </Container>
  );
};

export default Login;
