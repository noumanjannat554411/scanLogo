import React, { useState, useRef } from 'react';
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
    Platform,
    ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, Product } from '../types/navigation';
import { images } from '../assets/images/images';
import { product } from '../assets/data/arrays/data';
import { scale } from '../utils/functions';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen({ route, navigation }: Props) {
    const { brand = "Nike", products = product.nike } = route.params ?? { brand: "Nike", products: product.nike };
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const carouselRef = useRef<any>(null);

    const handleProductPress = (product: Product) => {
        // Navigate to the full detail screen
        navigation.navigate('ProductDetailFull', { product });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={images.menu} style={{ width: scale(24), height: scale(24), tintColor: '#fff', resizeMode: "contain" }} />
                    </TouchableOpacity>

                    <Image source={images.logo} style={styles.logo} resizeMode="contain" />

                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Image source={images.notification} style={{ width: scale(24), height: scale(24), tintColor: '#fff', resizeMode: "contain" }} />

                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            {/* Product List/Carousel View - 3D Coverflow Effect */}
            <View style={styles.listView}>
                <Carousel
                    ref={carouselRef}
                    data={products}
                    renderItem={({ item: product, index }: { item: Product; index: number }) => (
                        <TouchableOpacity
                            style={[styles.carouselCard, { right: currentIndex === index + 1 || currentIndex === index + 2 ? scale(-20) : currentIndex === index - 1 ? scale(-20) : currentIndex === index ? scale(-20) : 0 }]}
                            onPress={() => handleProductPress(product)}
                            activeOpacity={0.95}
                        >
                            <ImageBackground source={images.backgroundImage} resizeMode='stretch' style={[
                                styles.productCard, styles.productCardActive
                            ]}>
                                {/* Product Image */}
                                <Image
                                    source={product.image}
                                    style={styles.cardProductImage}
                                    resizeMode="contain"
                                />

                                {/* Product Info */}
                                <View style={styles.cardContent}>
                                    <Text numberOfLines={1} style={[styles.productTitle, { fontSize: index === currentIndex ? scale(21) : scale(12.64) }]}>{product.title}</Text>
                                    <Text style={[styles.productCategory, { fontSize: index === currentIndex ? scale(17) : scale(10) }]}>{product.type}</Text>
                                    <Text style={[styles.priceTag, { fontSize: index === currentIndex ? scale(26) : scale(15.4) }]}>{product.price}</Text>
                                </View>


                            </ImageBackground>
                        </TouchableOpacity>
                    )}
                    sliderWidth={width}
                    itemWidth={width * 0.7}
                    onSnapToItem={(index: number) => setCurrentIndex(index)}
                    inactiveSlideScale={0.88}
                    inactiveSlideOpacity={1}
                    activeSlideAlignment="center"
                    containerCustomStyle={styles.carouselContainerCustom}
                    contentContainerCustomStyle={styles.carouselContentContainer}
                    loop={false}
                    enableMomentum={false}
                    decelerationRate={0.9}
                    useScrollView={true}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    safeArea: {
        backgroundColor: '#1a1a1a',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#000',
    },
    menuIcon: {
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

    // List View (Screen 1)
    listView: {
        flex: 1,
        backgroundColor: '#000',
    },
    homeScreenLabel: {
        fontSize: 14,
        color: '#888',
        paddingLeft: 24,
        paddingTop: 16,
        paddingBottom: 12,
    },
    carouselContainer: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    carouselContainerCustom: {
        flexGrow: 1,
        // justifyContent: 'center',
    },
    carouselContentContainer: {
        alignItems: 'center',
    },
    carouselCard: {
        justifyContent: 'center',
        alignItems: 'center',
        height: scale(395),
        width: scale(280)
    },
    productCard: {
        width: '100%',
        height: scale(273),
        borderRadius: 24,
        // backgroundColor: '#2a2a2a',
        overflow: 'visible',
        // shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 20,
    },
    productCardActive: {
        borderWidth: 2,
    },
    inactiveCardOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 24,
    },
    cardProductImage: {
        width: scale(300),
        height: scale(169),
        // position: 'absolute',
        overflow: 'visible',
        transform: [{ rotate: "-30deg" }],
        top: scale(-60),
        left: scale(-20),
    },
    gradientOverlay: {
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
        // height: '40%',
        // justifyContent: 'flex-end',
    },
    cardContent: {
        paddingHorizontal: scale(13),
        top: scale(-10)
    },
    productTitle: {
        fontSize: scale(21),
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    productCategory: {
        fontSize: scale(17),
        color: '#aaa',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pagination: {
        flexDirection: 'row',
        gap: 8,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#555',
    },
    paginationDotActive: {
        backgroundColor: '#fff',
        width: 24,
    },
    priceTag: {
        fontSize: scale(26),
        fontWeight: 'bold',
        color: '#fff',
    },

    // Detail View (Screen 2)
    detailView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#1a1a1a',
    },

    // Left Sidebar Styles
    leftSidebar: {
        width: 60,
        backgroundColor: '#1a1a1a',
        paddingVertical: 20,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRightWidth: 1,
        borderRightColor: '#2a2a2a',
    },
    sidebarSizeLabel: {
        fontSize: 11,
        color: '#888',
        fontWeight: '500',
        marginBottom: 12,
        transform: [{ rotate: '-90deg' }],
        width: 40,
    },
    sidebarSizeButton: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: '#2a2a2a',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1.5,
        borderColor: '#3a3a3a',
    },
    sidebarSizeButtonActive: {
        backgroundColor: '#FF6B35',
        borderColor: '#FF6B35',
    },
    sidebarSizeText: {
        fontSize: 16,
        color: '#888',
        fontWeight: '600',
    },
    sidebarSizeTextActive: {
        color: '#fff',
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
    topSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#1a1a1a',
    },
    sizeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    sizeLabel: {
        fontSize: 15,
        color: '#888',
        fontWeight: '500',
    },
    sizeButtonsRow: {
        flexDirection: 'row',
        gap: 10,
    },
    sizeButton: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: '#2a2a2a',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#3a3a3a',
    },
    sizeButtonActive: {
        backgroundColor: '#FF6B35',
        borderColor: '#FF6B35',
    },
    sizeButtonText: {
        fontSize: 16,
        color: '#888',
        fontWeight: '600',
    },
    sizeButtonTextActive: {
        color: '#fff',
    },
    favoriteBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#2a2a2a',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#3a3a3a',
        marginLeft: 12,
    },
    heartIcon: {
        fontSize: 24,
        color: '#fff',
    },
    payBadge: {
        backgroundColor: '#FF6B35',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        marginLeft: 12,
    },
    payText: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '700',
    },
    imageSection: {
        width: '100%',
        height: height * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        paddingHorizontal: 20,
    },
    productImageDetail: {
        width: '90%',
        height: '100%',
    },
    infoSection: {
        backgroundColor: '#1a1a1a',
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 40,
    },
    brandLabel: {
        fontSize: 12,
        color: '#888',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
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
    nikeLabel: {
        fontSize: 14,
        color: '#888',
        marginBottom: 20,
    },
    descriptionBox: {
        marginBottom: 28,
    },
    descriptionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 12,
    },
    descriptionText: {
        fontSize: 14,
        color: '#999',
        lineHeight: 22,
        marginBottom: 8,
    },
    showMore: {
        fontSize: 14,
        color: '#FF6B35',
        fontWeight: '600',
    },
    view3DButton: {
        flexDirection: 'row',
        backgroundColor: '#FF6B35',
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    cubeIcon: {
        fontSize: 22,
    },
    view3DText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 0.5,
    },
});
