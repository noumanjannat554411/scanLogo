import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Platform,
    Linking,
    Image,
    Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';
import LinearGradient from 'react-native-linear-gradient';
import { scale } from '../utils/functions';
import ARQuickLook from '../utils/ARQuickLook';

interface NativeARViewerProps {
    visible: boolean;
    modelUrl: string | number; // URL for 3D WebView
    modelLocalFile?: number; // Local file for AR (require())
    productTitle: string;
    onClose: () => void;
}

export default function NativeARViewer({
    visible,
    modelUrl,
    modelLocalFile,
    productTitle,
    onClose,
}: NativeARViewerProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modelPath, setModelPath] = useState<string | null>(null);
    const [arModelPath, setArModelPath] = useState<string | null>(null);

    useEffect(() => {
        if (visible && modelUrl) {
            prepareModel();
        }
    }, [visible, modelUrl]);

    const prepareModel = async () => {
        try {
            setIsLoading(true);
            console.log('🔵 Preparing model, type:', typeof modelUrl);

            // Prepare the 3D viewer model (URL for WebView)
            if (typeof modelUrl === 'number') {
                // Resolve the asset from require()
                const resolvedAsset = Image.resolveAssetSource(modelUrl);
                console.log('✅ Resolved asset:', resolvedAsset);
                
                if (resolvedAsset && resolvedAsset.uri) {
                    setModelPath(resolvedAsset.uri);
                } else {
                    throw new Error('Could not resolve model asset');
                }
            } else if (typeof modelUrl === 'string') {
                setModelPath(modelUrl);
            }

            // Prepare the AR model (local file)
            if (modelLocalFile && typeof modelLocalFile === 'number') {
                const resolvedArAsset = Image.resolveAssetSource(modelLocalFile);
                console.log('✅ Resolved AR asset:', resolvedArAsset);
                
                if (resolvedArAsset && resolvedArAsset.uri) {
                    setArModelPath(resolvedArAsset.uri);
                } else {
                    console.warn('Could not resolve AR model asset');
                }
            }

            setIsLoading(false);
        } catch (error) {
            console.error('❌ Error preparing model:', error);
            Alert.alert('Error', 'Failed to load 3D model');
            setIsLoading(false);
            onClose();
        }
    };

    const openInAR = async () => {
        if (!modelPath) {
            Alert.alert('AR Not Available', '3D model is not ready for AR viewing.');
            return;
        }

        try {
            console.log('🚀 Opening AR with model path:', modelPath);

            if (Platform.OS === 'android') {
                // For Android, open Scene Viewer via web URL
                if (modelPath.startsWith('https://')) {
                    const sceneViewerUrl = `https://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(modelPath)}&mode=ar_preferred&title=${encodeURIComponent(productTitle)}`;
                    
                    console.log('🤖 Opening Android Scene Viewer via web:', sceneViewerUrl);
                    
                    try {
                        await Linking.openURL(sceneViewerUrl);
                        console.log('✅ Android AR opened successfully');
                    } catch (error) {
                        console.error('❌ AR not available:', error);
                        Alert.alert(
                            'AR Not Supported',
                            'Your device does not support Google ARCore. You can continue viewing the 3D model here.',
                            [{ text: 'OK' }]
                        );
                    }
                } else {
                    Alert.alert(
                        'AR Requires Online Model',
                        'To use AR, the 3D model must be hosted online (HTTPS). You can continue viewing the 3D model here.',
                        [{ text: 'OK' }]
                    );
                }
            } else if (Platform.OS === 'ios') {
                // iOS: Download file first, then open with QLPreviewController
                // QLPreviewController requires local files, not remote URLs
                
                if (modelPath && modelPath.startsWith('https://')) {
                    // Download the remote file first
                    setIsLoading(true);
                    console.log('📥 Downloading model for AR:', modelPath);
                    
                    try {
                        // Get file extension from URL
                        const urlParts = modelPath.split('.');
                        const extension = urlParts[urlParts.length - 1].split('?')[0];
                        const fileName = `${productTitle.replace(/\s+/g, '_')}_ar.${extension}`;
                        const downloadPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
                        
                        console.log('📥 Downloading to:', downloadPath);
                        
                        // Remove if exists
                        const exists = await RNFS.exists(downloadPath);
                        if (exists) {
                            await RNFS.unlink(downloadPath);
                        }
                        
                        // Download the file
                        const downloadResult = await RNFS.downloadFile({
                            fromUrl: modelPath,
                            toFile: downloadPath,
                            background: false,
                            discretionary: false,
                        }).promise;
                        
                        if (downloadResult.statusCode === 200) {
                            const fileInfo = await RNFS.stat(downloadPath);
                            console.log('✅ Downloaded successfully, size:', fileInfo.size, 'bytes');
                            
                            setIsLoading(false);
                            
                            // Now open with QLPreviewController
                            const fileUrl = `file://${downloadPath}`;
                            console.log('🚀 Opening AR Quick Look with:', fileUrl);
                            
                            await ARQuickLook.openInAR(fileUrl);
                            console.log('✅ AR Quick Look opened successfully');
                        } else {
                            throw new Error(`Download failed with status: ${downloadResult.statusCode}`);
                        }
                    } catch (error) {
                        console.error('❌ Error downloading/opening AR:', error);
                        setIsLoading(false);
                        Alert.alert(
                            'AR Error',
                            `Failed to open AR view: ${error instanceof Error ? error.message : 'Unknown error'}`,
                            [{ text: 'OK' }]
                        );
                    }
                } else if (arModelPath && !arModelPath.startsWith('http')) {
                    // We have a local AR model - copy it to accessible location
                    setIsLoading(true);
                    console.log('✅ Using local AR model:', arModelPath);
                    
                    try {
                        // Create a safe filename
                        const fileName = `${productTitle.replace(/\s+/g, '_')}.glb`;
                        const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
                        
                        console.log('📋 Copying from:', arModelPath);
                        console.log('📋 Copying to:', destPath);
                        
                        // Remove if exists
                        const exists = await RNFS.exists(destPath);
                        if (exists) {
                            await RNFS.unlink(destPath);
                        }
                        
                        // Copy the file from assets to Documents
                        const sourcePath = arModelPath.replace('file://', '');
                        await RNFS.copyFile(sourcePath, destPath);
                        
                        console.log('✅ File copied successfully');
                        
                        // Verify the file
                        const fileExists = await RNFS.exists(destPath);
                        if (fileExists) {
                            const fileInfo = await RNFS.stat(destPath);
                            console.log('📊 Copied file size:', fileInfo.size, 'bytes');
                            
                            setIsLoading(false);
                            
                            // Use native AR Quick Look module
                            const fileUrl = `file://${destPath}`;
                            console.log('🚀 Opening AR with native module:', fileUrl);
                            
                            try {
                                await ARQuickLook.openInAR(fileUrl);
                                console.log('✅ AR Quick Look opened successfully');
                            } catch (arError) {
                                console.error('❌ AR Quick Look failed:', arError);
                                Alert.alert(
                                    'AR Error',
                                    'Failed to open AR Quick Look. Please make sure your device supports AR.',
                                    [{ text: 'OK' }]
                                );
                            }
                        } else {
                            throw new Error('File copy failed');
                        }
                    } catch (error) {
                        console.error('❌ Error copying/opening local AR file:', error);
                        setIsLoading(false);
                        Alert.alert(
                            'AR Error',
                            `Failed to prepare AR view: ${error instanceof Error ? error.message : 'Unknown error'}`,
                            [{ text: 'OK' }]
                        );
                    }
                } else {
                    // Fallback: No valid URL
                    Alert.alert(
                        'AR Not Available',
                        'No AR model available for this product.',
                        [{ text: 'OK' }]
                    );
                }
            }
        } catch (error) {
            console.error('❌ Error opening AR:', error);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                {/* Close Button */}
                <TouchableOpacity 
                    style={styles.webViewCloseButton} 
                    onPress={onClose}
                >
                    <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>

                {isLoading ? (
                    <View style={styles.centerContent}>
                        <ActivityIndicator size="large" color="#FF6200" />
                        <Text style={styles.loadingText}>Loading 3D Model...</Text>
                    </View>
                ) : modelPath ? (
                    <>
                        {/* 3D Model Viewer */}
                        <WebView
                            source={{ 
                                html: `
                                <!DOCTYPE html>
                                <html>
                                <head>
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"></script>
                                    <style>
                                        * { margin: 0; padding: 0; box-sizing: border-box; }
                                        body { 
                                            width: 100vw; 
                                            height: 100vh; 
                                            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                                            overflow: hidden;
                                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                                        }
                                        model-viewer {
                                            width: 100%;
                                            height: 100%;
                                            background-color: transparent;
                                        }
                                        .title {
                                            position: absolute;
                                            top: 80px;
                                            left: 50%;
                                            transform: translateX(-50%);
                                            color: white;
                                            background: rgba(0,0,0,0.7);
                                            padding: 12px 24px;
                                            border-radius: 20px;
                                            font-size: 18px;
                                            font-weight: 600;
                                            z-index: 10;
                                        }
                                        .info {
                                            position: absolute;
                                            bottom: 100px;
                                            left: 50%;
                                            transform: translateX(-50%);
                                            color: white;
                                            background: rgba(0,0,0,0.7);
                                            padding: 12px 24px;
                                            border-radius: 20px;
                                            font-size: 14px;
                                            z-index: 5;
                                        }
                                    </style>
                                </head>
                                <body>
                                    <div class="title">${productTitle}</div>
                                    <model-viewer
                                        src="${modelPath}"
                                        camera-controls
                                        touch-action="pan-y"
                                        auto-rotate
                                        rotation-per-second="30deg"
                                        shadow-intensity="1"
                                        environment-image="neutral"
                                        exposure="1"
                                        alt="${productTitle}"
                                    >
                                    </model-viewer>
                                    <div class="info">👆 Drag to rotate • 🤏 Pinch to zoom</div>
                                </body>
                                </html>
                                `
                            }}
                            style={{ flex: 1, backgroundColor: '#1a1a1a' }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            allowsInlineMediaPlayback={true}
                            originWhitelist={['*']}
                        />

                        {/* View in AR Button */}
                        <TouchableOpacity
                            style={styles.arFloatingButton}
                            onPress={openInAR}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#FF6200', '#FFC082']}
                                style={styles.arButtonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Text style={styles.arFloatingIcon}>🥽</Text>
                                <Text style={styles.arFloatingText}>View in AR</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </>
                ) : null}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    webViewCloseButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 20,
        left: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    closeText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '300',
    },
    loadingText: {
        color: '#fff',
        fontSize: scale(16),
        marginTop: 16,
    },
    arFloatingButton: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        shadowColor: '#FF6200',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        zIndex: 100,
    },
    arButtonGradient: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    arFloatingIcon: {
        fontSize: 24,
    },
    arFloatingText: {
        color: '#000',
        fontSize: scale(18),
        fontWeight: '700',
    },
});
