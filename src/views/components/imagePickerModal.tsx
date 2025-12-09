import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import ReactNativeModal from "react-native-modal";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../../utils/colors";
import { Fonts } from "../../utils/fonts";
import CommonText from "./commonText";
import { Camera, CircleX, Images, Trash2 } from "lucide-react-native";

type Props = {
  showPicker: boolean;
  onClose: () => void;
  hasImage: boolean;
  onCameraPress: () => void;
  onGalleryPress: () => void;
  onDeletePress: () => void;
};

const ImagePickerModal = ({
  showPicker,
  onClose,
  hasImage,
  onCameraPress,
  onGalleryPress,
  onDeletePress,
}: Props) => {
  return (
    <ReactNativeModal
      isVisible={showPicker}
      style={styles.modalBox}
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
    >
      <View style={styles.imagePickerContainer}>
        <View style={styles.titleBox}>
          <View style={styles.empty} />
          <CommonText style={styles.title}>Edit Profile Picture</CommonText>
          <TouchableOpacity activeOpacity={0.8} onPress={() => onClose()}>
            <CircleX
              size={moderateScale(30)}
              color={colors.white}
              fill={colors.grey2}
              strokeWidth={moderateScale(1.5)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonBox}
            onPress={() => onCameraPress()}
          >
            <CommonText style={styles.selectionText}>Take Photo</CommonText>
            <Camera size={moderateScale(20)} color={colors.secondary} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonBox}
            onPress={() => onGalleryPress()}
          >
            <CommonText style={styles.selectionText}>Choose Photo</CommonText>
            <Images size={moderateScale(20)} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        {hasImage && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonBox}
              activeOpacity={0.8}
              onPress={() => onDeletePress()}
            >
              <CommonText style={styles.selectionText}>Delete photo</CommonText>
              <Trash2 size={moderateScale(20)} color={colors.secondary} />
              {/* <Ionicons
                name="trash-outline"
                size={moderateScale(20)}
                color={theme.black}
              /> */}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modalBox: {
    margin: 0,
    justifyContent: "flex-end",
  },
  imagePickerContainer: {
    padding: moderateScale(15),
    borderTopLeftRadius: moderateScale(15),
    borderTopRightRadius: moderateScale(15),
    backgroundColor: colors.white,
  },
  titleBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: moderateScale(20),
  },
  empty: {
    width: moderateScale(30),
  },
  title: {
    color: colors.black,
    fontSize: Fonts.titleMedium,
    fontFamily: Fonts.PoppinsSemiBold,
  },
  buttonContainer: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    backgroundColor: colors.primary,
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  buttonBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectionText: {
    color: colors.secondary,
    fontSize: Fonts.text,
    fontFamily: Fonts.PoppinsRegular,
    paddingVertical: moderateScale(5),
  },
  divider: {
    height: moderateScale(1),
    backgroundColor: colors.secondary,
    marginVertical: moderateScale(5),
  },
});

export default ImagePickerModal;
