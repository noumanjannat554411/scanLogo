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
import { constructionCompanies, getCompanyProjects, CONSTRUCTION_COMPANIES } from '../assets/data/arrays/construction-data';
import LinearGradient from 'react-native-linear-gradient';
import ARModelViewer from './ARModelViewer';

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
  const [scanAttempts, setScanAttempts] = useState(0);
  
  // AR Viewer State
  const [showARViewer, setShowARViewer] = useState(false);
  const [selectedModel, setSelectedModel] = useState<{url: string, title: string} | null>(null);
  
  const cameraRef = useRef<Camera>(null);
  const lastScanTimeRef = useRef<number>(0);
  const isProcessingRef = useRef<boolean>(false);
  const scanAttemptsRef = useRef<number>(0);
  const isScanningActiveRef = useRef<boolean>(false);
  const device = useCameraDevice('back');
  const { hasPermission: cameraPermission, requestPermission } = useCameraPermission();

  // Animations
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    checkPermissions();
    return () => {
      setIsScanningActive(false);
      isScanningActiveRef.current = false;
      isProcessingRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (isScanningActive) {
      startScanLineAnimation();
      startPulseAnimation();
      console.log
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
    console.log('🚀 Starting scan...');
    setIsScanningActive(true);
    isScanningActiveRef.current = true;
    setIsScanning(true);
    setScanStatus('🔍 Scanning for logos...');
    setDetectedLogos([]);
    setScanProgress(0);
    setScanAttempts(0);
    scanAttemptsRef.current = 0;
    isProcessingRef.current = false;
    
    // Use setTimeout to ensure state updates before first scan
    setTimeout(() => {
      console.log('📸 Starting first scan attempt...');
      scanCurrentFrame();
    }, 100);
  };

  const stopScanning = () => {
    console.log('🛑 Stopping scan...');
    setIsScanningActive(false);
    isScanningActiveRef.current = false;
    setIsScanning(false);
    setScanStatus('Tap to start scanning');
    setScanProgress(0);
    setScanAttempts(0);
    scanAttemptsRef.current = 0;
    isProcessingRef.current = false;
  };

  const scanCurrentFrame = async () => {
    console.log('🔍 scanCurrentFrame called', {
      hasCamera: !!cameraRef.current,
      isProcessing: isProcessingRef.current,
      isScanningActive: isScanningActiveRef.current,
      scanAttempts: scanAttemptsRef.current
    });
    
    // Check if already processing or scanning is not active
    if (!cameraRef.current || isProcessingRef.current || !isScanningActiveRef.current) {
      console.log('❌ Scan blocked:', {
        noCamera: !cameraRef.current,
        isProcessing: isProcessingRef.current,
        notActive: !isScanningActiveRef.current
      });
      return;
    }

    // Check if we've reached max attempts
    if (scanAttemptsRef.current >= 4) {
      setScanStatus('❌ No logo detected after 4 attempts');
      stopScanning();
      return;
    }

    try {
      isProcessingRef.current = true;
      scanAttemptsRef.current += 1;
      setScanAttempts(scanAttemptsRef.current);
      
      console.log(`📸 Taking photo (Attempt ${scanAttemptsRef.current}/4)...`);
      setScanStatus(`🔍 Analyzing frame (Attempt ${scanAttemptsRef.current}/4)...`);
      setScanProgress(0.3);

      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
        enableShutterSound: false,
      });

      console.log('📷 Photo taken:', photo.path);
      setScanProgress(0.5);
      setScanStatus('📡 Processing with AI...');

      const base64Image = await photoToBase64(photo.path);
      console.log('📝 Image converted to base64, length:', base64Image.length);

      // Clean up photo immediately
      try {
        await RNFS.unlink(photo.path);
      } catch (e) {
        // Ignore cleanup errors
      }

      setScanProgress(0.8);
      const logos = await detectLogos(base64Image);

      console.log('🎯 Logo detection result:', logos.length, 'logos found');
      setScanProgress(1);

      if (logos.length > 0) {
        // Logo detected! Stop scanning
        console.log('✅ Logos detected:', logos);
        setDetectedLogos(logos);
        setScanStatus(`✅ Found ${logos.length} logo(s)!`);
        startGlowAnimation();
        isProcessingRef.current = false;
        
        // Check for construction company logos
        let detectedCompany: string | null = null;
        let companyProjects = null;

        for (const logo of logos) {
          const desc = logo.description.toLowerCase();
          console.log('🏗️ Checking logo:', desc);

          // Check for Bechtel
          if (desc.includes('bechtel')) {
            detectedCompany = 'Bechtel';
            companyProjects = constructionCompanies.bechtel;
            break;
          }
          // Check for Turner Construction
          else if (desc.includes('turner')) {
            detectedCompany = 'Turner Construction';
            companyProjects = constructionCompanies.turner;
            break;
          }
          // Check for Skanska
          else if (desc.includes('skanska')) {
            detectedCompany = 'Skanska';
            companyProjects = constructionCompanies.skanska;
            break;
          }
          // Check for Fluor
          else if (desc.includes('fluor')) {
            detectedCompany = 'Fluor Corporation';
            companyProjects = constructionCompanies.fluor;
            break;
          }
        }
        
        if (detectedCompany && companyProjects) {
          console.log('✅ Detected construction company:', detectedCompany);
          // Pick a random building from the company's projects
          const randomProject = companyProjects[Math.floor(Math.random() * companyProjects.length)];
          
          stopScanning();
          setTimeout(() => {
            // Open AR viewer directly with the building model
            setSelectedModel({
              url: randomProject.modelUrl,
              title: `${detectedCompany} - ${randomProject.title}`
            });
            setShowARViewer(true);
          }, 1000);
        } else {
          // Show detected logo name even if not recognized
          console.log('⚠️ Detected logo but not a recognized construction company');
          setScanStatus(`Found: ${logos[0].description} (Not a construction company)`);
          stopScanning();
        }
      } else {
        // No logo detected, check if we should continue
        if (scanAttemptsRef.current < 4 && isScanningActiveRef.current) {
          setScanStatus(`⏳ No logo found. Trying again (${scanAttemptsRef.current}/4)...`);
          setScanProgress(0);
          
          // Mark as not processing so next scan can start
          isProcessingRef.current = false;
          
          // Wait 1 second before next attempt
          setTimeout(() => {
            if (isScanningActiveRef.current) {
              scanCurrentFrame();
            }
          }, 1000);
        } else {
          setScanStatus('❌ No logo detected after 4 attempts');
          stopScanning();
        }
      }
    } catch (error) {
      console.error('Scan error:', error);
      setScanStatus('⚠️ Error during scanning');
      setScanProgress(0);
      
      // Mark as not processing and try again if under limit
      isProcessingRef.current = false;
      
      if (scanAttemptsRef.current < 4 && isScanningActiveRef.current) {
        setTimeout(() => {
          if (isScanningActiveRef.current) {
            scanCurrentFrame();
          }
        }, 1000);
      } else {
        stopScanning();
      }
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
    <>
      {!showARViewer && (
      <View style={styles.container}>
        {/* Camera */}
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            device={device}
            isActive={!showARViewer}
            photo={true}
          />
          
          {/* Overlay with scanning frame */}
          <View style={styles.overlay}>
            {/* Top gradient overlay */}
            <LinearGradient
              colors={['rgba(0,0,0,0.7)', 'transparent']}
              style={styles.topOverlay}
            >
              <Text style={styles.headerTitle}>🏗️ Construction Scanner</Text>
              <Text style={styles.headerSubtitle}>Point at construction company logo</Text>
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
                  // Check if this is a construction company
                  const companyName = logo.description.toLowerCase();
                  const isConstructionCompany = 
                    companyName.includes('bechtel') ||
                    companyName.includes('turner') ||
                    companyName.includes('skanska') ||
                    companyName.includes('fluor');
                  
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
                      
                      {/* AR Button for Construction Companies */}
                      {isConstructionCompany && (
                        <TouchableOpacity
                          style={styles.arButton}
                          onPress={() => {
                            // Get the company's model
                            let detectedCompany = '';
                            if (companyName.includes('bechtel')) detectedCompany = 'Bechtel';
                            else if (companyName.includes('turner')) detectedCompany = 'Turner';
                            else if (companyName.includes('skanska')) detectedCompany = 'Skanska';
                            else if (companyName.includes('fluor')) detectedCompany = 'Fluor';
                            
                            if (detectedCompany) {
                              const companyProjects = getCompanyProjects(detectedCompany);
                              if (companyProjects && companyProjects.length > 0) {
                                const randomProject = companyProjects[Math.floor(Math.random() * companyProjects.length)];
                                
                                setSelectedModel({
                                  url: randomProject.modelUrl,
                                  title: `${detectedCompany} - ${randomProject.title}`
                                });
                                setShowARViewer(true);
                              }
                            }
                          }}
                          activeOpacity={0.8}
                        >
                          <LinearGradient
                            colors={['#00E5FF', '#00B8D4']}
                            style={styles.arButtonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                          >
                            <Text style={styles.arButtonIcon}>🏢</Text>
                            <Text style={styles.arButtonText}>View in 3D AR</Text>
                          </LinearGradient>
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
      )}

      {/* AR Model Viewer */}
      {selectedModel && (
        <ARModelViewer
          visible={showARViewer}
          modelUrl={selectedModel.url}
          productTitle={selectedModel.title}
          onClose={() => {
            setShowARViewer(false);
            setSelectedModel(null);
            setScanStatus('Tap to start scanning');
            setDetectedLogos([]);
          }}
        />
      )}
    </>
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
  arButton: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  arButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
  },
  arButtonIcon: {
    fontSize: 24,
  },
  arButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
});
