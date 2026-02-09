import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Platform,
    Dimensions,
    Image,
} from 'react-native';
import { WebView } from 'react-native-webview';
import RNFS from 'react-native-fs';

const { width, height } = Dimensions.get('window');

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
    const [base64Model, setBase64Model] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (visible && modelUrl) {
            loadModel();
        }
    }, [visible, modelUrl]);

    const loadModel = async () => {
        try {
            console.log('🔵 loadModel called with modelUrl:', modelUrl, 'Type:', typeof modelUrl);
            setIsLoading(true);
            setError(null);

            // Handle different types of modelUrl
            if (typeof modelUrl === 'number') {
                console.log('📦 Resolving asset from require() module ID:', modelUrl);
                // It's a require() module ID, resolve it to get the actual path
                const resolvedAsset = Image.resolveAssetSource(modelUrl);
                console.log('✅ Resolved asset:', resolvedAsset);
                if (resolvedAsset && resolvedAsset.uri) {
                    console.log('✅ Using URI:', resolvedAsset.uri);
                    setBase64Model(resolvedAsset.uri);
                } else {
                    throw new Error('Could not resolve model asset');
                }
            } else if (typeof modelUrl === 'string') {
                console.log('📝 Processing string modelUrl:', modelUrl);
                // Check if it's a URL or local file path
                if (modelUrl.startsWith('http://') || modelUrl.startsWith('https://')) {
                    console.log('🌐 Downloading remote model:', modelUrl);
                    
                    // Download the model and convert to base64 for WebView
                    // This bypasses CORS issues in WebView
                    const tempPath = `${RNFS.CachesDirectoryPath}/temp_model_${Date.now()}.glb`;
                    console.log('📥 Downloading to:', tempPath);
                    
                    const downloadResult = await RNFS.downloadFile({
                        fromUrl: modelUrl,
                        toFile: tempPath,
                        background: false,
                        discretionary: false,
                        cacheable: true,
                        progress: (res) => {
                            const progress = (res.bytesWritten / res.contentLength) * 100;
                            console.log(`📊 Download progress: ${Math.round(progress)}%`);
                        }
                    }).promise;

                    if (downloadResult.statusCode !== 200) {
                        throw new Error(`Download failed with status: ${downloadResult.statusCode}`);
                    }

                    console.log('✅ Download complete, reading as base64...');
                    const base64Data = await RNFS.readFile(tempPath, 'base64');
                    console.log('✅ File read successfully, size:', base64Data.length, 'bytes');
                    
                    // Clean up temp file
                    await RNFS.unlink(tempPath).catch(() => {});
                    
                    setBase64Model(`data:model/gltf-binary;base64,${base64Data}`);
                } else {
                    console.log('📁 Processing local file path');
                    // It's a local file path, convert to base64
                    const filePath = modelUrl.replace('file://', '');
                    console.log('📂 Checking file exists at:', filePath);
                    const exists = await RNFS.exists(filePath);
                    
                    if (!exists) {
                        throw new Error('Model file not found at: ' + filePath);
                    }

                    console.log('📖 Reading file as base64...');
                    const base64Data = await RNFS.readFile(filePath, 'base64');
                    console.log('✅ File read successfully, length:', base64Data.length);
                    setBase64Model(`data:model/gltf-binary;base64,${base64Data}`);
                }
            } else {
                throw new Error('Invalid model URL type: ' + typeof modelUrl);
            }
            
            console.log('✅ Model loaded successfully');
            setIsLoading(false);
        } catch (err) {
            console.error('❌ Error loading model:', err);
            setError('Failed to load 3D model: ' + (err as Error).message);
            setIsLoading(false);
        }
    };

    // Properly escape the model URL for HTML
    const modelUrlString = String(base64Model || modelUrl);
    const escapedModelUrl = modelUrlString.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const escapedTitle = productTitle.replace(/"/g, '&quot;').replace(/'/g, '&#39;');

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>AR Model Viewer</title>
    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            display: flex;
            flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow: hidden;
        }

        .header {
            padding: 20px;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 10;
        }

        .title {
            font-size: 20px;
            font-weight: 600;
            color: #fff;
            text-align: center;
        }

        model-viewer {
            width: 100%;
            height: 100%;
            background-color: transparent;
        }

        .ar-button {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #FF6200 0%, #FFC082 100%);
            color: #000;
            font-size: 18px;
            font-weight: 700;
            padding: 16px 40px;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(255, 98, 0, 0.4);
            z-index: 100;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .ar-button:active {
            transform: translateX(-50%) scale(0.95);
        }

        .controls {
            position: absolute;
            top: 80px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            z-index: 10;
        }

        .control-btn {
            width: 48px;
            height: 48px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .control-btn:active {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(0.9);
        }

        .loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 16px;
            z-index: 5;
        }

        .instructions {
            position: absolute;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            color: #fff;
            padding: 12px 24px;
            border-radius: 20px;
            font-size: 14px;
            text-align: center;
            max-width: 80%;
            z-index: 5;
        }

        .error-display {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ff4444;
            font-size: 14px;
            background: rgba(255, 68, 68, 0.1);
            padding: 20px;
            border-radius: 10px;
            max-width: 80%;
            text-align: center;
            z-index: 10;
            display: none;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">${escapedTitle}</div>
    </div>

    <div class="loading" id="loading">Loading 3D Model...</div>
    <div class="error-display" id="errorDisplay"></div>

    <model-viewer
        id="modelViewer"
        src="${escapedModelUrl}"
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        touch-action="pan-y"
        auto-rotate
        auto-rotate-delay="0"
        rotation-per-second="20deg"
        shadow-intensity="1"
        environment-image="neutral"
        exposure="1"
        shadow-softness="0.5"
        camera-orbit="0deg 75deg auto"
        min-camera-orbit="auto auto auto"
        max-camera-orbit="auto auto auto"
        field-of-view="45deg"
        max-field-of-view="90deg"
        min-field-of-view="20deg"
        alt="3D model of ${escapedTitle}"
    >
        <button class="ar-button" slot="ar-button">
            <span>📱</span>
            <span>View in AR</span>
        </button>

        <div class="instructions" slot="interaction-prompt">
            👆 Drag to rotate • 🤏 Pinch to zoom
        </div>
    </model-viewer>

    <div class="controls">
        <button class="control-btn" onclick="resetCamera()">🔄</button>
        <button class="control-btn" onclick="toggleRotation()">⏸️</button>
    </div>

    <script>
        const modelViewer = document.getElementById('modelViewer');
        const loading = document.getElementById('loading');
        const errorDisplay = document.getElementById('errorDisplay');
        let isRotating = true;

        console.log('🔵 Model Viewer initialized with URL:', modelViewer.src);

        modelViewer.addEventListener('load', () => {
            loading.style.display = 'none';
            errorDisplay.style.display = 'none';
            console.log('✅ Model loaded successfully');
        });

        modelViewer.addEventListener('error', (event) => {
            loading.style.display = 'none';
            errorDisplay.style.display = 'block';
            errorDisplay.textContent = 'Failed to load 3D model. Please check your connection and try again.';
            console.error('❌ Model loading error:', event);
            console.error('Model URL:', modelViewer.src);
        });

        modelViewer.addEventListener('progress', (event) => {
            const progress = event.detail.totalProgress * 100;
            loading.textContent = 'Loading 3D Model... ' + Math.round(progress) + '%';
            console.log('📊 Loading progress:', progress + '%');
        });

        function resetCamera() {
            modelViewer.cameraOrbit = '0deg 75deg auto';
            modelViewer.fieldOfView = '45deg';
            modelViewer.resetTurntableRotation();
        }

        function toggleRotation() {
            isRotating = !isRotating;
            if (isRotating) {
                modelViewer.autoRotate = true;
                document.querySelector('.controls button:nth-child(2)').textContent = '⏸️';
            } else {
                modelViewer.autoRotate = false;
                document.querySelector('.controls button:nth-child(2)').textContent = '▶️';
            }
        }

        // Handle AR session
        modelViewer.addEventListener('ar-status', (event) => {
            if (event.detail.status === 'session-started') {
                console.log('🎯 AR session started');
            }
        });
    </script>
</body>
</html>
    `;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                {/* Close Button */}
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>

                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#FF6200" />
                        <Text style={styles.loadingText}>Loading 3D Model...</Text>
                    </View>
                )}

                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>❌</Text>
                        <Text style={styles.errorMessage}>{error}</Text>
                        <TouchableOpacity style={styles.retryButton} onPress={loadModel}>
                            <Text style={styles.retryText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {!isLoading && !error && base64Model && (
                    <WebView
                        source={{ html: htmlContent }}
                        style={styles.webview}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        allowsInlineMediaPlayback={true}
                        mediaPlaybackRequiresUserAction={false}
                        allowFileAccess={true}
                        allowUniversalAccessFromFileURLs={true}
                        allowFileAccessFromFileURLs={true}
                        originWhitelist={['*']}
                        mixedContentMode="always"
                        startInLoadingState={true}
                        onMessage={(event) => {
                            console.log('WebView message:', event.nativeEvent.data);
                        }}
                        onLoadStart={() => {
                            console.log('🔵 WebView started loading');
                        }}
                        onLoadEnd={() => {
                            console.log('✅ WebView finished loading');
                        }}
                        onHttpError={(syntheticEvent) => {
                            const { nativeEvent } = syntheticEvent;
                            console.error('❌ HTTP Error:', nativeEvent.statusCode, nativeEvent.description);
                        }}
                        renderLoading={() => (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#FF6200" />
                                <Text style={styles.loadingText}>Loading AR Viewer...</Text>
                            </View>
                        )}
                        onError={(syntheticEvent: any) => {
                            const { nativeEvent } = syntheticEvent;
                            console.error('❌ WebView error:', nativeEvent);
                            setError('Failed to load AR viewer: ' + (nativeEvent.description || 'Unknown error'));
                        }}
                        onConsoleMessage={(event: any) => {
                            console.log('WebView Console:', event.nativeEvent.message);
                        }}
                    />
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    closeButton: {
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
    closeButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '300',
    },
    webview: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    loadingText: {
        marginTop: 16,
        color: '#fff',
        fontSize: 16,
    },
    errorContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        padding: 20,
    },
    errorText: {
        fontSize: 48,
        marginBottom: 16,
    },
    errorMessage: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
    },
    retryButton: {
        backgroundColor: '#FF6200',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 25,
    },
    retryText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
