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

interface ARModelViewerProps {
    visible: boolean;
    modelUrl: string | number;
    productTitle: string;
    onClose: () => void;
}

export default function ARModelViewer({
    visible,
    modelUrl,
    productTitle,
    onClose,
}: ARModelViewerProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modelPath, setModelPath] = useState<string | null>(null);

    useEffect(() => {
        if (visible && modelUrl) {
            prepareModel();
            console.log('🔵 Model URL:', modelUrl);
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
                    console.log('✅ Model path set:', resolvedAsset.uri);
                } else {
                    throw new Error('Could not resolve model asset');
                }
            } else if (typeof modelUrl === 'string') {
                setModelPath(modelUrl);
                console.log('✅ Model path set (string):', modelUrl);
            }

            setIsLoading(false);
            console.log('✅ Preparation complete, isLoading:', false);
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
            }
        } catch (error) {
            console.error('❌ Error opening AR:', error);
        }
    };

    console.log('🎬 ARModelViewer render - visible:', visible, 'isLoading:', isLoading, 'modelPath:', modelPath);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"
            onRequestClose={onClose}
            transparent={false}
            statusBarTranslucent={true}
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
                    <>
                        {console.log('📦 Rendering loading state')}
                        <View style={styles.centerContent}>
                            <ActivityIndicator size="large" color="#FF6200" />
                            <Text style={styles.loadingText}>Loading 3D Model...</Text>
                        </View>
                    </>
                ) : modelPath ? (
                    <>
                        {console.log('📦 Rendering WebView with model:', modelPath)}
                        {/* 3D Model Viewer */}
                        <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
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
                        </View>

                        {/* View in AR Button */}
                        <TouchableOpacity
                            style={styles.arFloatingButton}
                            onPress={openInAR}
                            activeOpacity={0.8}
                        >
                            <View style={styles.arButtonGradient}>
                                <Text style={styles.arFloatingIcon}>📱</Text>
                                <Text style={styles.arFloatingText}>View in AR</Text>
                            </View>
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
        fontSize: 16,
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
        backgroundColor: '#FF6200',
    },
    arButtonGradient: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arFloatingIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    arFloatingText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
    },
});
