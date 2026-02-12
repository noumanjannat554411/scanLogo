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
    ImageBackground,
    Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { buildings } from '../assets/data/arrays/buildings-data';
import { images } from '../assets/images/images';
import { scale } from '../utils/functions';
import ARModelViewer from '../components/ARModelViewer';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'RoomTypes'>;

export default function RoomTypesScreen({ route, navigation }: Props) {
    const { buildingId } = route.params;
    const building = buildings.find((b) => b.id === buildingId)!;
    const insets = useSafeAreaInsets();
    const [showARViewer, setShowARViewer] = useState(false);

    const handleViewIn3D = () => {
        if (building.modelUrl) {
            setShowARViewer(true);
        } else {
            Alert.alert('3D Model Not Available', 'The 3D model for this building is not available yet.');
        }
    };
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Background */}
            <LinearGradient
                colors={['#2D2520', '#3D3530', '#2D2520']}
                style={StyleSheet.absoluteFill}
            />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={images.back}
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

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 30 }}
            >
                {/* Building Title */}
                <View style={styles.titleSection}>
                    <View style={styles.titleRow}>
                        <Text style={styles.buildingName}>{building.name}</Text>
                        {buildingId === 1 && <View style={styles.goldenVisaBadge}>
                            <LinearGradient
                                colors={['#D4A847', '#B8891E']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.goldenVisaBadgeBg}
                            />
                            <Text style={styles.goldenVisaBadgeText}>Eligible for{'\n'}Golden Visa</Text>
                        </View>}
                    </View>
                    <Text style={styles.subtitle}>Choose your apartment type</Text>
                </View>

                {/* Room Type Cards */}
                <View style={styles.cardsContainer}>
                    {building.roomTypes.map((room, index) => (
                        <TouchableOpacity
                            key={room.id}
                            style={styles.roomCard}
                            activeOpacity={0.9}
                            onPress={() => {
                                navigation.navigate('BuildingDetail', { buildingId: building.id, roomTypeId: room.id });
                            }}
                        >
                            {/* Room Image */}
                            <View style={styles.roomImageWrapper}>
                                <Image
                                    source={{ uri: room.image }}
                                    style={styles.roomImage}
                                    resizeMode="cover"
                                />
                                {/* Gradient overlay */}
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.5)']}
                                    style={styles.roomImageOverlay}
                                />
                            </View>

                            {/* Room Info */}
                            <View style={styles.roomInfo}>
                                <View style={styles.roomHeader}>
                                    <View style={styles.roomIconContainer}>
                                        <Text style={styles.roomIcon}>{room.icon}</Text>
                                    </View>
                                    <Text style={styles.roomName}>{room.name}</Text>
                                </View>
                                <View style={styles.roomDetails}>
                                    <Text style={styles.roomPrice}>From {room.priceFrom}</Text>
                                    <Text style={styles.roomSqft}>{room.sqft}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Bottom Info */}
                <View style={styles.bottomInfo}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoIcon}>📍</Text>
                        <Text style={styles.infoText}>{building.location}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoIcon}>🏗️</Text>
                        <Text style={styles.infoText}>Built in {building.yearBuilt} by {building.developer}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoIcon}>🏢</Text>
                        <Text style={styles.infoText}>{building.totalUnits} total units available</Text>
                    </View>
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
                </View>
                {/* Golden Visa Button */}
                {buildingId === 1 && <View style={styles.goldenVisaSection}>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate('GoldenVisa', { buildingId: building.id })}
                    >
                        <LinearGradient
                            colors={['#D4A847', '#C4982F', '#B8891E']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.goldenVisaButton}
                        >
                            <View style={styles.goldenVisaContent}>
                                <Text style={styles.goldenVisaEmoji}>🇦🇪</Text>
                                <View style={styles.goldenVisaTextWrap}>
                                    <Text style={styles.goldenVisaTitle}>Apply for Golden Visa</Text>
                                    <Text style={styles.goldenVisaSubtitle}>Invest AED 2M+ in property → 5-year residency</Text>
                                </View>
                                <Text style={styles.goldenVisaArrow}>›</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>}
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
        backgroundColor: '#2D2520',
    },
    header: {
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
    scrollView: {
        flex: 1,
    },

    // Title
    titleSection: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    buildingName: {
        fontSize: scale(32),
        fontWeight: '800',
        color: '#fff',
        marginBottom: 4,
        flex: 1,
    },
    goldenVisaBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 12,
        overflow: 'hidden',
        marginLeft: 12,
        marginTop: 4,
    },
    goldenVisaBadgeBg: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 12,
    },
    goldenVisaBadgeIcon: {
        fontSize: 12,
        color: '#1a1510',
        marginRight: 5,
    },
    goldenVisaBadgeText: {
        fontSize: scale(8),
        fontWeight: '800',
        color: '#1a1510',
        lineHeight: 13,
    },
    subtitle: {
        fontSize: scale(14),
        color: 'rgba(255,255,255,0.5)',
    },

    // Cards
    cardsContainer: {
        paddingHorizontal: 24,
        gap: 16,
    },
    roomCard: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    roomImageWrapper: {
        width: '100%',
        height: scale(150),
        position: 'relative',
    },
    roomImage: {
        width: '100%',
        height: '100%',
    },
    roomImageOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    roomInfo: {
        padding: 16,
    },
    roomHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    roomIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    roomIcon: {
        fontSize: 16,
    },
    roomName: {
        fontSize: scale(18),
        fontWeight: '700',
        color: '#fff',
    },
    roomDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    roomPrice: {
        fontSize: scale(14),
        color: '#FFC082',
        fontWeight: '600',
    },
    roomSqft: {
        fontSize: scale(12),
        color: 'rgba(255,255,255,0.5)',
    },

    // Bottom Info
    bottomInfo: {
        paddingHorizontal: 24,
        paddingTop: 30,
        gap: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoIcon: {
        fontSize: 16,
        marginRight: 10,
    },
    infoText: {
        fontSize: scale(13),
        color: 'rgba(255,255,255,0.6)',
    },
    // Actions
    actionsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 12,
        marginBottom: 20,
        marginTop: 20,
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

    // Golden Visa Button
    goldenVisaSection: {
        paddingHorizontal: 24,
        paddingTop: 28,
    },
    goldenVisaButton: {
        borderRadius: 18,
        padding: 18,
        shadowColor: '#D4A847',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    goldenVisaContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    goldenVisaEmoji: {
        fontSize: 28,
        marginRight: 14,
    },
    goldenVisaTextWrap: {
        flex: 1,
    },
    goldenVisaTitle: {
        fontSize: scale(16),
        fontWeight: '800',
        color: '#1a1510',
        marginBottom: 2,
    },
    goldenVisaSubtitle: {
        fontSize: scale(11),
        color: 'rgba(26,21,16,0.6)',
        fontWeight: '500',
    },
    goldenVisaArrow: {
        fontSize: 32,
        color: 'rgba(26,21,16,0.4)',
        fontWeight: '300',
    },
});
