import { View, Text, Keyboard, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import { getStyles } from './ChangePassword.styles';
import Header from '../../../components/header';
import Container from '../../../components/container';
import CustomTextInput from '../../../components/customInput';
import CommonButton from '../../../components/commonButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { passwordRegex } from '../../../../utils/regex';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AllNavParamList } from '../../../../navigation/AllNavParamList';
import { changePasswordApi } from '../../../../api/profile/profileAPI';
import { userType } from '../../../../utils/constants';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/loader';

const SignUpValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().trim().required('Old Password is required'),
  newPassword: Yup.string()
    .trim()
    .matches(
      passwordRegex,
      'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
    )
    .required('New Password is required'),

  confirmPassword: Yup.string()
    .trim()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
});

type NavigationProp = NativeStackNavigationProp<
  AllNavParamList,
  'ChangePassword'
>;

type Props = {
  navigation: NavigationProp;
};

const ChangePassword = ({ navigation }: Props) => {
  const styles = getStyles();
  const [showLoader, setShowLoader] = useState(false);

  const newPassRef = useRef<TextInput>(null);
  const confirmPassRef = useRef<TextInput>(null);

  const handleFormSubmit = async (values: any, actions: any) => {
    Keyboard.dismiss();
    setShowLoader(true);
    try {
      let requestData = {
        current_password: values.oldPassword,
        new_password: values.newPassword,
        userType: userType,
      };
      let response = await changePasswordApi(requestData);
      if (response) {
        Toast.showWithGravity('Password changed.', Toast.LONG, Toast.BOTTOM);
        actions.resetForm();
      }
    } catch (error: any) {
      Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        label={'Change Password'}
        showBackButton={true}
        showNotification={false}
        onBackPress={() => navigation.goBack()}
      />
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={SignUpValidationSchema}
        onSubmit={(values, actions) => handleFormSubmit(values, actions)}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <Container contentStyle={styles.contentStyle}>
            <CustomTextInput
              value={values.oldPassword}
              placeholder="xxxxxxxxxxxx"
              secureTextEntry={true}
              onChangeText={handleChange('oldPassword')}
              label="Old Password"
              error={touched.oldPassword ? errors.oldPassword : undefined}
              onSubmitEditing={() => newPassRef.current?.focus()}
              submitBehavior="submit"
              returnKeyType="next"
            />
            <CustomTextInput
              ref={newPassRef}
              value={values.newPassword}
              secureTextEntry={true}
              placeholder="xxxxxxxxxxxx"
              onChangeText={handleChange('newPassword')}
              label="New Password"
              error={touched.newPassword ? errors.newPassword : undefined}
              onSubmitEditing={() => confirmPassRef.current?.focus()}
              submitBehavior="submit"
              returnKeyType="next"
            />
            <CustomTextInput
              ref={confirmPassRef}
              value={values.confirmPassword}
              label="Confirm New Password"
              placeholder="xxxxxxxxxxxx"
              onChangeText={handleChange('confirmPassword')}
              secureTextEntry={true}
              error={
                touched.confirmPassword ? errors.confirmPassword : undefined
              }
              submitBehavior="blurAndSubmit"
              returnKeyType="done"
            />
            <CommonButton
              label="Submit"
              onPress={() => handleSubmit()}
              fullWidth={true}
            />
          </Container>
        )}
      </Formik>
      {showLoader && <Loader show={showLoader} />}
    </View>
  );
};

export default ChangePassword;
