import { images } from "../../images/images";
import { models } from "../../models/models";

export const product = {
    nike: [
        {
            id: 1,
            image: images.shoes1,
            title: "Air Jordan 1 Mid",
            price: "AED 477.43",
            type: "Shoes",
            url: "https://www.nike.com/t/air-jordan-1-mid-shoes-X5pM09/554724-069",
            modelUrl: "https://v3b.fal.media/files/b/0a8c551a/J99XN2J4IqSIAYshGYlP2_trellis2_e8e5d8e018b745e49f3897b716afee04.glb", // For WebView 3D
            modelLocalFile:models.shoe1, // For AR
            description: "Inspired by the original AJ1, the Air Jordan 1 Mid offers fans a chance to follow in MJ's footsteps. Fresh color trims the clean, classic materials, imbuing modernity into a classic design."
        }, {
            id: 2,
            image: images.shoes2,
            title: "Air Jordan 1 Retro Low OG",
            price: "AED 605.46",
            type: "Men's Shoes",
            url: "https://www.nike.com/t/air-jordan-1-retro-low-og-mens-shoes-T4NeOHrJ/IQ1108-011",
            modelUrl: "https://v3b.fal.media/files/b/0a8c555c/0zv5kvsvGB8iv2yzRtLhp_trellis2_1d957376f56c4a3ea07f089f3c10f097.glb", // For WebView 3D
            modelLocalFile: models.shoe2, // For AR
            description: "Luxe leather. Fresh colors. Iconic design. MJ's enduring legacy continues with this Greyish and Sail take on the AJ1. With hits of Metallic Gold to balance out the smooth palette, you can rock this low-cut fave from season to season."
        }, {
            id: 3,
            image: images.shoes3,
            title: "Air Jordan 1 Triple Stack",
            price: "AED 532.76",
            type: "Women's Shoes",
            url: "https://www.nike.com/t/air-jordan-1-triple-stack-womens-shoes-yjnkGjEW/HV8288-600",
            modelUrl: "https://v3b.fal.media/files/b/0a8c55c7/Nzkd4uzKGkNMAMCoN1KEn_trellis2_c49103396ec5431bae27ba617a20972d.glb", // For WebView 3D
            modelLocalFile: models.shoe3, // For AR
            description: "Stand tall with elevated style. Inspired by the original that debuted in 1985, the Air Jordan 1offers a clean, classic look that's familiar yet always fresh. This remix boldly reworks the icon's original magic with a triple-stacked sole. With an unmistakable design grounded in hoops heritage, these kicks ensure your 'fit is always on point."
        }, {
            id: 4,
            image: images.shoes4,
            title: "Air Jordan 1 Low",
            price: "AED 440.70",
            type: "Men's Shoes",
            url: "https://www.nike.com/t/air-jordan-1-low-mens-shoes-0LXhbn/553558-606",
            modelUrl: "https://v3b.fal.media/files/b/0a8c55db/UmbtmFNpySVzESqR_Wd-T_trellis2_84679022deb344fe87c32edc94b0804c.glb", // For WebView 3D
            modelLocalFile: models.shoe4, // For AR
            description: "Inspired by the original that debuted in 1985, the Air Jordan 1 Low offers a clean, classic look that's familiar yet always fresh. With an iconic design that pairs perfectly with any 'fit, these kicks ensure you'll always be on point."
        }, {
            id: 5,
            image: images.shoes5,
            title: "Air Jordan 1 Mid",
            price: "AED 477.43",
            type: "Women's Shoes",
            url: "https://www.nike.com/t/air-jordan-1-mid-womens-shoes-TB9sVQ/BQ6472-119",
            modelUrl: "https://v3b.fal.media/files/b/0a8c5605/dPk9Kzqq_xT17kQdVnCx6_trellis2_4f00b82dfc084d3489ff8cc6903f03eb.glb", // For WebView 3D
            modelLocalFile: models.shoe5, // For AR
            description: "The Air Jordan 1 Mid brings full-court style and premium comfort to an iconic look. Its Air-Sole unit cushions play on the hardwood, while the padded collar gives you a supportive feel."
        }, {
            id: 6,
            image: images.shoes6,
            title: "Air Jordan 1 Mid SE",
            price: "AED 514.15",
            type: "Men's Shoes",
            url: "https://www.nike.com/t/air-jordan-1-mid-se-mens-shoes-0loP2Ekm/IQ9387-010",
            modelUrl: "https://v3b.fal.media/files/b/0a8c5625/3AmZSuY3UjyILsvZxFNSk_trellis2_d61eb487eaca456c9264aa88bb52f30a.glb", // For WebView 3D
            modelLocalFile: models.shoe6, // For AR
            description: "Inspired by the original AJ1, this mid-top edition maintains the iconic look you love while choice colors and crisp leather give it a distinct identity."
        }
    ],
    ralphLauren: [
        {
            id: 1,
            image: images.shirt1,
            title: "Cotton-Cashmere Herringbone Shirt",
            price: "AED 6871.25",
            type: "Men/Clothing/Casual Shirts",
            url: "https://www.ralphlauren.global/pk/en/cotton-cashmere-herringbone-shirt-100084651.html",
            modelUrl: "https://hmdm-apk-file.s3.us-east-1.amazonaws.com/shirts/shirt1_mobile.glb", // For WebView 3D
            modelLocalFile: models.shoe1, // For AR
            description: "Exemplifying Ralph Lauren Purple Label’s mastery of textile innovation, this shirt is crafted from an Italian herringbone cloth that features a custom-developed colour and a cotton-and-cashmere fabrication."
        }, {
            id: 2,
            image: images.shirt2,
            title: "Cashmere Short-Sleeve Jumper",
            price: "AED 4028.73",
            type: "Men/Clothing/Jumpers & Cardigans/Jumpers",
            url: "https://www.ralphlauren.global/pk/en/cashmere-short-sleeve-jumper-100087019.html",
            modelUrl: "https://hmdm-apk-file.s3.us-east-1.amazonaws.com/shirts/shirt2_mobile.glb", // For WebView 3D
            modelLocalFile: models.shoe2, // For AR
            description: "A testament to Ralph Lauren's artistry in elevating everyday essentials, this jumper reinterprets the timeless T-shirt silhouette with supremely fine-gauge cashmere yarn and expert Italian crafting."
        }, {
            id: 3,
            image: images.shirt3,
            title: "Boulton Sateen Jacket",
            price: "AED 11612.45",
            type: "Men/Clothing/Jackets & Coats/Jackets",
            url: "https://www.ralphlauren.global/pk/en/boulton-sateen-jacket-100084653.html",
            modelUrl: "https://hmdm-apk-file.s3.us-east-1.amazonaws.com/shirts/shirt3_mobile.glb", // For WebView 3D
            modelLocalFile: models.shoe3, // For AR
            description: "To create the Boulton, Ralph Lauren reimagined a pilot’s jacket with expert Italian craftsmanship and refined cotton sateen. Its bi-swing construction and tailored back waistband ensure both an impeccable fit and ease of movement."
        }, {
            id: 4,
            image: images.shirt4,
            title: "Cashmere Roll Neck Jumper",
            price: "AED 6636.21",
            type: "Men/Clothing/Jumpers & Cardigans/Jumpers",
            url: "https://www.ralphlauren.global/pk/en/cashmere-roll-neck-jumper-100082921.html",
            modelUrl: "https://hmdm-apk-file.s3.us-east-1.amazonaws.com/shirts/shirt4_mobile.glb", // For WebView 3D
            modelLocalFile: models.shoe4, // For AR
            description: "Our featherweight Cradle to Cradle Certified® (C2C Certified®) Gold Roll Neck Jumper is knit with fine cashmere fibres sourced in Italy, dyed in rich hues and features a re-imagined cotton signature label. C2C certification is the global standard for products that are safe and circular. Ralph Lauren partnered with an independent assessment body to ensure that every component of this jumper meets the C2C Certified® Product Standards set by the Cradle to Cradle Products Innovation Institute (C2CPII)."
        },
    ]
} 