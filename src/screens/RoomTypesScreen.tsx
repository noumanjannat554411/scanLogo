import React from 'react';
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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { buildings } from '../assets/data/arrays/buildings-data';
import { images } from '../assets/images/images';
import { scale } from '../utils/functions';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'RoomTypes'>;

export default function RoomTypesScreen({ route, navigation }: Props) {
    const { buildingId } = route.params;
    const building = buildings.find((b) => b.id === buildingId)!;
    const insets = useSafeAreaInsets();

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
                    <Text style={styles.buildingName}>{building.name}</Text>
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
                                // Navigate to building detail
                                navigation.navigate('BuildingDetail', { buildingId: building.id });
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
                                    <Text style={styles.roomPrice}>From {room.priceFrom}/mo</Text>
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
            </ScrollView>
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
    buildingName: {
        fontSize: scale(32),
        fontWeight: '800',
        color: '#fff',
        marginBottom: 4,
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
});
