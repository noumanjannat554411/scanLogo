import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    StatusBar,
    ImageBackground,
    Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from '../utils/functions';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { images } from '../assets/images/images';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'MallList'>;

interface Mall {
    id: number;
    name: string;
    location: string;
    image: string;
}

const DUBAI_MALLS: Mall[] = [
    {
        id: 1,
        name: 'Mall of Emirates',
        location: 'Jebel Ali',
        image: images.mallOfEmirate,
    },
    {
        id: 2,
        name: 'Dubai Mall',
        location: 'Downtown Dubai',
        image: images.dubaiMall,
    },
    {
        id: 3,
        name: 'Ibn Battuta Mall',
        location: 'Jebel Ali',
        image: images.ibnbatouta,
    },
    {
        id: 4,
        name: 'Deira City Centre',
        location: 'Deira',
        image: images.cityWalk,
    },
    {
        id: 5,
        name: 'Marina Mall',
        location: 'Jebel Ali',
        image: images.marinaMall,
    },
];

export default function MallListScreen({ navigation }: Props) {
    const insets = useSafeAreaInsets();

    const handleMallSelect = (mall: Mall) => {
        navigation.navigate('BrandList', { mallName: mall.name });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#111" />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + scale(4) }]}>
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

            {/* Mall Cards */}
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {DUBAI_MALLS.map((mall, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.mallCard}
                        onPress={() => handleMallSelect(mall)}
                        activeOpacity={0.85}
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
                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: scale(40), paddingTop:scale(15) }}>
                                <View>
                                    <Text style={styles.mallName}>{mall.name}</Text>
                                    <Text style={styles.mallLocation}>{mall.location}</Text>
                                </View>
                                <Image source={images.next} style={styles.arrowCircle} />

                            </View>
                            <Image source={mall.image} style={styles.mallImage} />
                        </View>
                    </TouchableOpacity>
                ))}
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
        paddingTop: scale(6),
        paddingBottom: scale(10),
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(10),
    },
    titleIcon: {
        fontSize: scale(24),
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
    scrollView: {
        flex: 1,
        paddingTop: scale(20),
    },
    scrollContent: {
        paddingHorizontal: scale(20),
        paddingTop: scale(6),
        paddingBottom: scale(30),
    },
    mallCard: {
        marginBottom: scale(24),
        borderRadius: scale(16),
        overflow: 'hidden',
    },
    cardBg: {
        paddingHorizontal: scale(16),
        paddingTop: scale(14),
        paddingBottom: scale(14),
    },
    cardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: scale(10),
    },
    mallName: {
        fontSize: scale(20),
        fontWeight: '600',
        color: '#fff',
    },
    mallLocation: {
        fontSize: scale(12),
        color: 'rgba(255,255,255,0.6)',
        marginTop: scale(3),
    },
    arrowCircle: {
        width: scale(32),
        height: scale(32),
        borderRadius: scale(16),
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowText: {
        fontSize: scale(18),
        color: '#fff',
        fontWeight: '600',
    },
    mallImageWrap: {
        borderRadius: scale(12),
        overflow: 'hidden',
        height: scale(90),
    },
    mallImage: {
        width: scale(50),
        height: scale(50),
        alignSelf: 'center',
        marginTop: scale(30),
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

});
