import { images } from "../../images/images";
import { models } from "../../models/models";

// Construction Company Projects Data
export const constructionCompanies = {
    // Bechtel Corporation - Major Infrastructure Projects
    bechtel: [
        {
            id: 1,
            image: images.shoes1,
            title: "Steinway Tower - Ultra Luxury Skyscraper",
            price: "$250M",
            type: "Commercial Building",
            url: "https://www.bechtel.com/",
            modelUrl: "https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal1.glb",
            modelLocalFile: models.modal1,
            description: "A state-of-the-art 40-story commercial office complex featuring sustainable design, LEED Platinum certification, smart building technology, and premium amenities for modern businesses."
        },
        {
            id: 2,
            image: images.shoes2,
            title: "Modern Tower Office Complex",
            price: "$180M",
            type: "Residential Building",
            url: "https://www.bechtel.com/",
            modelUrl: "https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal2.glb",
            modelLocalFile: models.modal2,
            description: "An exclusive 35-floor luxury residential tower with panoramic city views, rooftop gardens, infinity pool, private gym, and concierge services."
        },
        {
            id: 3,
            image: images.shoes3,
            title: "Futuristic Smart Building",
            price: "$320M",
            type: "Commercial Complex",
            url: "https://www.bechtel.com/",
            modelUrl: "https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal3.glb",
            modelLocalFile: models.modal3,
            description: "A massive 5-level shopping and entertainment destination featuring 200+ retail stores, cinema complex, food court, and indoor theme park."
        },
        {
            id: 4,
            image: images.shoes4,
            title: "Architectural Print Buildings",
            price: "$420M",
            type: "Corporate Campus",
            url: "https://www.bechtel.com/",
            modelUrl: "https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal4.glb",
            modelLocalFile: models.modal4,
            description: "An innovative tech campus spanning 50 acres with multiple buildings, research facilities, collaboration spaces, and eco-friendly design."
        }
    ],
    
    // Turner Construction - Building Projects
    turner: [
        {
            id: 1,
            image: images.shirt1,
            title: "Steinway Tower - Ultra Luxury Skyscraper",
            price: "$185M",
            type: "Public Facility",
            url: "https://www.turnerconstruction.com/",
            modelUrl: "https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal1.glb",
            modelLocalFile: models.modal1,
            description: "Massive convention center expansion with 150,000 sq ft of exhibition space, state-of-the-art meeting rooms, and modern hospitality facilities."
        },
        {
            id: 2,
            image: images.shirt2,
            title: "Modern Tower Office Complex",
            price: "$95M",
            type: "Educational Facility",
            url: "https://www.turnerconstruction.com/",
            modelUrl: "https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal2.glb",
            modelLocalFile: models.modal2,
            description: "A cutting-edge science and research facility featuring advanced laboratories, collaborative learning spaces, and sustainable design elements."
        },
        {
            id: 3,
            image: images.shirt3,
            title: "Futuristic Smart Building",
            price: "$140M",
            type: "Sports Facility",
            url: "https://www.turnerconstruction.com/",
            modelUrl: "https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal3.glb",
            modelLocalFile: models.modal3,
            description: "Multi-purpose sports complex with Olympic-size pool, basketball courts, fitness center, and spectator seating for 10,000 people."
        },
        {
            id: 4,
            image: images.shirt4,
            title: "Architectural Print Buildings",
            price: "$210M",
            type: "Technology Infrastructure",
            url: "https://www.turnerconstruction.com/",
            modelUrl: "https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal4.glb",
            modelLocalFile: models.modal4,
            description: "Enterprise-grade data center with redundant power systems, advanced cooling technology, and security features for mission-critical operations."
        }
    ],

    // Skanska - Construction Projects
    skanska: [
        {
            id: 1,
            image: images.shoes1,
            title: "Steinway Tower - Ultra Luxury Skyscraper",
            price: "$380M",
            type: "Infrastructure",
            url: "https://www.skanska.com/",
            modelUrl: "https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal1.glb",
            modelLocalFile: models.modal1,
            description: "Modern suspension bridge spanning 2.5 km with smart monitoring systems, seismic protection, and sustainable construction methods."
        },
        {
            id: 2,
            image: images.shoes2,
            title: "Modern Tower Office Complex",
            price: "$275M",
            type: "Transportation Hub",
            url: "https://www.skanska.com/",
            modelUrl: "https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal2.glb",
            modelLocalFile: models.modal2,
            description: "Integrated transit hub connecting metro, bus, and light rail systems with retail spaces and modern passenger amenities."
        },
        {
            id: 3,
            image: images.shoes3,
            title: "Futuristic Smart Building",
            price: "$450M",
            type: "Energy Infrastructure",
            url: "https://www.skanska.com/",
            modelUrl: "https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal3.glb",
            modelLocalFile: models.modal3,
            description: "State-of-the-art renewable energy facility combining solar, wind, and battery storage to power 50,000 homes sustainably."
        }
    ],

    // Fluor Corporation - Industrial & Energy Projects
    fluor: [
        {
            id: 1,
            image: images.shoes1,
            title: "Architectural Print Buildings",
            price: "$340M",
            type: "Industrial Facility",
            url: "https://www.fluor.com/",
            modelUrl: "https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal4.glb",
            modelLocalFile: models.modal4,
            description: "Advanced manufacturing facility with automated production lines, quality control systems, and environmental compliance infrastructure."
        },
        {
            id: 2,
            image: images.shoes2,
            title: "Futuristic Smart Building",
            price: "$280M",
            type: "Research & Development",
            url: "https://www.fluor.com/",
            modelUrl: "https://d2e54mdrms9tsc.cloudfront.net/Archive+4/modal3.glb",
            modelLocalFile: models.modal3,
            description: "Cutting-edge pharmaceutical R&D center with cleanrooms, laboratories, and clinical trial facilities meeting FDA standards."
        }
    ]
};

// Helper function to get company products by name
export const getCompanyProjects = (companyName: string) => {
    const normalizedName = companyName.toLowerCase().replace(/[^a-z]/g, '');
    
    // Map common variations to company names
    const companyMap: Record<string, string> = {
        'bechtel': 'bechtel',
        'turner': 'turner',
        'turnerconstruction': 'turner',
        'skanska': 'skanska',
        'fluor': 'fluor',
        'fluorcorporation': 'fluor',
    };

    const mappedName = companyMap[normalizedName];
    if (mappedName && constructionCompanies[mappedName as keyof typeof constructionCompanies]) {
        return constructionCompanies[mappedName as keyof typeof constructionCompanies];
    }

    return null;
};

// Company names for detection
export const CONSTRUCTION_COMPANIES = [
    'Bechtel',
    'Turner Construction',
    'Turner',
    'Skanska',
    'Fluor',
    'Fluor Corporation'
];
