import './style.css'
import Experience from './Experience/Experience'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { DoubleSide, PerspectiveCamera } from 'three'
// import gsap from 'gsap'
// import * as dat from 'lil-gui'

const experience = new Experience(document.querySelector('canvas.webgl'))

/**
 * GUI DEBUG
 */
// const gui = new dat.GUI()

// const parameters = {
//     sunColor: '#f61c04',
//     planetColor: '#e836ff',
//     ringColor: '#7936ff',
//     sunEmissive: '#de0d0d',
//     ringEmissive: '#3a07a2',
//     planetEmissive: '#dc2af4'
// }

// gui
//     .addColor(parameters, 'sunColor')
//     .onChange(() => {
//         sun.material.color.set(parameters.sunColor)
//     })
// gui
//     .addColor(parameters, 'planetColor')
//     .onChange(() => {
//         planet.material.color.set(parameters.planetColor)
//     })
// gui
//     .addColor(parameters, 'ringColor')
//     .onChange(() => {
//         ring.material.color.set(parameters.ringColor)
//     })
// gui
//     .addColor(parameters, 'sunEmissive')
//     .onChange(() =>{
//         sun.material.emissive.set(parameters.sunEmissive)
//     })
// gui
//     .addColor(parameters, 'planetEmissive')
//     .onChange(() =>{
//         planet.material.emissive.set(parameters.planetEmissive)
//     })
// gui
//     .addColor(parameters, 'ringEmissive')
//     .onChange(() =>{
//         ring.material.emissive.set(parameters.ringEmissive)
//     })


/**
 * Texture Loader
 */
// const textureLoader = new THREE.TextureLoader()

// const doorColorTexture = textureLoader.load('/door/color.jpg')
// const doorAlphaTexture = textureLoader.load('/door/alpha.jpg')

// const gradientTexture = textureLoader.load('/gradients/5.jpg')
// const starTexture = textureLoader.load('/particles/2.png')
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false


//Canvas
//const canvas = document.querySelector('canvas.webgl')

//Sizes
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

/**
 * [Handle mousemove]
 * Cursor
 */
// const cursor = {
//     x: 0,
//     y: 0
// }
// window.addEventListener('mousemove', (event) => {
//     cursor.x = event.clientX/sizes.width - 0.5
//     cursor.y = -(event.clientY/sizes.height - 0.5)
// })

/**
 * Handle Resizing
 */
// window.addEventListener('resize', () =>{
//     //update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     //update cam
//     camera.aspect = sizes.width/sizes.height
//     camera.updateProjectionMatrix()

//     //update renderer
//     renderer.setSize(sizes.width,sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

/**
 * Handle Fullscreen
 */
// window.addEventListener('dblclick', () =>
// {
//     const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

//     if(!fullscreenElement)
//     {
//         if(canvas.requestFullscreen)
//         {
//             canvas.requestFullscreen()
//         }
//         else if(canvas.webkitRequestFullscreen)
//         {
//             canvas.webkitRequestFullscreen()
//         }
//     }
//     else
//     {
//         if(document.exitFullscreen)
//         {
//             document.exitFullscreen()
//         }
//         else if(document.webkitExitFullscreen)
//         {
//             document.webkitExitFullscreen()
//         }
//     }
// })

//Scene
//const scene = new THREE.Scene()

//sun
// const sun = new THREE.Mesh(
//     new THREE.SphereGeometry( 2, 32, 16 ),
//     new THREE.MeshToonMaterial({
//         color: parameters.sunColor,
//         wireframe: false,
//         gradientMap: gradientTexture,
//         // emissive: parameters.sunEmissive,
//         // emissiveIntensity: 5
//     })
// )
// scene.add(sun)

//Obj2
// const group2 = new THREE.Group()
// group2.rotation.y = -0.2
// //group2.position.y = -4
// scene.add(group2)
// group2.position.set(100,1,1)

//ring
// const ring = new THREE.Mesh(
//     new THREE.TorusGeometry( 1, 0.2, 16, 100 ),
//     new THREE.MeshToonMaterial({
//         color: 0x3a07a2,
//         wireframe: false,
//         //transparent: true,
//         // map: doorColorTexture,
//         //alphaMap: doorAlphaTexture,
//         gradientMap: gradientTexture,
//         // emissive: parameters.ringEmissive,
//         // emissiveIntensity: 3
//     })
// )
// //ring.material.side = THREE.DoubleSide
// ring.rotation.x = 90
// group2.add(ring)

//planet
// const planet = new THREE.Mesh(
//     new THREE.SphereGeometry( 0.7, 32, 16 ),
//     new THREE.MeshToonMaterial({
//         color: parameters.planetColor,
//         wireframe: false,
//         // emissive: parameters.planetEmissive,
//         // emissiveIntensity: 3
//     })
// )
// group2.add(planet)
// group2.scale.set(2,2,2)

//GUI
// gui.add(sun.position, 'x').name('sun\'s x ')
// gui.add(sun.position, 'y').name('sun\'s y')
// gui.add(sun.position, 'z').name('sun\'s z')
// gui.add(sun.material, 'wireframe').name('sun\'s wireframe')
// gui.add(group2.position, 'x').name('planet\'s x ')
// gui.add(group2.position, 'y').name('sun\'s y')
// gui.add(group2.position, 'z').name('sun\'s z')


// const starGeo = new THREE.BufferGeometry()
// const count = 1200
// const positions = new Float32Array(count*3)
// const colors = new Float32Array(count*3)

// for(let i = 0; i < count *3; i++){
//     positions[i] = (Math.random() - 0.5) * 60
//     colors[i] = Math.random()
// }
// starGeo.setAttribute('position', new THREE.BufferAttribute(positions,3))
// starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
// const starMaterial = new THREE.PointsMaterial({size: 0.5, sizeAttenuation: true})
// starMaterial.vertexColors = true
// starMaterial.transparent = true
// starMaterial.alphaMap = starTexture
// starMaterial.depthWrite = false
// const star = new THREE.Points(starGeo, starMaterial)
// scene.add(star)

/**
 * Axis Helper
 */
// const axisHelper = new THREE.AxesHelper()
// scene.add(axisHelper)

/**
 * Light
 */
//Ambient Light
// const ambientLight = new THREE.AmbientLight('#ffffff', 3)
// //ambientLight.position.set(1,4,1)
// scene.add(ambientLight)


// //Point Light
// const sunLight = new THREE.PointLight('#ffffff', 3)
// sunLight.position.set(1,3,1)
//scene.add(sunLight)


//Camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 1, 1000)
// camera.position.z = 20
// camera.position.y = 10
// camera.rotation.x = 2
// scene.add(camera)

//Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true
//controls.target.y = 2  //the control looks above the cube

// //Renderer
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width,sizes.height)

//Clock
// const clock = new THREE.Clock()

//Animation
// const tick = () => {
//     const elapsedTime = clock.getElapsedTime()

//     //Update obj
//     sun.rotateY(0.2)
//     //torus.rotateX(0.2)

//     group2.position.x = Math.cos(elapsedTime) * Math.PI * 3
//     group2.position.z = Math.sin(elapsedTime) * Math.PI * 3
//     planet.rotateY(0.1)
//     //ring.rotateX(0.1)
//     //group.rotateX(Math.PI )
//     //group.position.y += 1
//     camera.lookAt(sun.position)

//     //Update control
//     controls.update()

//     //Render
//     renderer.render(scene, camera)

//     //Call tick on the next frame
//     window.requestAnimationFrame(tick)
// }
// tick()
