import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../../utils/colors";
import CommonText from "./commonText";

interface Step {
  title: string;
  date: string;
  time: string;
  isCompleted: boolean;
}

const OrderProgressTimeline = () => {
  const steps: Step[] = [
    {
      title: "Payment Paid",
      date: "22 Jul, 2025",
      time: "11:00 AM",
      isCompleted: true,
    },
    {
      title: "Shipped",
      date: "24 Jul, 2025",
      time: "03:00 PM",
      isCompleted: true,
    },
    {
      title: "Delivery",
      date: "25 Jul, 2025",
      time: "10:30 AM",
      isCompleted: false,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.progressRow}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            {/* SVG line and circle */}
            <Svg height={40} width="100%">
              {/* Line */}
              {index < steps.length - 1 && (
                <Line
                  x1="50%"
                  y1="20"
                  x2="150%"
                  y2="20"
                  stroke={step.isCompleted ? colors.primary : "#DADADA"}
                  strokeWidth="2"
                />
              )}

              {/* Circle */}
              <Circle
                cx="50%"
                cy="20"
                r="10"
                stroke={step.isCompleted ? colors.primary : "#DADADA"}
                strokeWidth="1"
                fill={"white"}
              />

              {step.isCompleted && (
                <Circle cx="50%" cy="20" r="5" fill={colors.primary} />
              )}

              {index > 0 && (
                <Line
                  x1="0"
                  y1="20"
                  x2="42%"
                  y2="20"
                  stroke={step.isCompleted ? colors.primary : "#DADADA"}
                  strokeWidth="2"
                />
              )}
            </Svg>

            {/* Labels */}
            <View style={styles.textContainer}>
              <CommonText
                style={[
                  styles.title,
                  { color: step.isCompleted ? "#333" : "#9E9E9E" },
                ]}
              >
                {step.title}
              </CommonText>
              <CommonText style={styles.date}>{step.date}</CommonText>
              <CommonText style={styles.date}>{step.time}</CommonText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default OrderProgressTimeline;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(10),
  },
  stepContainer: {
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    alignItems: "center",
    marginTop: moderateScale(4),
  },
  title: {
    fontWeight: "600",
    fontSize: moderateScale(12),
  },
  date: {
    fontSize: moderateScale(10),
    color: "#9E9E9E",
  },
});
