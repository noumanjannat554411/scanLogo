import { NativeModules, Platform } from 'react-native';

interface ARQuickLookModuleInterface {
  presentARQuickLook(filePath: string): Promise<boolean>;
}

const ARQuickLookNative = NativeModules.ARQuickLookModule as ARQuickLookModuleInterface | undefined;

const ARQuickLook = {
  openInAR: async (filePath: string): Promise<boolean> => {
    if (Platform.OS !== 'ios') {
      throw new Error('ARQuickLook is only available on iOS');
    }
    
    if (!ARQuickLookNative) {
      throw new Error('ARQuickLookModule is not available');
    }
    
    try {
      return await ARQuickLookNative.presentARQuickLook(filePath);
    } catch (error) {
      console.error('Error opening AR Quick Look:', error);
      throw error;
    }
  },
};

export default ARQuickLook;
