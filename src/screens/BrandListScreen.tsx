import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Alert,
    Image,
    ImageBackground,
    Dimensions,
    TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from '../utils/functions';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { images } from '../assets/images/images';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'BrandList'>;

interface Brand {
    id: number;
    name: string;
    isActive: boolean;
    brandImage: any;
}

const BRANDS: any = [
    {
        id: 1,
        name: 'Nike',
        isActive: true,
        brandImage: images.nikeLogo,
        description: 'Sportswear & Athletic Shoes',
    },
    {
        id: 2,
        name: 'Ralph Lauren',
        isActive: true,
        brandImage: images.ralphlauren,
        description: 'Luxury Apparel & Accessories',
    },
    {
        id: 3,
        name: 'Gucci',
        isActive: false,
        brandImage: images.gucci,
        description: 'Designer Fashion & Leather Goods',
    },
    {
        id: 4,
        name: 'Adidas',
        isActive: false,
        brandImage: images.addidas,
        description: 'Sportswear & Performance Gear',
    },
    {
        id: 5,
        name: 'Puma',
        isActive: false,
        brandImage: images.puma,
        description: 'Athletic Wear & Lifestyle Products',
    },
];

export default function BrandListScreen({ navigation, route }: Props) {
    const { mallName } = route.params;
    const insets = useSafeAreaInsets();

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
            <StatusBar barStyle="light-content" backgroundColor="#111" />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + scale(4) }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
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
            {/* Brand Cards */}
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {BRANDS.map((brand, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.brandCard,
                            !brand.isActive && styles.brandCardInactive,
                        ]}
                        onPress={() => handleBrandPress(brand)}
                        activeOpacity={brand.isActive ? 0.85 : 0.6}
                    >

                        <View style={styles.container1}>
                            {/* Yellow inner glow */}
                            <LinearGradient
                                colors={['transparent', '#F8A231']}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                style={styles.yellowGlow}
                            />

                            {/* White soft highlight */}
                            <LinearGradient
                                colors={['transparent', 'rgba(255,255,255,0.26)']}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                style={styles.whiteGlow}
                            />
                        </View>
                        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, top: 0, height: 10, backgroundColor: 'rgba(255,255,255,0.0)' }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: scale(40), paddingTop: scale(50), alignItems: 'center' }}>
                                <View>
                                    <Text style={styles.mallName}>{brand.name}</Text>
                                    <Text style={styles.mallLocation}>{brand.description}</Text>
                                </View>
                                <Image source={brand.brandImage} style={styles.arrowCircle} />

                            </View>
                            {/* <Image source={brand.image} style={styles.mallImage} /> */}
                        </View>
                    </TouchableOpacity>
                ))}

                {/* Scan Button */}
                {/* <TouchableOpacity
                    style={styles.scanBtn}
                    onPress={handleScanPress}
                    activeOpacity={0.8}
                >
                    <ImageBackground
                        source={images.backgroundImage}
                        resizeMode="stretch"
                        style={styles.scanBtnInner}
                    >
                        <Text style={styles.scanEmoji}>📷</Text>
                        <Text style={styles.scanText}>Start Scanning</Text>
                    </ImageBackground>
                </TouchableOpacity> */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(20),
        paddingBottom: scale(10),
    },
    headerIcon: {
        width: scale(22),
        height: scale(22),
        tintColor: '#fff',
        resizeMode: 'contain',
    },
    logo: {
        width: scale(120),
        height: scale(30),
    },
    titleSection: {
        paddingHorizontal: scale(20),
        paddingTop: scale(4),
        paddingBottom: scale(4),
    },
    title: {
        fontSize: scale(22),
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: scale(13),
        color: 'rgba(255,255,255,0.55)',
        marginTop: scale(2),
    },
    searchWrap: {
        paddingHorizontal: scale(20),
        paddingTop: scale(10),
        paddingBottom: scale(10),
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: scale(14),
        paddingHorizontal: scale(14),
        paddingVertical: scale(11),
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
    },
    searchLens: {
        fontSize: scale(16),
        marginRight: scale(8),
    },
    searchInput: {
        flex: 1,
        fontSize: scale(14),
        color: '#fff',
        padding: 0,
    },
    scrollView: {
        flex: 1,
        paddingTop: scale(20),
    },
    scrollContent: {
        paddingHorizontal: scale(20),
        paddingTop: scale(2),
        paddingBottom: scale(30),
    },
    brandCard: {
        marginBottom: scale(12),
        borderRadius: scale(16),
        overflow: 'hidden',
    },
    brandCardInactive: {
        opacity: 0.45,
    },
    cardBg: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: scale(16),
        paddingRight: scale(12),
        paddingVertical: scale(12),
        minHeight: scale(95),
    },
    brandInfoCol: {
        flex: 1,
    },
    brandName: {
        fontSize: scale(18),
        fontWeight: '700',
        color: '#fff',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scale(5),
        gap: scale(5),
    },
    dot: {
        width: scale(7),
        height: scale(7),
        borderRadius: scale(4),
    },
    statusLabel: {
        fontSize: scale(12),
        color: 'rgba(255,255,255,0.6)',
        fontWeight: '500',
    },
    dimText: {
        color: 'rgba(255,255,255,0.4)',
    },
    brandImg: {
        width: scale(100),
        height: scale(70),
        transform: [{ rotate: '-20deg' }],
        marginRight: scale(4),
    },
    checkCircle: {
        width: scale(28),
        height: scale(28),
        borderRadius: scale(14),
        backgroundColor: '#e8932f',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkMark: {
        fontSize: scale(14),
        color: '#fff',
        fontWeight: '700',
    },
    scanBtn: {
        marginTop: scale(10),
        marginBottom: scale(20),
        borderRadius: scale(16),
        overflow: 'hidden',
    },
    scanBtnInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: scale(18),
    },
    scanEmoji: {
        fontSize: scale(22),
        marginRight: scale(10),
    },
    scanText: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: '#fff',
    },
    container1: {
        width: scale(390),
        height: scale(160),
        backgroundColor: '#212020ff',
        borderRadius: 59,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    yellowGlow: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 20,
        borderBottomLeftRadius: 59,
        borderBottomRightRadius: 59,
    },
    whiteGlow: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 25,
        borderBottomLeftRadius: 59,
        borderBottomRightRadius: 59,
    },
    mallName: {
        fontSize: scale(20),
        fontWeight: '600',
        color: '#fff',
    },
    mallLocation: {
        fontSize: scale(12),
        color: '#fff',
        marginTop: scale(3),
    },
    arrowCircle: {
        width: scale(96),
        height: scale(80),
        borderRadius: scale(16),
        justifyContent: 'center',
        alignItems: 'center',
    },
    mallImage: {
        width: scale(50),
        height: scale(50),
        alignSelf: 'center',
        marginTop: scale(30),
    },
});
