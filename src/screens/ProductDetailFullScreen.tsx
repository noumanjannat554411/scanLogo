import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Linking,
    Dimensions,
    StatusBar,
    ImageBackground,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, Product } from '../types/navigation';
import { images } from '../assets/images/images';
import { scale } from '../utils/functions';
import LinearGradient from 'react-native-linear-gradient';
import NativeARViewer from '../components/NativeARViewer';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetailFull'>;

export default function ProductDetailFullScreen({ route, navigation }: Props) {
    const { product, brand }: any = route.params;
    const [selectedSize, setSelectedSize] = useState<string>('9');
    const [showARViewer, setShowARViewer] = useState<boolean>(false);
    console.log(brand);

    const handleViewIn3D = () => {
        if (product.modelUrl) {
            setShowARViewer(true);
        } else {
            Alert.alert(
                'AR Model Not Available',
                'The 3D model for this product is not available yet. Please add the GLB file URL in the data.',
                [{ text: 'OK' }]
            );
        }
    };

    const renderStars = (rating: number = 4) => {
        return (
            <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Text key={star} style={styles.star}>
                        {star <= rating ? '★' : '☆'}
                    </Text>
                ))}
                <Text style={styles.reviewCount}>181 Reviews</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1a1a1a', '#2d2d2d', '#1a1a1a']}
                style={StyleSheet.absoluteFill}
            />
            <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={images.back} style={{ width: scale(24), height: scale(24), tintColor: '#fff', resizeMode: "contain" }} />
                    </TouchableOpacity>

                    <Image source={images.logo} style={styles.logo} resizeMode="contain" />

                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Image source={images.notification} style={{ width: scale(24), height: scale(24), tintColor: '#fff', resizeMode: "contain" }} />

                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            {/* Main Content with Sidebar */}
            <View style={styles.mainContent}>
                {/* Left Sidebar with Size Options and Icons */}
                <View style={styles.leftSidebar}>
                    {/* Size Label */}
                    <View>
                        <Text style={styles.sidebarSizeLabel}>Size</Text>

                        {/* Size Buttons */}
                        {['8', '9', '10'].map((size) => (
                            <ImageBackground source={images.glass} style={{ height: scale(38), width: scale(38), marginVertical: scale(8) }} resizeMode="contain" >
                                <TouchableOpacity
                                    key={size}
                                    style={[
                                        styles.sidebarSizeButton,
                                        selectedSize === size && styles.sidebarSizeButtonActive,
                                    ]}
                                    onPress={() => setSelectedSize(size)}
                                >
                                    <Text
                                        style={[
                                            styles.sidebarSizeText,
                                            selectedSize === size && styles.sidebarSizeTextActive,
                                        ]}
                                    >
                                        {size}
                                    </Text>
                                </TouchableOpacity>

                            </ImageBackground>
                        ))}

                    </View>

                    {/* Product Image - Large and Centered */}
                    <View style={route.params.brand === "Nike" ? styles.imageSection : styles.imageSectionRalph}>
                        <Image
                            source={product.image}
                            style={styles.productImageDetail}
                            resizeMode={brand === "Nike" ? "contain" : "stretch"}
                        />
                    </View>
                    <View style={{ alignItems: "center" }}>

                        <Text style={styles.sidebarPayText}>Fav</Text>

                        <ImageBackground source={images.glass} style={{ height: scale(38), width: scale(38), marginVertical: scale(8), justifyContent: "center", alignItems: "center" }} resizeMode="contain" >

                            <Text style={styles.sidebarIcon}>♡</Text>

                        </ImageBackground>

                    </View>
                    {/* Favorite Button */}
                </View>

                {/* Main Scrollable Content */}
                <ScrollView
                    style={styles.detailContent}
                    showsVerticalScrollIndicator={false}
                >

                    {/* Product Info Section */}
                    <View style={styles.infoSection}>
                        {/* Brand Label */}
                        <Text style={styles.brandLabel}>Nike</Text>

                        {/* Product Name */}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={styles.productName}>{product.title}</Text>
                            {/* Price */}
                            <Text style={styles.productName}>{product.price}</Text>

                        </View>

                        {/* Description */}
                        <View style={styles.descriptionBox}>
                            <Text style={styles.descriptionTitle}>Description</Text>
                            <Text style={styles.descriptionText}>
                                {product.description}
                            </Text>
                            {/* <TouchableOpacity>
                                <Text style={styles.showMore}>Show Less</Text>
                            </TouchableOpacity> */}
                        </View>

                        {/* View in 3D Button */}

                        <TouchableOpacity
                            style={styles.view3DButton}
                            onPress={handleViewIn3D}
                        >
                            <LinearGradient
                                colors={['#FF6200', '#FFC082', '#FF6200']}
                                style={StyleSheet.absoluteFill}
                            >
                                <View style={{ alignItems: "center", justifyContent: "center", flex: 1, flexDirection: "row", gap: scale(12) }}>
                                    <Image source={images.box} style={styles.cubeIcon} />
                                    <Text style={styles.view3DText}>View in 3D</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Buy Now and Add to Cart Buttons */}
                        <View style={styles.actionButtonsContainer}>
                            <TouchableOpacity
                                style={styles.buyNowButton}
                                onPress={() => {
                                    Alert.alert(
                                        'Coming Soon',
                                        'This feature will be available in the next phase.',
                                        [
                                            {
                                                text: 'OK',
                                                onPress: () => navigation.navigate('MallList'),
                                            },
                                        ]
                                    );
                                }}
                            >
                                <LinearGradient
                                    colors={['#667eea', '#764ba2']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.buyNowText}>🛒 Buy Now</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.addToCartButton}
                                onPress={() => {
                                    Alert.alert(
                                        'Coming Soon',
                                        'This feature will be available in the next phase.',
                                        [
                                            {
                                                text: 'OK',
                                                onPress: () => navigation.navigate('MallList'),
                                            },
                                        ]
                                    );
                                }}
                            >
                                <LinearGradient
                                    colors={['#4ade80', '#22c55e']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.addToCartText}>➕ Add to Cart</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/* Native AR Viewer Modal */}
            {product.modelUrl && (
                <NativeARViewer
                    visible={showARViewer}
                    modelUrl={product.modelUrl}
                    modelLocalFile={product.modelLocalFile}
                    productTitle={product.title}
                    onClose={() => setShowARViewer(false)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    safeArea: {
        backgroundColor: 'transparent',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: 'transparent',
    },
    backIcon: {
        fontSize: 28,
        color: '#fff',
        fontWeight: '300',
    },
    logo: {
        width: 120,
        height: 32,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconButton: {
        padding: 4,
    },
    searchIcon: {
        fontSize: 20,
    },
    bellIcon: {
        fontSize: 20,
    },

    // Main Content Layout
    mainContent: {
        flex: 1,
        paddingTop: scale(90),
        gap: scale(30)
    },

    // Left Sidebar Styles
    leftSidebar: {
        flexDirection: "row",
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        paddingHorizontal: scale(20),
    },
    sidebarSizeLabel: {
        fontSize: scale(16),
        color: '#fff',
        fontWeight: '500',
    },
    sidebarSizeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: scale(38), width: scale(38),
        borderRadius: scale(10),
    },
    sidebarSizeButtonActive: {
        backgroundColor: '#FF6B35',
        borderColor: '#FF6B35',
    },
    sidebarSizeText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    sidebarSizeTextActive: {
        color: '#000',
    },
    sidebarSpacer: {
        flex: 1,
    },
    sidebarIconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#2a2a2a',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1.5,
        borderColor: '#3a3a3a',
    },
    sidebarIcon: {
        fontSize: 22,
        color: '#fff',
    },
    sidebarPayButton: {
        backgroundColor: '#FF6B35',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 8,
    },
    sidebarPayText: {
        fontSize: 11,
        color: '#fff',
        fontWeight: '700',
    },

    // Main Content Area
    detailContent: {
        flex: 1,
    },
    imageSection: {
        marginLeft: scale(-50),
        width: scale(333),
        height: scale(155),
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: "-30deg" }],
    },
    imageSectionRalph: {
        width: scale(280),
        height: scale(270),
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImageDetail: {
        width: '100%',
        height: '100%',
    },
    infoSection: {
        backgroundColor: 'transparent',
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 40,
    },
    brandLabel: {
        fontSize: scale(14),
        color: '#888',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    productName: {
        fontSize: scale(20),
        fontWeight: '500',
        color: '#fff',
        marginBottom: 12,
        lineHeight: 30,
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    star: {
        fontSize: 18,
        color: '#FFD700',
        marginRight: 2,
    },
    reviewCount: {
        fontSize: 13,
        color: '#888',
        marginLeft: 8,
    },
    price: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    descriptionBox: {
        marginBottom: 28,
    },
    descriptionTitle: {
        fontSize: scale(16),
        fontWeight: '400',
        color: '#fff',
        marginBottom: 12,
    },
    descriptionText: {
        fontSize: scale(14),
        color: '#999',
        lineHeight: 22,
        marginBottom: 8,
        fontWeight: '400',
    },
    showMore: {
        fontSize: scale(14),
        color: '#FF6B35',
        fontWeight: '600',
    },
    view3DButton: {
        flexDirection: 'row',
        backgroundColor: '#FF6B35',
        borderRadius: scale(14),
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 2,
        width: scale(200),
        height: scale(50),
        alignSelf: 'center',
        overflow: 'hidden',
    },
    cubeIcon: {
        height: scale(22),
        width: scale(22),
    },
    view3DText: {
        fontSize: scale(18),
        fontWeight: '700',
        color: '#000',
        letterSpacing: 0.5,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        gap: scale(12),
        marginTop: scale(16),
        paddingHorizontal: scale(24),
        marginBottom: scale(20),
    },
    buyNowButton: {
        flex: 1,
        borderRadius: scale(14),
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    addToCartButton: {
        flex: 1,
        borderRadius: scale(14),
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#4ade80',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    buttonGradient: {
        paddingVertical: scale(16),
        paddingHorizontal: scale(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    buyNowText: {
        fontSize: scale(16),
        fontWeight: '700',
        color: '#fff',
        letterSpacing: 0.5,
    },
    addToCartText: {
        fontSize: scale(16),
        fontWeight: '700',
        color: '#fff',
        letterSpacing: 0.5,
    },
});
