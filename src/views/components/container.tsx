import React, { useMemo } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../../utils/colors';

type ContainerProps = {
  children: React.ReactNode;
  boxStyle?: ViewStyle;
  contentStyle?: ViewStyle;
};

const height = Dimensions.get('screen').height - moderateScale(75);

const Container: React.FC<ContainerProps> = ({
  children,
  boxStyle,
  contentStyle,
}) => {
  const handleContainerPress = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
        keyboardVerticalOffset={moderateScale(64)}
      >
        <ScrollView
          style={[styles.flex, boxStyle]}
          contentContainerStyle={[styles.contentContainer, contentStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={handleContainerPress}>
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
    // minHeight: height,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default Container;
