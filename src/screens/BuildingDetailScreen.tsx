import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { buildings } from '../assets/data/arrays/buildings-data';
import { images } from '../assets/images/images';
import { scale } from '../utils/functions';
import NativeARViewer from '../components/NativeARViewer';
import ARModelViewer from '../components/ARModelViewer';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'BuildingDetail'>;

export default function BuildingDetailScreen({ route, navigation }: Props) {
    const { buildingId } = route.params;
    const building = buildings.find((b) => b.id === buildingId)!;
    const [activeTab, setActiveTab] = useState<'Details' | 'Reviews' | 'Map'>('Details');
    const [showARViewer, setShowARViewer] = useState(false);
    const insets = useSafeAreaInsets();

    const handleViewIn3D = () => {
        if (building.modelUrl) {
            setShowARViewer(true);
        } else {
            Alert.alert('3D Model Not Available', 'The 3D model for this building is not available yet.');
        }
    };

    const handleViewRoomTypes = () => {
        navigation.navigate('RoomTypes', { buildingId: building.id });
    };

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        return (
            <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Text key={star} style={styles.star}>
                        {star <= fullStars ? '★' : hasHalf && star === fullStars + 1 ? '★' : '☆'}
                    </Text>
                ))}
                <Text style={styles.reviewCount}>( {building.reviewCount} reviews )</Text>
            </View>
        );
    };

    const tabs: Array<'Details' | 'Reviews' | 'Map'> = ['Details'];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={images.back}
                        style={[styles.headerIcon, { tintColor: '#333' }]}
                    />
                </TouchableOpacity>

                <Image source={images.logo} style={styles.logo} resizeMode="contain" />

                <TouchableOpacity>
                    <Image
                        source={images.notification}
                        style={[styles.headerIcon, { tintColor: '#333' }]}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 30 }}
            >
                {/* 3D Building Model Image */}
                <View style={styles.modelContainer}>
                    <View style={styles.modelImageWrapper}>
                        <Image
                            source={{ uri: building.modelImage }}
                            style={styles.modelImage}
                            resizeMode="cover"
                        />
                        {/* Decorative checkered border effect */}
                        <View style={styles.modelBorderTop} />
                        <View style={styles.modelBorderBottom} />
                    </View>
                </View>

                {/* Building Name & Location */}
                <View style={styles.infoSection}>
                    <Text style={styles.buildingName}>{building.name}</Text>
                    <Text style={styles.locationText}>{building.location}</Text>

                    {/* Rating */}
                    {renderStars(building.rating)}

                    {/* Amenities Row */}
                    <View style={styles.amenitiesRow}>
                        {building.amenities.map((amenity, idx) => (
                            <View key={idx} style={styles.amenityItem}>
                                <Text style={styles.amenityIcon}>{amenity.icon}</Text>
                                <Text style={styles.amenityCount}>{amenity.count}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Price */}
                    <Text style={styles.price}>{building.price}</Text>

                    {/* Tabs */}
                    <View style={styles.tabsContainer}>
                        {tabs.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.tab, activeTab === tab && styles.tabActive]}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Tab Content */}
                    {activeTab === 'Details' && (
                        <View style={styles.tabContent}>
                            <Text style={styles.description}>{building.fullDescription}</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeMore}>See More</Text>
                            </TouchableOpacity>

                            {/* Features */}
                            <View style={styles.featuresSection}>
                                <Text style={styles.featuresTitle}>Features</Text>
                                <View style={styles.featuresList}>
                                    {building.features.map((feature, idx) => (
                                        <View key={idx} style={styles.featureChip}>
                                            <Text style={styles.featureChipText}>{feature}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            {/* Building Info */}
                            <View style={styles.buildingInfoGrid}>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>Developer</Text>
                                    <Text style={styles.infoValue}>{building.developer}</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>Year Built</Text>
                                    <Text style={styles.infoValue}>{building.yearBuilt}</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>Total Units</Text>
                                    <Text style={styles.infoValue}>{building.totalUnits}</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {activeTab === 'Reviews' && (
                        <View style={styles.tabContent}>
                            <Text style={styles.comingSoonText}>Reviews coming soon...</Text>
                        </View>
                    )}

                    {activeTab === 'Map' && (
                        <View style={styles.tabContent}>
                            <Text style={styles.comingSoonText}>Map view coming soon...</Text>
                        </View>
                    )}
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsContainer}>
                    {/* View in 3D Button */}
                    <TouchableOpacity style={styles.view3DButton} onPress={handleViewIn3D}>
                        <LinearGradient
                            colors={['#FF6200', '#FFC082', '#FF6200']}
                            style={StyleSheet.absoluteFill}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        />
                        <View style={styles.view3DContent}>
                            <Image source={images.box} style={styles.cubeIcon} />
                            <Text style={styles.view3DText}>View in 3D</Text>
                        </View>
                    </TouchableOpacity>

                    {/* View Room Types */}
                    <TouchableOpacity style={styles.roomTypesButton} onPress={handleViewRoomTypes}>
                        <Text style={styles.roomTypesArrow}>›</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* AR Viewer Modal */}
            {building.modelUrl && (
                <ARModelViewer
                    visible={showARViewer}
                    modelUrl={building.modelUrl}
                    productTitle={building.name}
                    onClose={() => setShowARViewer(false)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F0EB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: 'transparent',
        zIndex: 10,
    },
    headerIcon: {
        width: scale(24),
        height: scale(24),
        resizeMode: 'contain',
    },
    logo: {
        width: 120,
        height: 32,
        tintColor: '#333',
    },
    scrollView: {
        flex: 1,
    },

    // 3D Model Section
    modelContainer: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
    },
    modelImageWrapper: {
        width: scale(220),
        height: scale(200),
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#e8e0d8',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
    },
    modelImage: {
        width: '100%',
        height: '100%',
    },
    modelBorderTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    modelBorderBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },

    // Info Section
    infoSection: {
        paddingHorizontal: 24,
    },
    buildingName: {
        fontSize: scale(22),
        fontWeight: '700',
        color: '#2D2D2D',
        marginBottom: 4,
    },
    locationText: {
        fontSize: scale(14),
        color: '#888',
        marginBottom: 8,
    },
    starsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    star: {
        fontSize: 16,
        color: '#FFB800',
        marginRight: 2,
    },
    reviewCount: {
        fontSize: scale(12),
        color: '#888',
        marginLeft: 8,
    },

    // Amenities
    amenitiesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 20,
    },
    amenityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    amenityIcon: {
        fontSize: 18,
    },
    amenityCount: {
        fontSize: scale(14),
        color: '#555',
        fontWeight: '600',
    },

    // Price
    price: {
        fontSize: scale(24),
        fontWeight: '800',
        color: '#2D2D2D',
        marginBottom: 20,
    },

    // Tabs
    tabsContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0d8d0',
    },
    tab: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginRight: 8,
    },
    tabActive: {
        borderBottomWidth: 2,
        borderBottomColor: '#2D2D2D',
    },
    tabText: {
        fontSize: scale(14),
        color: '#999',
        fontWeight: '500',
    },
    tabTextActive: {
        color: '#2D2D2D',
        fontWeight: '700',
    },

    // Tab Content
    tabContent: {
        paddingVertical: 12,
    },
    description: {
        fontSize: scale(13),
        color: '#666',
        lineHeight: 22,
        marginBottom: 4,
    },
    seeMore: {
        fontSize: scale(13),
        color: '#2D2D2D',
        fontWeight: '700',
        marginBottom: 20,
    },
    comingSoonText: {
        fontSize: scale(14),
        color: '#999',
        textAlign: 'center',
        paddingVertical: 40,
    },

    // Features
    featuresSection: {
        marginBottom: 20,
    },
    featuresTitle: {
        fontSize: scale(16),
        fontWeight: '700',
        color: '#2D2D2D',
        marginBottom: 12,
    },
    featuresList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    featureChip: {
        backgroundColor: '#E8E0D8',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },
    featureChipText: {
        fontSize: scale(12),
        color: '#555',
        fontWeight: '500',
    },

    // Building Info Grid
    buildingInfoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#E8E0D8',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    infoItem: {
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: scale(11),
        color: '#888',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: scale(14),
        color: '#2D2D2D',
        fontWeight: '700',
    },

    // Actions
    actionsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 12,
        marginBottom: 20,
    },
    view3DButton: {
        flex: 1,
        height: scale(52),
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#FF6200',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    view3DContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
    cubeIcon: {
        height: scale(22),
        width: scale(22),
    },
    view3DText: {
        fontSize: scale(16),
        fontWeight: '700',
        color: '#000',
    },
    roomTypesButton: {
        width: scale(52),
        height: scale(52),
        borderRadius: 16,
        backgroundColor: '#2D2D2D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    roomTypesArrow: {
        fontSize: 28,
        color: '#fff',
        fontWeight: '300',
    },
});
