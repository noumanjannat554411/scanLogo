import React, { useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    StatusBar,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { scale } from '../utils/functions';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'MallList'>;

interface Mall {
    id: number;
    name: string;
    location: string;
    icon: string;
}

const DUBAI_MALLS: Mall[] = [
    {
        id: 1,
        name: 'Mall of Emirates',
        location: 'Al Barsha',
        icon: '🏢',
    },
    {
        id: 2,
        name: 'Dubai Mall',
        location: 'Downtown Dubai',
        icon: '🏪',
    },
    {
        id: 3,
        name: 'Ibn Battuta Mall',
        location: 'Jebel Ali',
        icon: '🏬',
    },
    {
        id: 4,
        name: 'City Walk',
        location: 'Al Safa',
        icon: '🛍️',
    },
    {
        id: 5,
        name: 'Dubai Marina Mall',
        location: 'Dubai Marina',
        icon: '🏢',
    },
];

const MallCard = ({ mall, onPress }: { mall: Mall; onPress: () => void }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

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
        outputRange: ['0deg', '2deg'],
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
                    styles.mallCard,
                    {
                        transform: [
                            { scale: scaleAnim },
                            { perspective: 1000 },
                            { rotateY },
                        ],
                    },
                ]}
            >
                <LinearGradient
                    colors={['rgba(102, 126, 234, 0.15)', 'rgba(118, 75, 162, 0.15)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cardGradient}
                >
                    <View style={styles.cardContent}>
                        <LinearGradient
                            colors={['rgba(102, 126, 234, 0.4)', 'rgba(118, 75, 162, 0.4)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.mallIcon}
                        >
                            <Text style={styles.iconText}>{mall.icon}</Text>
                        </LinearGradient>
                        <View style={styles.mallInfo}>
                            <Text style={styles.mallName}>{mall.name}</Text>
                            <Text style={styles.mallLocation}>📍 {mall.location}</Text>
                        </View>
                        <View style={styles.arrowContainer}>
                            <LinearGradient
                                colors={['#667eea', '#764ba2']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.arrowCircle}
                            >
                                <Text style={styles.arrowIcon}>→</Text>
                            </LinearGradient>
                        </View>
                    </View>
                </LinearGradient>

                {/* 3D Shadow Layers */}
                <View style={[styles.shadowLayer, styles.shadowLayer1]} />
                <View style={[styles.shadowLayer, styles.shadowLayer2]} />
            </Animated.View>
        </TouchableOpacity>
    );
};

export default function MallListScreen({ navigation }: Props) {
    const handleMallSelect = (mall: Mall) => {
        navigation.navigate('BrandList', { mallName: mall.name });
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
                    <Text style={styles.headerTitle}>Dubai Malls</Text>
                    <Text style={styles.headerSubtitle}>Select your shopping destination</Text>
                </SafeAreaView>
            </LinearGradient>

            {/* Mall List */}
            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {DUBAI_MALLS.map((mall) => (
                    <MallCard
                        key={mall.id}
                        mall={mall}
                        onPress={() => handleMallSelect(mall)}
                    />
                ))}
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
    headerTitle: {
        fontSize: scale(36),
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
    mallCard: {
        marginBottom: scale(20),
        borderRadius: scale(20),
        overflow: 'visible',
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
    mallIcon: {
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
    iconText: {
        fontSize: scale(36),
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    mallInfo: {
        flex: 1,
    },
    mallName: {
        fontSize: scale(22),
        fontWeight: '800',
        color: '#fff',
        marginBottom: scale(6),
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    mallLocation: {
        fontSize: scale(15),
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
    },
    arrowContainer: {
        marginLeft: scale(10),
    },
    arrowCircle: {
        width: scale(45),
        height: scale(45),
        borderRadius: scale(22.5),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    arrowIcon: {
        fontSize: scale(24),
        color: '#fff',
        fontWeight: '600',
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
});
