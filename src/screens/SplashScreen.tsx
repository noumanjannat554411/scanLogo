import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { images } from '../assets/images/images';
import { scale } from '../utils/functions';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.3);
  const slideAnim = new Animated.Value(50);
  const rotateAnim = new Animated.Value(0);
  const floatAnim = new Animated.Value(0);

  useEffect(() => {
    // Animate logo
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 8,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Navigate to Scanner after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Scanner');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={images.splashBg}
      style={styles.container}
    >
      <Animated.Image 
        source={images.tabler_cube} 
        style={{ 
          width: scale(250), 
          height: scale(250), 
          resizeMode: "contain",
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { 
              rotate: rotateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
              })
            },
            {
              translateY: floatAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -20]
              })
            }
          ]
        }} 
      />
    </ImageBackground>
    // <LinearGradient
    //   colors={['#667eea', '#764ba2', '#f093fb']}
    //   style={styles.container}
    //   start={{ x: 0, y: 0 }}
    //   end={{ x: 1, y: 1 }}
    // >
    //   <StatusBar barStyle="light-content" backgroundColor="#667eea" />

    //   <Animated.View
    //     style={[
    //       styles.content,
    //       {
    //         opacity: fadeAnim,
    //         transform: [
    //           { scale: scaleAnim },
    //           { translateY: slideAnim },
    //         ],
    //       },
    //     ]}
    //   >
    //     {/* Logo Icon */}
    //     <View style={styles.logoContainer}>
    //       <View style={styles.scannerFrame}>
    //         <View style={styles.cornerTopLeft} />
    //         <View style={styles.cornerTopRight} />
    //         <View style={styles.cornerBottomLeft} />
    //         <View style={styles.cornerBottomRight} />

    //         <Text style={styles.logoIcon}>📸</Text>
    //       </View>
    //     </View>

    //     {/* App Name */}
    //     <Text style={styles.appName}>ScanLogo</Text>
    //     <Text style={styles.tagline}>Discover Brands Instantly</Text>

    //     {/* Loading Indicator */}
    //     <View style={styles.loadingContainer}>
    //       <View style={styles.loadingBar}>
    //         <Animated.View
    //           style={[
    //             styles.loadingProgress,
    //             {
    //               opacity: fadeAnim,
    //             },
    //           ]}
    //         />
    //       </View>
    //       <Text style={styles.loadingText}>Initializing camera...</Text>
    //     </View>
    //   </Animated.View>

    //   {/* Footer */}
    //   <View style={styles.footer}>
    //     <Text style={styles.footerText}>Powered by Google Vision AI</Text>
    //   </View>
    // </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  scannerFrame: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#fff',
    borderTopLeftRadius: 8,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#fff',
    borderTopRightRadius: 8,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#fff',
    borderBottomLeftRadius: 8,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#fff',
    borderBottomRightRadius: 8,
  },
  logoIcon: {
    fontSize: 50,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 60,
    fontWeight: '400',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingBar: {
    width: 200,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  loadingProgress: {
    width: '70%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
});
