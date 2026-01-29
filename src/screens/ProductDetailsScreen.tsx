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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList, Product } from '../types/navigation';
import { images } from '../assets/images/images';
import { product } from '../assets/data/arrays/data';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen({ route, navigation }: Props) {
    const { brand = "Nike", products = product.nike } = route.params ?? {brand: "Nike", products: product.nike};
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>('9');
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const carouselRef = useRef<any>(null);

    const handleProductPress = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleViewIn3D = () => {
        if (selectedProduct) {
            Linking.openURL(selectedProduct.url).catch((err) =>
                console.error('Failed to open URL:', err)
            );
        }
    };

    const handleBackToList = () => {
        setSelectedProduct(null);
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
            <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.menuIcon}>☰</Text>
                    </TouchableOpacity>

                    <Image source={images.logo} style={styles.logo} resizeMode="contain" />

                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Text style={styles.searchIcon}>🔍</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Text style={styles.bellIcon}>🔔</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            {selectedProduct ? (
                // Individual Product Detail View (Screen 2)
                <ScrollView
                    style={styles.detailView}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Top Section with Size Selector and Favorite */}
                    <View style={styles.topSection}>
                        <View style={styles.sizeRow}>
                            <Text style={styles.sizeLabel}>Size</Text>
                            <View style={styles.sizeButtonsRow}>
                                {['8', '9', '10'].map((size) => (
                                    <TouchableOpacity
                                        key={size}
                                        style={[
                                            styles.sizeButton,
                                            selectedSize === size && styles.sizeButtonActive,
                                        ]}
                                        onPress={() => setSelectedSize(size)}
                                    >
                                        <Text
                                            style={[
                                                styles.sizeButtonText,
                                                selectedSize === size && styles.sizeButtonTextActive,
                                            ]}
                                        >
                                            {size}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        <TouchableOpacity style={styles.favoriteBtn}>
                            <Text style={styles.heartIcon}>♡</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.payBadge}>
                            <Text style={styles.payText}>Pay</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Product Image - Centered */}
                    <View style={styles.imageSection}>
                        <Image
                            source={selectedProduct.image}
                            style={styles.productImageDetail}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Product Info Section */}
                    <View style={styles.infoSection}>
                        {/* Product Name */}
                        <Text style={styles.productName}>{selectedProduct.title}</Text>

                        {/* Rating */}
                        {renderStars()}

                        {/* Price */}
                        <Text style={styles.price}>{selectedProduct.price}</Text>

                        {/* Nike Label */}
                        <Text style={styles.nikeLabel}>Nike</Text>

                        {/* Description */}
                        <View style={styles.descriptionBox}>
                            <Text style={styles.descriptionTitle}>Description</Text>
                            <Text style={styles.descriptionText}>
                                Lorem Ipsum Dolor Sit Amet Consectetur. Sed Blandit In Molestie Aliquet. Tempor Malesuada Id Eget Tempus Molestie Amet Volutpat. Lectus Aliquet Habitasse Urna Ut Adipiscing Nunc Commodo Morbi Id Turpis Semper Nullam. Sed Commodo Amet Venenatis Mauris Pharetra...
                            </Text>
                            <TouchableOpacity>
                                <Text style={styles.showMore}>Show More</Text>
                            </TouchableOpacity>
                        </View>

                        {/* View in 3D Button */}
                        <TouchableOpacity
                            style={styles.view3DButton}
                            onPress={handleViewIn3D}
                        >
                            <Text style={styles.cubeIcon}>📦</Text>
                            <Text style={styles.view3DText}>View in 3D</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            ) : (
                // Product List/Carousel View (Screen 1) - 3D Coverflow Effect
                <View style={styles.listView}>

                    <View style={styles.carouselContainer}>
                        <Carousel
                            ref={carouselRef}
                            loop={false}
                            width={width}
                            height={height * 0.7}
                            data={products}
                            scrollAnimationDuration={500}
                            onSnapToItem={(index: number) => setCurrentIndex(index)}
                            mode="parallax"
                            modeConfig={{
                                parallaxScrollingScale: 0.75,
                                parallaxScrollingOffset: 100,
                            }}
                            windowSize={3}
                            style={{ width: width }}
                            renderItem={({ item: product }: { item: Product }) => (
                            <TouchableOpacity
                                style={styles.carouselCard}
                                onPress={() => handleProductPress(product)}
                                activeOpacity={0.95}
                            >
                                <View style={styles.productCard}>
                                    {/* Product Image */}
                                    <Image
                                        source={product.image}
                                        style={styles.cardProductImage}
                                        resizeMode="contain"
                                    />

                                    {/* Gradient Overlay at Bottom */}
                                    <LinearGradient
                                        colors={['transparent', 'rgba(0,0,0,0.9)']}
                                        style={styles.gradientOverlay}
                                    >
                                        <View style={styles.cardContent}>
                                            <Text style={styles.productTitle}>{product.title}</Text>
                                            <Text style={styles.productCategory}>{product.type}</Text>

                                            <View style={styles.bottomRow}>
                                                {/* Pagination Dots */}
                                                <View style={styles.pagination}>
                                                    {products.map((_, dotIndex) => (
                                                        <View
                                                            key={dotIndex}
                                                            style={[
                                                                styles.paginationDot,
                                                                currentIndex === dotIndex && styles.paginationDotActive
                                                            ]}
                                                        />
                                                    ))}
                                                </View>

                                                {/* Price */}
                                                <Text style={styles.priceTag}>${product.price}</Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    </View>
                </View>
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
        backgroundColor: '#1a1a1a',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#1a1a1a',
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
        backgroundColor: '#1a1a1a',
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
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
    },
    carouselCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productCard: {
        width: '100%',
        height: height * 0.65,
        borderRadius: 24,
        backgroundColor: '#2a2a2a',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 20,
    },
    cardProductImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        justifyContent: 'flex-end',
    },
    cardContent: {
        padding: 24,
        paddingBottom: 32,
    },
    productTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    productCategory: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 20,
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
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },

    // Detail View (Screen 2)
    detailView: {
        flex: 1,
        backgroundColor: '#1a1a1a',
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
