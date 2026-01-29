import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { detectLogos, Logo } from '../services/visionApi';
import RNFS from 'react-native-fs';
import { product } from '../assets/data/arrays/data';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

interface LogoScannerProps {
  navigation?: any;
}

export default function LogoScanner({ navigation }: LogoScannerProps) {
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isScanningActive, setIsScanningActive] = useState(false);
  const [detectedLogos, setDetectedLogos] = useState<Logo[]>([]);
  const [scanStatus, setScanStatus] = useState<string>('Tap to start scanning');
  const [scanProgress, setScanProgress] = useState(0);
  
  const cameraRef = useRef<Camera>(null);
  const scanIntervalRef = useRef<number | null>(null);
  const lastScanTimeRef = useRef<number>(0);
  const device = useCameraDevice('back');
  const { hasPermission: cameraPermission, requestPermission } = useCameraPermission();

  // Animations
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    checkPermissions();
    return () => {
      stopScanning();
    };
  }, []);

  useEffect(() => {
    if (isScanningActive) {
      startScanLineAnimation();
      startPulseAnimation();
    }
  }, [isScanningActive]);

  const startScanLineAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startGlowAnimation = () => {
    Animated.sequence([
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const checkPermissions = async () => {
    if (cameraPermission) {
      setHasPermission(true);
    } else {
      const permission = await requestPermission();
      setHasPermission(permission);
    }
  };

  const startScanning = () => {
    setIsScanningActive(true);
    setScanStatus('Scanning for logos...');
    setDetectedLogos([]);
    setScanProgress(0);
    
    scanIntervalRef.current = setInterval(() => {
      scanCurrentFrame();
    }, 2000) as unknown as number;
  };

  const stopScanning = () => {
    setIsScanningActive(false);
    setScanStatus('Tap to start scanning');
    setScanProgress(0);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  const scanCurrentFrame = async () => {
    if (!cameraRef.current || isScanning) {
      return;
    }

    const now = Date.now();
    if (now - lastScanTimeRef.current < 1500) {
      return;
    }
    lastScanTimeRef.current = now;

    try {
      setIsScanning(true);
      setScanStatus('🔍 Analyzing frame...');
      setScanProgress(0.3);

      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
        enableShutterSound: false,
      });

      setScanProgress(0.5);
      setScanStatus('📡 Processing with AI...');

      const base64Image = await photoToBase64(photo.path);

      try {
        await RNFS.unlink(photo.path);
      } catch (e) {
        // Ignore
      }

      setScanProgress(0.8);
      const logos = await detectLogos(base64Image);

      setScanProgress(1);

      if (logos.length > 0) {
        setDetectedLogos(logos);
        setScanStatus(`✅ Found ${logos.length} logo(s)!`);
        startGlowAnimation();
        
        const nikeDetected = logos.find(logo => 
          logo.description.toLowerCase().includes('nike')
        );
        
        if (nikeDetected && navigation) {
          setTimeout(() => {
            stopScanning();
            navigation.navigate('ProductDetails', {
              brand: 'Nike',
              products: product.nike,
            });
          }, 1500);
        }
      } else {
        setDetectedLogos([]);
        setScanStatus('🔍 Keep scanning...');
      }
    } catch (error) {
      console.error('Error scanning logo:', error);
      setScanStatus('⚠️ Error - retrying...');
    } finally {
      setIsScanning(false);
      setScanProgress(0);
    }
  };

  const photoToBase64 = async (path: string): Promise<string> => {
    if (path.startsWith('file://')) {
      path = path.substring(7);
    }
    try {
      const base64 = await RNFS.readFile(path, 'base64');
      return base64;
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  };

  if (!hasPermission) {
    return (
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.container}
      >
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionIcon}>📷</Text>
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            We need camera access to scan logos and detect brands
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={checkPermissions}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>No camera device found</Text>
      </View>
    );
  }

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  return (
    <View style={styles.container}>
      {/* Camera */}
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          device={device}
          isActive={true}
          photo={true}
        />
        
        {/* Overlay with scanning frame */}
        <View style={styles.overlay}>
          {/* Top gradient overlay */}
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            style={styles.topOverlay}
          >
            <Text style={styles.headerTitle}>Brand Scanner</Text>
            <Text style={styles.headerSubtitle}>Point at any brand logo</Text>
          </LinearGradient>

          {/* Scanning Frame */}
          <View style={styles.scanArea}>
            <Animated.View
              style={[
                styles.scanFrame,
                {
                  transform: [{ scale: isScanningActive ? pulseAnim : 1 }],
                  borderColor: detectedLogos.length > 0 ? '#4CAF50' : '#00E5FF',
                },
              ]}
            >
              {/* Corner brackets */}
              <View style={[styles.corner, styles.cornerTopLeft]} />
              <View style={[styles.corner, styles.cornerTopRight]} />
              <View style={[styles.corner, styles.cornerBottomLeft]} />
              <View style={[styles.corner, styles.cornerBottomRight]} />

              {/* Scanning line animation */}
              {isScanningActive && (
                <Animated.View
                  style={[
                    styles.scanLine,
                    {
                      transform: [{ translateY: scanLineTranslateY }],
                    },
                  ]}
                >
                  <LinearGradient
                    colors={['transparent', '#00E5FF', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.scanLineGradient}
                  />
                </Animated.View>
              )}

              {/* Center hint */}
              {!isScanningActive && (
                <View style={styles.centerHint}>
                  <Text style={styles.centerHintText}>📸</Text>
                  <Text style={styles.centerHintLabel}>Align logo here</Text>
                </View>
              )}

              {/* Glow effect when detected */}
              {detectedLogos.length > 0 && (
                <Animated.View
                  style={[
                    styles.glowEffect,
                    { opacity: glowAnim },
                  ]}
                />
              )}
            </Animated.View>

            {/* Status indicator */}
            <View style={styles.statusIndicator}>
              <Text style={styles.statusText}>{scanStatus}</Text>
              {isScanning && (
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${scanProgress * 100}%` }]} />
                </View>
              )}
            </View>
          </View>

          {/* Bottom gradient overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.bottomOverlay}
          />
        </View>
      </View>

      {/* Control Panel */}
      <View style={styles.controlPanel}>
        {/* Scan Button */}
        <TouchableOpacity
          style={[
            styles.scanButton,
            isScanningActive && styles.scanButtonActive,
          ]}
          onPress={isScanningActive ? stopScanning : startScanning}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={isScanningActive ? ['#FF5252', '#FF1744'] : ['#00E5FF', '#00B8D4']}
            style={styles.scanButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {isScanning ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <>
                <Text style={styles.scanButtonIcon}>
                  {isScanningActive ? '⏸' : '▶'}
                </Text>
                <Text style={styles.scanButtonText}>
                  {isScanningActive ? 'Stop Scanning' : 'Start Scanning'}
                </Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Results Panel */}
        {detectedLogos.length > 0 && (
          <View style={styles.resultsPanel}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.resultsScroll}
            >
              {detectedLogos.map((logo, index) => {
                const isNike = logo.description.toLowerCase().includes('nike');
                return (
                  <View key={index} style={styles.logoCard}>
                    <View style={styles.logoCardHeader}>
                      <Text style={styles.logoName}>{logo.description}</Text>
                      <View style={styles.confidenceBadge}>
                        <Text style={styles.confidenceText}>
                          {(logo.score * 100).toFixed(0)}%
                        </Text>
                      </View>
                    </View>
                    {isNike && navigation && (
                      <TouchableOpacity
                        style={styles.viewProductsBtn}
                        onPress={() => {
                          stopScanning();
                          navigation.navigate('ProductDetails', {
                            brand: 'Nike',
                            products: product.nike,
                          });
                        }}
                      >
                        <Text style={styles.viewProductsText}>View Products →</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  topOverlay: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scanArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  scanFrame: {
    width: width * 0.75,
    height: width * 0.75,
    borderWidth: 2,
    borderRadius: 20,
    borderStyle: 'dashed',
    overflow: 'hidden',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#00E5FF',
  },
  cornerTopLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 20,
  },
  cornerTopRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 20,
  },
  cornerBottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 20,
  },
  cornerBottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 20,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
  },
  scanLineGradient: {
    width: '100%',
    height: '100%',
  },
  centerHint: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    alignItems: 'center',
  },
  centerHintText: {
    fontSize: 40,
    marginBottom: 8,
  },
  centerHintLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  glowEffect: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
  },
  statusIndicator: {
    marginTop: 20,
    alignItems: 'center',
    minHeight: 50,
  },
  statusText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  progressBarContainer: {
    width: width * 0.5,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00E5FF',
    borderRadius: 2,
  },
  bottomOverlay: {
    paddingBottom: 20,
  },
  controlPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  scanButton: {
    width: '100%',
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 8,
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  scanButtonActive: {
    shadowColor: '#FF5252',
  },
  scanButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  scanButtonIcon: {
    fontSize: 24,
    color: '#fff',
    marginRight: 12,
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  resultsPanel: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 16,
    paddingVertical: 12,
  },
  resultsScroll: {
    paddingHorizontal: 12,
  },
  logoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    minWidth: 180,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.3)',
  },
  logoCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
  },
  confidenceBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  viewProductsBtn: {
    backgroundColor: '#00E5FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewProductsText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  permissionIcon: {
    fontSize: 80,
    marginBottom: 24,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
  },
});
