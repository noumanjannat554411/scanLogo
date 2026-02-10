import { NativeModules } from 'react-native';

interface ARViewerModuleInterface {
  openARView(modelUrl: string, title: string): Promise<string>;
  isARSupported(): Promise<boolean>;
}

const { ARViewerModule } = NativeModules;

export default ARViewerModule as ARViewerModuleInterface;
