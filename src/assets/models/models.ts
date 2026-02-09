// Import your GLB models here
// Place your .glb files in this directory and import them

export const models = {
    shoe1: require('./shoe1.glb'), // Air Jordan 1 Mid
    shoe2: require('./shoe2.glb'), // Air Jordan 1 Retro Low OG
    shoe3: require('./shoe3.glb'), // Air Jordan 1 Triple Stack
    shoe4: require('./shoe4.glb'), // Air Jordan 1 Low
    shoe5: require('./shoe5.glb'), // Air Jordan 1 Mid (Women's)
    shoe6: require('./shoe6.glb'), // Air Jordan 1 Mid SE
    modal1: require('./modal1.glb'),
    modal2: require('./modal2.glb'),
    modal3: require('./modal3.glb'),
    modal4: require('./modal4.glb'),

};

// For now, using a placeholder model URL
// Once you add your .glb files, the require() will resolve to the local path
export const getModelPath = (modelName: keyof typeof models) => {
    try {
        return models[modelName];
    } catch (error) {
        console.warn(`Model ${modelName} not found, using placeholder`);
        return null;
    }
};
