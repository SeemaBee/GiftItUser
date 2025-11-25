import { useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
} from 'react-native';
import { Camera, CircleUserRound } from 'lucide-react-native';
import { styles } from './SignUp.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AllNavParamList } from '../../../../navigation/AllNavParamList';
import CommonText from '../../../components/commonText';
import CustomTextInput from '../../../components/customInput';
import CommonButton from '../../../components/commonButton';
import Container from '../../../components/container';
import { colors } from '../../../../utils/colors';
import { moderateScale } from 'react-native-size-matters';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { nameRegex, passwordRegex, phoneRegex } from '../../../../utils/regex';
import { userType } from '../../../../utils/constants';
import { signUpApi } from '../../../../api/auth/authAPI';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../store/slices/authSlice';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/loader';

type NavigationProp = NativeStackNavigationProp<AllNavParamList, 'SignUp'>;

type Props = {
  navigation: NavigationProp;
};

const SignUpValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .matches(nameRegex, 'Enter valid name')
    .required('Full Name is required'),

  phoneNumber: Yup.string()
    .matches(phoneRegex, 'Enter a valid phone number')
    .required('Phone Number is required'),

  email: Yup.string()
    .email('Enter a valid email')
    .required('Email Address is required'),

  password: Yup.string()
    .matches(
      passwordRegex,
      'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
    )
    .required('Password is required'),

  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),

  profileImage: Yup.string().nullable(),
});

const SignUp = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passRef = useRef<TextInput>(null);
  const confirmPassRef = useRef<TextInput>(null);
  const [showLoader, setShowLoader] = useState(false);

  const handleImagePicker = () => {};

  const handleFormSubmit = async (values: any, actions: any) => {
    Keyboard.dismiss();
    setShowLoader(true);
    try {
      const response = await signUpApi(
        values.fullName,
        values.email,
        values.phoneNumber,
        values.password,
        '+91',
        userType,
      );
      console.log('data - ', response);

      if (response) {
        actions.resetForm();
        dispatch(setUser(response.data.user_detail));
        AsyncStorage.setItem(
          'userData',
          JSON.stringify(response.data.user_detail),
        );
        navigation.navigate('VerifyOtp', {
          from: 'SignUp',
          email: values.email,
        });
      }
    } catch (error: any) {
      Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <Container contentStyle={styles.contentStyle}>
      <CommonText style={styles.title}>Register</CommonText>
      <Formik
        initialValues={{
          fullName: '',
          phoneNumber: '',
          email: '',
          password: '',
          confirmPassword: '',
          profileImage: null,
        }}
        validationSchema={SignUpValidationSchema}
        onSubmit={(values, actions) => handleFormSubmit(values, actions)}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                {values.profileImage ? (
                  <Image
                    source={{ uri: values.profileImage }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <CircleUserRound
                      color={colors.white}
                      size={moderateScale(160)}
                      strokeWidth={0.5}
                    />
                  </View>
                )}
              </View>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={handleImagePicker}
              >
                <Camera size={20} color={colors.white} />
              </TouchableOpacity>
            </View>

            <CustomTextInput
              label="Full Name"
              placeholder="Peter Smith"
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              autoCapitalize="words"
              onSubmitEditing={() => phoneRef.current?.focus()}
              error={touched.fullName ? errors.fullName : undefined}
              returnKeyType="next"
              submitBehavior="submit"
            />
            <CustomTextInput
              ref={phoneRef}
              label="Phone Number"
              placeholder="+1 123 (456)7890"
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              keyboardType="phone-pad"
              onSubmitEditing={() => emailRef.current?.focus()}
              error={touched.phoneNumber ? errors.phoneNumber : undefined}
              returnKeyType="next"
              submitBehavior="submit"
              maxLength={10}
            />
            <CustomTextInput
              ref={emailRef}
              label="Email Address"
              placeholder="info@petersmith.com"
              value={values.email}
              onChangeText={handleChange('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              onSubmitEditing={() => passRef.current?.focus()}
              error={touched.email ? errors.email : undefined}
              returnKeyType="next"
              submitBehavior="submit"
            />
            <CustomTextInput
              ref={passRef}
              label="Password"
              placeholder="xxxxxxxxxxxx"
              value={values.password}
              onChangeText={handleChange('password')}
              onSubmitEditing={() => confirmPassRef.current?.focus()}
              error={touched.password ? errors.password : undefined}
              secureTextEntry={true}
              returnKeyType="next"
              submitBehavior="submit"
            />
            <CustomTextInput
              ref={confirmPassRef}
              label="Confirm Password"
              placeholder="xxxxxxxxxxxx"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              error={
                touched.confirmPassword ? errors.confirmPassword : undefined
              }
              secureTextEntry={true}
              returnKeyType="done"
            />

            <CommonButton
              label="Register"
              onPress={handleSubmit}
              fullWidth={true}
            />
          </>
        )}
      </Formik>

      <View style={styles.loginContainer}>
        <CommonText style={styles.loginText}>
          Already have an account?{' '}
        </CommonText>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <CommonText style={styles.loginLink}>Login</CommonText>
        </TouchableOpacity>
      </View>
      {showLoader && <Loader show={showLoader} />}
    </Container>
  );
};

export default SignUp;
