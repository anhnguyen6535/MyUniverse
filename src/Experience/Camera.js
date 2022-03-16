import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        //Setup
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.time = this.experience.time
        // this.mouseContainer = this.experience.mouse
        // this.parallaxX = this.mouseContainer.parallaxX
        // this.parallaxY = this.mouseContainer.parallaxY

        this.setInstance()  //Setup Camera
    
        this.setControls()  //Setup Controls
        window.camera = this.instance

        // //Animation
        // this.time.on('tick', () =>{
        //     this.animation()
        // })
    }

    //Generate Camera
    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 1000)
        this.instance.position.set(2, 30, 110)
        //this.instance.rotation.x(20*Math.PI/180)
        this.scene.add(this.instance)
    }

    animation(){
        // this.instance.position.x += (this.parallaxX - this.instance.position.x) * 5 * this.time.delta
        // this.instance.position.y += (this.parallaxY - this.instance.position.y) * 5 * this.time.delta
    }

    //Generate Control
    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        //this.controls.enableZoom = false
        this.controls.enablePan = false
        this.controls.maxPolarAngle = 100* Math.PI/180 //100
        this.controls.minPolarAngle = 45* Math.PI/ 180  //50
        this.controls.maxAzimuthAngle = 60* Math.PI/180
        this.controls.minAzimuthAngle = -60* Math.PI/180

    }

    //Resize viewport
    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    //Update Control (on each frame)
    update()
    {
        this.controls.update()
    }
}