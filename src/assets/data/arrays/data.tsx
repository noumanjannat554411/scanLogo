import { images } from "../../images/images";
import { models } from "../../models/models";
// import { models } from "../../models/models";


export const product = {
    nike: [
        {
            image: images.shoes1,
            title: "Air Jordan 1 Mid",
            price: "$130",
            type: "Shoes",
            url: "https://www.nike.com/t/air-jordan-1-mid-shoes-X5pM09/554724-069",
            modelUrl: models.shoe1 // Uncomment when you add shoe1.glb
            // modelUrl: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb" // Temporary demo model
        }, {
            image: images.shoes2,
            title: "Air Jordan 1 Retro Low OG",
            price: "$165",
            type: "Men's Shoes",
            url: "https://www.nike.com/t/air-jordan-1-retro-low-og-mens-shoes-T4NeOHrJ/IQ1108-011",
            modelUrl: models.shoe2 // Temporary demo model
        }, {
            image: images.shoes3,
            title: "Air Jordan 1 Triple Stack",
            price: "$145",
            type: "Women's Shoes",
            url: "https://www.nike.com/t/air-jordan-1-triple-stack-womens-shoes-yjnkGjEW/HV8288-600",
            modelUrl: models.shoe3 // Temporary demo model
        }, {
            image: images.shoes4,
            title: "Air Jordan 1 Low",
            price: "$120",
            type: "Men's Shoes",
            url: "https://www.nike.com/t/air-jordan-1-low-mens-shoes-0LXhbn/553558-606",
            modelUrl: models.shoe4 // Temporary demo model
        }, {
            image: images.shoes5,
            title: "Air Jordan 1 Mid",
            price: "$130",
            type: "Women's Shoes",
            url: "https://www.nike.com/t/air-jordan-1-mid-womens-shoes-TB9sVQ/BQ6472-119",
            modelUrl: models.shoe5 // Temporary demo model
        }, {
            image: images.shoes6,
            title: "Air Jordan 1 Mid SE",
            price: "$140",
            type: "Men's Shoes",
            url: "https://www.nike.com/t/air-jordan-1-mid-se-mens-shoes-0loP2Ekm/IQ9387-010",
            modelUrl: models.shoe6 // Temporary demo model
        }
    ]
} 