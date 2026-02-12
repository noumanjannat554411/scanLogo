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
    Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { images } from '../assets/images/images';
import { scale } from '../utils/functions';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'GoldenVisa'>;

interface VisaCategory {
    title: string;
    icon: string;
    duration: string;
    investment: string;
    details: string[];
    highlight?: boolean;
}

const visaCategories: VisaCategory[] = [
    {
        title: 'Real Estate Investment',
        icon: '🏠',
        duration: '5-Year Golden Visa',
        investment: 'AED 2,000,000+',
        details: [
            'Own property or multiple properties worth at least AED 2 million',
            'Property can be purchased with a mortgage from approved UAE banks',
            'Off-plan properties from approved developers are eligible',
            'Covers spouse, children, and domestic helpers',
            'No minimum stay requirement in the UAE',
        ],
        highlight: true,
    },
    {
        title: 'Public Investment / Business',
        icon: '💼',
        duration: '10-Year Golden Visa',
        investment: 'AED 2,000,000+',
        details: [
            'Deposit of AED 2 million in an accredited UAE investment fund',
            'Or own a business with capital of at least AED 2 million',
            'Or pay annual taxes of at least AED 250,000 to the government',
            'Capital must be fully owned — not a loan',
            'Must provide medical insurance for self and family',
        ],
    },
    {
        title: 'Entrepreneur Visa',
        icon: '🚀',
        duration: '5-Year Golden Visa',
        investment: 'AED 500,000+',
        details: [
            'Own a project valued at not less than AED 500,000',
            'Project must be in a technical or future-oriented field',
            'Must obtain approval from relevant UAE authorities',
            'Must have endorsement from a UAE business incubator',
            'Focuses on innovation, risk, and future technology',
        ],
    },
    {
        title: 'Exceptional Talent',
        icon: '⭐',
        duration: '10-Year Golden Visa',
        investment: 'No financial requirement',
        details: [
            'Doctors, scientists, inventors, artists, and athletes',
            'Engineers in AI, big data, software, biotech, and more',
            'Requires a recommendation letter from relevant UAE authority',
            'Executive directors with 5+ years experience & AED 50K+ salary',
            'PhD holders and specialists in STEM fields',
        ],
    },
    {
        title: 'Outstanding Students',
        icon: '🎓',
        duration: '5–10 Year Golden Visa',
        investment: 'No financial requirement',
        details: [
            'High school students with 95%+ grade from UAE schools',
            'University graduates with GPA ≥ 3.5 from top 100 global universities',
            'UAE university graduates with GPA ≥ 3.5 (Class A) or ≥ 3.8 (Class B)',
            'Must have graduated within the last 2 years',
            'Endorsed by the Ministry of Education',
        ],
    },
    {
        title: 'Humanitarian Pioneers',
        icon: '🤝',
        duration: '10-Year Golden Visa',
        investment: 'AED 2,000,000 (for funders)',
        details: [
            'Members of international humanitarian organisations (5+ years)',
            'Employees of civil associations of public interest (5+ years)',
            'Recipients of humanitarian awards (local, regional, or international)',
            'Funders with contributions of AED 2 million or more',
            'Frontline heroes (e.g., COVID-19 medical workers)',
        ],
    },
];

