import React, { useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Alert,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { scale } from '../utils/functions';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'BrandList'>;

interface Brand {
    id: number;
    name: string;
    icon: string;
    isActive: boolean;
    description: string;
}

const BRANDS: Brand[] = [
    {
        id: 1,
        name: 'Nike',
        icon: '👟',
        isActive: true,
        description: 'Sportswear & Athletic Shoes',
    },
    {
        id: 2,
        name: 'Ralph Lauren',
        icon: '🏇',
        isActive: true,
        description: 'Luxury Fashion & Lifestyle',
    },
    {
        id: 3,
        name: 'Adidas',
        icon: '⚽',
        isActive: false,
        description: 'Coming in Next Phase',
    },
    {
        id: 4,
        name: 'Gucci',
        icon: '👜',
        isActive: false,
        description: 'Coming in Next Phase',
    },
    {
        id: 5,
        name: 'Puma',
        icon: '🐆',
        isActive: false,
        description: 'Coming in Next Phase',
    },
];

const BrandCard = ({ 
    brand, 
    onPress 
}: { 
    brand: Brand; 
    onPress: () => void;
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (brand.isActive) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(glowAnim, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(glowAnim, {
                        toValue: 0,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }
    }, [brand.isActive]);

    const handlePressIn = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 0.95,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const rotateY = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '3deg'],
    });

    const glowOpacity = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.8],
    });

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => {
                handlePressOut();
                setTimeout(onPress, 100);
            }}
        >
            <Animated.View
                style={[
                    styles.brandCard,
                    !brand.isActive && styles.brandCardInactive,
                    {
                        transform: [
                            { scale: scaleAnim },
                            { perspective: 1000 },
                            { rotateY },
                        ],
                    },
                ]}
            >
                {brand.isActive && (
                    <Animated.View
                        style={[
                            styles.glowEffect,
                            { opacity: glowOpacity },
                        ]}
                    />
                )}
                
                <LinearGradient
                    colors={
                        brand.isActive
                            ? ['rgba(102, 126, 234, 0.2)', 'rgba(118, 75, 162, 0.2)']
                            : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cardGradient}
                >
                    <View style={styles.cardContent}>
                        <LinearGradient
                            colors={
                                brand.isActive
                                    ? ['rgba(102, 126, 234, 0.5)', 'rgba(118, 75, 162, 0.5)']
                                    : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.1)']
                            }
                            style={[
                                styles.brandIcon,
                                !brand.isActive && styles.brandIconInactive,
                            ]}
                        >
                            <Text style={styles.iconText}>{brand.icon}</Text>
                        </LinearGradient>
                        
                        <View style={styles.brandInfo}>
                            <Text style={[
                                styles.brandName,
                                !brand.isActive && styles.inactiveText,
                            ]}>
                                {brand.name}
                            </Text>
                            <Text style={[
                                styles.brandDescription,
                                !brand.isActive && styles.inactiveText,
                            ]}>
                                {brand.description}
                            </Text>
                        </View>
                        
                        {brand.isActive && (
                            <LinearGradient
                                colors={['#4ade80', '#22c55e']}
                                style={styles.activeBadge}
                            >
                                <Text style={styles.activeBadgeText}>✓ Active</Text>
                            </LinearGradient>
                        )}
                    </View>
                </LinearGradient>

                {/* 3D Shadow Layers */}
                {brand.isActive && (
                    <>
                        <View style={[styles.shadowLayer, styles.shadowLayer1]} />
                        <View style={[styles.shadowLayer, styles.shadowLayer2]} />
                    </>
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};

export default function BrandListScreen({ navigation, route }: Props) {
    const { mallName } = route.params;

    const handleBrandPress = (brand: Brand) => {
        if (brand.isActive) {
            navigation.navigate('Scanner');
        } else {
            Alert.alert(
                'Coming Soon',
                `${brand.name} scanning will be available in the next phase.`,
                [{ text: 'OK' }]
            );
        }
    };

    const handleScanPress = () => {
        navigation.navigate('Scanner');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
            
            {/* Animated Background Gradient */}
            <LinearGradient
                colors={['#0a0a0a', '#1a1a2e', '#16213e']}
                style={StyleSheet.absoluteFill}
            />
            
            {/* Header */}
            <LinearGradient
                colors={['rgba(102, 126, 234, 0.8)', 'rgba(118, 75, 162, 0.8)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <SafeAreaView edges={['top']}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Text style={styles.backText}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{mallName}</Text>
                    <Text style={styles.headerSubtitle}>Available Brands</Text>
                </SafeAreaView>
            </LinearGradient>

            {/* Brand List */}
            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {BRANDS.map((brand) => (
                    <BrandCard
                        key={brand.id}
                        brand={brand}
                        onPress={() => handleBrandPress(brand)}
                    />
                ))}

                {/* Scan Button */}
                <TouchableOpacity
                    style={styles.scanButton}
                    onPress={handleScanPress}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#667eea', '#764ba2']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.scanButtonGradient}
                    >
                        <View style={styles.scanButtonContent}>
                            <Text style={styles.scanIcon}>📷</Text>
                            <Text style={styles.scanButtonText}>Start Scanning</Text>
                        </View>
                    </LinearGradient>
                    
                    {/* 3D Shadow for scan button */}
                    <View style={styles.scanButtonShadow1} />
                    <View style={styles.scanButtonShadow2} />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    header: {
        paddingHorizontal: scale(20),
        paddingBottom: scale(25),
        borderBottomLeftRadius: scale(30),
        borderBottomRightRadius: scale(30),
        elevation: 10,
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    backButton: {
        marginBottom: scale(12),
        paddingVertical: scale(8),
    },
    backText: {
        fontSize: scale(17),
        color: '#fff',
        fontWeight: '700',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    headerTitle: {
        fontSize: scale(32),
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: scale(8),
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    headerSubtitle: {
        fontSize: scale(16),
        color: 'rgba(255, 255, 255, 0.95)',
        fontWeight: '500',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: scale(20),
        paddingTop: scale(30),
    },
    brandCard: {
        marginBottom: scale(20),
        borderRadius: scale(20),
        overflow: 'visible',
    },
    brandCardInactive: {
        opacity: 0.7,
    },
    glowEffect: {
        position: 'absolute',
        top: -scale(2),
        left: -scale(2),
        right: -scale(2),
        bottom: -scale(2),
        borderRadius: scale(22),
        backgroundColor: 'rgba(102, 126, 234, 0.4)',
        zIndex: -1,
    },
    cardGradient: {
        borderRadius: scale(20),
        borderWidth: 1.5,
        borderColor: 'rgba(102, 126, 234, 0.4)',
        overflow: 'hidden',
        backgroundColor: 'rgba(26, 26, 46, 0.6)',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: scale(22),
    },
    brandIcon: {
        width: scale(70),
        height: scale(70),
        borderRadius: scale(35),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(18),
        elevation: 5,
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
    },
    brandIconInactive: {
        elevation: 2,
    },
    iconText: {
        fontSize: scale(36),
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    brandInfo: {
        flex: 1,
    },
    brandName: {
        fontSize: scale(22),
        fontWeight: '800',
        color: '#fff',
        marginBottom: scale(6),
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    brandDescription: {
        fontSize: scale(15),
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
    },
    inactiveText: {
        color: 'rgba(255, 255, 255, 0.5)',
    },
    activeBadge: {
        paddingHorizontal: scale(14),
        paddingVertical: scale(8),
        borderRadius: scale(14),
        elevation: 3,
        shadowColor: '#4ade80',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    activeBadgeText: {
        fontSize: scale(13),
        fontWeight: '800',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    shadowLayer: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: '100%',
        borderRadius: scale(20),
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
    },
    shadowLayer1: {
        top: scale(3),
        zIndex: -1,
        opacity: 0.6,
    },
    shadowLayer2: {
        top: scale(6),
        zIndex: -2,
        opacity: 0.3,
    },
    scanButton: {
        marginTop: scale(20),
        marginBottom: scale(20),
        borderRadius: scale(20),
        overflow: 'visible',
        elevation: 10,
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
    },
    scanButtonGradient: {
        borderRadius: scale(20),
        overflow: 'hidden',
    },
    scanButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: scale(22),
        paddingHorizontal: scale(24),
    },
    scanIcon: {
        fontSize: scale(32),
        marginRight: scale(12),
    },
    scanButtonText: {
        fontSize: scale(22),
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    scanButtonShadow1: {
        position: 'absolute',
        top: scale(4),
        left: 0,
        right: 0,
        height: '100%',
        borderRadius: scale(20),
        backgroundColor: 'rgba(102, 126, 234, 0.3)',
        zIndex: -1,
    },
    scanButtonShadow2: {
        position: 'absolute',
        top: scale(8),
        left: 0,
        right: 0,
        height: '100%',
        borderRadius: scale(20),
        backgroundColor: 'rgba(102, 126, 234, 0.15)',
        zIndex: -2,
    },
});
