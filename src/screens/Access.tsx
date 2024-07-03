import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Svg, {G, Path, Text as SvgText} from 'react-native-svg';

const segments = ['Email', 'Calls', 'Cards', 'Consends'];
const colors = ['#f4a261', '#e76f51', '#2a9d8f', '#264653'];
const wheelSize = 300;
const numSegments = segments.length;
const angleBySegment = 360 / numSegments;
const radius = wheelSize / 2;
const textRadius = radius / 1.5; // Adjust to position the text correctly

const makeWheel = () => {
  let data = Array.from({length: numSegments}).fill(1);
  return data.map((_, i) => ({
    key: `${i}`,
    name: segments[i],
    color: colors[i],
    arc: angleBySegment,
    startAngle: angleBySegment * i,
  }));
};

const SpinWheel = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const rotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const spin = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      animatedValue.setValue(0);
    });
  };

  const wheelData = makeWheel();
  const wheelPaths = wheelData.map(segment => (
    <G key={segment.key}>
      <Path
        d={describeArc(
          radius,
          radius,
          radius,
          segment.startAngle,
          segment.startAngle + segment.arc,
        )}
        fill={segment.color}
      />
      <SvgText
        x={
          radius +
          textRadius *
            Math.cos(
              (segment.startAngle + angleBySegment / 2) * (Math.PI / 180),
            )
        }
        y={
          radius +
          textRadius *
            Math.sin(
              (segment.startAngle + angleBySegment / 2) * (Math.PI / 180),
            )
        }
        fill="white"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="16">
        {segment.name}
      </SvgText>
    </G>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.wheelContainer}>
        <Animated.View style={{transform: [{rotate: rotation}]}}>
          <Svg
            width={wheelSize}
            height={wheelSize}
            viewBox={`0 0 ${wheelSize} ${wheelSize}`}>
            {wheelPaths}
          </Svg>
        </Animated.View>
      </View>
      <TouchableOpacity onPress={spin} style={styles.button}>
        <Text style={styles.buttonText}>Spin</Text>
      </TouchableOpacity>
    </View>
  );
};

// Helper function to describe the arc path
const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    'L',
    x,
    y,
    'Z',
  ].join(' ');
  return d;
};

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  arrowContainer: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: [{translateX: -20}],
    zIndex: 1,
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1abc9c',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SpinWheel;
