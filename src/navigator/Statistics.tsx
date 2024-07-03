import {StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Animated, {
  useSharedValue,
  withSequence,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
// import { BlurView } from "expo-blur";
import PagerView from 'react-native-pager-view';
import {CustomTabBar} from '../components/CustomTabBar';
import Access from '../screens/Access';
import Consent from '../screens/Consent';
import Approve from '../screens/Approve';
// export const SPRING_CONFIG = {
//   damping: 20,
//   mass: 1,
//   overshootClamping: false,
//   restDisplacementThreshold: 0.1,
//   restSpeedThreshold: 0.01,
//   stiffness: 150,
// };
// const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const renderScene = (index: number) => {
  switch (index) {
    case 0:
      return <Access />;
    case 1:
      return <Consent />;
    case 2:
      return <Approve />;
    default:
      return null;
  }
};

export const Statistics = () => {
  const [page, setPage] = useState<any>(0);
  const [renderBlur, setRenderBlur] = useState(false);

  const blurIntensity = useSharedValue(0);

  const ref = useRef<PagerView>(null);
  const translateX = useSharedValue(0);

  const handleTabPress = (index: number) => {
    if (page !== index) {
      setRenderBlur(true);

      // Animate blur intensity for transition effect
      blurIntensity.value = withSequence(
        withTiming(50, {duration: 100}),
        withTiming(0, {duration: 100}, finished => {
          if (finished) {
            runOnJS(setRenderBlur)(false);
          }
        }),
      );

      // Animate translation for shake effect
      translateX.value = withSequence(
        withTiming(page > index ? 20 : -20, {duration: 300}),
        withTiming(0, {duration: 300}),
      );

      // Set the current page index
      setPage(index);

      // Change the current page in the PagerView
      ref.current?.setPage(index);
    }
  };

  // Animated style for translation effect
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  // Animated props for blur effect
  // const animatedBlurViewProps = useAnimatedProps(() => {
  //   return {
  //     intensity: blurIntensity.value,
  //   };
  // });

  return (
    <View style={{flex: 1, backgroundColor: '#6f86d6'}}>
      <CustomTabBar
        onPress={index => handleTabPress(index)}
        activeIndex={page}
      />
      <Animated.View style={[styles.springContainer, animatedStyle]}>
        <PagerView
          ref={ref}
          scrollEnabled={false}
          testID={'pager-view'}
          style={styles.pagerView}
          initialPage={0}
          useNext={false}>
          {Array.from({length: 4}).map((_, index) => (
            <View key={index.toString()} style={styles.pageContainer}>
              {renderScene(index)}
            </View>
          ))}
        </PagerView>
        {/* {renderBlur && (
          <AnimatedBlurView
            experimentalBlurMethod={"dimezisBlurView"}
            animatedProps={animatedBlurViewProps}
            style={[styles.blurView]}
          />
        )} */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  springContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  blurView: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pageContainer: {
    flex: 1,
  },
});

export default Statistics;