export default function GoldenVisaScreen({ navigation }: Props) {
    const insets = useSafeAreaInsets();

    const handleApplyOnline = () => {
        Linking.openURL('https://smartservices.icp.gov.ae/echannels/web/client/guest/index.html#/goldenServicesDashboard');
    };

    const handleCheckEligibility = () => {
        Linking.openURL('https://smartservices.icp.gov.ae/echannels/web/client/guest/index.html#/checkEligibility');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <LinearGradient
                colors={['#1a1510', '#2D2520', '#1a1510']}
                style={StyleSheet.absoluteFill}
            />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={images.back} style={styles.headerIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Golden Visa</Text>
                <View style={styles.headerIcon} />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 30 }}
            >
                {/* Hero Banner */}
                <LinearGradient
                    colors={['#D4A847', '#C4982F', '#B8891E', '#A67914']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.heroBanner}
                >
                    <Text style={styles.heroEmoji}>🇦🇪</Text>
                    <Text style={styles.heroTitle}>UAE Golden Visa</Text>
                    <Text style={styles.heroSubtitle}>
                        Your gateway to long-term residency in the United Arab Emirates
                    </Text>
                    <View style={styles.heroBadge}>
                        <Text style={styles.heroBadgeText}>5 & 10 Year Residency</Text>
                    </View>
                </LinearGradient>

                {/* Key Benefits */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Key Benefits</Text>
                    <View style={styles.benefitsGrid}>
                        {[
                            { icon: '🏡', text: 'No Sponsor\nRequired' },
                            { icon: '👨‍👩‍👧‍👦', text: 'Sponsor\nFamily' },
                            { icon: '✈️', text: 'No Stay\nRestriction' },
                            { icon: '♾️', text: 'Unlimited\nDomestic Help' },
                            { icon: '🔄', text: 'Auto\nRenewable' },
                            { icon: '🛡️', text: 'Family\nProtection' },
                        ].map((item, i) => (
                            <View key={i} style={styles.benefitItem}>
                                <Text style={styles.benefitIcon}>{item.icon}</Text>
                                <Text style={styles.benefitText}>{item.text}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Visa Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Investment Categories</Text>
                    <Text style={styles.sectionSubtitle}>
                        Choose the visa pathway that suits your profile
                    </Text>

                    {visaCategories.map((category, index) => (
                        <View
                            key={index}
                            style={[
                                styles.categoryCard,
                                category.highlight && styles.categoryCardHighlight,
                            ]}
                        >
                            {category.highlight && (
                                <LinearGradient
                                    colors={['rgba(212,168,71,0.15)', 'rgba(212,168,71,0.05)']}
                                    style={styles.cardHighlightBg}
                                />
                            )}

                            <View style={styles.categoryHeader}>
                                <View style={styles.categoryIconWrap}>
                                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                                </View>
                                <View style={styles.categoryHeaderText}>
                                    <Text style={styles.categoryTitle}>{category.title}</Text>
                                    <Text style={styles.categoryDuration}>{category.duration}</Text>
                                </View>
                            </View>

                            <View style={styles.investmentBadge}>
                                <Text style={styles.investmentLabel}>Minimum Investment</Text>
                                <Text style={styles.investmentAmount}>{category.investment}</Text>
                            </View>

                            <View style={styles.detailsList}>
                                {category.details.map((detail, i) => (
                                    <View key={i} style={styles.detailRow}>
                                        <Text style={styles.detailBullet}>✦</Text>
                                        <Text style={styles.detailText}>{detail}</Text>
                                    </View>
                                ))}
                            </View>

                            {category.highlight && (
                                <View style={styles.recommendedBadge}>
                                    <Text style={styles.recommendedText}>★ Recommended for Property Buyers</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                {/* Important Notes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Important Information</Text>
                    <View style={styles.notesCard}>
                        {[
                            'The Golden Visa is valid for 5 or 10 years and is automatically renewable.',
                            'Visa holders can sponsor spouses, children (regardless of age), and domestic helpers.',
                            'Family members retain residency until permit expiry, even if the primary holder passes away.',
                            'Real estate purchased via mortgage from approved UAE banks qualifies for the visa.',
                            'Apply online through the ICP (Federal Authority for Identity, Citizenship, Customs & Port Security).',
                            'For Dubai-specific queries, contact GDRFA (General Directorate of Residency and Foreigners Affairs).',
                        ].map((note, i) => (
                            <View key={i} style={styles.noteRow}>
                                <Text style={styles.noteIcon}>ℹ️</Text>
                                <Text style={styles.noteText}>{note}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* CTA Buttons */}
                <View style={styles.ctaSection}>
                    <TouchableOpacity onPress={handleCheckEligibility} activeOpacity={0.8}>
                        <LinearGradient
                            colors={['#D4A847', '#B8891E']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.ctaButton}
                        >
                            <Text style={styles.ctaButtonText}>Check Your Eligibility</Text>
                            <Text style={styles.ctaButtonSubtext}>via ICP Official Portal</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleApplyOnline} activeOpacity={0.8} style={styles.ctaOutline}>
                        <Text style={styles.ctaOutlineText}>Apply Online</Text>
                        <Text style={styles.ctaOutlineSubtext}>ICP Golden Visa Services</Text>
                    </TouchableOpacity>
                </View>

                {/* Disclaimer */}
                <View style={styles.disclaimer}>
                    <Text style={styles.disclaimerText}>
                        Information sourced from the official UAE Government portal (u.ae). Requirements
                        may change — always verify with ICP or GDRFA for the latest updates.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1510',
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
        tintColor: '#D4A847',
        resizeMode: 'contain',
    },
    headerTitle: {
        fontSize: scale(18),
        fontWeight: '700',
        color: '#D4A847',
    },
    scrollView: {
        flex: 1,
    },

    // Hero
    heroBanner: {
        marginHorizontal: 20,
        borderRadius: 24,
        padding: 28,
        alignItems: 'center',
        marginBottom: 28,
    },
    heroEmoji: {
        fontSize: 48,
        marginBottom: 12,
    },
    heroTitle: {
        fontSize: scale(28),
        fontWeight: '900',
        color: '#1a1510',
        marginBottom: 8,
    },
    heroSubtitle: {
        fontSize: scale(14),
        color: 'rgba(26,21,16,0.7)',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 16,
    },
    heroBadge: {
        backgroundColor: 'rgba(26,21,16,0.15)',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    heroBadgeText: {
        fontSize: scale(12),
        fontWeight: '700',
        color: '#1a1510',
    },

    // Section
    section: {
        paddingHorizontal: 20,
        marginBottom: 28,
    },
    sectionTitle: {
        fontSize: scale(22),
        fontWeight: '800',
        color: '#fff',
        marginBottom: 6,
    },
    sectionSubtitle: {
        fontSize: scale(13),
        color: 'rgba(255,255,255,0.5)',
        marginBottom: 16,
    },

    // Benefits Grid
    benefitsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 16,
    },
    benefitItem: {
        width: (width - 64) / 3,
        backgroundColor: 'rgba(212,168,71,0.08)',
        borderRadius: 16,
        padding: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(212,168,71,0.15)',
    },
    benefitIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    benefitText: {
        fontSize: scale(11),
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        lineHeight: 15,
    },

    // Category Cards
    categoryCard: {
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        overflow: 'hidden',
    },
    categoryCardHighlight: {
        borderColor: 'rgba(212,168,71,0.4)',
    },
    cardHighlightBg: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 20,
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    categoryIconWrap: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: 'rgba(212,168,71,0.12)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    categoryIcon: {
        fontSize: 24,
    },
    categoryHeaderText: {
        flex: 1,
    },
    categoryTitle: {
        fontSize: scale(17),
        fontWeight: '700',
        color: '#fff',
        marginBottom: 2,
    },
    categoryDuration: {
        fontSize: scale(12),
        color: '#D4A847',
        fontWeight: '600',
    },
    investmentBadge: {
        backgroundColor: 'rgba(212,168,71,0.1)',
        borderRadius: 12,
        padding: 14,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    investmentLabel: {
        fontSize: scale(12),
        color: 'rgba(255,255,255,0.5)',
    },
    investmentAmount: {
        fontSize: scale(15),
        fontWeight: '800',
        color: '#D4A847',
    },
    detailsList: {
        gap: 10,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    detailBullet: {
        color: '#D4A847',
        fontSize: 10,
        marginRight: 10,
        marginTop: 4,
    },
    detailText: {
        flex: 1,
        fontSize: scale(13),
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 19,
    },
    recommendedBadge: {
        marginTop: 16,
        backgroundColor: 'rgba(212,168,71,0.15)',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    recommendedText: {
        fontSize: scale(12),
        fontWeight: '700',
        color: '#D4A847',
    },

    // Notes
    notesCard: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        padding: 18,
        gap: 14,
        marginTop: 12,
    },
    noteRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    noteIcon: {
        fontSize: 14,
        marginRight: 10,
        marginTop: 1,
    },
    noteText: {
        flex: 1,
        fontSize: scale(12),
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 18,
    },

    // CTA
    ctaSection: {
        paddingHorizontal: 20,
        gap: 14,
        marginBottom: 20,
    },
    ctaButton: {
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
    },
    ctaButtonText: {
        fontSize: scale(16),
        fontWeight: '800',
        color: '#1a1510',
    },
    ctaButtonSubtext: {
        fontSize: scale(11),
        color: 'rgba(26,21,16,0.6)',
        marginTop: 2,
    },
    ctaOutline: {
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#D4A847',
    },
    ctaOutlineText: {
        fontSize: scale(16),
        fontWeight: '800',
        color: '#D4A847',
    },
    ctaOutlineSubtext: {
        fontSize: scale(11),
        color: 'rgba(212,168,71,0.6)',
        marginTop: 2,
    },

    // Disclaimer
    disclaimer: {
        paddingHorizontal: 24,
        marginBottom: 10,
    },
    disclaimerText: {
        fontSize: scale(10),
        color: 'rgba(255,255,255,0.3)',
        textAlign: 'center',
        lineHeight: 15,
    },
});
