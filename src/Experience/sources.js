/**
 * [Syntax]
 * name: will be used to retrieve the loaded resources.
 * type: what loader to use.
 * path: the path(s) of the file(s) to load.
 */

export default [
    {
        name: 'gradientTexture',
        type: 'allTexture',
        path:
        [
            '/gradients/5.jpg',
        ]
    },
    {
        name: 'fontTexture',
        type: 'fontTexture',
        path:
        [
            'font/Bangers_Regular.json',
            //'font/Kranky_Regular.json',
        ]
    },
    {
        name: 'comicTexture',
        type: 'fontTexture',
        path:
        [
            'font/Comic Neue_Bold Italic.json',
            //'font/Kranky_Regular.json',
        ]
    },
    {
        name: 'particlesTexture',
        type: 'starTexture',
        path:
        [
            '/particles/2.png',
        ]
    },
    {
        name: 'earthTexture',
        type: 'allTexture',
        path:
        [
            '/door/earth2.jpg',
        ]
    },
    {
        name: 'sunTexture',
        type: 'allTexture',
        path:
        [
            '/door/sun.jpg',
        ]
    },
    {
        name: 'neptune',
        type: 'allTexture',
        path:
        [
            '/door/neptune2.jpg',
        ]
    },
    {
        name: 'mars',
        type: 'allTexture',
        path:
        [
            '/door/mars2.jpg',
        ]
    },
    {
        name: 'mercury',
        type: 'allTexture',
        path:
        [
            '/door/mercury2.jpg',
        ]
    },
    {
        name: 'venus',
        type: 'allTexture',
        path:
        [
            '/door/venus2.jpg',
        ]
    },
    {
        name: 'jupiterTexture',
        type: 'allTexture',
        path:
        [
            '/door/jupiter2.jpg',
        ]
    },
    {
        name: 'saturnTexture',
        type: 'allTexture',
        path:
        [
            '/door/saturn2.jpg',
        ]
    },
    {
        name: 'uranusTexture',
        type: 'allTexture',
        path:
        [
            '/door/uranus2.jpg',
        ]
    },

]

//  const doorAmbientOcclusionTexture = textureLoader.load('/door/ambientOcclusion.jpg')
//  const doorHeightTexture = textureLoader.load('/door/height.jpg')
//  const doorNormalTexture = textureLoader.load('/door/normal.jpg')
//  const doorMetalnessTexture = textureLoader.load('/door/metalness.jpg')
//  const doorRoughnessTexture = textureLoader.load('/door/roughness.jpg')
//const matcapTexture = textureLoader.load('/matcaps/1.png')