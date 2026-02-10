import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import ARViewerModule from '../modules/ARViewerModule';

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

    useEffect(() => {
        if (visible && typeof modelUrl === 'string') {
            openARViewer(modelUrl, productTitle);
        }
    }, [visible, modelUrl, productTitle]);

    const openARViewer = async (url: string, title: string) => {
        try {
            console.log('🚀 Opening native AR viewer with:', url);
            
            // Check if AR is supported
            const isSupported = await ARViewerModule.isARSupported();
            console.log('📱 AR Support:', isSupported);

            if (!isSupported) {
                Alert.alert(
                    'AR Not Supported',
                    'Google ARCore is required to view models in AR. Please install Google ARCore from the Play Store.',
                    [
                        { text: 'OK', onPress: onClose }
                    ]
                );
                return;
            }

            // Open AR viewer
            const result = await ARViewerModule.openARView(url, title);
            console.log('✅ AR Viewer result:', result);
            
            // Close the modal after opening AR
            // The AR viewer will open in a separate activity
            setTimeout(() => {
                onClose();
            }, 500);

        } catch (error) {
            console.error('❌ Error opening AR viewer:', error);
            Alert.alert(
                'Error',
                'Failed to open AR viewer. Please try again.',
                [
                    { text: 'OK', onPress: onClose }
                ]
            );
        }
    };

    // This component doesn't render anything
    // It just triggers the native AR viewer
    return null;
}
