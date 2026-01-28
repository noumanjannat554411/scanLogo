import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { detectLogos, Logo } from '../services/visionApi';
import RNFS from 'react-native-fs';

export default function LogoScanner() {
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isScanningActive, setIsScanningActive] = useState(false);
  const [detectedLogos, setDetectedLogos] = useState<Logo[]>([]);
  const [scanStatus, setScanStatus] = useState<string>('Point camera at a logo');
  const cameraRef = useRef<Camera>(null);
  const scanIntervalRef = useRef<number | null>(null);
  const lastScanTimeRef = useRef<number>(0);
  const device = useCameraDevice('back');
  const { hasPermission: cameraPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    checkPermissions();
    return () => {
      stopScanning();
    };
  }, []);

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
    
    // Scan every 2 seconds
    scanIntervalRef.current = setInterval(() => {
      scanCurrentFrame();
    }, 2000) as unknown as number;
  };

  const stopScanning = () => {
    setIsScanningActive(false);
    setScanStatus('Scanning stopped');
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  const scanCurrentFrame = async () => {
    if (!cameraRef.current || isScanning) {
      return;
    }

    // Prevent too frequent scans
    const now = Date.now();
    if (now - lastScanTimeRef.current < 1500) {
      return;
    }
    lastScanTimeRef.current = now;

    try {
      setIsScanning(true);
      setScanStatus('Analyzing...');

      // Take photo
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
        enableShutterSound: false,
      });

      // Convert to base64
      const base64Image = await photoToBase64(photo.path);

      // Delete the temp photo
      try {
        await RNFS.unlink(photo.path);
      } catch (e) {
        // Ignore deletion errors
      }

      // Detect logos using Google Vision API
      const logos = await detectLogos(base64Image);

      if (logos.length > 0) {
        setDetectedLogos(logos);
        setScanStatus(`Found ${logos.length} logo(s)!`);
      } else {
        setDetectedLogos([]);
        setScanStatus('No logos detected - keep scanning...');
      }
    } catch (error) {
      console.error('Error scanning logo:', error);
      setScanStatus('Error - trying again...');
    } finally {
      setIsScanning(false);
    }
  };

  const photoToBase64 = async (path: string): Promise<string> => {
    // For iOS
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
      <View style={styles.container}>
        <Text style={styles.permissionText}>Camera permission required</Text>
        <TouchableOpacity style={styles.button} onPress={checkPermissions}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>No camera device found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          device={device}
          isActive={true}
          photo={true}
        />
        
        {/* Scanning indicator overlay */}
        <View style={styles.scanningIndicator}>
          <View style={styles.scanFrame} />
          {isScanning && (
            <View style={styles.scanLine} />
          )}
        </View>

        {/* Status bar at top */}
        <View style={styles.statusBar}>
          <Text style={styles.statusText}>{scanStatus}</Text>
          {isScanning && (
            <ActivityIndicator size="small" color="#fff" style={styles.statusSpinner} />
          )}
        </View>
      </View>

      {/* Control button */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.scanButton,
            isScanningActive ? styles.scanButtonActive : styles.scanButtonInactive
          ]}
          onPress={isScanningActive ? stopScanning : startScanning}
        >
          <Text style={styles.scanButtonText}>
            {isScanningActive ? '⏸ Stop Scanning' : '▶ Start Scanning'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Results at bottom */}
      {detectedLogos.length > 0 && (
        <View style={styles.resultsContainer}>
          <ScrollView style={styles.resultsScroll}>
            <Text style={styles.resultsTitle}>✓ Detected Logos:</Text>
            {detectedLogos.map((logo, index) => (
              <View key={index} style={styles.logoItem}>
                <Text style={styles.logoDescription}>{logo.description}</Text>
                <Text style={styles.logoScore}>
                  {(logo.score * 100).toFixed(1)}% confident
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
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
  scanningIndicator: {
    position: 'absolute',
    top: '25%',
    left: '10%',
    right: '10%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 3,
    borderColor: 'rgba(0, 255, 0, 0.6)',
    borderRadius: 12,
  },
  scanLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#00FF00',
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  statusBar: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusSpinner: {
    marginLeft: 10,
  },
  controls: {
    padding: 20,
    backgroundColor: '#000',
  },
  scanButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  scanButtonActive: {
    backgroundColor: '#FF3B30',
  },
  scanButtonInactive: {
    backgroundColor: '#34C759',
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 40,
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  resultsContainer: {
    maxHeight: 180,
    backgroundColor: '#1c1c1e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  resultsScroll: {
    padding: 15,
  },
  resultsTitle: {
    color: '#34C759',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logoItem: {
    backgroundColor: '#2c2c2e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoDescription: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  logoScore: {
    color: '#34C759',
    fontSize: 14,
    fontWeight: '600',
  },
});
