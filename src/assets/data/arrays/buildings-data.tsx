import { models } from '../../models/models';

export interface Amenity {
    icon: string;
    label: string;
    count: number;
}

export interface RoomType {
    id: number;
    name: string;
    icon: string;
    image: string;
    priceFrom: string;
    sqft: string;
}

export interface Building {
    id: number;
    name: string;
    location: string;
    heroImage: string;
    thumbnailImage: string;
    modelImage: string;
    rating: number;
    reviewCount: number;
    price: string;
    priceUnit: string;
    description: string;
    fullDescription: string;
    amenities: Amenity[];
    roomTypes: RoomType[];
    modelUrl: string;
    modelLocalFile?: number;
    features: string[];
    yearBuilt: string;
    developer: string;
    totalUnits: number;
}

export const buildings: Building[] = [
    {
        id: 1,
        name: 'Vibe Apartments',
    location: 'Downtown Dubai',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80',
        modelImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
        rating: 4,
        reviewCount: 178,
    price: 'AED 4,165.45',
        priceUnit: '/month',
    description: 'Luxurious apartment in the heart of Downtown Dubai with modern finishes and stunning city views, moments from the Dubai Mall and the Burj Khalifa.',
    fullDescription: 'Luxurious apartment in the heart of Downtown Dubai with modern finishes and stunning city views, moments from the Dubai Mall and the Burj Khalifa. The residence features premium fixtures, floor-to-ceiling windows, and access to exclusive amenities including a rooftop pool, fitness centre, and 24/7 concierge. Ideal for urban living and investment in Dubai’s central district.',
        amenities: [
            { icon: '🛋️', label: 'Living', count: 3 },
            { icon: '🛏️', label: 'Beds', count: 2 },
            { icon: '🚿', label: 'Baths', count: 2 },
            { icon: '🪑', label: 'Rooms', count: 4 },
        ],
        roomTypes: [
            {
                id: 1,
                name: 'Studio',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
                priceFrom: 'AED 3,119.50',
                sqft: '450 sqft',
            },
            {
                id: 2,
                name: '1 Bedroom',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
                priceFrom: 'AED 4,165.45',
                sqft: '720 sqft',
            },
            {
                id: 3,
                name: '2 Bedroom',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
                priceFrom: 'AED 6,055.50',
                sqft: '1,050 sqft',
            },
        ],
        modelUrl: 'https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal1.glb',
        modelLocalFile: models.modal1,
        features: ['Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden'],
        yearBuilt: '2024',
    developer: 'Vibe Realty Dubai',
        totalUnits: 120,
    },
    {
        id: 2,
        name: 'Classic Apartment',
    location: 'Business Bay, Dubai',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
        modelImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
        rating: 4.5,
        reviewCount: 234,
    price: 'AED 5,321.50',
        priceUnit: '/month',
    description: 'A classic architectural residence in Business Bay, offering premium finishes and easy access to Dubai Canal and key business districts.',
    fullDescription: 'A classic architectural residence in Business Bay, offering premium finishes and easy access to Dubai Canal and key business districts. Residents enjoy elegant lobbies, high-spec smart home systems, and proximity to dining and leisure along the waterfront.',
        amenities: [
            { icon: '🛋️', label: 'Living', count: 4 },
            { icon: '🛏️', label: 'Beds', count: 3 },
            { icon: '🚿', label: 'Baths', count: 2 },
            { icon: '🪑', label: 'Rooms', count: 5 },
        ],
        roomTypes: [
            {
                id: 1,
                name: 'Studio',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
                priceFrom: 'AED 3,486.50',
                sqft: '500 sqft',
            },
            {
                id: 2,
                name: '1 Bedroom',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
                priceFrom: 'AED 5,321.50',
                sqft: '780 sqft',
            },
            {
                id: 3,
                name: '2 Bedroom',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
                priceFrom: 'AED 7,707.00',
                sqft: '1,200 sqft',
            },
        ],
        modelUrl: 'https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal2.glb',
        modelLocalFile: models.modal2,
        features: ['Rooftop Terrace', 'Gym', 'Doorman', 'Laundry', 'Pet Friendly'],
        yearBuilt: '2023',
    developer: 'Classic Living Dubai',
        totalUnits: 85,
    },
    {
        id: 3,
        name: 'Skyline Residences',
    location: 'Downtown Dubai',
    heroImage: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=400&q=80',
        modelImage: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=400&q=80',
        rating: 5,
        reviewCount: 312,
    price: 'AED 8,074.00',
        priceUnit: '/month',
    description: 'Ultra-modern luxury living in Downtown Dubai with panoramic views of the city and Burj Khalifa, featuring smart home integration and high-end finishes.',
    fullDescription: 'Ultra-modern luxury living in Downtown Dubai with panoramic views of the city and Burj Khalifa. Residences include Italian marble countertops, hardwood flooring, and designer fixtures. Residents enjoy exclusive amenities such as an infinity pool, spa, private cinema, and rooftop lounge—perfect for premium Dubai living.',
        amenities: [
            { icon: '🛋️', label: 'Living', count: 5 },
            { icon: '🛏️', label: 'Beds', count: 4 },
            { icon: '🚿', label: 'Baths', count: 3 },
            { icon: '🪑', label: 'Rooms', count: 7 },
        ],
        roomTypes: [
            {
                id: 1,
                name: 'Studio',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
                priceFrom: 'AED 4,404.00',
                sqft: '550 sqft',
            },
            {
                id: 2,
                name: '1 Bedroom',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
                priceFrom: 'AED 8,074.00',
                sqft: '900 sqft',
            },
            {
                id: 3,
                name: '2 Bedroom',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
                priceFrom: 'AED 12,845.00',
                sqft: '1,400 sqft',
            },
            {
                id: 4,
                name: 'Penthouse',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
                priceFrom: 'AED 21,286.00',
                sqft: '2,200 sqft',
            },
        ],
        modelUrl: 'https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal3.glb',
        modelLocalFile: models.modal3,
        features: ['Infinity Pool', 'Spa', 'Cinema', 'Concierge', 'Valet Parking'],
        yearBuilt: '2025',
    developer: 'Skyline Dubai Properties',
        totalUnits: 200,
    },
    {
        id: 4,
        name: 'The Greenview',
    location: 'Dubai Marina',
    heroImage: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&q=80',
        modelImage: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&q=80',
        rating: 4,
        reviewCount: 156,
    price: 'AED 6,606.00',
        priceUnit: '/month',
    description: 'Sustainable luxury living in Dubai Marina with green rooftops, solar systems, and easy access to the marina promenade.',
    fullDescription: 'Sustainable luxury living in Dubai Marina with green rooftops, solar systems, and easy access to the marina promenade. The Greenview focuses on energy-efficient systems, EV charging, and community green spaces while offering premium amenities and waterfront living.',
        amenities: [
            { icon: '🛋️', label: 'Living', count: 3 },
            { icon: '🛏️', label: 'Beds', count: 2 },
            { icon: '🚿', label: 'Baths', count: 2 },
            { icon: '🪑', label: 'Rooms', count: 5 },
        ],
        roomTypes: [
            {
                id: 1,
                name: 'Studio',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
                priceFrom: 'AED 3,670.00',
                sqft: '480 sqft',
            },
            {
                id: 2,
                name: '1 Bedroom',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
                priceFrom: 'AED 6,606.00',
                sqft: '800 sqft',
            },
            {
                id: 3,
                name: '2 Bedroom',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
                priceFrom: 'AED 10,276.00',
                sqft: '1,150 sqft',
            },
        ],
        modelUrl: 'https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal4.glb',
        modelLocalFile: models.modal4,
        features: ['Green Roof', 'Solar Power', 'EV Charging', 'Garden', 'Bike Storage'],
        yearBuilt: '2024',
    developer: 'GreenBuild Dubai',
        totalUnits: 95,
    },
];
