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
        location: 'New Boston',
        heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80',
        modelImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
        rating: 4,
        reviewCount: 178,
        price: '$1,135.00',
        priceUnit: '/month',
        description: 'This luxurious builder floor is strategically located at Boston. The apartment comes with all modern facilities. The house features wooden cabinets & modular fittings in the kitchen.',
        fullDescription: 'This luxurious builder floor is strategically located at Boston. The apartment comes with all modern facilities. The house features wooden cabinets & modular fittings in the kitchen. Spacious living areas with floor-to-ceiling windows offer breathtaking city views. The property includes premium amenities such as a rooftop pool, fitness center, and 24/7 concierge service.',
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
                priceFrom: '$850',
                sqft: '450 sqft',
            },
            {
                id: 2,
                name: '1 Bedroom',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
                priceFrom: '$1,135',
                sqft: '720 sqft',
            },
            {
                id: 3,
                name: '2 Bedroom',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
                priceFrom: '$1,650',
                sqft: '1,050 sqft',
            },
        ],
        modelUrl: 'https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal1.glb',
        modelLocalFile: models.modal1,
        features: ['Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden'],
        yearBuilt: '2024',
        developer: 'Vibe Developers',
        totalUnits: 120,
    },
    {
        id: 2,
        name: 'Classic Apartment',
        location: 'New Boston',
        heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
        modelImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
        rating: 4.5,
        reviewCount: 234,
        price: '$1,450.00',
        priceUnit: '/month',
        description: 'A classic architectural masterpiece in the heart of Boston. Features timeless design with modern amenities and premium finishes throughout.',
        fullDescription: 'A classic architectural masterpiece in the heart of Boston. Features timeless design with modern amenities and premium finishes throughout. The building offers a perfect blend of old-world charm and contemporary living with its marble lobbies, crown moldings, and state-of-the-art smart home systems.',
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
                priceFrom: '$950',
                sqft: '500 sqft',
            },
            {
                id: 2,
                name: '1 Bedroom',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
                priceFrom: '$1,450',
                sqft: '780 sqft',
            },
            {
                id: 3,
                name: '2 Bedroom',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
                priceFrom: '$2,100',
                sqft: '1,200 sqft',
            },
        ],
        modelUrl: 'https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal2.glb',
        modelLocalFile: models.modal2,
        features: ['Rooftop Terrace', 'Gym', 'Doorman', 'Laundry', 'Pet Friendly'],
        yearBuilt: '2023',
        developer: 'Classic Living Group',
        totalUnits: 85,
    },
    {
        id: 3,
        name: 'Skyline Residences',
        location: 'Downtown Boston',
        heroImage: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=400&q=80',
        modelImage: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=400&q=80',
        rating: 5,
        reviewCount: 312,
        price: '$2,200.00',
        priceUnit: '/month',
        description: 'Ultra-modern luxury living at its finest. Floor-to-ceiling windows with panoramic skyline views, smart home integration, and world-class amenities.',
        fullDescription: 'Ultra-modern luxury living at its finest. Floor-to-ceiling windows with panoramic skyline views, smart home integration, and world-class amenities. Each residence features Italian marble countertops, hardwood flooring, and designer fixtures. Residents enjoy access to an infinity pool, spa, private cinema, and rooftop lounge.',
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
                priceFrom: '$1,200',
                sqft: '550 sqft',
            },
            {
                id: 2,
                name: '1 Bedroom',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
                priceFrom: '$2,200',
                sqft: '900 sqft',
            },
            {
                id: 3,
                name: '2 Bedroom',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
                priceFrom: '$3,500',
                sqft: '1,400 sqft',
            },
            {
                id: 4,
                name: 'Penthouse',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
                priceFrom: '$5,800',
                sqft: '2,200 sqft',
            },
        ],
        modelUrl: 'https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal3.glb',
        modelLocalFile: models.modal3,
        features: ['Infinity Pool', 'Spa', 'Cinema', 'Concierge', 'Valet Parking'],
        yearBuilt: '2025',
        developer: 'Skyline Properties',
        totalUnits: 200,
    },
    {
        id: 4,
        name: 'The Greenview',
        location: 'Back Bay, Boston',
        heroImage: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80',
        thumbnailImage: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&q=80',
        modelImage: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&q=80',
        rating: 4,
        reviewCount: 156,
        price: '$1,800.00',
        priceUnit: '/month',
        description: 'Eco-friendly luxury apartments with sustainable design. Features green rooftops, solar panels, and energy-efficient systems throughout.',
        fullDescription: 'Eco-friendly luxury apartments with sustainable design. Features green rooftops, solar panels, and energy-efficient systems throughout. LEED Platinum certified, The Greenview offers a harmonious blend of luxury and sustainability with organic gardens, EV charging stations, and a community greenhouse.',
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
                priceFrom: '$1,000',
                sqft: '480 sqft',
            },
            {
                id: 2,
                name: '1 Bedroom',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
                priceFrom: '$1,800',
                sqft: '800 sqft',
            },
            {
                id: 3,
                name: '2 Bedroom',
                icon: '🏠',
                image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
                priceFrom: '$2,800',
                sqft: '1,150 sqft',
            },
        ],
        modelUrl: 'https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal4.glb',
        modelLocalFile: models.modal4,
        features: ['Green Roof', 'Solar Power', 'EV Charging', 'Garden', 'Bike Storage'],
        yearBuilt: '2024',
        developer: 'GreenBuild Corp',
        totalUnits: 95,
    },
];
