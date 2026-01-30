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

interface NativeARViewerProps {
    visible: boolean;
    modelUrl: string | number;
    productTitle: string;
    onClose: () => void;
}

export default function NativeARViewer({
    visible,
    modelUrl,
    productTitle,
    onClose,
}: NativeARViewerProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modelPath, setModelPath] = useState<string | null>(null);
    const [show3DViewer, setShow3DViewer] = useState<boolean>(false);
    const [hasARSupport, setHasARSupport] = useState<boolean>(true);

    useEffect(() => {
        if (visible && modelUrl) {
            prepareModel();
        }
    }, [visible, modelUrl]);

    const prepareModel = async () => {
        try {
            setIsLoading(true);
            console.log('🔵 Preparing model, type:', typeof modelUrl);

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
            Alert.alert('Error', 'Model not ready');
            return;
        }

        try {
            console.log('🚀 Opening AR with path:', modelPath);
            console.log('🔍 Platform:', Platform.OS);

            if (Platform.OS === 'android') {
                console.log('📱 Using Android AR');
                
                // For Android, we need to check if it's a local file or remote URL
                if (modelPath.startsWith('http://localhost') || modelPath.startsWith('http://10.0.2.2')) {
                    console.log('⚠️ Local URL detected, using WebView fallback');
                    setShow3DViewer(true);
                    return;
                }

                // For remote HTTPS URLs, try Scene Viewer
                if (modelPath.startsWith('https://')) {
                    console.log('🌐 HTTPS URL detected:', modelPath);
                    
                    // Try intent URL for Scene Viewer
                    const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(modelPath)}&mode=ar_preferred&title=${encodeURIComponent(productTitle)}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;
                    
                    console.log('🔗 Trying intent URL');
                    
                    try {
                        await Linking.openURL(intentUrl);
                        console.log('✅ Intent URL opened successfully');
                    } catch (intentError) {
                        console.error('❌ Scene Viewer not available:', intentError);
                        
                        // Device doesn't support ARCore - use WebView fallback
                        Alert.alert(
                            'AR Not Supported',
                            'Your device does not support Google ARCore. Would you like to view the 3D model in a regular viewer instead?',
                            [
                                { 
                                    text: 'View 3D Model', 
                                    onPress: () => {
                                        setHasARSupport(false);
                                        setShow3DViewer(true);
                                    }
                                },
                                { text: 'Cancel', style: 'cancel' }
                            ]
                        );
                    }
                } else {
                    console.log('⚠️ Not HTTPS URL, using WebView');
                    setShow3DViewer(true);
                }
            } else if (Platform.OS === 'ios') {
                console.log('🍎 Using iOS AR Quick Look');
                const quickLookUrl = modelPath.startsWith('http') ? modelPath : `file://${modelPath}`;
                const canOpen = await Linking.canOpenURL(quickLookUrl);
                if (canOpen) {
                    await Linking.openURL(quickLookUrl);
                } else {
                    Alert.alert('AR Not Available', 'AR Quick Look is not available on this device');
                }
            }
        } catch (error) {
            console.error('❌ Error opening AR:', error);
            // Fallback to WebView
            setShow3DViewer(true);
        }
    };

    const viewIn3D = () => {
        if (!modelPath) {
            Alert.alert('Error', 'Model not ready');
            return;
        }

        // For now, just show the AR option
        // In the future, you could implement a 3D viewer using react-native-reanimated
        Alert.alert(
            'View Options',
            'Choose how you want to view the model',
            [
                { text: 'View in AR', onPress: openInAR },
                { text: 'Cancel', style: 'cancel' }
            ]
        );
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"
            onRequestClose={onClose}
        >
            {show3DViewer && modelPath ? (
                // 3D Viewer WebView Fallback
                <View style={styles.container}>
                    <TouchableOpacity 
                        style={styles.webViewCloseButton} 
                        onPress={() => {
                            setShow3DViewer(false);
                            onClose();
                        }}
                    >
                        <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>
                    
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
                                        background: #1a1a1a;
                                        overflow: hidden;
                                    }
                                    model-viewer {
                                        width: 100%;
                                        height: 100%;
                                        background-color: #1a1a1a;
                                    }
                                    .info {
                                        position: absolute;
                                        bottom: 20px;
                                        left: 50%;
                                        transform: translateX(-50%);
                                        color: white;
                                        background: rgba(0,0,0,0.7);
                                        padding: 12px 24px;
                                        border-radius: 20px;
                                        font-family: sans-serif;
                                        font-size: 14px;
                                    }
                                </style>
                            </head>
                            <body>
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
            ) : (
                <LinearGradient
                    colors={['#1a1a1a', '#2d2d2d']}
                    style={styles.container}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>{productTitle}</Text>
                        <View style={styles.closeButton} />
                    </View>

                    {/* Content */}
                    <View style={styles.content}>
                        {isLoading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#FF6200" />
                                <Text style={styles.loadingText}>Loading 3D Model...</Text>
                            </View>
                        ) : (
                            <>
                                {/* Preview Section */}
                                <View style={styles.previewContainer}>
                                    <View style={styles.iconContainer}>
                                        <Text style={styles.icon}>📦</Text>
                                    </View>
                                    <Text style={styles.subtitle}>3D Model Ready</Text>
                                    <Text style={styles.description}>
                                        {hasARSupport 
                                            ? 'Experience this product in augmented reality'
                                            : 'View this product in 3D'}
                                    </Text>
                                </View>

                                {/* Features */}
                                <View style={styles.featuresContainer}>
                                    <View style={styles.feature}>
                                        <Text style={styles.featureIcon}>{hasARSupport ? '📱' : '🔄'}</Text>
                                        <Text style={styles.featureText}>
                                            {hasARSupport ? 'Point at any surface' : 'Rotate in 3D'}
                                        </Text>
                                    </View>
                                    <View style={styles.feature}>
                                        <Text style={styles.featureIcon}>{hasARSupport ? '🔄' : '🤏'}</Text>
                                        <Text style={styles.featureText}>
                                            {hasARSupport ? 'Rotate & scale freely' : 'Pinch to zoom'}
                                        </Text>
                                    </View>
                                    <View style={styles.feature}>
                                        <Text style={styles.featureIcon}>{hasARSupport ? '📸' : '👁️'}</Text>
                                        <Text style={styles.featureText}>
                                            {hasARSupport ? 'Take photos & videos' : 'View from all angles'}
                                        </Text>
                                    </View>
                                </View>

                                {/* Buttons */}
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity
                                        style={styles.arButton}
                                        onPress={openInAR}
                                        activeOpacity={0.8}
                                    >
                                        <LinearGradient
                                            colors={['#FF6200', '#FFC082']}
                                            style={styles.buttonGradient}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                        >
                                            <Text style={styles.arButtonIcon}>{hasARSupport ? '🥽' : '📦'}</Text>
                                            <Text style={styles.arButtonText}>
                                                {hasARSupport ? 'View in AR' : 'View 3D Model'}
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <Text style={styles.hint}>
                                        {Platform.OS === 'android' 
                                            ? (hasARSupport ? 'Powered by Google ARCore' : 'Interactive 3D Viewer')
                                            : 'Powered by AR Quick Look'}
                                    </Text>
                                </View>
                            </>
                        )}
                    </View>
                </LinearGradient>
            )}
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 20,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '300',
    },
    title: {
        color: '#fff',
        fontSize: scale(18),
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        color: '#fff',
        fontSize: scale(16),
        marginTop: 16,
    },
    previewContainer: {
        alignItems: 'center',
        marginBottom: 60,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 98, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 2,
        borderColor: 'rgba(255, 98, 0, 0.3)',
    },
    icon: {
        fontSize: 60,
    },
    subtitle: {
        color: '#fff',
        fontSize: scale(24),
        fontWeight: '700',
        marginBottom: 12,
    },
    description: {
        color: '#999',
        fontSize: scale(14),
        textAlign: 'center',
        maxWidth: '80%',
    },
    featuresContainer: {
        marginBottom: 60,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    featureIcon: {
        fontSize: 28,
        marginRight: 16,
    },
    featureText: {
        color: '#fff',
        fontSize: scale(16),
        fontWeight: '500',
    },
    buttonsContainer: {
        alignItems: 'center',
    },
    arButton: {
        width: '100%',
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        shadowColor: '#FF6200',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    buttonGradient: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    arButtonIcon: {
        fontSize: 24,
    },
    arButtonText: {
        color: '#000',
        fontSize: scale(18),
        fontWeight: '700',
    },
    hint: {
        color: '#666',
        fontSize: scale(12),
        marginTop: 16,
        textAlign: 'center',
    },
});
