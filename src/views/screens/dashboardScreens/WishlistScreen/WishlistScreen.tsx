import { View, Text, StyleSheet } from 'react-native';
import { getStyles } from './WishlistScreen.styles';
import Header from '../../../components/header';

const WishlistScreen = () => {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <Header
        label={'Wishlist'}
        showBackButton={false}
        showNotification={true}
        onNotificationPress={() => {}}
      />
    </View>
  );
};

export default WishlistScreen;
