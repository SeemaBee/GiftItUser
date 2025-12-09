import { View, Text, VirtualizedList } from "react-native";
import React, { useEffect, useState } from "react";
import { getStyles } from "./NotificationScreen.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AllNavParamList } from "../../../../navigation/AllNavParamList";
import Header from "../../../components/header";
import { fetchNotifications } from "../../../../api/notification/notificationAPI";
import Loader from "../../../components/loader";
import CommonText from "../../../components/commonText";

type NavigationProp = NativeStackNavigationProp<
  AllNavParamList,
  "NotificationScreen"
>;

type Props = {
  navigation: NavigationProp;
};

const NotificationScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const styles = getStyles();
  const [notificationData, setNotificationData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      let { data, success } = await fetchNotifications();
      if (success) {
        if (data.current_page === 1) {
          setNotificationData(data.data);
        } else {
          // let combinedData = notificationData.push(data.data);
          // setNotificationData(combinedData);
        }
        if (currentPage < data.last_page) {
          setHasMore(true);
          setCurrentPage(currentPage + 1);
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    if (hasMore) {
      getData();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        showNotification={false}
        label={"Notifications"}
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.subContainer}>
        <VirtualizedList
          keyExtractor={(item: any) => item.id}
          data={notificationData}
          renderItem={(item) => <Text>Hello </Text>}
          getItemCount={() => notificationData.length}
          onEndReached={() => handleEndReached()}
          onEndReachedThreshold={0.8}
          ListEmptyComponent={() => (
            <View style={styles.emptyBox}>
              <CommonText>No notification yet.</CommonText>
            </View>
          )}
        />
      </View>
      {loading && <Loader show={loading} />}
    </View>
  );
};

export default NotificationScreen;
