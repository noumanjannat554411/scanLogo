import { Alert, Dimensions, Linking } from "react-native";
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BASE_WIDTH = 440;
const BASE_HEIGHT = 926;

export function responsiveFonts(fontSize: number) {
    return fontSize * (Dimensions.get("window").width / 393)
}

export const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;
export const verticalScale = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
