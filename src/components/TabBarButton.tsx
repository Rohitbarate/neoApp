import {LayoutChangeEvent, Pressable, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Animated, {
  useAnimatedRef,
  measure,
  MeasuredDimensions,
  runOnUI,
  runOnJS,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
type Props = {
  isActive: boolean;
  title: string;
  onLayout: (event: LayoutChangeEvent) => void;
  onPress: (measurement: MeasuredDimensions | null) => void;
};
export const TabBarButton: FC<Props> = ({
  onPress,
  title,
  onLayout,
  isActive,
}) => {
  const animatedRef = useAnimatedRef<Animated.View>();
  const handlePress = () => {
    runOnUI(() => {
      const measurement = measure(animatedRef);
      runOnJS(onPress)(measurement);
    })();
  };
  const textAStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(isActive ? 'white' : '#66a6ff', {duration: 350}),
    };
  });
  return (
    <Pressable onLayout={onLayout} ref={animatedRef} onPress={handlePress}>
      <Animated.Text style={[styles.tabTitle, textAStyle]}>
        {title}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
});
