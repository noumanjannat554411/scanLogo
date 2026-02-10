// Import your GLB models here
// Place your .glb files in this directory and import them

export const models = {
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
