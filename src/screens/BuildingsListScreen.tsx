import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { buildings } from '../assets/data/arrays/buildings-data';
import { images } from '../assets/images/images';
import { scale } from '../utils/functions';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'BuildingsList'>;

export default function BuildingsListScreen({ navigation }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<any>(null);
    const insets = useSafeAreaInsets();

    const handleBuildingPress = (buildingId: number) => {
        navigation.navigate('BuildingDetail', { buildingId });
    };

    const handleNext = () => {
        if (currentIndex < buildings.length - 1) {
            const nextIndex = currentIndex + 1;
            flatListRef.current?.scrollToOffset({ offset: nextIndex * width, animated: true });
            setCurrentIndex(nextIndex);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            flatListRef.current?.scrollToOffset({ offset: prevIndex * width, animated: true });
            setCurrentIndex(prevIndex);
        }
    };

    const renderBuilding = ({ item, index }: { item: typeof buildings[0]; index: number }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.95}
                onPress={() => handleBuildingPress(item.id)}
                style={styles.slide}
            >
                <ImageBackground
                    source={{ uri: item.heroImage }}
                    style={styles.heroImage}
                    resizeMode="cover"
                >
                    {/* Dark gradient overlay */}
                    <LinearGradient
                        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.85)']}
                        style={StyleSheet.absoluteFill}
                    />

                    {/* Content at bottom */}
                    <View style={[styles.heroContent, { paddingBottom: insets.bottom + 40 }]}>
                        <Text style={styles.buildingName}>{item.name}</Text>
                        <Text style={styles.buildingDescription} numberOfLines={3}>
                            {item.description}
                        </Text>

                        {/* Price Tag */}
                        <View style={styles.priceRow}>
                            <Text style={styles.priceText}>{item.price}</Text>
                            <Text style={styles.priceUnit}>{item.priceUnit}</Text>
                        </View>

                        {/* Location */}
                        <View style={styles.locationRow}>
                            <Text style={styles.locationIcon}>📍</Text>
                            <Text style={styles.locationText}>{item.location}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Hero Carousel */}
            <Animated.FlatList
                ref={flatListRef}
                data={buildings}
                renderItem={renderBuilding}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onMomentumScrollEnd={(e) => {
                    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(idx);
                }}
            />

            {/* Header Overlay */}
            <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
                <TouchableOpacity>
                    <Image
                        source={images.menu}
                        style={styles.headerIcon}
                    />
                </TouchableOpacity>

                <Image source={images.logo} style={styles.logo} resizeMode="contain" />

                <TouchableOpacity>
                    <Image
                        source={images.notification}
                        style={styles.headerIcon}
                    />
                </TouchableOpacity>
            </View>

            {/* Navigation Arrows */}
            <View style={styles.arrowsContainer}>
                {currentIndex > 0 && (
                    <TouchableOpacity style={styles.arrowButton} onPress={handlePrev}>
                        <Text style={styles.arrowText}>‹</Text>
                    </TouchableOpacity>
                )}
                <View style={{ flex: 1 }} />
                {currentIndex < buildings.length - 1 && (
                    <TouchableOpacity style={styles.arrowButton} onPress={handleNext}>
                        <Text style={styles.arrowText}>›</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Pagination Dots */}
            <View style={[styles.pagination, { bottom: insets.bottom + 16 }]}>
                {buildings.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index && styles.dotActive,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        zIndex: 10,
    },
    headerIcon: {
        width: scale(24),
        height: scale(24),
        tintColor: '#fff',
        resizeMode: 'contain',
    },
    logo: {
        width: 120,
        height: 32,
    },
    slide: {
        width: width,
        height: height,
    },
    heroImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    heroContent: {
        paddingHorizontal: 28,
    },
    buildingName: {
        fontSize: scale(36),
        fontWeight: '800',
        color: '#fff',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    buildingDescription: {
        fontSize: scale(13),
        color: 'rgba(255,255,255,0.75)',
        lineHeight: 20,
        marginBottom: 16,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 8,
    },
    priceText: {
        fontSize: scale(22),
        fontWeight: '700',
        color: '#fff',
    },
    priceUnit: {
        fontSize: scale(14),
        color: 'rgba(255,255,255,0.6)',
        marginLeft: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    locationIcon: {
        fontSize: 14,
        marginRight: 6,
    },
    locationText: {
        fontSize: scale(14),
        color: 'rgba(255,255,255,0.7)',
    },
    arrowsContainer: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        transform: [{ translateY: -25 }],
    },
    arrowButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    arrowText: {
        fontSize: 28,
        color: '#fff',
        fontWeight: '300',
        marginTop: -2,
    },
    pagination: {
        position: 'absolute',
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.35)',
        marginHorizontal: 4,
    },
    dotActive: {
        width: 24,
        backgroundColor: '#fff',
    },
});
